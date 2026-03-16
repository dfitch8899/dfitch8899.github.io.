"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects, TAG_LABELS, getAllTags } from "../data/projects";
import type { Tag } from "../data/projects";
import { ProjectCard } from "./project-card";
import {
  staggerContainerFast,
  fadeInUpSubtle,
  EASE_OUT_EXPO,
} from "./motion";

export function ProjectsList() {
  const [activeTag, setActiveTag] = useState<Tag | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const allTags = getAllTags();

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <motion.div
      variants={staggerContainerFast}
      initial={prefersReducedMotion ? false : "hidden"}
      animate={prefersReducedMotion ? undefined : "visible"}
    >
      <motion.div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by tag"
        variants={fadeInUpSubtle}
      >
        <button
          onClick={() => setActiveTag(null)}
          className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
            activeTag === null
              ? "bg-[color:var(--color-accent)] text-[color:var(--color-background)] shadow-[0_0_16px_rgba(251,191,36,0.3)]"
              : "border border-slate-700/50 bg-black/30 text-[color:var(--color-muted)] backdrop-blur-sm hover:border-slate-600 hover:text-[color:var(--color-foreground)]"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTag === tag
                ? "bg-[color:var(--color-accent)] text-[color:var(--color-background)] shadow-[0_0_16px_rgba(251,191,36,0.3)]"
                : "border border-slate-700/50 bg-black/30 text-[color:var(--color-muted)] backdrop-blur-sm hover:border-slate-600 hover:text-[color:var(--color-foreground)]"
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? "all"}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: EASE_OUT_EXPO,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.p
          className="mt-10 text-center text-sm text-[color:var(--color-muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No projects match that filter. Try another tag or view all.
        </motion.p>
      )}
    </motion.div>
  );
}
