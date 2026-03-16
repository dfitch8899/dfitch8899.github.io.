import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "./components/layout-shell";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Devin Fitch — Software Developer",
    template: "%s | Devin Fitch",
  },
  description:
    "Full-stack developer building responsive web apps, backend services, and developer tools with React, Next.js, Python, Node.js, and C++.",
  metadataBase: new URL("https://devinfitch.me"),
  openGraph: {
    title: "Devin Fitch — Software Developer",
    description:
      "Full-stack developer building responsive web apps, backend services, and developer tools.",
    type: "website",
    url: "https://devinfitch.me",
    siteName: "Devin Fitch",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devin Fitch — Software Developer",
    description:
      "Full-stack developer building responsive web apps, backend services, and developer tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://devinfitch.me",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Devin Fitch",
  url: "https://devinfitch.me",
  jobTitle: "Software Developer",
  email: "d.fitch8899@gmail.com",
  sameAs: [
    "https://github.com/dfitch8899",
    "https://www.linkedin.com/in/devin-fitch-b17700352/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Node.js",
    "C++",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${plusJakarta.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[color:var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[color:var(--color-background)]"
        >
          Skip to main content
        </a>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
