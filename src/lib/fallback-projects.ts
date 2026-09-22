import type { Project } from "@/sanity/lib/types";

/**
 * Shown only when Sanity returns no real projects yet (e.g. local dev before
 * a Sanity project is configured). Real Sanity content always takes
 * priority — see sanityFetch call sites in src/app/page.tsx and
 * src/app/projects/[slug]/page.tsx.
 */
export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "fallback-itsourstudio",
    title: "it's ouR Studio",
    slug: { current: "its-our-studio" },
    summary:
      "Booking platform and thirteen-module admin dashboard for a premium self-photography studio.",
    role: "Full-stack engineer",
    client: "itsourstudio.net",
    domain: "Self-photography studio",
    date: "2025-01-01",
    problem:
      "A premium self-photography studio in Valenzuela City needed customers to book sessions with real-time slot availability and GCash payment, while administrators needed one place to run bookings, gallery, packages, sales and site content.",
    approach:
      "React 19, TypeScript and Vite SPA on Firebase — Firestore onSnapshot listeners for live data, Firebase Auth gating a protected admin dashboard, an Express and Vercel-serverless email layer with seven transactional templates, and a node-cron job sending 30-minute session reminders in Asia/Manila.",
    outcomes: [
      { value: "7", label: "automated transactional email templates" },
      { value: "13", label: "admin modules including CMS, sales ledger and bio links" },
      { value: "12", label: "Firestore collections under rule-based access control" },
    ],
    headline: "Real-time booking with a thirteen-module admin dashboard",
    tags: ["React.js", "TypeScript", "Vite", "Firebase", "Firestore", "Express", "Playwright", "Vercel"],
    liveUrl: "https://itsourstudio-v2.vercel.app/",
    featured: true,
  },
  {
    _id: "fallback-echotifeed",
    title: "EchoTifeed",
    slug: { current: "echotifeed" },
    summary:
      "Budget tracker modelled on a Philippine salary period, with accumulating savings and pautang.",
    role: "Full-stack engineer",
    client: "Personal project",
    domain: "Personal finance",
    date: "2025-01-01",
    problem:
      "Budgeting apps reset every month, so a savings balance, money lent out and money left over from finished months all went missing. The app had to model a Philippine salary period — two halves a month — rather than a calendar month.",
    approach:
      "Next.js 16 App Router and TypeScript with TanStack Query against a Laravel 13 REST API on Sanctum tokens and PostgreSQL. Savings accumulates rather than resetting, pautang tracks per-person partial repayments, and an expected-salary model distinguishes “pay has not landed” from “there is no pay”. Docker Compose locally, Amplify plus EC2 behind Caddy in production, with GitHub Actions running Vitest, Playwright and PHPUnit on every PR.",
    outcomes: [
      { value: "3", label: "test suites in CI: Vitest, Playwright, PHPUnit" },
      { value: "30+", label: "REST endpoints behind Sanctum bearer tokens" },
      { value: "PWA", label: "installable to the iOS home screen" },
    ],
    headline: "Three test suites in CI, deployed frontend and API",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Laravel", "PostgreSQL", "Docker", "AWS Amplify", "EC2", "Vitest", "Playwright"],
    featured: true,
  },
];
