import type { Metadata } from "next";

import { TCCG_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Website terms for TC Construction Group.",
  alternates: { canonical: `${TCCG_CONTACT.domain}/terms` },
};

export default function TermsPage() {
  return (
    <main className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <article className="prose prose-slate mx-auto max-w-3xl prose-headings:font-black prose-a:text-red-700">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">TC Construction Group</p>
        <h1>Website Terms</h1>
        <p className="lead">Effective July 26, 2026</p>

        <h2>General information only</h2>
        <p>
          This website provides general information about TC Construction Group capabilities, project-review processes, and protected operational tools. Content is not a construction proposal, bid, engineering opinion, legal opinion, safety determination, permit representation, warranty, or guarantee.
        </p>

        <h2>No contract or work authorization</h2>
        <p>
          A website submission, telephone conversation, site discussion, scheduling request, or preliminary review does not create a contract or authorize work. Scope, responsibilities, pricing, schedule, payment terms, insurance, permits, exclusions, warranties, and other obligations are established only through an authorized written agreement.
        </p>

        <h2>Availability and jurisdiction</h2>
        <p>
          Services are subject to scope review, location, applicable licensing and registration requirements, partner structure, insurance, bonding, workforce and subcontractor capacity, material availability, access, permitting, and commercial terms. Website descriptions do not represent that every service is available in every jurisdiction.
        </p>

        <h2>Emergency and safety matters</h2>
        <p>
          The website and project-intake service are not emergency-dispatch systems. For fire, gas odor, electrical arcing, structural instability, serious flooding, injury, or immediate danger, leave the hazardous area and contact emergency services or the appropriate utility provider. Do not rely on website content to determine that a condition is safe.
        </p>

        <h2>Estimates and project information</h2>
        <p>
          Preliminary discussions may rely on information supplied by the requester and may change after plans, specifications, selections, existing conditions, access, utilities, code requirements, permits, procurement, or other constraints are reviewed. Only an authorized written estimate or proposal states the applicable commercial terms.
        </p>

        <h2>Protected workspaces</h2>
        <p>
          Operations and capture workspaces are restricted to authorized users. Users must protect credentials, access only information they are authorized to view, and avoid uploading malicious, unlawful, privileged, export-controlled, or unnecessarily sensitive material. Access may be limited, suspended, logged, or revoked for security or operational reasons.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Website designs, text, graphics, logos, workflows, and other materials are owned by or licensed to TC Construction Group or its affiliated organizations unless otherwise indicated. No rights are granted except the limited right to use the website for legitimate evaluation and business communication.
        </p>

        <h2>Third-party services and links</h2>
        <p>
          The website may link to or depend on external hosting, identity, communications, CRM, scheduling, analytics, government information, or other providers. TCCG does not control every third-party service and is not responsible for external content, availability, policies, or security practices.
        </p>

        <h2>Acceptable use</h2>
        <p>
          You may not attempt unauthorized access, interfere with service operation, scrape protected content, submit false or deceptive requests, upload malicious code, misuse contact channels, or use the website in violation of law or third-party rights.
        </p>

        <h2>Disclaimer and limitation</h2>
        <p>
          To the maximum extent permitted by law, the website is provided on an as-available basis without implied guarantees regarding uninterrupted availability, completeness, suitability, or error-free operation. Contractual rights and remedies, when applicable, are governed by the executed agreement rather than this website.
        </p>

        <h2>Contact</h2>
        <p>
          Questions may be directed to <a href={`mailto:${TCCG_CONTACT.email}`}>{TCCG_CONTACT.email}</a> or <a href={TCCG_CONTACT.phone.telHref}>{TCCG_CONTACT.phone.display}</a>.
        </p>

        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          These operational website terms should receive legal review before final production approval and whenever services, jurisdictions, contracting structures, or protected platform functions materially change.
        </p>
      </article>
    </main>
  );
}
