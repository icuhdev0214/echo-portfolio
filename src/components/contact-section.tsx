import { Suspense } from "react";

import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="flex flex-col gap-6 px-6 py-24 sm:px-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
        <p className="max-w-md text-muted-foreground">
          Have a project in mind? Tell me a bit about it and I&apos;ll follow up.
        </p>
      </div>
      <div className="max-w-md">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
