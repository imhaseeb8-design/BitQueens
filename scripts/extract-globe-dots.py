#!/usr/bin/env python3
"""
Turn public/globe-dotted.png into the dot data behind <DottedGlobe />.

The PNG is a render of a dotted sphere: black tangent discs on a regular
1.8° latitude/longitude lattice, seen orthographically, with the polar axis
tilted. This script recovers that geometry so the same dots can be drawn
by code and rotated about the real axis, without moving a single one:

  1. decode the PNG (alpha channel only, everything opaque is a dot)
  2. connected components -> one blob per dot, or per run of dots where the
     limb has squeezed neighbours into each other
  3. fit the sphere outline (centre, radius) from the outermost pixels
  4. fit the polar axis: the direction in which the dots' latitudes are
     periodic with the tightest spacing
  5. every single dot -> its centroid lifted onto the sphere -> (lat, lon)
     merged limb runs -> split along their lattice rows
  6. mirror the front hemisphere to the back (lon + 180°) so the sphere is
     full and the loop is seamless every half turn
  7. write src/components/ui/dottedGlobeData.ts

Only needs python3 + numpy (both on macOS by default). Run from the repo root:

    python3 scripts/extract-globe-dots.py
"""
import base64
import struct
import zlib
from collections import deque
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'public' / 'globe-dotted.png'
OUT = ROOT / 'src' / 'components' / 'ui' / 'dottedGlobeData.ts'


# --- 1. minimal PNG decode (8-bit RGBA / RGB / grey+alpha, non-interlaced) --
def read_png(path):
    data = path.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    pos, idat, ihdr = 8, [], None
    while pos < len(data):
        (length,) = struct.unpack('>I', data[pos:pos + 4])
        ctype = data[pos + 4:pos + 8]
        body = data[pos + 8:pos + 8 + length]
        if ctype == b'IHDR':
            ihdr = struct.unpack('>IIBBBBB', body)
        elif ctype == b'IDAT':
            idat.append(body)
        pos += 12 + length
    w, h, depth, ctype, _, _, interlace = ihdr
    assert depth == 8 and interlace == 0, 'unsupported PNG layout'
    ch = {6: 4, 2: 3, 4: 2, 0: 1}[ctype]
    raw = zlib.decompress(b''.join(idat))
    stride = w * ch
    out = np.zeros((h, stride), np.uint8)
    prev = np.zeros(stride, np.int32)
    p = 0
    for y in range(h):
        f = raw[p]
        line = np.frombuffer(raw[p + 1:p + 1 + stride], np.uint8).astype(np.int32)
        p += 1 + stride
        if f == 1:
            for i in range(ch, stride):
                line[i] = (line[i] + line[i - ch]) & 255
        elif f == 2:
            line = (line + prev) & 255
        elif f == 3:
            for i in range(stride):
                a = line[i - ch] if i >= ch else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255
        elif f == 4:
            for i in range(stride):
                a = line[i - ch] if i >= ch else 0
                b = prev[i]
                c = prev[i - ch] if i >= ch else 0
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                pred = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pred) & 255
        out[y] = line
        prev = line
    px = out.reshape(h, w, ch)
    alpha = px[:, :, -1] if ch in (2, 4) else 255 - px[:, :, 0]
    return alpha


alpha = read_png(SRC)
H, W = alpha.shape
mask = alpha > 127

# --- 2. connected components (8-connected) ---------------------------------
label = np.zeros((H, W), np.int32)
comps = []
for y0, x0 in zip(*np.nonzero(mask)):
    if label[y0, x0]:
        continue
    n = len(comps) + 1
    label[y0, x0] = n
    q, pts = deque([(y0, x0)]), []
    while q:
        y, x = q.popleft()
        pts.append((y, x))
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                yy, xx = y + dy, x + dx
                if 0 <= yy < H and 0 <= xx < W and mask[yy, xx] and not label[yy, xx]:
                    label[yy, xx] = n
                    q.append((yy, xx))
    comps.append(np.array(pts))
areas = np.array([len(c) for c in comps], float)
median_area = np.median(areas)
is_single = areas < 1.6 * median_area
print(f'{len(comps)} components, median area {median_area:.0f}px, '
      f'{(~is_single).sum()} merged runs at the limb')

# --- 3. sphere outline ------------------------------------------------------
ys, xs = np.nonzero(mask)
P = np.c_[xs + 0.5, ys + 0.5]


def convex_hull(pts):
    pts = pts[np.lexsort((pts[:, 1], pts[:, 0]))]

    def half(seq):
        out = []
        for q in seq:
            while len(out) >= 2 and (
                (out[-1][0] - out[-2][0]) * (q[1] - out[-2][1])
                - (out[-1][1] - out[-2][1]) * (q[0] - out[-2][0])
            ) <= 0:
                out.pop()
            out.append(q)
        return out

    lower, upper = half(pts), half(pts[::-1])
    return np.array(lower[:-1] + upper[:-1])


def min_enclosing_circle(pts):
    """Smallest circle containing every point (brute force over the hull)."""
    best = None
    n = len(pts)
    for i in range(n):
        for j in range(i + 1, n):
            c = (pts[i] + pts[j]) / 2
            r = np.hypot(*(pts[i] - c))
            if np.hypot(pts[:, 0] - c[0], pts[:, 1] - c[1]).max() <= r + 1e-6:
                if best is None or r < best[2]:
                    best = (c[0], c[1], r)
            for k in range(j + 1, n):
                a, b, d = pts[i], pts[j], pts[k]
                det = 2 * ((b[0] - a[0]) * (d[1] - a[1]) - (b[1] - a[1]) * (d[0] - a[0]))
                if abs(det) < 1e-9:
                    continue
                bx, by = b - a
                dx, dy = d - a
                b2, d2 = bx * bx + by * by, dx * dx + dy * dy
                ux = (dy * b2 - by * d2) / det
                uy = (bx * d2 - dx * b2) / det
                c = a + [ux, uy]
                r = np.hypot(ux, uy)
                if best is not None and r >= best[2]:
                    continue
                if np.hypot(pts[:, 0] - c[0], pts[:, 1] - c[1]).max() <= r + 1e-6:
                    best = (c[0], c[1], r)
    return best


# The globe's silhouette is the smallest circle that holds every dot: the
# land touches the outline at enough angles for that to pin it down, and
# unlike a least-squares fit it cannot be pulled inward by the rows that run
# just inside the edge.
cx, cy, R = min_enclosing_circle(convex_hull(P))
print(f'sphere centre ({cx:.2f}, {cy:.2f}) radius {R:.2f} in a {W}x{H} image')


LIMB = 0.9975  # z >= 0.05


def lift(xy):
    """Image points -> unit vectors on the sphere (z toward the viewer)."""
    X = (xy[:, 0] - cx) / R
    Y = (xy[:, 1] - cy) / R
    # Pixels on or past the outline (anti-aliasing, fit error) are pulled just
    # inside it, so a limb dot keeps a tiny positive z and still gets drawn.
    rr = X * X + Y * Y
    over = rr > LIMB
    X[over] *= np.sqrt(LIMB / rr[over])
    Y[over] *= np.sqrt(LIMB / rr[over])
    Z = np.sqrt(np.clip(1 - X * X - Y * Y, 0, 1))
    return np.c_[X, Y, Z]


centroids = np.array([[c[:, 1].mean() + 0.5, c[:, 0].mean() + 0.5] for c in comps])
D = lift(centroids.copy())

# Intrinsic dot radius: a tangent disc of radius r0 projects to area pi r0^2 z.
z = D[:, 2]
good = is_single & (z > 0.5)
r0 = np.median(np.sqrt(areas[good] / (np.pi * z[good])))
print(f'dot radius {r0:.2f}px  ({r0 / R:.5f} of the sphere radius)')

# --- 4. polar axis ----------------------------------------------------------
fit_pts = D[is_single & (z > 0.3)]


def axis_from(tilt, lean):
    t, l = np.radians(tilt), np.radians(lean)
    return np.array([np.sin(t) * np.cos(l), -np.cos(t) * np.cos(l), np.sin(l)])


def coherence(p, spacings):
    lat = np.arcsin(np.clip(fit_pts @ p, -1, 1))
    scores = [abs(np.exp(2j * np.pi * lat / np.radians(s)).mean()) for s in spacings]
    k = int(np.argmax(scores))
    return scores[k], spacings[k]


best = (0, 0, 0, 0)
for tilt in np.arange(-60, 61, 2.0):
    for lean in np.arange(-40, 41, 2.0):
        s, sp = coherence(axis_from(tilt, lean), np.arange(1.2, 2.6, 0.02))
        if s > best[0]:
            best = (s, tilt, lean, sp)
for tilt in np.arange(best[1] - 2.5, best[1] + 2.51, 0.1):
    for lean in np.arange(best[2] - 2.5, best[2] + 2.51, 0.1):
        s, sp = coherence(axis_from(tilt, lean), np.arange(best[3] - 0.1, best[3] + 0.1, 0.005))
        if s > best[0]:
            best = (s, tilt, lean, sp)
_, tilt, lean, dphi = best
pole = axis_from(tilt, lean)
# lon 0 faces the viewer, so the +-180 seam sits on the far side and no
# visible run of dots ever straddles it.
u = np.array([0, 0, 1.0]) - pole[2] * pole
u /= np.linalg.norm(u)
v = np.cross(pole, u)
lat_all = np.degrees(np.arcsin(np.clip(fit_pts @ pole, -1, 1)))
phase = np.angle(np.exp(2j * np.pi * lat_all / dphi).mean()) / (2 * np.pi) * dphi
print(f'axis tilt {tilt:.1f}° lean {lean:.1f}° toward viewer, rows every {dphi:.3f}°')


def to_latlon(d):
    return (np.degrees(np.arcsin(np.clip(d @ pole, -1, 1))),
            np.degrees(np.arctan2(d @ v, d @ u)))


# --- 5. dots ---------------------------------------------------------------
lat, lon = to_latlon(D)
dots = [(lat[i], lon[i]) for i in np.nonzero(is_single)[0]]

rho = np.degrees(r0 / R)  # a dot's angular radius on the sphere
split_into = 0
for i in np.nonzero(~is_single)[0]:
    pts = comps[i]
    d = lift(np.c_[pts[:, 1] + 0.5, pts[:, 0] + 0.5].astype(float))
    plat, plon = to_latlon(d)
    rows = np.round((plat - phase) / dphi).astype(int)
    counts = {k: (rows == k).sum() for k in set(rows)}
    keep = [k for k, n in counts.items() if n >= 0.3 * max(counts.values())]
    for k in keep:
        row_lat = phase + k * dphi
        half = rho / max(np.cos(np.radians(row_lat)), 0.05)
        l = plon[rows == k]
        lo, hi = l.min() + half, l.max() - half
        if hi <= lo:
            dots.append((row_lat, (l.min() + l.max()) / 2))
            split_into += 1
            continue
        # Two estimates of how many lattice dots the run holds: how many fit
        # in its longitude span, and how much ink it has. Near the outline the
        # span is unreliable (z is nearly flat there), so take the smaller.
        n_span = int(round((hi - lo) / dphi)) + 1
        zr = max(float(d[rows == k, 2].mean()), 0.05)
        n_ink = int(round((rows == k).sum() / (np.pi * r0 * max(r0 * zr, 1.0))))
        n = max(1, min(n_span, n_ink + 1))
        for lo_n in np.linspace(lo, hi, n):
            dots.append((row_lat, lo_n))
        split_into += n
print(f'{(~is_single).sum()} merged runs split into {split_into} dots')

front = np.array(dots)

# The outline is where the extraction is least trustworthy: a limb dot is a
# hairline that the mask breaks into fragments, each of which became a dot
# above. Snap those to their lattice row and collapse anything closer than
# half a cell, so a limb row rotating to the front does not arrive as a smear.
def unit(ll):
    la, lo = np.radians(ll[:, 0]), np.radians(ll[:, 1])
    return np.c_[np.cos(la) * np.cos(lo), np.cos(la) * np.sin(lo), np.sin(la)]


front_z = unit(front) @ np.array([u[2], v[2], pole[2]])
limb = front_z < 0.2
front[limb, 0] = phase + np.round((front[limb, 0] - phase) / dphi) * dphi
order = np.argsort(-front_z)
F = unit(front)[order]
keep = np.ones(len(F), bool)
min_sep = np.cos(np.radians(0.55 * dphi))
for i in range(len(F)):
    if not keep[i]:
        continue
    later = np.nonzero(keep[i + 1:])[0] + i + 1
    keep[later[(F[later] @ F[i]) > min_sep]] = False
front = front[order][keep]
print(f'{(~keep).sum()} limb fragments merged, {len(front)} front dots')

# --- 6. back hemisphere ------------------------------------------------------
back = front.copy()
back[:, 1] = (back[:, 1] + 180 + 180) % 360 - 180
# Drop mirrored dots that would land on a real one (rows that were already
# fully visible around the near pole).
F, B = unit(front), unit(back)
min_sep = np.cos(np.radians(0.55 * dphi))
close = (B @ F.T).max(1) > min_sep
all_dots = np.vstack([front, back[~close]])
print(f'{len(front)} front dots + {(~close).sum()} mirrored = {len(all_dots)} on the sphere')

# --- 7. emit ---------------------------------------------------------------
packed = np.round(all_dots * 100).astype('<i2').ravel().tobytes()
b64 = base64.b64encode(packed).decode()
lines = [b64[i:i + 100] for i in range(0, len(b64), 100)]
packed_lines = "' +\n  '".join(lines)

ts = f"""// Generated by scripts/extract-globe-dots.py from public/globe-dotted.png.
// Do not edit by hand - re-run the script instead.

/** Sphere geometry in the source image's own {W}x{H} pixel space. */
export const GLOBE_IMAGE = {{
  width: {W},
  height: {H},
  cx: {cx:.2f},
  cy: {cy:.2f},
  radius: {R:.2f},
  /** Radius of one dot as a fraction of the sphere radius. */
  dot: {r0 / R:.5f},
}} as const;

/**
 * Orthonormal frame of the fitted polar axis, in image space (x right,
 * y down, z toward the viewer). A dot at (lat, lon) sits at
 * cos(lat)cos(lon)*U + cos(lat)sin(lon)*V + sin(lat)*POLE, so spinning the
 * globe is just adding to lon.
 */
export const POLE = [{pole[0]:.6f}, {pole[1]:.6f}, {pole[2]:.6f}] as const;
export const U = [{u[0]:.6f}, {u[1]:.6f}, {u[2]:.6f}] as const;
export const V = [{v[0]:.6f}, {v[1]:.6f}, {v[2]:.6f}] as const;

export const DOT_COUNT = {len(all_dots)};

/** Little-endian int16 pairs of (lat, lon) in hundredths of a degree. */
const PACKED =
  '{packed_lines}';

export function decodeDots(): Float32Array {{
  const bin = atob(PACKED);
  const out = new Float32Array(bin.length / 2);
  for (let i = 0; i < out.length; i++) {{
    const lo = bin.charCodeAt(i * 2);
    const hi = bin.charCodeAt(i * 2 + 1);
    const n = (hi << 8) | lo;
    out[i] = (n & 0x8000 ? n - 0x10000 : n) / 100;
  }}
  return out;
}}
"""
OUT.write_text(ts)
print(f'wrote {OUT.relative_to(ROOT)} ({len(ts) // 1024} KB)')
