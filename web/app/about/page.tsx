import type { Metadata } from "next";
import {
  AboutSection,
  SkillsSection,
  TimelineSection,
} from "../components/sections";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Devin Fitch — a full-stack developer building web apps, APIs, and developer tools with React, Next.js, Python, Node.js, and C++.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutSection />
      <div className="section-divider" />
      <TimelineSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />

      <section className="section page-enter page-enter-delay-2" aria-label="Call to action">
        <div className="container-max text-center">
          <h2 className="mb-3 font-display text-xl font-bold text-[color:var(--color-foreground)]">
            Want to see what I&apos;ve built?
          </h2>
          <p className="mb-6 text-sm text-[color:var(--color-muted)]">
            Check out my projects or get in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="btn-primary text-sm">
              View projects
            </Link>
            <Link href="/contact" className="btn-secondary text-sm">
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
