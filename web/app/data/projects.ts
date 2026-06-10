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
  flagship?: boolean;
}

export type Tag =
  | "frontend"
  | "backend"
  | "systems"
  | "ai-ml"
  | "agents"
  | "tools"
  | "web";

export const TAG_LABELS: Record<Tag, string> = {
  frontend: "Frontend",
  backend: "Backend",
  systems: "Systems",
  "ai-ml": "AI / ML",
  agents: "AI Agents",
  tools: "Tools",
  web: "Web",
};

export const projects: Project[] = [
  {
    slug: "hermes-agent",
    title: "Hermes Agent — Autonomous Engineering Platform",
    summary:
      "A self-hosted autonomous AI engineering agent running on AWS, operated entirely through Slack, with a custom-built Mission Control dashboard. Assign it a Jira ticket and it picks up the work, writes the code, and ships a pull request.",
    description: [
      "I took the open-source NousResearch Hermes Agent and turned it into a production-grade autonomous engineering platform: containerized, deployed to AWS ECS Fargate, and wired into Slack so the agent can be tasked, monitored, and steered from anywhere.",
      "The centerpiece is an end-to-end automation pipeline I designed around Jira webhooks — assign the agent a ticket and it autonomously picks it up, plans the work, writes the code, and opens a pull request with no human in the loop until review.",
      "To operate it, I built Mission Control from scratch: a Next.js dashboard with a live kanban board, a streaming terminal view into the agent's work, a calendar of editable cron jobs for scheduled autonomous tasks, and a real-time activity feed.",
      "Mission Control loads the agent's native dashboard plugins remotely at runtime — a plugin architecture that lets the agent's own UI components render inside my dashboard without redeploying either side.",
      "Running an autonomous agent in production meant treating it like real infrastructure: I ran security audits, fixed a WebSocket-upgrade SSRF vulnerability, hardened the proxy layer, and optimized routing and load times across the stack.",
    ],
    role: "Sole architect and operator — infrastructure, deployment, dashboard, and every integration",
    techStack: [
      "NousResearch Hermes",
      "AWS ECS Fargate",
      "Docker",
      "Next.js",
      "TypeScript",
      "Slack API",
      "Jira webhooks",
      "Vercel",
    ],
    tags: ["ai-ml", "agents", "backend", "web"],
    links: {},
    highlights: [
      "Autonomous ticket-to-PR pipeline: Jira webhook assigns work, the agent ships a pull request",
      "Deployed the open-source Hermes Agent to AWS ECS Fargate with a full Slack-native interface",
      "Built Mission Control: kanban board, live terminal stream, cron-job calendar, and activity feed in Next.js",
      "Remote dashboard-plugin architecture — agent UI bundles load into Mission Control at runtime",
      "Security-hardened for production: SSRF fix, proxy hardening, and full security audits",
      "Scheduled autonomous workflows via editable cron jobs — the agent works while I sleep",
    ],
    featured: true,
    flagship: true,
  },
  {
    slug: "freelance-web-designs",
    title: "Freelance Web Designs – Athens & Belpre",
    summary:
      "19 unsolicited website redesign concepts built for experience — researched, designed, and coded from scratch for real local businesses in Athens and Belpre, Ohio. None were sold. Built to sharpen full-stack design and outreach skills.",
    description: [
      "A personal project to sharpen my design and development skills. I identified local businesses with outdated or nonexistent websites, researched each brand deeply, and built polished redesign concepts entirely on my own initiative. None of the designs were sold or commissioned — these were built for experience and to practice the full workflow from research to pitch.",
      "The Athens batch covered 6 businesses on and around Court Street — Smiling Skull Saloon, Uptown Dog, Stephen's, Casa Nueva, Athena Cinema, and Bagel Street Deli — each with a fully distinct visual identity matched to the business's personality.",
      "The Belpre/Washington County batch expanded to 13 more local businesses including Dragon House, Q-Wagon BBQ, Village Cakery, Boathouse BBQ, The Ohio Redwood, and others across the region.",
      "Each site featured AI-generated hero images and background videos (Veo 3, Nano Banana), custom SVG logos, mobile-responsive layouts, full menus or service listings, and a demo disclaimer banner ready for pitching.",
      "Personalized outreach emails were drafted and sent for each business, leading with a specific pain point hook — a dead domain, a 2012 Wix template, or a missing web presence entirely.",
      "The same civic-sites approach extended to a website for the Meigs County Common Pleas Court — a full government site build alongside the Sheriff's Office redesign concept.",
    ],
    role: "Sole designer and developer — research, design, code, AI media generation, and client outreach",
    techStack: [
      "HTML / CSS",
      "JavaScript",
      "Veo 3 (video generation)",
      "Nano Banana (image generation)",
      "SVG animation",
      "Responsive design",
    ],
    tags: ["frontend", "web"],
    links: {},
    highlights: [
      "19 fully custom sites built across two Ohio markets — Athens and Belpre/Washington County",
      "AI-generated hero videos and images integrated into every site via Veo 3 and Nano Banana",
      "Each site features a unique brand identity: typography, color palette, SVG logo, and tone matched to the business",
      "Personalized pitch emails sent to each business with demo video attachments",
      "Sites cover restaurants, bars, a cinema, a pet hotel, a bakery, a quilt shop, BBQ joints, and a law enforcement office",
      "Meigs County Sheriff's Office redesign included interactive MapLibre map, dark/light mode, staff directory, and Square payment integration",
      "Built a companion site for the Meigs County Common Pleas Court in the same civic-design vein",
    ],
    featured: true,
  },
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
    slug: "deal-assist",
    title: "Deal Assist — AI Toolkit for Real-Estate Agents",
    summary:
      "An AI-powered tools platform for real-estate professionals — drafting inspection responses, remedy requests, and more — taken from rough prototype to a branded, demo-ready product.",
    description: [
      "Deal Assist is a suite of AI tools built for working real-estate agents, designed to take the tedious paperwork moments of a deal — inspection responses, remedy requests, and similar documents — and turn them into a few guided clicks.",
      "I carried the platform from early prototype through a full rebrand and demo preparation: product naming, polished UI, hosting setup, and the feature work to make each tool genuinely useful to an agent mid-transaction.",
      "Each tool wraps an LLM workflow in a purpose-built interface, so agents get domain-correct drafts without ever writing a prompt.",
    ],
    role: "Sole developer — product build-out, AI tool design, rebrand, hosting, and demo prep",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "LLM APIs",
      "Tailwind CSS",
    ],
    tags: ["ai-ml", "web", "frontend", "backend"],
    links: {},
    highlights: [
      "Suite of purpose-built AI tools for real-estate workflows — no prompt-writing required",
      "Inspection-response and remedy-drafting tools that produce domain-correct documents",
      "Took the product from prototype to branded, hosted, demo-ready platform",
      "Designed for non-technical users: guided flows over raw AI chat",
    ],
    featured: false,
  },
  {
    slug: "nudge",
    title: "Nudge — Email Outreach Automation",
    summary:
      "An AI-assisted email outreach platform built at AI OWL — bulk-send tracking, automated follow-up nudge scheduling, and full thread management from a single dashboard.",
    description: [
      "Nudge is an email automation platform I built at AI OWL to run outreach campaigns that actually follow up — because the money is in the follow-up nobody remembers to send.",
      "The dashboard tracks bulk outreach across its full lifecycle: who was contacted, who replied, who needs a nudge, and when the next automated follow-up is scheduled to go out.",
      "Thread-level controls let operators mute conversations, cancel or un-cancel scheduled sends, and step into any thread manually without breaking the automation around it.",
    ],
    role: "Full-stack developer — dashboard, scheduling engine, and thread management",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Email APIs",
      "Automated scheduling",
    ],
    tags: ["ai-ml", "tools", "backend", "web"],
    links: {},
    highlights: [
      "Automated nudge scheduling — follow-ups go out on time without human memory involved",
      "Bulk outreach tracking across the full campaign lifecycle",
      "Thread management with mute, cancel, and un-cancel controls that coexist with automation",
      "Built and shipped as production tooling at AI OWL",
    ],
    featured: false,
  },
  {
    slug: "robinhood-agentic",
    title: "Autonomous Trading Agent",
    summary:
      "An experiment in giving an AI agent real-world stakes: a live brokerage account connected through Robinhood's agentic-trading MCP, where the agent researches, places real orders, and reports back.",
    description: [
      "How do you trust an autonomous agent with something that matters? I tested it directly: a live (deliberately small) Robinhood account connected to an AI agent through Robinhood's agentic-trading MCP server.",
      "The agent researches positions, places real buy and sell orders, and reports fills and broker rejections back in plain language — including correctly surfacing compliance blockers like incomplete investor profiles instead of silently failing.",
      "The real subject of the experiment is agent guardrails: budget limits, action reporting, and what it takes for an autonomous system to operate safely against an API with real-world consequences.",
    ],
    role: "Designer and operator of the agent setup, tooling, and guardrails",
    techStack: [
      "MCP (Model Context Protocol)",
      "Robinhood Agentic Trading API",
      "LLM agents",
      "Tool-use design",
    ],
    tags: ["ai-ml", "agents", "tools"],
    links: {},
    highlights: [
      "Live agent-to-brokerage integration via Robinhood's agentic-trading MCP",
      "Agent places real orders and reports fills, rejections, and required actions transparently",
      "Hands-on study of guardrails for agents operating with real-world stakes",
      "Early adoption of MCP as the integration layer between agents and external services",
    ],
    featured: false,
  },
  {
    slug: "ironlog",
    title: "IronLog — Workout Tracker",
    summary:
      "A workout tracking app focused on progress feedback — log lifts fast, see trends clearly, and know whether you're actually getting stronger.",
    description: [
      "IronLog is a workout tracking app built around one idea: logging should be instant, and the app should tell you something useful back.",
      "Beyond simple set-and-rep logging, it surfaces progress feedback — trends over time, personal records, and signals about whether a lift is moving in the right direction.",
      "Built as a full-stack personal project and a testbed for clean data modeling around time-series fitness data.",
    ],
    role: "Sole designer and developer",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "SQLite",
    ],
    tags: ["web", "frontend", "backend"],
    links: {},
    highlights: [
      "Fast, friction-free workout logging designed for use mid-session",
      "Progress feedback: trends, personal records, and direction-of-travel signals",
      "Clean time-series data modeling for fitness history",
    ],
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
