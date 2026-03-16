"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { SpaceBackground } from "./space-background";
import { EASE_OUT_EXPO } from "./motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="page-shell relative min-h-screen text-sm text-[color:var(--foreground)]">
      <SpaceBackground />
      <div className="noise-overlay" aria-hidden="true" />

      <motion.header
        className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_EXPO }}
      >
        <nav
          className="card-surface pointer-events-auto flex w-full max-w-4xl items-center justify-between px-4 py-2.5"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-foreground)]"
          >
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent-soft)] shadow-[0_0_18px_rgba(249,115,22,0.9)]" />
            <span>Devin Fitch</span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link cursor-pointer ${
                    isActive
                      ? "nav-link--active text-[color:var(--color-foreground)]"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-primary cursor-pointer text-xs">
              Get in touch
            </Link>
          </div>
        </nav>
      </motion.header>

      <main id="main-content" className="relative pt-20">
        {children}
      </main>

      <footer className="relative border-t border-slate-800/30 py-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(251,191,36,0.08) 30%, rgba(249,115,22,0.12) 50%, rgba(251,191,36,0.08) 70%, transparent)",
          }}
          aria-hidden="true"
        />
        <div className="container-max flex flex-col items-center gap-4 text-center text-xs text-[color:var(--color-muted)] md:flex-row md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} Devin Fitch. Built with Next.js &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:d.fitch8899@gmail.com"
              className="underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
            >
              Email
            </a>
            <a
              href="https://github.com/dfitch8899"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/devin-fitch-b17700352/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
