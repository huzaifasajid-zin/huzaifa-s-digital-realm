export const profile = {
  name: "Huzaifa Sajid",
  title: "AI/ML Developer · Frontend Engineer",
  email: "huzaifa@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  bio: `I build intelligent, beautifully crafted software at the intersection of AI and frontend engineering. I love systems that feel alive — fluid interactions, thoughtful motion, and details that make products memorable.`,
};

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  demo?: string;
  github?: string;
  cover: string; // gradient class
}

export const projects: Project[] = [
  {
    id: "ai-saas",
    name: "AI SaaS Platform",
    tagline: "Multi-tenant AI workspace",
    description:
      "A SaaS platform with AI-powered document intelligence, chat, and team workspaces. Built for scale with edge-rendered React and streaming LLM responses.",
    tech: ["Next.js", "TypeScript", "OpenAI", "tRPC", "Postgres"],
    highlights: ["Streaming completions", "Org-level RBAC", "Vector search"],
    demo: "https://example.com",
    github: "https://github.com/",
    cover: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: "vision-app",
    name: "Vision App",
    tagline: "Realtime computer vision",
    description:
      "Browser-based realtime vision pipeline using WebGPU + ONNX. Detects objects, segments scenes and overlays AR markers at 60 FPS.",
    tech: ["WebGPU", "ONNX", "React", "WASM"],
    highlights: ["60 FPS pipeline", "On-device inference", "AR overlays"],
    cover: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    id: "ml-dashboard",
    name: "ML Ops Dashboard",
    tagline: "Train, monitor, deploy",
    description:
      "An ML ops console for tracking experiments, comparing runs, and deploying models with one click. Beautiful charts, fast filtering.",
    tech: ["React", "D3", "FastAPI", "Docker"],
    highlights: ["Live metrics", "Run diffing", "1-click deploy"],
    cover: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    id: "portfolio-os",
    name: "macOS Portfolio",
    tagline: "This very website",
    description:
      "An interactive macOS-inspired portfolio. A full window manager, dock, finder and terminal — all rendered in the browser.",
    tech: ["React", "TypeScript", "Framer Motion", "Zustand"],
    highlights: ["Window manager", "Animated dock", "Fake terminal"],
    cover: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "chat-system",
    name: "Realtime Chat",
    tagline: "Low-latency messaging",
    description:
      "End-to-end encrypted chat with presence, typing indicators and offline sync. WebSockets + CRDTs for conflict-free state.",
    tech: ["WebSockets", "CRDT", "React", "Rust"],
    highlights: ["E2EE", "Offline-first", "Presence"],
    cover: "from-fuchsia-500 via-rose-500 to-orange-400",
  },
];

export interface Experience {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    company: "Independent / Freelance",
    role: "AI & Frontend Engineer",
    duration: "2023 — Present",
    bullets: [
      "Shipped production AI features for SaaS clients across 3 industries",
      "Designed end-to-end systems from data pipelines to polished UI",
      "Mentored junior engineers on React architecture and motion design",
    ],
    tech: ["Next.js", "TypeScript", "Python", "OpenAI", "Postgres"],
  },
  {
    company: "Open Source",
    role: "Maintainer & Contributor",
    duration: "2022 — Present",
    bullets: [
      "Contributed to several React tooling and animation libraries",
      "Maintain a small set of utilities focused on UI motion",
    ],
    tech: ["React", "TypeScript", "Vite"],
  },
];

export const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  "AI / ML": ["PyTorch", "OpenAI", "LangChain", "Vector DBs", "RAG"],
  Backend: ["Node.js", "FastAPI", "Postgres", "Redis", "tRPC"],
  Tools: ["Figma", "Vercel", "Docker", "Git", "Linear"],
};
