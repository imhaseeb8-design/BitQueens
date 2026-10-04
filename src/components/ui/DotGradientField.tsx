'use client';

import { useEffect, useRef } from 'react';
import styles from './DotGradientField.module.css';

/* Lifted from GlobalDotMap, not re-tuned: this has to read as the same
   material as the hero map and the globe, so the palette, the dot geometry
   and the drifting fields are the same numbers. */
const BASE = [183, 182, 177];
const ACTIVE = [71, 82, 75];
const MOTION_SPEED = 3.5;

/** Grid pitch and dot radius as a fraction of width — the map's own ratios. */
const PITCH = 0.011;
const DOT = 0.00272;

const FIELDS = [
  { phase: 0.4, speed: 0.115, spread: 0.088, amp: 0.95 },
  { phase: 2.7, speed: 0.083, spread: 0.106, amp: 0.78 },
  { phase: 5.1, speed: 0.137, spread: 0.076, amp: 0.70 },
  { phase: 7.9, speed: 0.062, spread: 0.122, amp: 0.55 },
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function smooth01(v: number) {
  v = clamp01(v);
  return v * v * (3 - 2 * v);
}

function hash01(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function fieldCenter(field: (typeof FIELDS)[number], t: number) {
  const p = field.phase;
  const mt = t * MOTION_SPEED;
  return {
    x:
      0.5 +
      0.34 * Math.sin(mt * field.speed + p) +
      0.08 * Math.sin(mt * field.speed * 0.47 + p * 1.73),
    y:
      0.5 +
      0.28 * Math.cos(mt * field.speed * 1.13 + p * 0.91) +
      0.06 * Math.sin(mt * field.speed * 0.71 + p * 2.11),
  };
}

function energyAt(x: number, y: number, t: number) {
  let sum = 0;
  let peak = 0;

  for (const f of FIELDS) {
    const c = fieldCenter(f, t);
    const dx = x - c.x;
    const dy = (y - c.y) * 1.18;
    const d2 = dx * dx + dy * dy;
    const gaussian = Math.exp(-d2 / (2 * f.spread * f.spread));
    const breathe = 0.66 + 0.34 * Math.sin(t * 0.34 + f.phase * 1.9);
    const e = gaussian * f.amp * breathe;

    sum += e;
    peak = Math.max(peak, e);
  }

  const local =
    0.035 * (0.5 + 0.5 * Math.sin(t * 0.62 + hash01(x, y) * Math.PI * 2));

  return smooth01(clamp01(peak * 0.84 + sum * 0.23 + local - 0.04));
}

/**
 * A crown, drawn once: three points over a separated band. Deliberately blunt
 * geometry — at this dot pitch a shape has roughly 100 columns to say what it
 * is, so anything finer turns to mush.
 */
const CROWN_PATH =
  'M12 78 L12 22 L56 50 L100 8 L144 50 L188 22 L188 78 Z ' +
  'M12 86 L188 86 L188 106 L12 106 Z';
const CROWN_VIEW = { w: 200, h: 114 };

/** Rasterised this many times over the dot grid, then averaged down, so a dot
 *  on an edge gets partial coverage instead of snapping on or off. */
const MASK_OVERSAMPLE = 3;

export type DotFieldShape = 'field' | 'crown' | 'wave' | 'wordmark';

interface DotGradientFieldProps {
  className?: string;
  style?: React.CSSProperties;
  /** What the dots make. 'field' is the plain radial gradient. */
  shape?: DotFieldShape;
  /** Where the field is densest, in 0–1 of the box. Default: centred. */
  focusX?: number;
  focusY?: number;
  /** How far the falloff reaches from the focus, in 0–1 of the box. */
  spreadX?: number;
  spreadY?: number;
}

/**
 * A dot field with a pluggable mask.
 *
 * The map and the globe each draw one fixed shape out of dots. This draws
 * whatever mask it is handed on the same grid: a plain radial gradient, a
 * crown, a flowing ribbon, or the wordmark. Everything underneath is shared
 * with the hero map — the same two greys-to-green, the same radius and pitch
 * ratios, the same four roaming gaussians — so the dots are the same material
 * however they are arranged.
 *
 * The mask is coverage, not a stencil: a dot on a shape's edge comes back
 * part-covered and is drawn smaller and fainter, which is what keeps a hard
 * outline from reading as a jagged one at this pitch.
 *
 * Geometry scales with the element's own width, exactly as the map's does, so
 * a full-bleed instance lands on the same dot size as the hero.
 */
export function DotGradientField({
  className = '',
  style,
  shape = 'field',
  focusX = 0.5,
  focusY = 0.5,
  spreadX = 0.66,
  spreadY = 0.66,
}: DotGradientFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let cssW = 1;
    let cssH = 1;
    let cols = 1;
    let rows = 1;
    let pitch = 12;
    let originX = 0;
    let originY = 0;
    let mask = new Float32Array(1);
    let wordmark: HTMLImageElement | null = null;
    let frameId: number | undefined;

    /** Coverage per grid cell, 0–1. Rebuilt only on resize. */
    const buildMask = () => {
      mask = new Float32Array(cols * rows);

      if (shape === 'field') {
        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const nx = ((originX + col * pitch) / cssW - focusX) / spreadX;
            const ny = ((originY + row * pitch) / cssH - focusY) / spreadY;
            mask[row * cols + col] = Math.pow(
              smooth01(1 - Math.sqrt(nx * nx + ny * ny)),
              1.25
            );
          }
        }
        return;
      }

      if (shape === 'wave') {
        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const u = cols > 1 ? col / (cols - 1) : 0.5;
            const v = rows > 1 ? row / (rows - 1) : 0.5;
            const centre =
              0.5 +
              0.17 * Math.sin(u * Math.PI * 4.1 + 0.7) +
              0.05 * Math.sin(u * Math.PI * 7.3 + 2.4);
            const half = 0.085 + 0.045 * Math.sin(u * Math.PI * 3.1 + 1.2);
            // Tapered at both ends so the ribbon runs off the edges instead
            // of stopping at them.
            const ends = smooth01((0.5 - Math.abs(u - 0.5)) / 0.16);
            mask[row * cols + col] =
              smooth01(1 - Math.abs(v - centre) / half) * ends;
          }
        }
        return;
      }

      const ox = cols * MASK_OVERSAMPLE;
      const oy = rows * MASK_OVERSAMPLE;
      const off = document.createElement('canvas');
      off.width = ox;
      off.height = oy;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;

      const boxW = ox * 0.88;
      const boxH = oy * 0.88;

      if (shape === 'crown') {
        const k = Math.min(boxW / CROWN_VIEW.w, boxH / CROWN_VIEW.h);
        octx.translate((ox - CROWN_VIEW.w * k) / 2, (oy - CROWN_VIEW.h * k) / 2);
        octx.scale(k, k);
        octx.fillStyle = '#000';
        octx.fill(new Path2D(CROWN_PATH), 'evenodd');
      } else {
        if (!wordmark) return;
        const iw = wordmark.naturalWidth || 120;
        const ih = wordmark.naturalHeight || 24;
        const k = Math.min(boxW / iw, boxH / ih);
        octx.drawImage(
          wordmark,
          (ox - iw * k) / 2,
          (oy - ih * k) / 2,
          iw * k,
          ih * k
        );
      }

      const data = octx.getImageData(0, 0, ox, oy).data;
      const per = MASK_OVERSAMPLE * MASK_OVERSAMPLE * 255;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          let a = 0;
          for (let sy = 0; sy < MASK_OVERSAMPLE; sy += 1) {
            const py = row * MASK_OVERSAMPLE + sy;
            for (let sx = 0; sx < MASK_OVERSAMPLE; sx += 1) {
              a += data[(py * ox + col * MASK_OVERSAMPLE + sx) * 4 + 3];
            }
          }
          mask[row * cols + col] = a / per;
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pitch = Math.max(4, cssW * PITCH);
      cols = Math.ceil(cssW / pitch) + 1;
      rows = Math.ceil(cssH / pitch) + 1;
      originX = (cssW - (cols - 1) * pitch) / 2;
      originY = (cssH - (rows - 1) * pitch) / 2;
      buildMask();
    };

    if (shape === 'wordmark') {
      const img = new Image();
      img.onload = () => {
        wordmark = img;
        buildMask();
      };
      img.src = '/bitqueens-wordmark.svg';
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = (ms: number) => {
      const t = reduceMotion ? 0 : ms / 1000;
      ctx.clearRect(0, 0, cssW, cssH);
      const baseRadius = cssW * DOT;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const m = mask[row * cols + col];
          if (m <= 0.004) continue;

          const px = originX + col * pitch;
          const py = originY + row * pitch;
          const energy = reduceMotion ? 0.12 : energyAt(px / cssW, py / cssH, t);

          // Dots shrink as well as dim on the way out — a falloff should be a
          // change in weight, not only in opacity.
          const radius =
            baseRadius * (0.34 + 0.66 * m) * (0.94 + energy * 0.22);
          const r = Math.round(BASE[0] + (ACTIVE[0] - BASE[0]) * energy);
          const g = Math.round(BASE[1] + (ACTIVE[1] - BASE[1]) * energy);
          const b = Math.round(BASE[2] + (ACTIVE[2] - BASE[2]) * energy);

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${(0.48 + energy * 0.42) * m})`;
          ctx.fill();
        }
      }

      if (!reduceMotion) frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      if (frameId !== undefined) cancelAnimationFrame(frameId);
    };
  }, [shape, focusX, focusY, spreadX, spreadY]);

  return (
    <div
      className={`${styles.root} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
