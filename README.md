# echo-portfolio

[![CI](https://github.com/icuhdev0214/echo-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/icuhdev0214/echo-portfolio/actions/workflows/ci.yml)

Freelance portfolio: Next.js (App Router) + Tailwind + a light layer of
hand-written shadcn-style components, content managed through an embedded
Sanity Studio, contact handled by a serverless route via Resend. No
traditional backend server — see `.claude/plans` history / project notes for
the full stack rationale.

## Stack

- **Frontend:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4
- **UI primitives:** hand-written shadcn-style components in
  `src/components/ui` (Radix UI + `class-variance-authority` + `tailwind-merge`)
  — the shadcn CLI itself needs network access to `ui.shadcn.com`, which isn't
  always available, so components are added by hand following the same
  pattern
- **CMS:** [Sanity](https://sanity.io), embedded at `/studio` via
  `next-sanity`. Content is fetched with GROQ and revalidated on-demand via a
  webhook (`/api/revalidate`) instead of a full redeploy
- **Contact:** `/api/contact` route sends mail via [Resend](https://resend.com);
  falls back to logging the submission if `RESEND_API_KEY`/`CONTACT_TO_EMAIL`
  aren't set (e.g. local dev)
- **Deployment (CD):** Vercel, with its native git-based deploy pipeline —
  once the repo is linked, every push gets a preview deployment and merges
  to `main` deploy to production automatically. No custom deploy workflow
  needed; `vercel.json` just pins the framework/build/install commands so
  the project auto-configures consistently
- **CI:** GitHub Actions (`.github/workflows/ci.yml`), split into parallel
  `lint`, `typecheck`, and `build` jobs for fast PR feedback — a gate
  independent of Vercel's own pipeline
- **Dependency updates:** Dependabot (`.github/dependabot.yml`) opens weekly
  PRs against `dev` for npm and Actions dependencies (patch/minor grouped
  into one PR to cut down on noise)

No Docker anywhere in this pipeline — Vercel builds directly from the repo,
and there's no self-hosted infrastructure to containerize.

### Branch strategy & required checks

- `main` — production (deploys to production on Vercel)
- `dev` — integration branch (deploys to a Vercel preview environment)
- `feature/*` — one per unit of work, branched off `dev`, PR'd back into `dev`

Recommended GitHub branch protection (Settings → Branches), once you're
ready to enforce it: require the `lint`, `typecheck`, and `build` checks to
pass and require a PR (no direct pushes) on both `main` and `dev`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Sanity project + Resend keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, and
[http://localhost:3000/studio](http://localhost:3000/studio) for the CMS
(sign in with Sanity's own hosted auth — no separate login page needed).

### Environment variables

See `.env.example`. Without `NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET` set,
pages fall back to an empty project list instead of failing to build; without
`RESEND_API_KEY`/`CONTACT_TO_EMAIL`, contact form submissions are logged to
the server console instead of emailed.

### Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) and
   copy its project ID into `.env.local`.
2. Run the app and visit `/studio` — the `project` schema
   (`src/sanity/schemaTypes/project.ts`) is already wired up.
3. Optionally add a webhook (Settings → API → Webhooks) pointed at
   `/api/revalidate` with the same secret as `SANITY_REVALIDATE_SECRET`, so
   publishing content goes live without a redeploy.

## Design

The visual design comes from a Claude Design prototype ("Portfolio Prototype
Horizontal", built on the "nocturne" design system). The current pages are a
structural scaffold — layout and data flow are in place, but styling should
be replaced with the ported design tokens/markup once that project is
imported (see the plan notes for how to bring it in via Claude Design's
"Send to Claude Code Web").

## Deploy

Connect the repo to a Vercel project and set the environment variables above
in the Vercel dashboard. Every push gets a preview deployment; merges to
`main` deploy to production automatically.
