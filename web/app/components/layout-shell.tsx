"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <Link href="/contact" className="btn-primary hidden cursor-pointer text-xs md:inline-flex">
              Get in touch
            </Link>
            {/* Mobile hamburger */}
            <button
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-md md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className="block h-0.5 w-5 rounded-full bg-[color:var(--color-muted)] transition-all duration-200"
                style={mobileOpen ? { transform: "translateY(4px) rotate(45deg)" } : {}}
              />
              <span
                className="block h-0.5 w-5 rounded-full bg-[color:var(--color-muted)] transition-all duration-200"
                style={mobileOpen ? { opacity: 0 } : {}}
              />
              <span
                className="block h-0.5 w-5 rounded-full bg-[color:var(--color-muted)] transition-all duration-200"
                style={mobileOpen ? { transform: "translateY(-4px) rotate(-45deg)" } : {}}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            className="pointer-events-auto fixed inset-x-0 top-[72px] z-30 mx-4 overflow-hidden rounded-xl border border-[color:var(--glass-border)] md:hidden"
            style={{ background: "rgba(8,5,2,0.92)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            <nav className="flex flex-col px-2 py-3" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[color:var(--color-foreground)]"
                        : "text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-[color:var(--glass-border)] pt-3 pb-1 px-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block w-full text-center text-xs"
                >
                  Get in touch
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
