import type { Metadata } from "next";
import { ProjectsList } from "../components/projects-list";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse Devin Fitch's personal projects — full-stack web apps, backend APIs, developer tools, and more built with React, Next.js, Python, Node.js, and C++.",
};

export default function ProjectsPage() {
  return (
    <div className="section">
      <div className="container-max">
        <div className="page-enter mb-10 max-w-xl space-y-3">
          <p className="section-heading-eyebrow">Projects</p>
          <h1 className="section-heading-title text-3xl text-[color:var(--color-foreground)] md:text-4xl">
            Everything I&apos;ve built.
          </h1>
          <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
            Personal projects that showcase different parts of my skill set.
            Each one started with a problem I wanted to solve or a concept I
            wanted to understand deeper.
          </p>
        </div>

        <ProjectsList />
      </div>
    </div>
  );
}
