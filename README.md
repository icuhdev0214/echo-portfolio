# echo-portfolio

[![CI](https://github.com/icuhdev0214/echo-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/icuhdev0214/echo-portfolio/actions/workflows/ci.yml)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Sanity](https://img.shields.io/badge/CMS-Sanity-F03E2F?logo=sanity&logoColor=white)
![Resend](https://img.shields.io/badge/Email-Resend-000000?logo=resend&logoColor=white)
![Playwright](https://img.shields.io/badge/Tested_with-Playwright-2EAD33?logo=playwright&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

Jerico Jabonete's personal/freelance portfolio: a horizontal-scroll,
single-page experience (Home / Work / Stack / Contact / Inquire) built on
Next.js (App Router) with the "nocturne" design system, content managed
through an embedded Sanity Studio, contact handled by a serverless route via
Resend. No traditional backend server.

## Stack

- **Frontend:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4
- **Design system:** "nocturne" — dark, compact tokens and component
  classes ported into `src/app/globals.css` from a Claude Design prototype.
  No shadcn/UI primitives; the site's look comes entirely from nocturne's own
  `.btn`/`.card`/`.field`/`.tag`/etc. classes plus Tailwind for layout
- **UI:** a single horizontal snap-scroll shell (`src/components/home/`) —
  nav, keyboard/wheel navigation, animated hero metrics, filterable project
  rail, skills marquee, and the inquiry form all live as panels in one track
- **CMS:** [Sanity](https://sanity.io), embedded at `/studio` via
  `next-sanity`. Content is fetched with GROQ and revalidated on-demand via a
  webhook (`/api/revalidate`) instead of a full redeploy. Until a real
  Sanity project is configured (or it returns no content yet), the site
  falls back to `src/lib/fallback-projects.ts` so local dev isn't empty
- **Contact:** `/api/contact` route sends mail via [Resend](https://resend.com);
  falls back to logging the submission if `RESEND_API_KEY`/`CONTACT_TO_EMAIL`
  aren't set (e.g. local dev)
- **Deployment (CD):** Vercel, with its native git-based deploy pipeline —
  once the repo is linked, every push gets a preview deployment and merges
  to `main` deploy to production automatically. No custom deploy workflow
  needed; `vercel.json` just pins the framework/build/install commands so
  the project auto-configures consistently
- **Testing:** end-to-end smoke tests with [Playwright](https://playwright.dev)
  (`e2e/`), covering the home page's panels, project-card navigation, the
  contact form (success/error/honeypot/pre-fill/segmented-control), and the
  `/studio` route
- **CI:** GitHub Actions (`.github/workflows/ci.yml`), split into parallel
  `lint`, `typecheck`, and `build` (which also runs the e2e suite) jobs for
  fast PR feedback — a gate independent of Vercel's own pipeline
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
the app throws at startup — Sanity's client requires them. With them set but
pointed at a project with no published `project` documents yet, pages fall
back to `FALLBACK_PROJECTS` instead of rendering empty. Without
`RESEND_API_KEY`/`CONTACT_TO_EMAIL`, contact form submissions are logged to
the server console instead of emailed.

### Running tests

```bash
npm run test:e2e
```

Runs against a local dev server that Playwright starts automatically. In
this sandboxed environment, Chromium is pre-installed outside Playwright's
usual cache — point `playwright.config.ts` at it with
`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e` instead
of running `playwright install`. CI installs its own browser normally.

### Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) and
   copy its project ID into `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`;
   dataset defaults to `production`).
2. In your Sanity project's dashboard, go to API → CORS origins and add
   whatever URL you use to reach the app locally (e.g. `http://localhost:3000`),
   with "Allow credentials" checked — required for `/studio` to sign in.
3. Run the app and visit `/studio`, sign in with the same account used to
   create the project, and create a `Project` entry — the schema
   (`src/sanity/schemaTypes/project.ts`) is already wired up. Only Title,
   Slug, and Summary are required; everything else (Screenshots, Video URL,
   Code URL, Case study URL) can be added later.
4. Optionally add a webhook (Settings → API → Webhooks) pointed at
   `/api/revalidate` with the same secret as `SANITY_REVALIDATE_SECRET`, so
   publishing content goes live without a redeploy.

## Design

The visual design and its horizontal-scroll interaction model come from a
Claude Design prototype ("Portfolio Prototype Horizontal", built on the
"nocturne" design system) and have been fully ported into the components
under `src/components/home/`. Deliberate deviations from the raw prototype:
the "CMS" nav link opens the real `/studio` (Sanity's hosted auth) instead
of the prototype's fake demo login, and project cards navigate to real
`/projects/[slug]` pages instead of an in-page overlay, for shareable/SEO
-friendly URLs.

## Deploy

Connect the repo to a Vercel project and set the environment variables above
in the Vercel dashboard. Every push gets a preview deployment; merges to
`main` deploy to production automatically.

### Current deployment

Live on Vercel under the "Jerico's projects" team, project `echo-portfolio`,
linked to this repo with `main` as the production branch. Production is
running with real Sanity project credentials, so the live site renders real
published project content instead of the fallback data. The contact form
sends real mail via Resend (`RESEND_API_KEY`/`CONTACT_TO_EMAIL` are set in
the Vercel project's Environment Variables).
