export const heroCopy = {
  eyebrow: "Full-Stack & AI Agent Engineer",
  title: "Hi, I'm Devin. I build things that work.",
  subtitle:
    "Full-stack developer specializing in AI agentic automation — from an autonomous engineering agent on AWS that picks up Jira tickets and ships pull requests, to production AI products at two companies.",
  currentRoles: ["AI OWL", "Flash AI", "CS + AI @ Ohio University"],
  primaryCta: "View my work",
  secondaryCta: "About me",
};

export const aboutCopy = {
  title: "About",
  subtitle: "Developer, builder, agent wrangler.",
  body: [
    "I'm Devin Fitch — a software developer who got hooked on programming by building things I actually wanted to use. That instinct hasn't changed: I still learn best by shipping real projects.",
    "Today I work as a full-stack developer at two AI companies at once — AI OWL, where I build AI-powered products and automation tooling, and Flash AI, where I work on AI products in a specialized domain (the details are under NDA). Balancing two production codebases keeps me fast, pragmatic, and very hard to surprise.",
    "My specialty is AI agentic automation — designing systems where AI agents do real, verifiable work. I deployed the open-source Hermes Agent to AWS as a fully autonomous engineering teammate: assign it a Jira ticket and it writes the code and opens a pull request, all operated through Slack and a Mission Control dashboard I built from scratch.",
    "Underneath the AI work is a full-stack foundation: responsive, accessible interfaces with React, Next.js, and Tailwind; APIs and services with Node.js and Python; and C++ when the problem calls for performance. I care about code that's clear enough for someone else to maintain, architecture that scales without heroics, and UX that stays out of the user's way.",
  ],
};

export const agenticCopy = {
  eyebrow: "AI & Agentic Automation",
  title: "I build agents that do real work.",
  lede: "Not chatbots — autonomous systems with real responsibilities. I design, deploy, and operate AI agents in production, plus the infrastructure and dashboards it takes to trust them.",
  cards: [
    {
      label: "Autonomous Agents",
      mono: "> jira.assign(ticket) → PR",
      detail:
        "I run a self-hosted Hermes Agent on AWS that picks up Jira tickets and ships pull requests autonomously — a full ticket-to-PR pipeline with no human in the loop until review.",
    },
    {
      label: "Agent Infrastructure",
      mono: "> deploy --ecs-fargate",
      detail:
        "Containerized agent deployments on ECS Fargate, Slack-native interfaces, webhook pipelines, MCP tool integrations, and the security hardening production agents demand.",
    },
    {
      label: "Mission Control UIs",
      mono: "> stream.attach(agent)",
      detail:
        "Next.js dashboards for operating agents: live kanban boards, streaming terminals, cron-job calendars, and real-time activity feeds — built so autonomy stays observable.",
    },
  ],
  cta: "See the Hermes Agent platform",
};

export interface TimelineEvent {
  year: string;
  label: string;
  detail: string;
  current?: boolean;
}

export const timelineCopy: { title: string; events: TimelineEvent[] } = {
  title: "Timeline",
  events: [
    {
      year: "May 2026–Now",
      label: "Full-Stack Developer, Flash AI",
      current: true,
      detail:
        "Building production AI products in a specialized domain (under NDA) — full-stack feature work across a large monorepo, shipped through a ticket-driven, code-reviewed workflow. Concurrent with my role at AI OWL.",
    },
    {
      year: "2025–Now",
      label: "Full-Stack Developer, AI OWL",
      current: true,
      detail:
        "Building AI-powered applications, agentic automation, and internal tooling — from email outreach automation to AI product platforms — with a focus on reliability, performance, and clean architecture. Now in parallel with Flash AI.",
    },
    {
      year: "Fall 2024–Now",
      label: "Ohio University — Computer Science & Artificial Intelligence",
      detail:
        "Started at Ohio University pursuing a double major in Computer Science and Artificial Intelligence, combining solid CS fundamentals with a deep focus on applied machine learning and intelligent systems.",
    },
    {
      year: "2024–Now",
      label: "Building projects & deepening skills",
      detail:
        "Focused on full-stack development, systems programming, and applied AI through personal projects and open-source contributions.",
    },
    {
      year: "2023",
      label: "Dove into web development",
      detail:
        "Learned React, Next.js, Node.js, and modern frontend tooling. Built first production-quality web applications.",
    },
    {
      year: "2022",
      label: "Started programming journey",
      detail:
        "Began with Python and C++, learning fundamentals through algorithms, data structures, and small CLI tools.",
    },
  ],
};

export const skillsCopy = {
  title: "Skills & Tools",
  columns: [
    {
      label: "AI & Agents",
      items: [
        "LLM agent orchestration",
        "Autonomous workflows (ticket → PR)",
        "AWS ECS Fargate & Docker",
        "Slack, Jira & webhook integrations",
        "MCP & tool-use design",
        "OpenAI & open-weight models",
      ],
    },
    {
      label: "Frontend",
      items: [
        "React & Next.js",
        "TypeScript & JavaScript",
        "Tailwind CSS",
        "HTML & CSS",
        "Framer Motion",
      ],
    },
    {
      label: "Backend",
      items: [
        "Node.js & Express",
        "Python & Flask",
        "REST API design",
        "PostgreSQL & SQLite",
        "Redis & caching",
      ],
    },
    {
      label: "Systems & Tools",
      items: [
        "C++",
        "Git & GitHub",
        "Linux / CLI",
        "Docker",
        "Testing (Jest, pytest)",
      ],
    },
  ],
};

export const contactCopy = {
  title: "Contact",
  subtitle:
    "Have a question, want to collaborate, or just want to say hello? I'd love to hear from you.",
  availability:
    "Full-stack developer at AI OWL and Flash AI. Open to interesting collaborations — especially anything involving AI agents and automation.",
  ctaLabel: "Send message",
};
