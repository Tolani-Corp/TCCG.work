import {
  agentStaffProfiles,
  constructionSystemAdapters,
  sharedTaskStaffServices,
  staffingKpis,
  staffingPhaseDemand,
  staffingReadinessGates,
  staffingWorkflow,
  taskStaffStaffingModel,
} from "@/lib/taskstaffStaffing";

export function TaskStaffWorkforcePanel() {
  return (
    <section id="taskstaff-workforce" className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">TaskStaff × TCCG workforce plane</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Human + AI construction staffing with evidence-gated readiness.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              TaskStaff converts TCCG project demand into bounded HUMAN, AGENT, SERVICE and HYBRID_TEAM staffing recommendations. It verifies competencies, credentials, availability and backup coverage before mobilization while TCCG retains project, safety, quality, contractual, financial and acceptance authority.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 lg:max-w-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">{taskStaffStaffingModel.status.replaceAll("_", " ")}</span>
              <span className="rounded-full border border-amber-300/30 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-200">Production disabled</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-amber-100">{taskStaffStaffingModel.nonSubstitutionRule}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Construction agents", agentStaffProfiles.length, "TCCG aliases bound to TaskStaff roles"],
            ["Staffing workflow gates", staffingWorkflow.length, "Demand through demobilization + learning"],
            ["Shared staffing services", sharedTaskStaffServices.length, "Assignment, credentials, availability, backup, training"],
            ["System adapters", constructionSystemAdapters.length, "Fail-closed until separately verified"],
          ].map(([label, value, caption]) => (
            <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</p>
              <p className="mt-2 text-4xl font-black">{value}</p>
              <p className="mt-2 text-xs leading-5 text-white/55">{caption}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Shared TaskStaff services</p>
            <div className="mt-4 space-y-3">
              {sharedTaskStaffServices.map((service) => (
                <div key={service.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{service.name}</p>
                    <span className="font-mono text-[10px] text-white/45">{service.id}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">{service.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Fail-closed readiness gates</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {staffingReadinessGates.map((item) => (
                <div key={item.gate} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="font-semibold">{item.gate}</p>
                  <p className="mt-2 text-xs leading-5 text-white/55">Block: {item.failClosedOn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Staffing lifecycle</p>
            <h3 className="mt-2 text-2xl font-bold">Demand → qualify → match → approve → mobilize → monitor → learn</h3>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {staffingWorkflow.map((step, index) => (
              <div key={step.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">{index + 1}</span>
                  <div>
                    <p className="font-semibold">{step.name}</p>
                    <p className="text-[11px] text-white/45">Owner: {step.owner}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/55">Exit: {step.exit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">14-agent construction staff</p>
            <h3 className="mt-2 text-2xl font-bold">Each prototype now has a TaskStaff identity, human counterpart, skill stack and governed toolchain.</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">External adapters are capability contracts only until credentials, tenant/project mapping, sandbox acceptance, audit logging and release evidence are complete.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agentStaffProfiles.map((agent) => (
              <article key={agent.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{agent.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-orange-300">{agent.id} → {agent.taskStaffId}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold uppercase text-white/55">Human-gated</span>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/45">Human counterparts</p>
                <p className="mt-1 text-sm leading-6 text-white/70">{agent.humanCounterparts.join(" • ")}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/45">Skills</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{agent.skills.map((skill) => <span key={skill} className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">{skill}</span>)}</div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/45">Core tools</p>
                <p className="mt-1 text-xs leading-5 text-white/60">{agent.tools.join(" • ")}</p>
                {agent.adapters.length > 0 && <><p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/45">Adapters</p><p className="mt-1 font-mono text-[11px] leading-5 text-amber-200/80">{agent.adapters.join(" • ")}</p></>}
                <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-amber-100/75">{agent.authorityBoundary}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Phase-driven staffing demand</p>
            <div className="mt-4 space-y-3">
              {staffingPhaseDemand.map((phase) => (
                <div key={phase.phase} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{phase.phase}</p><span className="text-xs text-white/45">{phase.agents.length} AI support roles</span></div>
                  <p className="mt-2 text-xs leading-5 text-white/55">Agents: {phase.agents.join(", ")}</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">Human focus: {phase.humanFocus.join(" • ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">External adapter registry</p>
            <div className="mt-4 space-y-3">
              {constructionSystemAdapters.map((adapter) => (
                <div key={adapter.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{adapter.target}</p><p className="mt-1 text-xs text-white/45">{adapter.domain} • {adapter.id}</p></div><span className="rounded-full bg-amber-400/10 px-2 py-1 text-[10px] font-bold uppercase text-amber-200">{adapter.status.replaceAll("_", " ")}</span></div>
                  <p className="mt-2 text-xs leading-5 text-white/55">{adapter.boundary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Staffing scorecard</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {staffingKpis.map((kpi) => <div key={kpi} className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-sm text-white/65">{kpi}</div>)}
          </div>
          <a href="/api/taskstaff-staffing" className="mt-5 inline-flex text-sm font-semibold text-orange-300 hover:text-orange-200">Open machine-readable staffing registry →</a>
        </div>
      </div>
    </section>
  );
}
