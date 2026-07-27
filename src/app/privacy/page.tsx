import type { Metadata } from "next";

import { TCCG_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy notice for TC Construction Group website and project-intake requests.",
  alternates: { canonical: `${TCCG_CONTACT.domain}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <article className="prose prose-slate mx-auto max-w-3xl prose-headings:font-black prose-a:text-red-700">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">TC Construction Group</p>
        <h1>Privacy Notice</h1>
        <p className="lead">Effective July 26, 2026</p>

        <h2>Information we collect</h2>
        <p>
          When you submit a project request, contact the company, or use a protected workspace, TC Construction Group may collect information such as your name, organization, email address, phone number, project location, project type, timeline, budget range, project description, communication preferences, account identifiers, and technical request information.
        </p>

        <h2>How information is used</h2>
        <p>
          Information may be used to evaluate and respond to inquiries, qualify opportunities, schedule follow-up, prepare project or teaming discussions, maintain customer and relationship records, secure protected services, prevent fraud or abuse, comply with law, and improve website and operational performance.
        </p>

        <h2>Communications</h2>
        <p>
          TCCG may contact you by email or telephone regarding a request. Text messages are sent only where an appropriate consent or other lawful basis exists. Message and data rates may apply. Reply STOP to an applicable text thread to opt out of future automated texts.
        </p>

        <h2>Service providers and related companies</h2>
        <p>
          Information may be processed by authorized service providers and Tolani Corp affiliated operations that support communications, customer relationship management, project intake, scheduling, security, hosting, analytics, or delivery. Providers are expected to process information for authorized business purposes and under applicable contractual or legal safeguards.
        </p>

        <h2>Data minimization and sensitive information</h2>
        <p>
          Do not submit passwords, authentication codes, Social Security numbers, complete payment-card data, banking credentials, medical information, export-controlled information, privileged legal material, or other unnecessary sensitive data through the public project form.
        </p>

        <h2>Retention and security</h2>
        <p>
          Information is retained for the period reasonably necessary for inquiry management, contracting, project administration, recordkeeping, dispute handling, security, and legal compliance. No transmission or storage system can be guaranteed completely secure.
        </p>

        <h2>Your choices</h2>
        <p>
          You may request correction or deletion of appropriate contact information, subject to contractual, legal, security, and recordkeeping requirements. You may also withdraw optional marketing or text-message consent using the instructions provided in the communication.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions may be directed to <a href={`mailto:${TCCG_CONTACT.email}`}>{TCCG_CONTACT.email}</a> or <a href={TCCG_CONTACT.phone.telHref}>{TCCG_CONTACT.phone.display}</a>.
        </p>

        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          This operational privacy notice should receive legal review before final production approval, especially when new jurisdictions, analytics, marketing platforms, payment systems, or regulated project information are introduced.
        </p>
      </article>
    </main>
  );
}
