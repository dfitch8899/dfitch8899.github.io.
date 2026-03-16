"use client";

import Link from "next/link";
import {
  aboutCopy,
  contactCopy,
  heroCopy,
  skillsCopy,
  timelineCopy,
} from "./copy";
import { motion, useReducedMotion } from "framer-motion";
import { getFeaturedProjects } from "../data/projects";
import { ProjectCard } from "./project-card";
import {
  staggerContainer,
  staggerContainerSlow,
  staggerContainerFast,
  fadeInUp,
  fadeInUpSubtle,
  fadeInLeft,
  scaleIn,
  viewportOnce,
  viewportMore,
  EASE_OUT_EXPO,
} from "./motion";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.2 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section hero-shell" aria-label="Introduction">
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-horizon" aria-hidden="true" />
      <div className="hero-accent-orb" aria-hidden="true" />

      <div className="container-max">
        <motion.div
          className="hero-inner space-y-7"
          variants={heroContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
        >
          <motion.p
            className="badge-pill inline-flex items-center gap-2.5 bg-black/30"
            variants={heroItem}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-soft)] shadow-[0_0_14px_rgba(249,115,22,0.9)]" />
            <span className="font-medium">{heroCopy.eyebrow}</span>
          </motion.p>

          <motion.h1
            className="max-w-2xl text-balance font-display text-4xl font-bold tracking-tight text-[color:var(--color-foreground)] md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
            variants={heroItem}
          >
            {heroCopy.title}
          </motion.h1>

          <motion.p
            className="max-w-xl text-balance text-sm leading-relaxed text-[color:var(--color-muted)] md:text-base md:leading-relaxed"
            variants={heroItem}
          >
            {heroCopy.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3.5 pt-1"
            variants={heroItem}
          >
            <Link href="/projects" className="btn-primary cursor-pointer text-sm">
              {heroCopy.primaryCta}
            </Link>
            <Link href="/about" className="btn-secondary cursor-pointer text-sm">
              {heroCopy.secondaryCta}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-line" aria-hidden="true" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Projects                                                  */
/* ------------------------------------------------------------------ */

export function FeaturedProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const featured = getFeaturedProjects();

  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="container-max">
        <motion.div
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <motion.div className="mb-10 max-w-lg space-y-3" variants={fadeInUp}>
            <p className="section-heading-eyebrow">Featured Projects</p>
            <h2
              id="featured-heading"
              className="section-heading-title text-[color:var(--color-foreground)]"
            >
              Things I&apos;ve built recently.
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
              A selection of projects that showcase how I think about problems
              and write code. Each one taught me something new.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={scaleIn}
                custom={i}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-10 text-center" variants={fadeInUpSubtle}>
            <Link
              href="/projects"
              className="btn-secondary inline-flex cursor-pointer text-sm"
            >
              View all projects &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills (compact version for home page)                             */
/* ------------------------------------------------------------------ */

export function SkillsPreviewSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section" aria-labelledby="skills-preview-heading">
      <div className="container-max">
        <motion.div
          className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportMore}
        >
          <motion.div className="max-w-sm space-y-3" variants={fadeInUp}>
            <p className="section-heading-eyebrow">{skillsCopy.title}</p>
            <h2
              id="skills-preview-heading"
              className="section-heading-title text-[color:var(--color-foreground)]"
            >
              Broad skills, sharp focus.
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
              I work across the stack — from polished React interfaces to
              Node.js APIs to systems-level C++. Here&apos;s what I reach for most.
            </p>
          </motion.div>

          <div className="grid flex-1 gap-4 md:grid-cols-3">
            {skillsCopy.columns.map((column) => (
              <motion.div
                key={column.label}
                className="card-soft group border border-slate-800/60 p-4 text-xs text-[color:var(--color-muted)]"
                variants={scaleIn}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        borderColor: "rgba(249,115,22,0.6)",
                        translateY: -5,
                        boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 25px rgba(251,191,36,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-soft)]">
                  {column.label}
                </p>
                <ul className="space-y-1.5">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[color:var(--color-accent-soft)] opacity-60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Full Skills (for About page)                                       */
/* ------------------------------------------------------------------ */

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section" aria-labelledby="skills-heading">
      <div className="container-max">
        <motion.div
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportMore}
        >
          <motion.div className="mb-6 space-y-2" variants={fadeInUp}>
            <p className="section-heading-eyebrow">{skillsCopy.title}</p>
            <h2
              id="skills-heading"
              className="section-heading-title text-[color:var(--color-foreground)]"
            >
              What I work with.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {skillsCopy.columns.map((column) => (
              <motion.div
                key={column.label}
                className="card-soft group border border-slate-800/60 p-5 text-sm text-[color:var(--color-muted)]"
                variants={scaleIn}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        borderColor: "rgba(249,115,22,0.6)",
                        translateY: -5,
                        boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 25px rgba(251,191,36,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                  {column.label}
                </p>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[color:var(--color-accent-soft)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section" aria-labelledby="about-heading">
      <div className="container-max">
        <motion.div
          className="max-w-2xl space-y-4"
          variants={staggerContainerSlow}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportMore}
        >
          <motion.p className="section-heading-eyebrow" variants={fadeInUpSubtle}>
            {aboutCopy.title}
          </motion.p>
          <motion.h2
            id="about-heading"
            className="section-heading-title text-[color:var(--color-foreground)]"
            variants={fadeInUp}
          >
            {aboutCopy.subtitle}
          </motion.h2>
          {aboutCopy.body.map((paragraph) => (
            <motion.p
              key={paragraph}
              className="text-sm leading-relaxed text-[color:var(--color-muted)]"
              variants={fadeInUpSubtle}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline                                                           */
/* ------------------------------------------------------------------ */

export function TimelineSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section" aria-labelledby="timeline-heading">
      <div className="container-max">
        <motion.div
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <motion.div className="mb-8 space-y-2" variants={fadeInUp}>
            <p className="section-heading-eyebrow">{timelineCopy.title}</p>
            <h2
              id="timeline-heading"
              className="section-heading-title text-[color:var(--color-foreground)]"
            >
              My journey so far.
            </h2>
          </motion.div>

          <div className="relative ml-4 border-l border-slate-700/40 pl-6">
            {timelineCopy.events.map((event, i) => (
              <motion.div
                key={event.year}
                className="relative mb-10 last:mb-0"
                variants={fadeInLeft}
                custom={i}
              >
                <span className="timeline-dot absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[color:var(--color-accent-soft)] bg-[color:var(--color-background)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent)]">
                  {event.year}
                </p>
                <h3 className="mt-1.5 font-display text-sm font-semibold text-[color:var(--color-foreground)]">
                  {event.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {event.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section pb-20" aria-labelledby="contact-heading">
      <div className="container-max">
        <motion.div
          className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start"
          variants={staggerContainerFast}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <motion.div className="space-y-4" variants={fadeInUp}>
            <p className="section-heading-eyebrow">{contactCopy.title}</p>
            <h2
              id="contact-heading"
              className="section-heading-title text-[color:var(--color-foreground)]"
            >
              Let&apos;s connect.
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
              {contactCopy.subtitle}
            </p>
            <p className="text-xs text-[color:var(--color-subtle)]">
              {contactCopy.availability}
            </p>
            <div className="flex gap-4 pt-2 text-xs text-[color:var(--color-muted)]">
              <a
                href="mailto:d.fitch8899@gmail.com"
                className="underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
              >
                d.fitch8899@gmail.com
              </a>
              <span aria-hidden="true" className="text-[color:var(--color-subtle)]">·</span>
              <a
                href="https://github.com/dfitch8899"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
              >
                GitHub
              </a>
              <span aria-hidden="true" className="text-[color:var(--color-subtle)]">·</span>
              <a
                href="https://www.linkedin.com/in/devin-fitch-b17700352/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form
            className="card-soft border border-slate-800/60 p-6 text-sm"
            action="mailto:d.fitch8899@gmail.com"
            method="post"
            variants={scaleIn}
          >
            <div className="grid gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-[color:var(--color-muted)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="input-glass"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-[color:var(--color-muted)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-glass"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-medium text-[color:var(--color-muted)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="input-glass resize-none"
                  placeholder="What would you like to talk about?"
                  required
                />
              </div>
              <button type="submit" className="btn-primary mt-2 cursor-pointer">
                {contactCopy.ctaLabel}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
