'use client';

import { useEffect, useRef } from 'react';
import { GLOBE_IMAGE, POLE, U, V, decodeDots } from './dottedGlobeData';

/** Cubic Bezier control distance that approximates a quarter circle. */
const K = 0.5522847498;
/** The turn is slow enough that half rate is still smooth, at half the cost. */
const FRAME_MS = 1000 / 30;

/**
 * The dotted globe from public/globe-dotted.png, drawn by code and turning
 * slowly to the right.
 *
 * Every dot is the one from the PNG: scripts/extract-globe-dots.py lifts each
 * dot off the image onto the sphere it was rendered from, so at rest this is
 * the picture, dot for dot. Spinning it is then just adding to every dot's
 * longitude. Each dot is a tiny disc lying on the surface, so the ones at the
 * edge squash into the same hairline arcs the PNG has, and they unsquash as
 * they turn toward the middle.
 *
 * Stops when it is off screen and stays at rest for reduced motion.
 */
export function DottedGlobe({
  className,
  /** Seconds for one full turn. */
  period = 150,
  color = '#000',
}: {
  className?: string;
  period?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dots = decodeDots();
    const count = dots.length / 2;
    const cosLat = new Float32Array(count);
    const sinLat = new Float32Array(count);
    const lon = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const lat = (dots[i * 2] * Math.PI) / 180;
      cosLat[i] = Math.cos(lat);
      sinLat[i] = Math.sin(lat);
      lon[i] = (dots[i * 2 + 1] * Math.PI) / 180;
    }

    let cssW = 1;
    let cssH = 1;
    let frameId: number | undefined;
    let inView = true;
    let theta = 0;
    let last: number | undefined;

    const draw = () => {
      // Same framing as the PNG, so the section's CSS positions it unchanged.
      const s = cssW / GLOBE_IMAGE.width;
      const cx = GLOBE_IMAGE.cx * s;
      const cy = GLOBE_IMAGE.cy * s;
      const radius = GLOBE_IMAGE.radius * s;
      const r = GLOBE_IMAGE.dot * radius;
      // A disc seen edge-on still reads as a hairline in the source render.
      const minSquash = 0.2 * r;

      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = color;
      ctx.beginPath();

      for (let i = 0; i < count; i++) {
        const a = lon[i] + theta;
        const ca = Math.cos(a) * cosLat[i];
        const sa = Math.sin(a) * cosLat[i];
        const z = ca * U[2] + sa * V[2] + sinLat[i] * POLE[2];
        if (z <= 0) continue;
        const x = cx + radius * (ca * U[0] + sa * V[0] + sinLat[i] * POLE[0]);
        const y = cy + radius * (ca * U[1] + sa * V[1] + sinLat[i] * POLE[1]);
        // Foreshortened toward the sphere's centre, full size across it:
        // an ellipse whose short axis points at the centre. Built from four
        // cubics rather than ctx.ellipse(), which is an order of magnitude
        // slower per call and this runs a few thousand times a frame.
        const squash = Math.max(r * z, minSquash);
        const len = Math.hypot(x - cx, y - cy) || 1;
        const ux = ((x - cx) / len) * squash;
        const uy = ((y - cy) / len) * squash;
        const vx = (-(y - cy) / len) * r;
        const vy = ((x - cx) / len) * r;
        ctx.moveTo(x + ux, y + uy);
        ctx.bezierCurveTo(x + ux + K * vx, y + uy + K * vy, x + vx + K * ux, y + vy + K * uy, x + vx, y + vy);
        ctx.bezierCurveTo(x + vx - K * ux, y + vy - K * uy, x - ux + K * vx, y - uy + K * vy, x - ux, y - uy);
        ctx.bezierCurveTo(x - ux - K * vx, y - uy - K * vy, x - vx - K * ux, y - vy - K * uy, x - vx, y - vy);
        ctx.bezierCurveTo(x - vx + K * ux, y - vy + K * uy, x + ux - K * vx, y + uy - K * vy, x + ux, y + uy);
      }

      ctx.fill();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const tick = (ms: number) => {
      frameId = undefined;
      if (!inView) return;
      frameId = requestAnimationFrame(tick);
      if (last !== undefined && ms - last < FRAME_MS) return;
      // Negative: the near side travels left to right.
      if (last !== undefined) theta -= ((ms - last) / 1000 / period) * Math.PI * 2;
      last = ms;
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let visibility: IntersectionObserver | undefined;
    if (!reduceMotion) {
      visibility = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView && frameId === undefined) {
          last = undefined; // pick up where it stopped, no jump
          frameId = requestAnimationFrame(tick);
        }
      });
      visibility.observe(canvas);
    }

    return () => {
      observer.disconnect();
      visibility?.disconnect();
      if (frameId !== undefined) cancelAnimationFrame(frameId);
    };
  }, [period, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={GLOBE_IMAGE.width}
      height={GLOBE_IMAGE.height}
      aria-hidden="true"
    />
  );
}
