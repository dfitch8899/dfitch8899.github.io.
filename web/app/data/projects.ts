export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  role: string;
  techStack: string[];
  tags: Tag[];
  links: {
    demo?: string;
    repo?: string;
  };
  highlights: string[];
  featured: boolean;
}

export type Tag =
  | "frontend"
  | "backend"
  | "systems"
  | "ai-ml"
  | "tools"
  | "web";

export const TAG_LABELS: Record<Tag, string> = {
  frontend: "Frontend",
  backend: "Backend",
  systems: "Systems",
  "ai-ml": "AI / ML",
  tools: "Tools",
  web: "Web",
};

export const projects: Project[] = [
  {
    slug: "aipron",
    title: "AIpron – AI Cooking Assistant",
    summary:
      "An AI-powered cooking assistant that generates recipes from your pantry, guides you step-by-step, and supports hands-free voice interaction in the kitchen.",
    description: [
      "AIpron is an intelligent cooking companion that helps home cooks and food enthusiasts turn whatever they have on hand into personalized recipes.",
      "The app supports pantry-based recipe generation, dietary filters, cuisine exploration, and smart ingredient substitutions so you can adapt dishes on the fly.",
      "A realtime conversational interface and voice-guided cooking mode keep your hands free while you follow step-by-step instructions and ask follow-up questions.",
    ],
    role: "Full-stack contributor and UI implementation",
    techStack: [
      "React Native",
      "Expo",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "OpenAI Realtime API",
    ],
    tags: ["frontend", "backend", "ai-ml", "web"],
    links: {
      repo: "https://github.com/Ohio-University-CS/Aipron",
    },
    highlights: [
      "Pantry-based recipe generation with dietary and cuisine filters",
      "Hands-free, voice-guided cooking mode using OpenAI Realtime",
      "Shared TypeScript types across mobile, web, and backend for type safety",
      "Scalable monorepo architecture with dedicated mobile, web, backend, and shared packages",
    ],
    featured: true,
  },
  {
    slug: "coming-soon",
    title: "More Projects – Soon™",
    summary: "Additional projects are on the way. Check back soon™ for new builds, experiments, and case studies.",
    description: [
      "I’m actively working on new projects that will be featured here, including experimental UIs, full-stack apps, and systems-oriented tooling.",
      "This space will fill up with detailed breakdowns of architecture decisions, trade-offs, and lessons learned from real-world work.",
    ],
    role: "In progress",
    techStack: ["Soon™"],
    tags: ["web"],
    links: {},
    highlights: ["Stay tuned for upcoming launches."],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByTag(tag: Tag): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): Tag[] {
  const tagSet = new Set<Tag>();
  for (const p of projects) {
    for (const t of p.tags) tagSet.add(t);
  }
  return Array.from(tagSet);
}
