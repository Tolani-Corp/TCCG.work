import type { Metadata } from "next";

import { ContactIntake } from "@/components/ContactIntake";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a TCCG construction, HVAC, BIM/VDC, public-sector or teaming project review.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-[var(--border-subtle)] bg-slate-950 text-white">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Project Intake</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Start with the scope, constraints and evidence.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">Send enough information for TCCG to evaluate service fit, location, schedule, procurement method, licensing, staffing, bonding/insurance and project-data requirements before making a commitment.</p>
        </div>
      </section>
      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto grid max-w-[90rem] gap-8 px-6 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-20">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">Useful intake information</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>• project location and owner / prime</li>
              <li>• scope and expected contract role</li>
              <li>• drawings, specifications or solicitation availability</li>
              <li>• bid / proposal / mobilization dates</li>
              <li>• procurement method and contract type</li>
              <li>• special licensing, bonding, insurance or certification requirements</li>
              <li>• BIM/CDE, cybersecurity or owner-information requirements</li>
              <li>• teaming or subcontracting workshare expectations</li>
            </ul>
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">Do not send controlled, classified, CUI, export-controlled, medical, payment-card or other sensitive project information through a public email channel unless the receiving method has been approved for that information.</div>
          </div>
          <ContactIntake />
        </div>
      </section>
    </div>
  );
}
