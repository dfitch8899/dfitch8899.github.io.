"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { freelanceSites, BATCH_LABELS } from "../data/freelance-sites";
import type { FreelanceSite } from "../data/freelance-sites";

/* ── Browser-mockup card with live iframe ───────────────────────────── */

function SiteCard({ site, index }: { site: FreelanceSite; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = site.palette[1] ?? site.palette[0];

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800/70 bg-[#0c0a08]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        borderColor: "rgba(100,100,100,0.5)",
        boxShadow: `0 24px 60px rgba(0,0,0,0.85), 0 0 24px ${accent}22`,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Browser chrome */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-slate-800/80 bg-[#0f0d0b] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-600/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-green-600/70" />
        <div className="ml-2 flex-1 truncate rounded bg-slate-800/60 px-2 py-0.5 font-mono text-[0.58rem] text-slate-500">
          {site.name.toLowerCase().replace(/[\s']+/g, "")}
          .demo
        </div>
        {site.url && (
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-1 shrink-0 text-[0.6rem] text-slate-500 transition-colors hover:text-yellow-400"
            aria-label={`Open ${site.name} in new tab`}
          >
            ↗
          </a>
        )}
      </div>

      {/* Iframe preview */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "62%" }}>
        {site.url ? (
          <>
            <iframe
              src={site.url}
              title={site.name}
              className="absolute inset-0 h-full w-full border-0"
              style={{
                transform: "scale(0.45)",
                transformOrigin: "top left",
                width: "222%",
                height: "222%",
                pointerEvents: hovered ? "auto" : "none",
              }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
            {/* Click-through overlay — removed on hover so iframe becomes interactive */}
            {!hovered && (
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`View ${site.name}`}
              />
            )}
          </>
        ) : (
          /* Fallback gradient for any site without URL */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${site.palette[0]} 0%, ${site.palette[1] ?? site.palette[0]} 100%)`,
            }}
          >
            <span className="text-xs text-white/50">Preview unavailable</span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="shrink-0 border-t border-slate-800/60 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[0.7rem] font-semibold text-[color:var(--color-foreground)]">
              {site.name}
            </p>
            <p className="text-[0.6rem] text-[color:var(--color-subtle)]">
              {site.location} · {site.category}
            </p>
          </div>
          {site.url && (
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-[0.6rem] font-medium text-[color:var(--color-accent)] transition-colors hover:bg-slate-700/60"
              onClick={(e) => e.stopPropagation()}
            >
              View →
            </a>
          )}
        </div>
        <p className="mt-0.5 text-[0.58rem] text-[color:var(--color-subtle)] opacity-70">
          {site.accentLabel}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Filter tabs ────────────────────────────────────────────────────── */

type BatchFilter = "all" | "athens" | "belpre" | "bonus";

const FILTERS: { key: BatchFilter; label: string }[] = [
  { key: "all", label: "All 19" },
  { key: "athens", label: "Athens" },
  { key: "belpre", label: "Belpre / Washington County" },
  { key: "bonus", label: "Bonus" },
];

/* ── Main gallery ───────────────────────────────────────────────────── */

export function FreelanceGallery() {
  const [active, setActive] = useState<BatchFilter>("all");

  const filtered =
    active === "all"
      ? freelanceSites
      : freelanceSites.filter((s) => s.batch === active);

  return (
    <div className="mt-2">
      {/* Filter tabs */}
      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter sites by location"
      >
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
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
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
        {filtered.length} site{filtered.length !== 1 ? "s" : ""}
        {active !== "all"
          ? ` · ${BATCH_LABELS[active as keyof typeof BATCH_LABELS]}`
          : ""}.
        {" "}These are unsolicited concept redesigns built for experience — not affiliated with, commissioned by, or sold to any of the businesses shown.
        {" "}Hover a card to interact, or click View to open full screen.
      </p>
    </div>
  );
}
