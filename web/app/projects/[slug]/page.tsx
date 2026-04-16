import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug, TAG_LABELS } from "../../data/projects";
import { FreelanceGallery } from "../../components/freelance-gallery";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Devin Fitch`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="section page-enter">
      <div className="container-max max-w-3xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-muted)] underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
        >
          &larr; All projects
        </Link>

        <header className="mb-12 space-y-5 page-enter page-enter-delay-1">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700/50 bg-black/30 px-2.5 py-0.5 text-xs font-medium text-[color:var(--color-muted)] backdrop-blur-sm"
              >
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-[color:var(--color-foreground)] md:text-4xl">
            {project.title}
          </h1>

          <p className="text-base leading-relaxed text-[color:var(--color-muted)]">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                View on GitHub &rarr;
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                Live demo &rarr;
              </a>
            )}
          </div>
        </header>

        <div className="case-study-divider" />

        <section className="mb-10 page-enter page-enter-delay-2" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="case-study-heading">
            Overview
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {project.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <div className="case-study-divider" />

        <section className="mb-10 page-enter page-enter-delay-3" aria-labelledby="role-heading">
          <h2 id="role-heading" className="case-study-heading">
            My Role
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
            {project.role}
          </p>
        </section>

        <div className="case-study-divider" />

        <section className="mb-10 page-enter page-enter-delay-3" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="case-study-heading">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="card-soft rounded-lg border border-slate-700/50 px-3 py-1.5 text-sm text-[color:var(--color-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="case-study-divider" />

        <section className="mb-10 page-enter page-enter-delay-4" aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="case-study-heading">
            Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[color:var(--color-muted)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent-soft)] shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {project.slug === "freelance-web-designs" && (
          <>
            <div className="case-study-divider" />
            <section className="mb-10 page-enter page-enter-delay-4" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="case-study-heading">
                All 19 Sites
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                Each card represents a fully custom site — hover to see the palette, filter by market below.
              </p>
              <FreelanceGallery />
            </section>
          </>
        )}

        <div className="case-study-divider" />

        <footer className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/projects"
            className="text-sm text-[color:var(--color-muted)] underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)] hover:underline"
          >
            &larr; Back to all projects
          </Link>
          <Link href="/contact" className="btn-primary text-sm">
            Get in touch &rarr;
          </Link>
        </footer>
      </div>
    </article>
  );
}
