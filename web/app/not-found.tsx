import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section flex min-h-[60vh] items-center justify-center">
      <div className="container-max text-center page-enter">
        <p className="font-display text-7xl font-bold text-[color:var(--color-accent)] drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          404
        </p>
        <h1 className="mt-4 font-display text-xl font-bold text-[color:var(--color-foreground)]">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-7 inline-flex text-sm">
          Go home &rarr;
        </Link>
      </div>
    </div>
  );
}
