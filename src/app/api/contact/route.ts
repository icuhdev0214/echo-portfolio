import { NextResponse } from "next/server";
import { Resend } from "resend";

const PROJECT_TYPES = [
  "web-design",
  "development",
  "full-project",
  "just-exploring",
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const project = typeof body.project === "string" ? body.project.trim() : "";
  // Honeypot: real visitors never fill this hidden field in.
  const companyUrl = typeof body.company_url === "string" ? body.company_url.trim() : "";

  if (companyUrl) {
    // Silently pretend success so bots don't learn to skip the field.
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (projectType && !PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])) {
    return NextResponse.json({ message: "Invalid project type." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !apiKey) {
    // Not configured yet (e.g. local dev without secrets) — log instead of failing hard.
    console.warn("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set; logging submission instead of emailing.", {
      name,
      email,
      projectType,
      budget,
      project,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const subjectSuffix = project ? ` re: ${project}` : "";
  const { error } = await resend.emails.send({
    from: "Portfolio contact form <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New inquiry from ${name}${subjectSuffix}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      projectType ? `Project type: ${projectType}` : null,
      budget ? `Budget: ${budget}` : null,
      project ? `Regarding project: ${project}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ message: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
