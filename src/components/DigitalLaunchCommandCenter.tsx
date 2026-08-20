"use client";

import { useMemo, useState } from "react";

import {
  agentPrototypes,
  bimStandard,
  capabilityStatement,
  cdeStandard,
  costCodes,
  estimatingAssemblies,
  governmentReadiness,
  hseWorkflow,
  launchReadiness,
  launchWorkstreams,
  ownerDashboardMetrics,
  portfolioPolicy,
  preconstructionProcess,
  procurementWorkflow,
  projectTemplates,
  qcWorkflow,
  riskTransferReadiness,
  subcontractors,
  trainingPipeline,
  vendorTargets,
} from "@/lib/digitalLaunch";

type Tab = "overview" | "standards" | "commercial" | "delivery" | "workforce" | "government";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Launch Overview" },
  { id: "standards", label: "BIM + CDE" },
  { id: "commercial", label: "Estimating + Procurement" },
  { id: "delivery", label: "QC + HSE + Owners" },
  { id: "workforce", label: "Training + Agents" },
  { id: "government", label: "Government + Risk" },
];

const statusClass = {
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
  in_progress: "border-amber-200 bg-amber-50 text-amber-800",
  blocked: "border-red-200 bg-red-50 text-red-800",
  planned: "border-slate-200 bg-slate-50 text-slate-700",
};

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{body}</p>
    </div>
  );
}

function DataCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Workflow({ steps }: { steps: Array<{ id: string; name: string; owner: string; exitCriteria: string }> }) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{step.name}</p>
            <p className="text-xs text-slate-500">Owner: {step.owner}</p>
            <p className="mt-1 text-sm text-slate-600">Exit: {step.exitCriteria}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DigitalLaunchCommandCenter() {
  const [tab, setTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");
  const readiness = launchReadiness();

  const filteredWorkstreams = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return launchWorkstreams;
    return launchWorkstreams.filter((item) =>
      [item.name, item.owner, item.status, item.launchGate, ...item.evidence]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const readyCount = launchWorkstreams.filter((item) => item.status === "ready").length;
  const progressingCount = launchWorkstreams.filter((item) => item.status === "in_progress").length;
  const gateCount = launchWorkstreams.filter((item) => item.completion < 100).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">TCCG Digital Launch Phase</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Construction operating system launch command center</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Governed standards, registries, workflows, training and readiness controls for a technology-forward general contractor. The command center distinguishes implemented structure from external items that still require verification, contracts or production system integrations.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 lg:min-w-64">
              <p className="text-xs uppercase tracking-wider text-slate-400">Launch readiness</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-black">{readiness}</span>
                <span className="pb-1 text-lg text-slate-400">%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-orange-500" style={{ width: `${readiness}%` }} />
              </div>
              <a href="/api/digital-launch" className="mt-4 inline-flex text-sm font-semibold text-orange-300 hover:text-orange-200">
                Open machine-readable registry →
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === item.id ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {tab === "overview" && (
          <div className="space-y-8">
            <SectionTitle eyebrow="Control plane" title="One launch register across 19 workstreams" body="Every workstream has an accountable owner, readiness percentage, external launch gate and evidence target. This prevents a polished website from being mistaken for operational readiness." />

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Structurally ready", readyCount, "Implemented standards, schemas or workflows"],
                ["External integration", progressingCount, "Requires live providers, records or relationships"],
                ["Open launch gates", gateCount, "Not yet at a verified 100% production state"],
              ].map(([label, value, caption]) => (
                <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">{label}</p>
                  <p className="mt-2 text-4xl font-black text-slate-950">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{caption}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-bold text-slate-950">Workstream register</h3>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search workstream, owner or gate"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-orange-500 focus:ring-2 sm:max-w-sm"
                />
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {filteredWorkstreams.map((item) => (
                  <article key={item.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <p className="text-xs text-slate-500">Owner: {item.owner}</p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass[item.status]}`}>
                        {item.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full bg-slate-900" style={{ width: `${item.completion}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{item.completion}%</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-800">Launch gate:</span> {item.launchGate}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <DataCard title="Capabilities statement architecture">
                <p className="text-sm leading-6 text-slate-600">{capabilityStatement.positioning}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {capabilityStatement.naics.map((code) => <span key={code} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">NAICS {code}</span>)}
                </div>
                <p className="mt-4 text-xs leading-5 text-amber-800">Verified-only fields: {capabilityStatement.verifiedOnlyFields.join(", ")}.</p>
              </DataCard>
              <DataCard title="Portfolio evidence rule">
                <p className="text-sm leading-6 text-slate-600">{portfolioPolicy.rule}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Required case-study evidence</p>
                <p className="mt-2 text-sm text-slate-600">{portfolioPolicy.caseStudyFields.join(" • ")}</p>
              </DataCard>
            </div>
          </div>
        )}

        {tab === "standards" && (
          <div className="space-y-8">
            <SectionTitle eyebrow="Information management" title="BIM standard and Common Data Environment" body="The baseline follows ISO 19650 concepts: defined information requirements, controlled information states, disciplined approvals, revision metadata and security-minded access." />
            <div className="grid gap-5 lg:grid-cols-2">
              <DataCard title={`${bimStandard.version} — core principles`}>
                <ul className="space-y-3 text-sm leading-6 text-slate-600">{bimStandard.principles.map((item) => <li key={item}>• {item}</li>)}</ul>
                <div className="mt-5 rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200">{bimStandard.naming}</div>
              </DataCard>
              <DataCard title={`${cdeStandard.version} — information states`}>
                <div className="space-y-3">
                  {cdeStandard.states.map((state) => (
                    <div key={state.state} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex items-center justify-between"><span className="font-bold text-slate-900">{state.state}</span><span className="text-xs text-slate-500">Authority: {state.publishAuthority}</span></div>
                      <p className="mt-1 text-sm text-slate-600">{state.purpose}</p>
                    </div>
                  ))}
                </div>
              </DataCard>
            </div>
            <DataCard title="CDE control requirements">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cdeStandard.controls.map((control) => <div key={control} className="rounded-xl bg-slate-100 p-3 text-sm font-medium text-slate-700">{control}</div>)}
              </div>
            </DataCard>
          </div>
        )}

        {tab === "commercial" && (
          <div className="space-y-8">
            <SectionTitle eyebrow="Commercial engine" title="Estimate, buyout and supply-chain continuity" body="Cost codes follow an internal TCCG taxonomy aligned to common construction divisions. Material allowances remain zero until a traceable supplier quote exists, preventing stale or invented pricing from entering the estimate." />
            <div className="grid gap-5 xl:grid-cols-2">
              <DataCard title={`Cost-code register (${costCodes.length})`}>
                <div className="max-h-[34rem] overflow-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-white text-xs uppercase text-slate-500"><tr><th className="pb-2">Code</th><th className="pb-2">Family</th><th className="pb-2">Description</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">{costCodes.map((item) => <tr key={item.code}><td className="py-2 font-mono font-bold text-slate-900">{item.code}</td><td className="py-2 text-slate-600">{item.family}</td><td className="py-2 text-slate-600">{item.description}</td></tr>)}</tbody>
                  </table>
                </div>
              </DataCard>
              <DataCard title="Estimating assemblies">
                <div className="space-y-3">{estimatingAssemblies.map((item) => <div key={item.id} className="rounded-xl border border-slate-200 p-3"><div className="flex justify-between gap-4"><p className="font-semibold text-slate-900">{item.name}</p><span className="font-mono text-xs text-slate-500">{item.id}</span></div><p className="mt-1 text-sm text-slate-600">{item.baselineLaborHours} labor hrs / {item.unit}</p><p className="mt-1 text-xs text-slate-500">{item.source}</p></div>)}</div>
              </DataCard>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <DataCard title="Procurement workflow"><Workflow steps={procurementWorkflow} /></DataCard>
              <DataCard title={`Subcontractor prequalification database (${subcontractors.length} seed slots)`}>
                <div className="space-y-3">{subcontractors.map((sub) => <div key={sub.id} className="rounded-xl border border-slate-200 p-3"><p className="font-semibold text-slate-900">{sub.company}</p><p className="text-xs text-slate-500">{sub.trade} • {sub.geography}</p><div className="mt-2 grid grid-cols-3 gap-2 text-xs"><span className="rounded bg-slate-100 p-2">Safety: {sub.safetyStatus}</span><span className="rounded bg-slate-100 p-2">Insurance: {sub.insuranceStatus}</span><span className="rounded bg-slate-100 p-2">Bond: {sub.bondingStatus}</span></div></div>)}</div>
              </DataCard>
            </div>
            <DataCard title="Vendor relationship targets">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{vendorTargets.map((vendor) => <div key={vendor.id} className="rounded-xl border border-slate-200 p-4"><div className="flex justify-between gap-3"><p className="font-bold text-slate-900">{vendor.organization}</p><span className="text-xs font-semibold text-amber-700">{vendor.relationship}</span></div><p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{vendor.category}</p><p className="mt-3 text-sm text-slate-600">{vendor.purpose}</p><p className="mt-3 text-xs font-medium text-slate-700">Next: {vendor.nextAction}</p></div>)}</div>
            </DataCard>
          </div>
        )}

        {tab === "delivery" && (
          <div className="space-y-8">
            <SectionTitle eyebrow="Execution assurance" title="Quality, safety and owner transparency" body="Delivery workflows use explicit evidence and exit criteria so project status can be audited rather than inferred from narrative updates." />
            <div className="grid gap-5 xl:grid-cols-3">
              <DataCard title="QC workflow"><Workflow steps={qcWorkflow} /></DataCard>
              <DataCard title="HSE workflow"><Workflow steps={hseWorkflow} /></DataCard>
              <DataCard title="Preconstruction workflow"><Workflow steps={preconstructionProcess} /></DataCard>
            </div>
            <DataCard title="Owner dashboard data contract">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{ownerDashboardMetrics.map((group) => <div key={group.category} className="rounded-xl border border-slate-200 p-4"><p className="font-bold text-slate-900">{group.category}</p><ul className="mt-2 space-y-1 text-sm text-slate-600">{group.metrics.map((metric) => <li key={metric}>• {metric}</li>)}</ul></div>)}</div>
            </DataCard>
            <DataCard title="Project templates">
              <div className="grid gap-4 md:grid-cols-2">{projectTemplates.map((template) => <div key={template.id} className="rounded-xl bg-slate-100 p-4"><p className="font-bold text-slate-900">{template.name}</p><p className="mt-2 text-sm text-slate-600">{template.stages.join(" → ")}</p></div>)}</div>
            </DataCard>
          </div>
        )}

        {tab === "workforce" && (
          <div className="space-y-8">
            <SectionTitle eyebrow="Tolani Labs pipeline" title="Train → simulate → intern → deploy → learn" body="The workforce model ties training to real TCCG role demand and routes validated project lessons back into curriculum rather than treating training as a separate academic activity." />
            <div className="grid gap-4 md:grid-cols-5">{trainingPipeline.map((stage, index) => <div key={stage.stage} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-xs font-black text-orange-600">0{index + 1}</div><p className="mt-2 font-bold text-slate-900">{stage.stage}</p><p className="text-xs text-slate-500">{stage.duration}</p><ul className="mt-3 space-y-1 text-sm text-slate-600">{stage.outcomes.map((outcome) => <li key={outcome}>• {outcome}</li>)}</ul></div>)}</div>
            <DataCard title={`AI construction staff prototypes (${agentPrototypes.length})`}>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{agentPrototypes.map((agent) => <div key={agent.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><p className="font-bold text-slate-900">{agent.name}</p><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600">{agent.autonomy}</span></div><p className="mt-2 text-sm text-slate-600">{agent.mission}</p><p className="mt-3 text-xs text-slate-500">Outputs: {agent.produces.join(", ")}</p><p className="mt-2 text-xs font-semibold text-amber-800">Human approval: {agent.approvalRequired ? "required" : "not required"}</p></div>)}</div>
            </DataCard>
          </div>
        )}

        {tab === "government" && (
          <div className="space-y-8">
            <SectionTitle eyebrow="Capture readiness" title="Federal registration, bonding and insurance gates" body="The system records government readiness as verification tasks. It does not assume SAM, CAGE, VetCert, license, bond or insurance status without evidence." />
            <div className="grid gap-5 xl:grid-cols-2">
              <DataCard title="Government readiness register">
                <div className="space-y-3">{governmentReadiness.map((item) => <div key={item.id} className="rounded-xl border border-slate-200 p-3"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-slate-900">{item.item}</p><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{item.status}</span></div><p className="mt-2 text-sm text-slate-600">{item.requirement}</p></div>)}</div>
              </DataCard>
              <DataCard title="Bonding / insurance readiness">
                <div className="space-y-3">{riskTransferReadiness.map((item) => <div key={item.item} className="rounded-xl border border-slate-200 p-3"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-slate-900">{item.item}</p><span className="text-xs font-bold uppercase text-slate-500">{item.status}</span></div><p className="mt-2 text-sm text-slate-600">{item.evidence}</p></div>)}</div>
              </DataCard>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-6 text-orange-950">
              Federal construction bonding is opportunity-specific. The launch registry intentionally treats surety capacity, insurance limits, SAM status, CAGE, certifications and state licenses as evidence fields that must be verified before TCCG represents them in a proposal or capabilities statement.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
