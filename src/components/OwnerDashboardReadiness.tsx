"use client";

import { useMemo, useState } from "react";

import { ownerDashboardMetrics } from "@/lib/digitalLaunch";

type ConnectionState = "not_connected" | "configured" | "verified";

type SourceConnection = {
  category: string;
  system: string;
  owner: string;
  state: ConnectionState;
  evidence: string;
};

const initialConnections: SourceConnection[] = ownerDashboardMetrics.map((group) => ({
  category: group.category,
  system: "Production source not yet bound",
  owner: group.category === "HSE" ? "Safety" : group.category === "Quality" ? "QC" : "Project Controls",
  state: "not_connected",
  evidence: "Bind source system, field mapping, reporting period and validation owner before project reporting.",
}));

const stateClasses: Record<ConnectionState, string> = {
  not_connected: "border-amber-200 bg-amber-50 text-amber-800",
  configured: "border-sky-200 bg-sky-50 text-sky-800",
  verified: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function OwnerDashboardReadiness() {
  const [selected, setSelected] = useState(ownerDashboardMetrics[0].category);
  const [connections, setConnections] = useState(initialConnections);
  const group = ownerDashboardMetrics.find((item) => item.category === selected) ?? ownerDashboardMetrics[0];
  const connection = connections.find((item) => item.category === group.category) ?? connections[0];

  const readiness = useMemo(() => {
    const score = connections.reduce((total, item) => total + (item.state === "verified" ? 1 : item.state === "configured" ? 0.5 : 0), 0);
    return Math.round((score / connections.length) * 100);
  }, [connections]);

  function advanceConnection() {
    setConnections((current) =>
      current.map((item) => {
        if (item.category !== selected) return item;
        if (item.state === "not_connected") return { ...item, state: "configured", system: "Configuration candidate — validation required" };
        if (item.state === "configured") return { ...item, state: "verified", system: "Verified source placeholder — attach production evidence before release" };
        return { ...item, state: "not_connected", system: "Production source not yet bound" };
      }),
    );
  }

  return (
    <div>
      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[90rem] px-6 py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Owner Dashboard Template</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold sm:text-5xl">Source-backed reporting readiness</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/65">This pre-production workspace validates the dashboard data contract and source ownership without inventing project KPIs. Live owner metrics should appear only after system-of-record mappings and reporting controls are verified.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wider text-white/50">Source readiness</p>
              <p className="mt-2 text-4xl font-black">{readiness}%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto grid max-w-[90rem] gap-6 px-6 py-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-8">
          <aside className="space-y-2">
            {ownerDashboardMetrics.map((item) => {
              const source = connections.find((sourceItem) => sourceItem.category === item.category);
              return (
                <button key={item.category} type="button" onClick={() => setSelected(item.category)} className={`w-full rounded-xl border p-3 text-left transition ${selected === item.category ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  <span className="block text-sm font-bold">{item.category}</span>
                  <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${selected === item.category ? "border-white/15 bg-white/10 text-white/70" : stateClasses[source?.state ?? "not_connected"]}`}>{(source?.state ?? "not_connected").replace("_", " ")}</span>
                </button>
              );
            })}
          </aside>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">{group.category}</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">Owner metric contract</h2>
                  <p className="mt-2 text-sm text-slate-600">Owner: {connection.owner}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${stateClasses[connection.state]}`}>{connection.state.replace("_", " ")}</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {group.metrics.map((metric) => (
                  <div key={metric} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{metric}</p>
                    <p className="mt-2 text-xs text-slate-500">Value withheld until production source, reporting period and validation rule are connected.</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-950">Source connection</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div><dt className="text-slate-500">System</dt><dd className="font-semibold text-slate-900">{connection.system}</dd></div>
                  <div><dt className="text-slate-500">Validation evidence</dt><dd className="text-slate-700">{connection.evidence}</dd></div>
                </dl>
                <button type="button" onClick={advanceConnection} className="mt-5 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">Cycle prototype connection state</button>
                <p className="mt-3 text-xs text-slate-500">Prototype state changes are browser-only and do not establish a real source connection.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-950">Release rule</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• identify the system of record and responsible owner</li>
                  <li>• define field mapping and reporting period</li>
                  <li>• document calculation rules and exceptions</li>
                  <li>• validate against source records</li>
                  <li>• define owner-visible permissions</li>
                  <li>• record data freshness and last successful sync</li>
                  <li>• suppress stale or unverified metrics instead of guessing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
