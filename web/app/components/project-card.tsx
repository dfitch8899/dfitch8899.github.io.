"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "../data/projects";
import { TAG_LABELS } from "../data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({ rotateX: (y - 0.5) * -8, rotateY: (x - 0.5) * 8 });
      setGlowPos({ x: x * 100, y: y * 100 });
    },
    [prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.article
      className="card-soft card-tilt group relative flex flex-col border border-slate-800/60 p-5 transition-colors"
      style={{ perspective: 800 }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              boxShadow:
                "0 24px 70px rgba(0,0,0,0.9), 0 0 30px rgba(251,191,36,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }
      }
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-glow-overlay"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(251,191,36,0.10), transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold text-[color:var(--color-foreground)]">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700/50 bg-black/30 px-2 py-0.5 text-[0.63rem] font-medium text-[color:var(--color-muted)] backdrop-blur-sm"
            >
              {TAG_LABELS[tag]}
            </span>
          ))}
        </div>
      </div>

      <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
        {project.summary}
      </p>

      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded bg-slate-800/40 px-2 py-0.5 text-[0.66rem] text-[color:var(--color-subtle)] backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="rounded bg-slate-800/40 px-2 py-0.5 text-[0.66rem] text-[color:var(--color-subtle)]">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-4 flex items-center gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-semibold text-[color:var(--color-accent)] underline-offset-4 transition-colors hover:underline"
        >
          Read case study &rarr;
        </Link>
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[color:var(--color-subtle)] underline-offset-4 transition-colors hover:text-[color:var(--color-muted)] hover:underline"
          >
            GitHub
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[color:var(--color-subtle)] underline-offset-4 transition-colors hover:text-[color:var(--color-muted)] hover:underline"
          >
            Live demo
          </a>
        )}
      </div>
    </motion.article>
  );
}
