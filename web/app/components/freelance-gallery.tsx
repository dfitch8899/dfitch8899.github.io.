"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { freelanceSites, BATCH_LABELS } from "../data/freelance-sites";
import type { FreelanceSite } from "../data/freelance-sites";

/* ── helpers ───────────────────────────────────────────────────────── */

function toGradient(palette: string[]) {
  if (palette.length === 1) return palette[0];
  if (palette.length === 2)
    return `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`;
  return `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 55%, ${palette[2]} 100%)`;
}

function contrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.45 ? "#111111" : "#ffffff";
}

/* ── Browser-mockup card ────────────────────────────────────────────── */

function SiteCard({ site, index }: { site: FreelanceSite; index: number }) {
  const bg = toGradient(site.palette);
  const accent = site.palette[1] ?? site.palette[0];
  const textColor = contrastColor(site.palette[0]);
  const isLight = textColor === "#111111";

  const card = (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800/70 bg-[#0c0a08] transition-all duration-300 hover:border-slate-600/60"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        boxShadow: `0 24px 60px rgba(0,0,0,0.85), 0 0 24px ${accent}22`,
      }}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-slate-800/80 bg-[#0f0d0b] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-600/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-green-600/70" />
        <div className="ml-2 flex-1 rounded bg-slate-800/60 px-2 py-0.5 text-[0.58rem] text-slate-500 font-mono truncate">
          {site.url ? site.url.replace(/^https?:\/\//, "") : `${site.name.toLowerCase().replace(/\s+/g, "")}.demo`}
        </div>
        {site.url && (
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-[0.6rem] text-slate-500 hover:text-yellow-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${site.name}`}
          >
            ↗
          </a>
        )}
      </div>

      {/* Hero preview — color gradient representing the site palette */}
      <div
        className="relative flex-1"
        style={{ background: bg, minHeight: "100px" }}
      >
        {/* Simulated hero content overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3 text-center ${
            isLight ? "text-black/80" : "text-white/90"
          }`}
        >
          {/* Fake logo dot */}
          <div
            className="mb-0.5 h-6 w-6 rounded-full opacity-80"
            style={{
              background: isLight
                ? "rgba(0,0,0,0.25)"
                : "rgba(255,255,255,0.25)",
              boxShadow: `0 0 12px ${accent}66`,
            }}
          />
          <p
            className="font-display text-[0.72rem] font-bold leading-tight tracking-tight"
            style={{
              textShadow: isLight
                ? "0 1px 4px rgba(255,255,255,0.4)"
                : "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            {site.name}
          </p>
          <p
            className="text-[0.55rem] font-medium uppercase tracking-widest opacity-70"
          >
            {site.category}
          </p>
        </div>

        {/* Palette swatches strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex h-1">
          {site.palette.map((color, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div className="border-t border-slate-800/60 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[0.7rem] font-semibold text-[color:var(--color-foreground)]">
              {site.name}
            </p>
            <p className="text-[0.6rem] text-[color:var(--color-subtle)]">
              {site.location} · {site.category}
            </p>
          </div>
          {site.url ? (
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-[0.6rem] font-medium text-[color:var(--color-accent)] transition-colors hover:bg-slate-700/60"
              onClick={(e) => e.stopPropagation()}
            >
              View →
            </a>
          ) : (
            <span className="shrink-0 rounded border border-slate-800/40 bg-slate-900/40 px-2 py-0.5 text-[0.6rem] text-[color:var(--color-subtle)]">
              Demo
            </span>
          )}
        </div>
        <p className="mt-1 text-[0.58rem] text-[color:var(--color-subtle)] opacity-70">
          {site.accentLabel}
        </p>
      </div>
    </motion.div>
  );

  return card;
}

/* ── Filter tabs ────────────────────────────────────────────────────── */

type BatchFilter = "all" | "athens" | "belpre" | "bonus";

const FILTERS: { key: BatchFilter; label: string }[] = [
  { key: "all", label: "All 19" },
  { key: "athens", label: "Athens" },
  { key: "belpre", label: "Belpre / Washington County" },
  { key: "bonus", label: "Bonus" },
];

/* ── Main gallery component ─────────────────────────────────────────── */

export function FreelanceGallery() {
  const [active, setActive] = useState<BatchFilter>("all");

  const filtered =
    active === "all"
      ? freelanceSites
      : freelanceSites.filter((s) => s.batch === active);

  return (
    <div className="mt-2">
      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter sites by location">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all ${
              active === f.key
                ? "bg-[color:var(--color-accent)] text-black shadow-[0_0_14px_rgba(251,191,36,0.3)]"
                : "border border-slate-700/50 bg-black/30 text-[color:var(--color-muted)] hover:border-slate-600 hover:text-[color:var(--color-foreground)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((site, i) => (
            <SiteCard key={site.name} site={site} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-[0.65rem] text-[color:var(--color-subtle)]">
        {filtered.length} site{filtered.length !== 1 ? "s" : ""} shown
        {active !== "all" ? ` · ${BATCH_LABELS[active as keyof typeof BATCH_LABELS]}` : ""}.
        Live demo links will be added once sites are deployed.
      </p>
    </div>
  );
}
