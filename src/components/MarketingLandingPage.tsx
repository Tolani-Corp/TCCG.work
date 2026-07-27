import Image from "next/image";
import Link from "next/link";

import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import { versionedAsset } from "@/lib/brandAssets";
import { TCCG_CONTACT } from "@/lib/contact";

const services = [
  {
    number: "01",
    title: "Facility modernization",
    description:
      "Condition discovery, phased retrofit planning, occupied-facility coordination, and owner-ready scope development for buildings that need measurable improvement.",
    outcomes: ["Existing-condition review", "Phasing and access planning", "Decision-ready project scope"],
  },
  {
    number: "02",
    title: "HVAC and building controls",
    description:
      "Replacement, controls, indoor-air-quality, and energy-improvement opportunities coordinated around operational continuity, constructability, and documentation.",
    outcomes: ["Equipment and controls review", "Operational-risk planning", "Commissioning and closeout support"],
  },
  {
    number: "03",
    title: "BIM and MEP coordination",
    description:
      "Model-supported coordination, clash and access review, RFI discipline, and field handoff for general contractors, owners, and specialty-trade teams.",
    outcomes: ["Coordination issue tracking", "Model and field alignment", "Clear responsibility and handoff"],
  },
  {
    number: "04",
    title: "Commercial project support",
    description:
      "Renovation, tenant-improvement, project-planning, subcontracting, and closeout support structured around scope clarity and accountable execution.",
    outcomes: ["Preconstruction support", "Schedule and risk visibility", "Owner-facing records"],
  },
  {
    number: "05",
    title: "Public-sector opportunity review",
    description:
      "Go/no-go analysis, teaming support, compliance review, schedule assessment, and proposal-to-delivery planning for qualified government opportunities.",
    outcomes: ["Solicitation and scope review", "Partner and capacity assessment", "Compliance-aware pursuit plan"],
  },
  {
    number: "06",
    title: "Smart-building integration",
    description:
      "Technology, controls, low-voltage, monitoring, and data requirements coordinated with the physical building work rather than treated as an afterthought.",
    outcomes: ["Integration requirements", "Vendor coordination", "Operations and data handoff"],
  },
] as const;

const sectors = [
  {
    title: "Facility owners and operators",
    detail: "Occupied buildings, portfolio upgrades, deferred maintenance, comfort complaints, energy initiatives, and capital-planning decisions.",
  },
  {
    title: "General contractors and developers",
    detail: "MEP coordination, specialty scopes, renovation support, schedule-sensitive packages, field issue resolution, and clean closeout.",
  },
  {
    title: "Commercial and institutional clients",
    detail: "Offices, retail, multifamily common areas, warehouses, schools, healthcare-adjacent facilities, and community infrastructure.",
  },
  {
    title: "Public-sector and prime partners",
    detail: "Government facility work, subcontracting, teaming, grant-supported modernization, compliance-heavy pursuits, and mission support.",
  },
] as const;

const process = [
  { step: "01", title: "Discover", detail: "Define the facility, business need, current conditions, urgency, decision makers, and desired outcome." },
  { step: "02", title: "Qualify", detail: "Review scope fit, jurisdiction, access, documentation, schedule, budget posture, safety, and delivery constraints." },
  { step: "03", title: "Plan", detail: "Establish the appropriate assessment, estimating, coordination, procurement, permitting, and communication path." },
  { step: "04", title: "Deliver", detail: "Execute approved work through accountable owners, visible risks, controlled changes, and field-ready information." },
  { step: "05", title: "Verify", detail: "Close with inspections, records, training, deficiencies, warranties, and owner-ready evidence appropriate to the scope." },
] as const;

const faqs = [
  {
    question: "What types of projects should I submit?",
    answer:
      "Submit commercial or institutional modernization, HVAC, controls, BIM/MEP coordination, renovation, smart-building, public-sector, or qualified subcontracting opportunities. Residential or specialty work is reviewed by location, scope, licensure, and capacity.",
  },
  {
    question: "Can TCCG provide a price over the phone?",
    answer:
      "A reliable construction price depends on scope, plans, selections, existing conditions, access, permitting, schedule, material availability, and contract terms. Sona or the intake team can qualify the request, but pricing is issued only through an authorized estimate or proposal.",
  },
  {
    question: "Does submitting the form schedule a site visit?",
    answer:
      "No. Submission creates a project-review request. The team will determine whether the next step should be a phone consultation, document review, site visit, service request, teaming discussion, or decline notice.",
  },
  {
    question: "Do you handle urgent hazards?",
    answer:
      "TCCG is not an emergency-dispatch service. For fire, gas odor, electrical arcing, structural instability, serious flooding, injury, or immediate danger, move away from the hazard and contact emergency services or the appropriate utility provider first.",
  },
  {
    question: "Where does TCCG operate?",
    answer:
      "The primary intake line supports South Florida and reviews commercial, institutional, and public-sector opportunities in other markets. Final service availability depends on jurisdiction, licensing, contract structure, partners, scope, and capacity.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2">
      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-current stroke-2">
      <path d="m4 10 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MarketingLandingPage() {
  return (
    <main className="bg-white text-slate-950">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image src={versionedAsset("/marketing/tccg-operations-hero.png")} alt="Commercial mechanical equipment and building operations" fill sizes="100vw" className="-z-30 object-cover opacity-55" priority />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/45" />
        <div className="absolute inset-0 -z-10 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] lg:px-8 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-red-200">
              TC Construction Group
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Modernize buildings. Coordinate the work. Deliver proof.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
              TCCG helps owners, contractors, institutions, and public-sector partners turn facility needs into defined scopes, coordinated execution, and owner-ready closeout.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Request project review <ArrowIcon />
              </Link>
              <a href={TCCG_CONTACT.phone.telHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">
                Call {TCCG_CONTACT.phone.display}
              </a>
            </div>

            <div className="mt-10 grid gap-3 text-sm font-bold text-white/75 sm:grid-cols-3">
              {["Commercial and institutional focus", "Scope-first project review", "Field and closeout accountability"].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
                  <span className="text-red-300"><CheckIcon /></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="self-end rounded-3xl border border-white/12 bg-white/[0.08] p-6 shadow-2xl backdrop-blur sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-200">Start with the right next step</p>
            <h2 className="mt-3 text-2xl font-black text-white">Every request is qualified before a price or schedule is promised.</h2>
            <div className="mt-7 grid gap-4">
              {[
                ["Project need", "What problem, improvement, or opportunity must be addressed?"],
                ["Facility conditions", "What is known about location, access, occupancy, plans, and current systems?"],
                ["Delivery constraints", "What timeline, procurement, permit, compliance, and coordination requirements apply?"],
                ["Decision path", "Who approves scope, budget, schedule, and the next project action?"],
              ].map(([title, detail], index) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-600 text-xs font-black text-white">{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            ["Scope", "Define before pricing"],
            ["Coordination", "Align design and field"],
            ["Risk", "Surface constraints early"],
            ["Closeout", "Deliver usable records"],
          ].map(([label, detail]) => (
            <div key={label} className="border-l-4 border-red-600 pl-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-black text-slate-950">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">Capabilities</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">Building work organized around owner outcomes.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              TCCG combines construction planning, technical coordination, project controls, and closeout discipline so the physical work and the operating record move together.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-7">
                <span className="text-4xl font-black text-slate-100">{service.number}</span>
                <h3 className="mt-5 text-xl font-black text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                <ul className="mt-6 grid gap-2 border-t border-slate-200 pt-5 text-sm font-semibold text-slate-700">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2"><span className="text-red-600"><CheckIcon /></span>{outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sectors" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">Who we serve</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">One disciplined intake path for different buyers.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The project language changes by audience, but the fundamentals stay consistent: scope, conditions, constraints, authority, schedule, risk, and evidence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {sectors.map((sector, index) => (
                <article key={sector.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-black text-red-300">{index + 1}</span>
                  <h3 className="mt-6 text-xl font-black text-slate-950">{sector.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{sector.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-red-300">Delivery process</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">A controlled path from request to verified closeout.</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              The exact contract model depends on the opportunity, but every qualified engagement should move through an understandable decision and delivery sequence.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {process.map((item) => (
              <article key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-black text-red-300">{item.step}</p>
                <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">Risk and trust</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">Clear boundaries protect the owner and the project.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A website request is the beginning of qualification—not a contract, emergency dispatch, engineering conclusion, permit approval, or guarantee of price and availability.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["No unsupported price promises", "No hidden scope assumptions", "No declaration that a hazard is safe", "No work authorization without agreement", "No guarantee of permit or inspection approval", "No collection of passwords or payment-card details"].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
                  <span className="text-red-600"><CheckIcon /></span>{item}
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">Immediate hazards</p>
            <h3 className="mt-3 text-2xl font-black text-slate-950">Move away from danger and contact the proper emergency authority first.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Fire, smoke, gas odor, electrical arcing, structural instability, serious flooding, injury, and immediate threats to occupants require emergency services or the appropriate utility provider. Do not touch exposed wiring, enter an unstable area, or attempt hazardous repairs.
            </p>
          </aside>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">Before you submit.</h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-slate-300">
                <summary className="cursor-pointer list-none pr-8 text-base font-black text-slate-950 marker:hidden">{item.question}</summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-slate-100 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">Project review</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">Give the team enough information to make the next conversation useful.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Include the facility, requested outcome, current conditions, project type, timing, documents available, access constraints, and the decision you need from TCCG.
            </p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Direct contact</p>
              <a href={TCCG_CONTACT.phone.telHref} className="mt-2 block text-2xl font-black text-slate-950 hover:text-red-700">{TCCG_CONTACT.phone.display}</a>
              <a href={`mailto:${TCCG_CONTACT.email}`} className="mt-1 block text-sm font-bold text-slate-600 hover:text-slate-950">{TCCG_CONTACT.email}</a>
              <p className="mt-4 text-sm leading-6 text-slate-500">{TCCG_CONTACT.serviceArea}</p>
            </div>
          </div>
          <ProjectIntakeForm />
        </div>
      </section>
    </main>
  );
}
