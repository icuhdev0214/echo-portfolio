export const PERSON = {
  name: "Jerico Jabonete",
  initials: "JJ",
  location: "Meycauayan, Philippines",
  email: "jt.jabonete@gmail.com",
  phone: "09562557081",
  phoneHref: "tel:+639562557081",
  linkedin: "linkedin.com/in/jerico-jabonete-9896a118b",
  linkedinHref: "https://linkedin.com/in/jerico-jabonete-9896a118b",
  liveWork: "itsourstudio.net",
  liveWorkHref: "https://itsourstudio.net",
};

export const HERO = {
  eyebrow: `${PERSON.location} · available`,
  headline: "Frontend engineering with measurable outcomes",
  body: "Eight years building scalable React, Next.js and TypeScript interfaces — Samsung device platforms, marketing technology, e-commerce and full-stack product work.",
};

export const METRICS = [
  { to: 8, dec: 0, suffix: "+", label: "years shipping production front ends" },
  { to: 30, dec: 0, suffix: "%", label: "load-time improvement on enterprise UI" },
  { to: 99.9, dec: 1, suffix: "%", label: "uptime across commerce and HRIS" },
];

export const SKILL_GROUPS = [
  { title: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "ShadCN UI", "Material UI"] },
  { title: "Integration & data", skills: ["TanStack Query", "Redux Toolkit", "Zustand", "gRPC", "REST API", "GraphQL", "Firestore"] },
  { title: "Backend & infra", skills: ["Laravel", "PostgreSQL", "Express", "Docker", "AWS Amplify", "EC2", "ASP.NET", "C#"] },
  { title: "Quality", skills: ["Vitest", "Playwright", "PHPUnit", "GitHub Actions", "Performance budgets"] },
  { title: "Cross-platform", skills: ["Electron", "Tauri", "Capacitor", "PWA"] },
];

export const MARQUEE_SKILLS = [
  "React.js", "Next.js", "TypeScript", "Vite", "ShadCN UI", "Tailwind CSS",
  "TanStack Query", "Zustand", "gRPC", "Firebase", "Laravel", "PostgreSQL",
  "Docker", "AWS", "Playwright", "Vitest",
];

export const CONTACT_LINKS = [
  { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
  { label: "Phone", value: PERSON.phone, href: PERSON.phoneHref },
  { label: "LinkedIn", value: PERSON.linkedin, href: PERSON.linkedinHref },
  { label: "Live work", value: PERSON.liveWork, href: PERSON.liveWorkHref },
];

export const PROJECT_FILTERS = ["All", "React.js", "Next.js", "TypeScript", "Firebase", "Laravel", "Playwright"];

export const INQUIRY_KINDS = ["Web design", "Development", "Full project", "Just exploring"];

export const BUDGETS = [
  "Not sure yet",
  "Under ₱50k",
  "₱50k – ₱150k",
  "₱150k – ₱400k",
  "₱400k+",
  "Retainer / ongoing",
];

export const PANEL_LABELS = ["Home", "Work", "Stack", "Contact", "Inquire"] as const;
