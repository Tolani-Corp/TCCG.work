"use client";

import { FormEvent, useMemo, useState } from "react";

import type {
  CaptureOpportunity,
  CaptureSearchResult,
  CaptureShortfall,
  CaptureSourceStatus,
  CaptureSourceType,
  CaptureStage,
  CaptureDecision,
  CaptureRisk,
} from "@/lib/captureSources";

type FilterValue<T extends string> = T | "All";

type CaptureTask = {
  id: string;
  opportunityId: string;
  title: string;
  owner: string;
  status: "Queued" | "In review" | "Done";
  due: string;
};

const stageLanes: Array<{ id: CaptureStage; label: string; caption: string }> = [
  { id: "source", label: "Source", caption: "API leads" },
  { id: "qualify", label: "Qualify", caption: "fit check" },
  { id: "go-no-go", label: "Go/No-Go", caption: "decision gate" },
  { id: "teaming", label: "Teaming", caption: "prime and subs" },
  { id: "proposal", label: "Proposal", caption: "price and write" },
  { id: "submit", label: "Submit", caption: "package ready" },
];

const stageOrder = stageLanes.map((lane) => lane.id);

const defaultSourceStatuses: CaptureSourceStatus[] = [
  {
    id: "tccg.source.grants_gov.search2",
    name: "Grants.gov Search2 API",
    url: "https://api.grants.gov/v1/api/search2",
    status: "scanned",
    count: 2,
  },
  {
    id: "tccg.source.sam_gov.opportunities",
    name: "SAM.gov Contract Opportunities API",
    url: "https://api.sam.gov/opportunities/v2/search",
    status: "skipped",
    count: 0,
    note: "Configure SAM_GOV_API_KEY for federal contracting scans.",
  },
  {
    id: "tccg.source.candid.grants_api",
    name: "Candid Grants API",
    url: "https://developer.candid.org/",
    status: "skipped",
    count: 0,
    note: "Licensed API key required.",
  },
];

const seededOpportunities: CaptureOpportunity[] = [
  {
    id: "capture.seed.airport_controls",
    sourceTruthId: "tccg.capture_management.v1",
    sourceId: "seed:airport-controls",
    title: "Airport terminal building controls modernization",
    sourceName: "TCCG seeded capture queue",
    sourceType: "rfp",
    sourceUrl: "https://sam.gov/opportunities",
    deadline: "2026-07-15",
    postedDate: "2026-06-01",
    value: "$420,000",
    agency: "Regional airport authority",
    location: "Atlanta, GA",
    naics: "238220",
    setAside: "Small business review",
    status: "Pre-solicitation watch",
    matchedKeyword: "building automation",
    summary:
      "Controls replacement, trend verification, and commissioning support for occupied terminal mechanical systems.",
    eligibility:
      "Commercial mechanical contractor with public-sector procurement readiness, bonding, insurance, controls partner, and airport badging plan.",
    restrictions:
      "Public procurement, badging, after-hours work, wage controls, insurance, bonding, and safety plan requirements may apply.",
    tags: ["smart-hvac", "building-controls", "energy-retrofit", "construction"],
    fitScore: 86,
    confidence: 82,
    decision: "review",
    stage: "qualify",
    owner: "HVAC Lead",
    probability: 62,
    risk: "High",
    shortfalls: [
      {
        id: "seed.airport.procurement",
        title: "Procurement readiness",
        severity: "high",
        trigger: "Public owner and airport work carry access and compliance risk.",
        mitigation:
          "Confirm SAM/UEI status, insurance limits, bonding capacity, wage rules, and badging workflow.",
        owner: "Compliance Lead",
      },
      {
        id: "seed.airport.site-walk",
        title: "Site-walk control",
        severity: "medium",
        trigger: "Occupied terminal constraints can change labor and phasing.",
        mitigation:
          "Assign field lead for mandatory pre-bid, night-work constraints, controls cutover windows, and addenda watch.",
        owner: "Field Operations",
      },
    ],
    nextActions: [
      "Verify source package, deadline, eligibility, and response instructions.",
      "Confirm NAICS, bonding, insurance, badging, and site-walk requirements.",
      "Create pricing, controls partner, and commissioning evidence workstreams.",
    ],
    evidence: [
      "Source URL captured",
      "Deadline: 2026-07-15",
      "Value: $420,000",
      "NAICS: 238220",
      "Summary extracted",
    ],
  },
  {
    id: "capture.seed.energy_retrofit",
    sourceTruthId: "tccg.capture_management.v1",
    sourceId: "seed:multifamily-energy",
    title: "Multifamily energy retrofit grant partnership",
    sourceName: "TCCG seeded capture queue",
    sourceType: "grant",
    sourceUrl: "https://www.grants.gov/search-grants",
    deadline: "2026-08-02",
    postedDate: "2026-05-27",
    value: "$250,000",
    agency: "Energy resilience program",
    location: "Southeast portfolio",
    status: "Posted",
    matchedKeyword: "energy efficiency retrofit",
    summary:
      "Grant-backed owner partnership for HVAC tuneups, controls upgrades, energy reporting, and resident comfort evidence.",
    eligibility:
      "Eligible applicant may need nonprofit, housing, or municipal lead with TCCG positioned as delivery partner.",
    restrictions:
      "Federal grant reporting, match, Davis-Bacon review, audit trail, and evidence documentation may apply.",
    tags: ["energy-retrofit", "smart-hvac", "esg-compliance"],
    fitScore: 80,
    confidence: 78,
    decision: "review",
    stage: "go-no-go",
    owner: "ESG Lead",
    probability: 58,
    risk: "Medium",
    shortfalls: [
      {
        id: "seed.energy.eligibility",
        title: "Applicant role unclear",
        severity: "medium",
        trigger: "TCCG may need a prime applicant, fiscal sponsor, or owner partner.",
        mitigation:
          "Confirm eligible lead applicant, partner MOU, budget authority, and reporting owner before drafting.",
        owner: "Business Development",
      },
    ],
    nextActions: [
      "Verify eligible applicant type and source package.",
      "Confirm owner partner and budget split.",
      "Collect energy baseline, controls scope, and ESG reporting evidence.",
    ],
    evidence: [
      "Source URL captured",
      "Deadline: 2026-08-02",
      "Value: $250,000",
      "Summary extracted",
    ],
  },
  {
    id: "capture.seed.bim_school",
    sourceTruthId: "tccg.capture_management.v1",
    sourceId: "seed:school-bim",
    title: "K-12 renovation BIM and IAQ coordination",
    sourceName: "TCCG seeded capture queue",
    sourceType: "rfp",
    deadline: "Unknown",
    value: "$95,000",
    agency: "Charter campus network",
    location: "Columbia, SC",
    naics: "541330",
    status: "Market intelligence",
    matchedKeyword: "BIM",
    summary:
      "Renovation support opportunity combining BIM coordination, IAQ scope discovery, and mechanical system documentation.",
    eligibility:
      "Vendor registration, education-sector insurance, background controls, and local field coverage must be verified.",
    restrictions:
      "Deadline, site-walk, background check, procurement format, and insurance controls are not confirmed.",
    tags: ["bim-vdc", "smart-hvac", "construction"],
    fitScore: 69,
    confidence: 62,
    decision: "review",
    stage: "source",
    owner: "VDC Lead",
    probability: 50,
    risk: "High",
    shortfalls: [
      {
        id: "seed.bim.deadline",
        title: "Deadline not verified",
        severity: "high",
        trigger: "No response date is attached.",
        mitigation:
          "Verify RFP calendar, pre-bid meeting, Q&A deadline, and amendment channel before qualification.",
        owner: "Capture Manager",
      },
    ],
    nextActions: [
      "Find source notice and response calendar.",
      "Confirm VDC scope boundaries and IAQ deliverables.",
      "Run no-bid if the deadline is already inside the pricing window.",
    ],
    evidence: ["Value: $95,000", "NAICS: 541330", "Summary extracted"],
  },
];

const seededTasks: CaptureTask[] = [
  {
    id: "task.seed.airport.procurement",
    opportunityId: "capture.seed.airport_controls",
    title: "Confirm SAM, bonding, insurance, badging, and wage controls",
    owner: "Compliance Lead",
    status: "Queued",
    due: "2026-06-12",
  },
  {
    id: "task.seed.energy.partner",
    opportunityId: "capture.seed.energy_retrofit",
    title: "Confirm eligible applicant and owner partner role",
    owner: "Business Development",
    status: "In review",
    due: "2026-06-14",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CaptureManagementWorkspace() {
  const [opportunities, setOpportunities] = useState<CaptureOpportunity[]>(seededOpportunities);
  const [selectedId, setSelectedId] = useState(seededOpportunities[0]?.id ?? "");
  const [sourceStatuses, setSourceStatuses] = useState<CaptureSourceStatus[]>(defaultSourceStatuses);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [scanQuery, setScanQuery] = useState(
    "smart HVAC, building automation, energy efficiency retrofit, BIM",
  );
  const [limit, setLimit] = useState(5);
  const [stageFilter, setStageFilter] = useState<FilterValue<CaptureStage>>("All");
  const [sourceFilter, setSourceFilter] = useState<FilterValue<CaptureSourceType>>("All");
  const [decisionFilter, setDecisionFilter] = useState<FilterValue<CaptureDecision>>("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<CaptureTask[]>(seededTasks);

  const visibleOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesStage = stageFilter === "All" || opportunity.stage === stageFilter;
      const matchesSource = sourceFilter === "All" || opportunity.sourceType === sourceFilter;
      const matchesDecision =
        decisionFilter === "All" || opportunity.decision === decisionFilter;

      return matchesStage && matchesSource && matchesDecision;
    });
  }, [decisionFilter, opportunities, sourceFilter, stageFilter]);

  const selected =
    opportunities.find((opportunity) => opportunity.id === selectedId) ??
    visibleOpportunities[0] ??
    opportunities[0] ??
    null;

  const metrics = useMemo(() => {
    const totalValue = opportunities.reduce(
      (total, opportunity) => total + parseMoney(opportunity.value),
      0,
    );
    const highFit = opportunities.filter((opportunity) => opportunity.fitScore >= 75).length;
    const avgFit = opportunities.length
      ? Math.round(
          opportunities.reduce((total, opportunity) => total + opportunity.fitScore, 0) /
            opportunities.length,
        )
      : 0;
    const shortfallCount = opportunities.reduce(
      (total, opportunity) => total + opportunity.shortfalls.length,
      0,
    );
    const highRisk = opportunities.filter((opportunity) => opportunity.risk === "High").length;

    return [
      { label: "Capture value", value: totalValue ? currencyFormatter.format(totalValue) : "Unknown" },
      { label: "Live leads", value: String(opportunities.length) },
      { label: "High fit", value: String(highFit) },
      { label: "Avg fit", value: `${avgFit}%` },
      { label: "Shortfalls", value: String(shortfallCount) },
      { label: "High risk", value: String(highRisk) },
    ];
  }, [opportunities]);

  const sourceTypes = useMemo(
    () => ["All", ...Array.from(new Set(opportunities.map((opportunity) => opportunity.sourceType)))] as Array<FilterValue<CaptureSourceType>>,
    [opportunities],
  );

  async function runSourceScan(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/capture/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: scanQuery,
          limit,
        }),
      });

      if (!response.ok) {
        throw new Error(`Capture scan failed with HTTP ${response.status}`);
      }

      const result = (await response.json()) as CaptureSearchResult;
      setSourceStatuses(result.sources);
      setGeneratedAt(result.generatedAt);

      if (result.opportunities.length > 0) {
        setOpportunities(result.opportunities);
        setSelectedId(result.opportunities[0].id);
        setWarnings(result.warnings);
      } else {
        setWarnings([
          ...result.warnings,
          "No live leads imported; the seeded capture queue is still shown.",
        ]);
      }
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : String(scanError));
    } finally {
      setLoading(false);
    }
  }

  function updateSelected(updater: (opportunity: CaptureOpportunity) => CaptureOpportunity) {
    if (!selected) return;
    setOpportunities((current) =>
      current.map((opportunity) =>
        opportunity.id === selected.id ? updater(opportunity) : opportunity,
      ),
    );
  }

  function advanceSelected() {
    updateSelected((opportunity) => {
      const currentIndex = stageOrder.indexOf(opportunity.stage);
      const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
      return {
        ...opportunity,
        stage: nextStage,
        probability: Math.min(opportunity.probability + 8, 92),
      };
    });
  }

  function markSelectedNoBid() {
    updateSelected((opportunity) => ({
      ...opportunity,
      decision: "no-bid",
      stage: "source",
      probability: Math.max(opportunity.probability - 24, 10),
      nextActions: [
        "Archive with no-bid reason.",
        "Retain source and keywords for future market intelligence.",
      ],
    }));
  }

  function flagSelectedRisk() {
    updateSelected((opportunity) => ({
      ...opportunity,
      risk: opportunity.risk === "High" ? "Medium" : "High",
    }));
  }

  function createTasksForSelected() {
    if (!selected) return;

    const generatedTasks = [
      {
        id: `task.${selected.id}.gate`,
        opportunityId: selected.id,
        title: `Run go/no-go gate for ${selected.title}`,
        owner: selected.owner,
        status: "Queued" as const,
        due: selected.deadline === "Unknown" ? "Next capture review" : selected.deadline,
      },
      ...selected.shortfalls.slice(0, 4).map((shortfall) => ({
        id: `task.${selected.id}.${shortfall.id}`,
        opportunityId: selected.id,
        title: shortfall.mitigation,
        owner: shortfall.owner,
        status: "Queued" as const,
        due: selected.deadline === "Unknown" ? "Before qualification" : selected.deadline,
      })),
    ];

    setTasks((current) => {
      const existing = new Set(current.map((task) => task.id));
      return [
        ...generatedTasks.filter((task) => !existing.has(task.id)),
        ...current,
      ];
    });
  }

  return (
    <div className="bg-[var(--bg-page)]">
      <section
        id="capture"
        className="scroll-mt-24 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]"
      >
        <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                Source truth: tccg.capture_management.v1
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                Capture management workspace
              </h1>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  HVAC
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  BIM / VDC
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  ESG
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  Public sector
                </span>
              </div>
            </div>

            <form
              onSubmit={runSourceScan}
              className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm xl:w-[42rem]"
            >
              <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_7rem_9rem]">
                <label className="sr-only" htmlFor="capture-keywords">
                  Capture keywords
                </label>
                <input
                  id="capture-keywords"
                  value={scanQuery}
                  onChange={(event) => setScanQuery(event.target.value)}
                  className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <label className="sr-only" htmlFor="capture-limit">
                  Source limit
                </label>
                <select
                  id="capture-limit"
                  value={limit}
                  onChange={(event) => setLimit(Number(event.target.value))}
                  className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                >
                  <option value={3}>3 each</option>
                  <option value={5}>5 each</option>
                  <option value={8}>8 each</option>
                  <option value={12}>12 each</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="min-h-11 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? "Scanning" : "Run scan"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {(warnings.length > 0 || error) && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
              {error ? <p className="font-semibold">{error}</p> : null}
              {warnings.slice(0, 4).map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          )}

          <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      Source status
                    </h2>
                    <p className="text-sm text-slate-500">
                      {generatedAt ? `Last scan ${formatDateTime(generatedAt)}` : "Seeded capture queue"}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3 lg:w-[34rem]">
                    <label className="sr-only" htmlFor="stage-filter">
                      Stage filter
                    </label>
                    <select
                      id="stage-filter"
                      value={stageFilter}
                      onChange={(event) =>
                        setStageFilter(event.target.value as FilterValue<CaptureStage>)
                      }
                      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    >
                      <option>All</option>
                      {stageLanes.map((lane) => (
                        <option key={lane.id} value={lane.id}>
                          {lane.label}
                        </option>
                      ))}
                    </select>

                    <label className="sr-only" htmlFor="source-filter">
                      Source filter
                    </label>
                    <select
                      id="source-filter"
                      value={sourceFilter}
                      onChange={(event) =>
                        setSourceFilter(event.target.value as FilterValue<CaptureSourceType>)
                      }
                      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm capitalize outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    >
                      {sourceTypes.map((sourceType) => (
                        <option key={sourceType} value={sourceType}>
                          {sourceType}
                        </option>
                      ))}
                    </select>

                    <label className="sr-only" htmlFor="decision-filter">
                      Decision filter
                    </label>
                    <select
                      id="decision-filter"
                      value={decisionFilter}
                      onChange={(event) =>
                        setDecisionFilter(event.target.value as FilterValue<CaptureDecision>)
                      }
                      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm capitalize outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    >
                      <option>All</option>
                      <option value="pursue">Pursue</option>
                      <option value="review">Review</option>
                      <option value="no-bid">No-bid</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-px bg-slate-200 md:grid-cols-3">
                  {sourceStatuses.map((source) => (
                    <div key={source.id} className="bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">
                            {source.name}
                          </p>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block break-all text-xs font-medium text-slate-500 hover:text-slate-950"
                          >
                            {source.url}
                          </a>
                        </div>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${sourceStatusClasses(
                            source.status,
                          )}`}
                        >
                          {source.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Returned</span>
                        <span className="font-semibold text-slate-950">
                          {source.count}
                        </span>
                      </div>
                      {source.note ? (
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {source.note}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      Capture workflow
                    </h2>
                    <p className="text-sm text-slate-500">
                      {visibleOpportunities.length} visible of {opportunities.length} leads
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStageFilter("All");
                      setSourceFilter("All");
                      setDecisionFilter("All");
                    }}
                    className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Clear filters
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <div className="grid min-w-[72rem] grid-cols-6 gap-px bg-slate-200">
                    {stageLanes.map((lane) => {
                      const laneItems = visibleOpportunities.filter(
                        (opportunity) => opportunity.stage === lane.id,
                      );

                      return (
                        <div key={lane.id} className="min-h-[35rem] bg-slate-50 p-3">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${stageAccent(lane.id)}`} />
                                <h3 className="text-sm font-semibold text-slate-950">
                                  {lane.label}
                                </h3>
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                {lane.caption}
                              </p>
                            </div>
                            <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-600">
                              {laneItems.length}
                            </span>
                          </div>

                          <div className="space-y-3">
                            {laneItems.length === 0 ? (
                              <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-3 text-xs leading-5 text-slate-500">
                                No capture records in this lane.
                              </div>
                            ) : (
                              laneItems.map((opportunity) => (
                                <button
                                  key={opportunity.id}
                                  type="button"
                                  onClick={() => setSelectedId(opportunity.id)}
                                  className={`w-full rounded-lg border bg-white p-3 text-left shadow-sm transition hover:border-slate-400 hover:shadow-md ${
                                    selected?.id === opportunity.id
                                      ? "border-slate-950 ring-2 ring-slate-200"
                                      : "border-slate-200"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="break-words text-xs font-semibold uppercase text-slate-500">
                                      {opportunity.sourceType}
                                    </span>
                                    <span
                                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${decisionClasses(
                                        opportunity.decision,
                                      )}`}
                                    >
                                      {formatDecision(opportunity.decision)}
                                    </span>
                                  </div>
                                  <h4 className="mt-2 min-h-12 text-sm font-semibold leading-5 text-slate-950">
                                    {opportunity.title}
                                  </h4>
                                  <div className="mt-3 space-y-1 text-xs leading-5 text-slate-600">
                                    <p>{opportunity.sourceName}</p>
                                    <p>{opportunity.location}</p>
                                    <p>{opportunity.value}</p>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                    <span>Fit {opportunity.fitScore}%</span>
                                    <span>{opportunity.deadline}</span>
                                  </div>
                                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                      className="h-full rounded-full bg-[var(--accent-primary)]"
                                      style={{ width: `${opportunity.fitScore}%` }}
                                    />
                                  </div>
                                  <div className="mt-2 flex items-center justify-between text-xs">
                                    <span className={`font-semibold ${riskTextClasses(opportunity.risk)}`}>
                                      {opportunity.risk} risk
                                    </span>
                                    <span className="text-slate-500">
                                      {opportunity.shortfalls.length} gaps
                                    </span>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                {selected ? (
                  <>
                    <div className="border-b border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Selected pursuit
                          </p>
                          <h2 className="mt-2 text-xl font-semibold leading-7 text-slate-950">
                            {selected.title}
                          </h2>
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${decisionClasses(
                            selected.decision,
                          )}`}
                        >
                          {formatDecision(selected.decision)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <Field label="Owner" value={selected.owner} />
                        <Field label="Value" value={selected.value} />
                        <Field label="Deadline" value={selected.deadline} />
                        <Field label="Probability" value={`${selected.probability}%`} />
                        <Field label="Source" value={selected.sourceType} />
                        <Field label="Risk" value={selected.risk} />
                      </div>
                    </div>

                    <div className="space-y-5 p-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">
                            Fit score
                          </span>
                          <span className="font-semibold text-slate-950">
                            {selected.fitScore}% / {selected.confidence}% confidence
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[var(--accent-primary)]"
                            style={{ width: `${selected.fitScore}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-950">
                          Source summary
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {selected.summary}
                        </p>
                        {selected.sourceUrl ? (
                          <a
                            href={selected.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                          >
                            Open source
                          </a>
                        ) : null}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">
                            Evidence
                          </h3>
                          <ul className="mt-2 space-y-2 text-sm text-slate-600">
                            {selected.evidence.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">
                            Shortfalls
                          </h3>
                          <ul className="mt-2 space-y-2 text-sm text-slate-600">
                            {selected.shortfalls.length === 0 ? (
                              <li>No blocking shortfalls attached.</li>
                            ) : (
                              selected.shortfalls.slice(0, 5).map((shortfall) => (
                                <li key={shortfall.id} className="flex gap-2">
                                  <span
                                    className={`mt-2 h-1.5 w-1.5 rounded-full ${shortfallDot(
                                      shortfall.severity,
                                    )}`}
                                  />
                                  <span>{shortfall.title}</span>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                        <p>
                          <span className="font-semibold text-slate-950">
                            Eligibility:
                          </span>{" "}
                          {selected.eligibility}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold text-slate-950">
                            Restrictions:
                          </span>{" "}
                          {selected.restrictions}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={advanceSelected}
                          className="min-h-11 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Advance
                        </button>
                        <button
                          type="button"
                          onClick={createTasksForSelected}
                          className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          Create tasks
                        </button>
                        <button
                          type="button"
                          onClick={flagSelectedRisk}
                          className="min-h-11 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                        >
                          Risk flag
                        </button>
                        <button
                          type="button"
                          onClick={markSelectedNoBid}
                          className="min-h-11 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          No-bid
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-5">
                    <h2 className="text-xl font-semibold leading-7 text-slate-950">
                      No selected pursuit
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setStageFilter("All");
                        setSourceFilter("All");
                        setDecisionFilter("All");
                      }}
                      className="mt-5 min-h-11 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8 lg:py-12">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Road to capture controls
                </h2>
                <p className="text-sm text-slate-500">
                  Shortfalls and mitigations by selected opportunity.
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {opportunities.reduce((total, opportunity) => total + opportunity.shortfalls.length, 0)} open
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Opportunity</th>
                    <th className="px-4 py-3">Shortfall</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {opportunities.flatMap((opportunity) =>
                    opportunity.shortfalls.map((shortfall) => (
                      <tr key={`${opportunity.id}.${shortfall.id}`}>
                        <td className="max-w-64 px-4 py-4 font-medium text-slate-950">
                          {opportunity.title}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {shortfall.title}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${shortfallClasses(
                              shortfall.severity,
                            )}`}
                          >
                            {shortfall.severity}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {shortfall.owner}
                        </td>
                        <td className="min-w-[18rem] px-4 py-4 text-slate-600">
                          {shortfall.mitigation}
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Capture task queue</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
                {tasks.length}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-6 text-white">
                      {task.title}
                    </p>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/75">
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/60">
                    <span>{task.owner}</span>
                    <span>{task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold capitalize text-slate-950">{value}</p>
    </div>
  );
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function parseMoney(value: string): number {
  const normalized = value.toLowerCase().replace(/[$,\s]/g, "");
  const match = normalized.match(/(\d+(?:\.\d+)?)(k|m)?/);
  if (!match) return 0;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return 0;
  if (match[2] === "m") return base * 1_000_000;
  if (match[2] === "k") return base * 1_000;
  return base;
}

function formatDecision(decision: CaptureDecision) {
  if (decision === "no-bid") return "No-bid";
  return decision.charAt(0).toUpperCase() + decision.slice(1);
}

function decisionClasses(decision: CaptureDecision) {
  if (decision === "pursue") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (decision === "review") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-red-200 bg-red-50 text-red-700";
}

function riskTextClasses(risk: CaptureRisk) {
  if (risk === "High") return "text-red-700";
  if (risk === "Medium") return "text-amber-700";
  return "text-emerald-700";
}

function sourceStatusClasses(status: CaptureSourceStatus["status"]) {
  if (status === "scanned") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "failed") return "border-red-200 bg-red-50 text-red-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function shortfallClasses(severity: CaptureShortfall["severity"]) {
  if (severity === "high") return "border-red-200 bg-red-50 text-red-700";
  if (severity === "medium") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function shortfallDot(severity: CaptureShortfall["severity"]) {
  if (severity === "high") return "bg-red-500";
  if (severity === "medium") return "bg-amber-500";
  return "bg-slate-400";
}

function stageAccent(stage: CaptureStage) {
  switch (stage) {
    case "source":
      return "bg-slate-500";
    case "qualify":
      return "bg-sky-500";
    case "go-no-go":
      return "bg-amber-500";
    case "teaming":
      return "bg-indigo-500";
    case "proposal":
      return "bg-emerald-500";
    default:
      return "bg-[var(--accent-primary)]";
  }
}
