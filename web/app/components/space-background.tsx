"use client";

import { useEffect, useRef } from "react";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface Star {
  x: number; y: number; r: number; alpha: number;
  speed: number; phase: number; color: string; layer: number;
}

interface BrightStar {
  x: number; y: number; r: number; glowR: number; alpha: number;
  speed: number; phase: number; color: string; layer: number;
}

interface Meteor {
  x: number; y: number; vx: number; vy: number;
  len: number; born: number; life: number; alpha: number;
}

interface Asteroid {
  x: number; y: number;
  size: number;
  vertices: number[];
  vertexCount: number;
  rotation: number;
  rotSpeed: number;
  driftX: number;
  driftY: number;
  alpha: number;
  layer: number;
}

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const STAR_COLORS = [
  "#ffffff", "#fff7ed", "#fef3c7", "#fed7aa",
  "#fdba74", "#fb923c", "#f97316",
];

const LAYER_PARALLAX = [0.015, 0.04, 0.08];

const SATURN = {
  cx: 0.5,
  cy: 1.05,
  lightAngle: -2.3,
  rotSpeed: 0.012,
  bandCount: 24,
  base: [45, 30, 12] as [number, number, number],
  light: [135, 95, 40] as [number, number, number],
  dark: [18, 10, 4] as [number, number, number],
  atmColor: [255, 170, 60] as [number, number, number],
};

const RING_BANDS = [
  { inner: 1.24, outer: 1.38, alpha: 0.08, color: [70, 58, 38] as [number, number, number] },
  { inner: 1.39, outer: 1.55, alpha: 0.14, color: [85, 70, 45] as [number, number, number] },
  { inner: 1.56, outer: 1.94, alpha: 0.28, color: [115, 95, 58] as [number, number, number] },
  { inner: 2.02, outer: 2.28, alpha: 0.20, color: [100, 82, 52] as [number, number, number] },
  { inner: 2.32, outer: 2.40, alpha: 0.12, color: [90, 74, 46] as [number, number, number] },
  { inner: 2.44, outer: 2.50, alpha: 0.05, color: [75, 60, 38] as [number, number, number] },
];

const NEBULAS = [
  { x: 0.15, y: 0.10, r: 0.30, rgb: "251,146,60", a: 0.025, dx: 12, dy: 6 },
  { x: 0.82, y: 0.48, r: 0.24, rgb: "234,88,12", a: 0.018, dx: -7, dy: 9 },
  { x: 0.38, y: 0.85, r: 0.32, rgb: "217,119,6", a: 0.020, dx: 6, dy: -5 },
];

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function rgbStr(c: readonly [number, number, number], offset = 0): string {
  return c.map((v) => Math.max(0, Math.min(255, v + offset))).join(",");
}

function seededRandom(seed: number) {
  let s = (seed | 0) || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ================================================================== */
/*  Star generation                                                    */
/* ================================================================== */

function createStars(w: number, h: number): Star[] {
  const m = w < 768 ? 0.5 : 1;
  const result: Star[] = [];
  const layers = [
    { count: Math.round(400 * m), rMin: 0.3, rMax: 0.8, aMin: 0.10, aMax: 0.38 },
    { count: Math.round(160 * m), rMin: 0.5, rMax: 1.3, aMin: 0.22, aMax: 0.58 },
    { count: Math.round(55 * m), rMin: 0.8, rMax: 2.0, aMin: 0.40, aMax: 0.80 },
  ];
  for (let li = 0; li < layers.length; li++) {
    const l = layers[li];
    for (let i = 0; i < l.count; i++) {
      result.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: l.rMin + Math.random() * (l.rMax - l.rMin),
        alpha: l.aMin + Math.random() * (l.aMax - l.aMin),
        speed: 0.3 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        layer: li,
      });
    }
  }
  return result;
}

function createBrightStars(w: number, h: number): BrightStar[] {
  const result: BrightStar[] = [];
  const count = w < 768 ? 4 : 8;
  for (let i = 0; i < count; i++) {
    result.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.7,
      r: 1.8 + Math.random() * 1.2,
      glowR: 16 + Math.random() * 20,
      alpha: 0.55 + Math.random() * 0.35,
      speed: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * 3)],
      layer: 1 + Math.floor(Math.random() * 2),
    });
  }
  return result;
}

/* ================================================================== */
/*  Asteroid generation                                                */
/* ================================================================== */

function createAsteroids(w: number, h: number): Asteroid[] {
  const count = w < 768 ? 25 : 50;
  const result: Asteroid[] = [];
  const planetTopY = h * SATURN.cy - h * 0.48;

  for (let i = 0; i < count; i++) {
    const nearHorizon = Math.random() < 0.35;
    const y = nearHorizon
      ? planetTopY - h * 0.12 + Math.random() * h * 0.18
      : Math.random() * h * 0.82;

    const vertexCount = 6 + Math.floor(Math.random() * 5);
    const vertices: number[] = [];
    for (let v = 0; v < vertexCount; v++) {
      vertices.push(0.55 + Math.random() * 0.45);
    }

    result.push({
      x: Math.random() * w,
      y,
      size: 1.5 + Math.random() * 5.5,
      vertices,
      vertexCount,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (0.05 + Math.random() * 0.25) * (Math.random() > 0.5 ? 1 : -1),
      driftX: (0.5 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1),
      driftY: (0.2 + Math.random() * 1.5) * (Math.random() > 0.5 ? 1 : -1),
      alpha: 0.3 + Math.random() * 0.5,
      layer: Math.floor(Math.random() * 3),
    });
  }
  return result;
}

/* ================================================================== */
/*  Drawing: nebulas                                                   */
/* ================================================================== */

function drawNebulas(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, reduced: boolean,
) {
  for (let i = 0; i < NEBULAS.length; i++) {
    const n = NEBULAS[i];
    const ox = reduced ? 0 : Math.sin(t * 0.035 + i) * n.dx;
    const oy = reduced ? 0 : Math.cos(t * 0.025 + i * 2) * n.dy;
    const nx = n.x * w + ox;
    const ny = n.y * h + oy;
    const nr = n.r * Math.max(w, h);
    const pulse = reduced ? 1 : 0.85 + 0.15 * Math.sin(t * 0.08 + i * 2.1);

    const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    grad.addColorStop(0, `rgba(${n.rgb},${n.a * pulse})`);
    grad.addColorStop(0.4, `rgba(${n.rgb},${n.a * 0.35 * pulse})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(nx, ny, nr, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ================================================================== */
/*  Drawing: stars                                                     */
/* ================================================================== */

function drawStars(
  ctx: CanvasRenderingContext2D, stars: Star[], h: number,
  t: number, scrollY: number, reduced: boolean,
) {
  for (const s of stars) {
    const py = reduced ? 0 : scrollY * LAYER_PARALLAX[s.layer];
    const twinkle = reduced ? 1 : clamp01(0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
    const sy = ((s.y - py) % h + h) % h;
    ctx.globalAlpha = s.alpha * twinkle;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, sy, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawBrightStars(
  ctx: CanvasRenderingContext2D, stars: BrightStar[], h: number,
  t: number, scrollY: number, reduced: boolean,
) {
  for (const bs of stars) {
    const py = reduced ? 0 : scrollY * LAYER_PARALLAX[bs.layer];
    const twinkle = clamp01(reduced ? 1 : 0.5 + 0.5 * Math.sin(t * bs.speed + bs.phase));
    const by = ((bs.y - py) % h + h) % h;
    const a = bs.alpha * twinkle;
    const gr = Math.max(1, bs.glowR * twinkle);

    const glowGrad = ctx.createRadialGradient(bs.x, by, 0, bs.x, by, gr);
    glowGrad.addColorStop(0, `rgba(255,210,155,${a * 0.4})`);
    glowGrad.addColorStop(0.35, `rgba(249,115,22,${a * 0.14})`);
    glowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(bs.x, by, gr, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = a;
    ctx.fillStyle = bs.color;
    ctx.beginPath();
    ctx.arc(bs.x, by, bs.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = a * 0.22;
    ctx.strokeStyle = bs.color;
    ctx.lineWidth = bs.r * 0.35;
    ctx.lineCap = "round";
    const fs = Math.max(1, gr * 0.7);
    ctx.beginPath();
    ctx.moveTo(bs.x - fs, by);
    ctx.lineTo(bs.x + fs, by);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bs.x, by - fs * 0.65);
    ctx.lineTo(bs.x, by + fs * 0.65);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

/* ================================================================== */
/*  Drawing: meteors                                                   */
/* ================================================================== */

function drawMeteors(ctx: CanvasRenderingContext2D, meteors: Meteor[], t: number) {
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    const age = t - m.born;
    if (age > m.life) { meteors.splice(i, 1); continue; }
    const progress = age / m.life;
    const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
    const a = m.alpha * clamp01(fade);
    const cx = m.x + m.vx * age;
    const cy = m.y + m.vy * age;
    const tx = cx - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
    const ty = cy - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;

    const grad = ctx.createLinearGradient(cx, cy, tx, ty);
    grad.addColorStop(0, `rgba(255,220,170,${a})`);
    grad.addColorStop(0.3, `rgba(249,115,22,${a * 0.5})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tx, ty);
    ctx.stroke();
  }
}

/* ================================================================== */
/*  Drawing: Saturn — glow                                             */
/* ================================================================== */

function drawSaturnGlow(
  ctx: CanvasRenderingContext2D, sx: number, sy: number,
  radius: number, t: number, reduced: boolean,
) {
  const pulse = reduced ? 1 : 0.95 + 0.05 * Math.sin(t * 0.1);
  const glowR = radius * 1.6;
  const g = ctx.createRadialGradient(sx, sy, radius * 0.4, sx, sy, glowR);
  g.addColorStop(0, `rgba(${rgbStr(SATURN.atmColor)},${0.14 * pulse})`);
  g.addColorStop(0.4, `rgba(${rgbStr(SATURN.atmColor)},${0.05 * pulse})`);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
  ctx.fill();
}

/* ================================================================== */
/*  Drawing: Saturn — rings                                            */
/* ================================================================== */

function drawSaturnRings(
  ctx: CanvasRenderingContext2D, sx: number, sy: number,
  radius: number, tilt: number, t: number, reduced: boolean,
) {
  for (let b = 0; b < RING_BANDS.length; b++) {
    const band = RING_BANDS[b];
    const innerR = radius * band.inner;
    const outerR = radius * band.outer;
    const shimmer = reduced ? 0 : Math.sin(t * 0.15 + b * 1.7) * 0.02;
    const alpha = band.alpha + shimmer;

    ctx.fillStyle = `rgba(${rgbStr(band.color)},${alpha})`;
    ctx.beginPath();
    ctx.ellipse(sx, sy, outerR, outerR * tilt, 0, 0, Math.PI * 2);
    ctx.ellipse(sx, sy, innerR, innerR * tilt, 0, 0, Math.PI * 2, true);
    ctx.fill();
  }

  /* directional lighting overlay on rings */
  const maxR = radius * RING_BANDS[RING_BANDS.length - 1].outer;
  ctx.save();
  ctx.beginPath();
  for (const band of RING_BANDS) {
    ctx.ellipse(sx, sy, radius * band.outer, radius * band.outer * tilt, 0, 0, Math.PI * 2);
    ctx.ellipse(sx, sy, radius * band.inner, radius * band.inner * tilt, 0, 0, Math.PI * 2, true);
  }
  ctx.clip();

  const lx = Math.cos(SATURN.lightAngle);
  const ly = Math.sin(SATURN.lightAngle);
  const litGrad = ctx.createLinearGradient(
    sx + lx * maxR, sy + ly * maxR * tilt,
    sx - lx * maxR, sy - ly * maxR * tilt,
  );
  litGrad.addColorStop(0, "rgba(255,200,120,0.10)");
  litGrad.addColorStop(0.35, "rgba(0,0,0,0)");
  litGrad.addColorStop(1, "rgba(0,0,0,0.18)");
  ctx.fillStyle = litGrad;
  ctx.fillRect(sx - maxR, sy - maxR, maxR * 2, maxR * 2);
  ctx.restore();
}

/* ================================================================== */
/*  Drawing: Saturn — cloud bands                                      */
/* ================================================================== */

function drawSaturnClouds(
  ctx: CanvasRenderingContext2D, sx: number, sy: number,
  radius: number, t: number, reduced: boolean,
) {
  const rng = seededRandom(42);
  const bandCount = SATURN.bandCount;
  const lx = Math.cos(SATURN.lightAngle);
  const ly = Math.sin(SATURN.lightAngle);

  for (let i = 0; i < bandCount; i++) {
    const lat = i / bandCount;
    const bandY = sy - radius + radius * lat;

    if (bandY > sy + 10) continue;

    const dy = sy - bandY;
    if (dy < 0 || dy > radius) continue;
    const halfWidth = Math.sqrt(radius * radius - dy * dy);
    if (halfWidth < 2) continue;

    const bandH = radius / bandCount;
    const drift = reduced ? 0 : t * SATURN.rotSpeed * (0.7 + 0.6 * lat) * radius;
    const evolve = reduced ? 0 : Math.sin(t * 0.02 + i * 1.7) * radius * 0.015;

    const puffCount = 2 + Math.floor(rng() * 2);
    for (let j = 0; j < puffCount; j++) {
      const sinVal = Math.sin(i * 2.7 + j * 1.3 + 42);
      const isLight = sinVal > 0;
      const color = isLight ? SATURN.light : SATURN.dark;
      const alpha = 0.025 + 0.04 * Math.abs(sinVal);

      const pxBase = (rng() - 0.5) * halfWidth * 1.8;
      const px = sx + pxBase + drift + evolve;
      const py = bandY + rng() * bandH;
      const pw = halfWidth * (0.15 + rng() * 0.3);
      const ph = bandH * (0.5 + rng() * 0.8);

      const edgeDist = Math.min(1, Math.abs(pxBase) / halfWidth);
      const foreshorten = Math.sqrt(Math.max(0.1, 1 - edgeDist * edgeDist));
      const actualPw = pw * foreshorten;

      const grad = ctx.createRadialGradient(px, py, 0, px, py, Math.max(actualPw, ph));
      grad.addColorStop(0, `rgba(${rgbStr(color)},${alpha})`);
      grad.addColorStop(0.55, `rgba(${rgbStr(color)},${alpha * 0.35})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(px, py, actualPw, ph, 0, 0, Math.PI * 2);
      ctx.fill();

      /* cloud shadow */
      const shadowGrad = ctx.createRadialGradient(
        px - lx * 3, py - ly * 3, 0,
        px - lx * 3, py - ly * 3, Math.max(actualPw, ph),
      );
      shadowGrad.addColorStop(0, `rgba(0,0,0,${alpha * 0.4})`);
      shadowGrad.addColorStop(0.5, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(px - lx * 3, py - ly * 3, actualPw * 0.9, ph * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/* ================================================================== */
/*  Drawing: Saturn — sphere shading                                   */
/* ================================================================== */

function drawSaturnShading(
  ctx: CanvasRenderingContext2D, sx: number, sy: number, radius: number,
) {
  const lx = Math.cos(SATURN.lightAngle);
  const ly = Math.sin(SATURN.lightAngle);

  /* limb darkening */
  const limbGrad = ctx.createRadialGradient(sx, sy, radius * 0.25, sx, sy, radius);
  limbGrad.addColorStop(0, "rgba(0,0,0,0)");
  limbGrad.addColorStop(0.6, "rgba(0,0,0,0.06)");
  limbGrad.addColorStop(0.82, "rgba(0,0,0,0.22)");
  limbGrad.addColorStop(1, "rgba(0,0,0,0.60)");
  ctx.fillStyle = limbGrad;
  ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2);

  /* terminator */
  const termGrad = ctx.createLinearGradient(
    sx + lx * radius, sy + ly * radius,
    sx - lx * radius * 1.3, sy - ly * radius * 1.3,
  );
  termGrad.addColorStop(0, "rgba(0,0,0,0)");
  termGrad.addColorStop(0.45, "rgba(0,0,0,0)");
  termGrad.addColorStop(0.72, "rgba(0,0,0,0.28)");
  termGrad.addColorStop(0.9, "rgba(0,0,0,0.55)");
  termGrad.addColorStop(1, "rgba(0,0,0,0.78)");
  ctx.fillStyle = termGrad;
  ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2);

  /* specular highlight */
  const specGrad = ctx.createRadialGradient(
    sx + lx * radius * 0.38, sy + ly * radius * 0.38, radius * 0.02,
    sx + lx * radius * 0.28, sy + ly * radius * 0.28, radius * 0.45,
  );
  specGrad.addColorStop(0, "rgba(255,235,200,0.07)");
  specGrad.addColorStop(0.5, "rgba(255,220,170,0.02)");
  specGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = specGrad;
  ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2);

  /* ring shadow band across the planet face */
  const shadowY = sy - radius * 0.52;
  const shadowDy = sy - shadowY;
  if (shadowDy > 0 && shadowDy < radius) {
    const shadowHW = Math.sqrt(radius * radius - shadowDy * shadowDy);
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.beginPath();
    ctx.ellipse(sx, shadowY, shadowHW * 0.96, radius * 0.012, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.beginPath();
    ctx.ellipse(sx, shadowY + radius * 0.018, shadowHW * 0.92, radius * 0.008, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ================================================================== */
/*  Drawing: Saturn — body (combines gradient + clouds + shading)      */
/* ================================================================== */

function drawSaturnBody(
  ctx: CanvasRenderingContext2D, sx: number, sy: number,
  radius: number, t: number, reduced: boolean,
) {
  const lx = Math.cos(SATURN.lightAngle);
  const ly = Math.sin(SATURN.lightAngle);

  const bodyGrad = ctx.createRadialGradient(
    sx + lx * radius * 0.3, sy + ly * radius * 0.3, radius * 0.05,
    sx - lx * radius * 0.08, sy - ly * radius * 0.08, radius,
  );
  bodyGrad.addColorStop(0, `rgba(${rgbStr(SATURN.light)},1)`);
  bodyGrad.addColorStop(0.3, `rgba(${rgbStr(SATURN.base)},1)`);
  bodyGrad.addColorStop(0.7, `rgba(${rgbStr(SATURN.dark, 8)},1)`);
  bodyGrad.addColorStop(1, `rgba(${rgbStr(SATURN.dark)},1)`);
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.arc(sx, sy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(sx, sy, radius, 0, Math.PI * 2);
  ctx.clip();

  drawSaturnClouds(ctx, sx, sy, radius, t, reduced);
  drawSaturnShading(ctx, sx, sy, radius);

  ctx.restore();
}

/* ================================================================== */
/*  Drawing: Saturn — atmosphere                                       */
/* ================================================================== */

function drawSaturnAtmosphere(
  ctx: CanvasRenderingContext2D, sx: number, sy: number,
  radius: number, viewH: number, t: number, reduced: boolean,
) {
  const d = (sy - viewH) / radius;
  if (d >= 1) return;
  const halfAngle = Math.acos(Math.max(-1, Math.min(1, d)));
  const arcStart = -Math.PI / 2 - halfAngle;
  const arcEnd = -Math.PI / 2 + halfAngle;

  const shimmer = reduced ? 1 : 0.9 + 0.1 * Math.sin(t * 0.4);

  const layers: { w: number; a: number; c: readonly [number, number, number] }[] = [
    { w: 3, a: 0.40 * shimmer, c: [255, 220, 160] },
    { w: 9, a: 0.16 * shimmer, c: [255, 170, 60] },
    { w: 22, a: 0.055 * shimmer, c: [200, 100, 30] },
  ];

  for (const layer of layers) {
    ctx.strokeStyle = `rgba(${rgbStr(layer.c)},${layer.a})`;
    ctx.lineWidth = layer.w;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(sx, sy, radius + layer.w * 0.5, arcStart, arcEnd);
    ctx.stroke();
  }

  /* brighter lit-side highlight */
  const litCenter = SATURN.lightAngle;
  const litHalfSpan = 0.9;
  const litStart = Math.max(arcStart, litCenter - litHalfSpan);
  const litEnd = Math.min(arcEnd, litCenter + litHalfSpan);
  if (litEnd > litStart) {
    ctx.strokeStyle = `rgba(255,215,150,${0.22 * shimmer})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(sx, sy, radius + 2, litStart, litEnd);
    ctx.stroke();
  }
}

/* ================================================================== */
/*  Drawing: Saturn — rim light                                        */
/* ================================================================== */

function drawSaturnRim(
  ctx: CanvasRenderingContext2D, sx: number, sy: number,
  radius: number, viewH: number, t: number, reduced: boolean,
) {
  const d = (sy - viewH) / radius;
  if (d >= 1) return;
  const halfAngle = Math.acos(Math.max(-1, Math.min(1, d)));
  const arcStart = -Math.PI / 2 - halfAngle;
  const arcEnd = -Math.PI / 2 + halfAngle;

  const breathe = reduced ? 1 : 0.85 + 0.15 * Math.sin(t * 0.25);
  const rimCenter = SATURN.lightAngle;

  /* wide haze */
  const hazeStart = Math.max(arcStart, rimCenter - 1.0);
  const hazeEnd = Math.min(arcEnd, rimCenter + 1.0);
  if (hazeEnd > hazeStart) {
    ctx.strokeStyle = `rgba(255,200,120,${0.10 * breathe})`;
    ctx.lineWidth = radius * 0.10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(sx, sy, radius + radius * 0.03, hazeStart, hazeEnd);
    ctx.stroke();
  }

  /* bright inner rim */
  const rimStart = Math.max(arcStart, rimCenter - 0.75);
  const rimEnd = Math.min(arcEnd, rimCenter + 0.75);
  if (rimEnd > rimStart) {
    ctx.strokeStyle = `rgba(255,215,160,${0.32 * breathe})`;
    ctx.lineWidth = radius * 0.045;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(sx, sy, radius + radius * 0.01, rimStart, rimEnd);
    ctx.stroke();
  }

  /* hot core edge */
  const coreStart = Math.max(arcStart, rimCenter - 0.4);
  const coreEnd = Math.min(arcEnd, rimCenter + 0.4);
  if (coreEnd > coreStart) {
    ctx.strokeStyle = `rgba(255,240,210,${0.18 * breathe})`;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(sx, sy, radius + 0.5, coreStart, coreEnd);
    ctx.stroke();
  }
}

/* ================================================================== */
/*  Drawing: asteroids                                                 */
/* ================================================================== */

function updateAsteroids(asteroids: Asteroid[], w: number, h: number, dt: number) {
  for (const a of asteroids) {
    a.rotation += a.rotSpeed * dt;
    a.x += a.driftX * dt;
    a.y += a.driftY * dt;
    const m = a.size * 3;
    if (a.x < -m) a.x = w + m;
    else if (a.x > w + m) a.x = -m;
    if (a.y < -m) a.y = h + m;
    else if (a.y > h + m) a.y = -m;
  }
}

function drawAsteroids(
  ctx: CanvasRenderingContext2D, asteroids: Asteroid[], h: number,
  scrollY: number, reduced: boolean,
) {
  const la = SATURN.lightAngle;

  for (const a of asteroids) {
    const py = reduced ? 0 : scrollY * LAYER_PARALLAX[a.layer];
    const ay = ((a.y - py) % h + h) % h;

    ctx.save();
    ctx.translate(a.x, ay);
    ctx.rotate(a.rotation);

    /* build polygon path */
    ctx.beginPath();
    for (let v = 0; v < a.vertexCount; v++) {
      const angle = (v / a.vertexCount) * Math.PI * 2;
      const r = a.size * a.vertices[v];
      const vx = Math.cos(angle) * r;
      const vy = Math.sin(angle) * r;
      if (v === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();

    /* directional lighting gradient fill */
    const litGrad = ctx.createLinearGradient(
      Math.cos(la) * a.size * 1.4, Math.sin(la) * a.size * 1.4,
      -Math.cos(la) * a.size * 1.4, -Math.sin(la) * a.size * 1.4,
    );
    litGrad.addColorStop(0, `rgba(105,82,52,${a.alpha})`);
    litGrad.addColorStop(0.4, `rgba(40,28,15,${a.alpha})`);
    litGrad.addColorStop(1, `rgba(10,7,3,${a.alpha})`);
    ctx.fillStyle = litGrad;
    ctx.fill();

    /* faint edge */
    ctx.strokeStyle = `rgba(80,62,38,${a.alpha * 0.25})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  }
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let bright: BrightStar[] = [];
    let asteroids: Asteroid[] = [];
    const meteors: Meteor[] = [];
    let saturnX = 0;
    let saturnY = 0;
    let saturnR = 0;
    const ringTilt = 0.22;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(w, h);
      bright = createBrightStars(w, h);
      asteroids = createAsteroids(w, h);
      saturnX = w * SATURN.cx;
      saturnY = h * SATURN.cy;
      saturnR = Math.max(240, Math.min(520, h * 0.48));
    }

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };

    let rafId = 0;
    let lastMeteor = 0;
    let prevT = 0;

    function render(timestamp: number) {
      const t = timestamp * 0.001;
      const dt = prevT > 0 ? Math.min(t - prevT, 0.1) : 1 / 60;
      prevT = t;

      /* 1. ultra-dark background */
      const bg = ctx!.createRadialGradient(
        w * 0.5, h * 0.35, 0,
        w * 0.5, h * 0.5, Math.max(w, h) * 0.85,
      );
      bg.addColorStop(0, "#060300");
      bg.addColorStop(0.4, "#030100");
      bg.addColorStop(1, "#000000");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      /* 2. nebulas (dimmed) */
      drawNebulas(ctx!, w, h, t, reduced);

      /* 3. stars */
      drawStars(ctx!, stars, h, t, scrollY, reduced);
      drawBrightStars(ctx!, bright, h, t, scrollY, reduced);

      /* 4. Saturn glow */
      drawSaturnGlow(ctx!, saturnX, saturnY, saturnR, t, reduced);

      /* 5. rings (drawn before body — planet occludes behind-portions) */
      drawSaturnRings(ctx!, saturnX, saturnY, saturnR, ringTilt, t, reduced);

      /* 6. planet body */
      drawSaturnBody(ctx!, saturnX, saturnY, saturnR, t, reduced);

      /* 7. atmosphere + rim */
      drawSaturnAtmosphere(ctx!, saturnX, saturnY, saturnR, h, t, reduced);
      drawSaturnRim(ctx!, saturnX, saturnY, saturnR, h, t, reduced);

      /* 8. asteroids */
      if (!reduced) updateAsteroids(asteroids, w, h, dt);
      drawAsteroids(ctx!, asteroids, h, scrollY, reduced);

      /* 9. meteors */
      if (!reduced && t - lastMeteor > 4 + Math.random() * 6) {
        lastMeteor = t;
        const angle = 0.4 + Math.random() * 0.7;
        const spd = 350 + Math.random() * 400;
        meteors.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.5,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          len: 70 + Math.random() * 90,
          born: t,
          life: 0.5 + Math.random() * 0.6,
          alpha: 0.35 + Math.random() * 0.4,
        });
      }
      drawMeteors(ctx!, meteors, t);

      /* 10. vignette */
      const vGrad = ctx!.createRadialGradient(
        w * 0.5, h * 0.45, Math.min(w, h) * 0.35,
        w * 0.5, h * 0.5, Math.max(w, h) * 0.78,
      );
      vGrad.addColorStop(0, "rgba(0,0,0,0)");
      vGrad.addColorStop(1, "rgba(0,0,0,0.40)");
      ctx!.fillStyle = vGrad;
      ctx!.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
