"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

import { versionedAsset } from "@/lib/brandAssets";

type LaneId =
  | "intake"
  | "estimating"
  | "scheduled"
  | "field"
  | "inspection"
  | "closeout";

type Priority = "Low" | "Medium" | "High" | "Critical";

type WorkKind = "Open Job" | "DAO Task" | "Service Ticket";

type WorkItem = {
  id: string;
  title: string;
  client: string;
  kind: WorkKind;
  lane: LaneId;
  trade: string;
  location: string;
  value: number;
  due: string;
  priority: Priority;
  crew: string;
  progress: number;
  risk: string;
  scope: string;
  deliverables: string[];
  blockers: string[];
  esgImpact: string;
  hvacImpact: string;
};

type Crew = {
  name: string;
  discipline: string;
  lead: string;
  capacity: number;
  location: string;
};

const lanes: Array<{ id: LaneId; label: string; caption: string }> = [
  { id: "intake", label: "Intake", caption: "new requests" },
  { id: "estimating", label: "Estimating", caption: "scope and bid" },
  { id: "scheduled", label: "Scheduled", caption: "crew ready" },
  { id: "field", label: "Field", caption: "active execution" },
  { id: "inspection", label: "Inspection", caption: "QA and closeout" },
  { id: "closeout", label: "Closeout", caption: "handoff" },
];

const laneOrder = lanes.map((lane) => lane.id);

const crews: Crew[] = [
  {
    name: "Crew A",
    discipline: "Smart HVAC",
    lead: "Controls lead",
    capacity: 82,
    location: "Atlanta metro",
  },
  {
    name: "Crew B",
    discipline: "MEP coordination",
    lead: "Field engineer",
    capacity: 64,
    location: "Mid-Atlantic",
  },
  {
    name: "Crew C",
    discipline: "Finish and turnover",
    lead: "Superintendent",
    capacity: 48,
    location: "Southeast",
  },
];

const initialWork: WorkItem[] = [
  {
    id: "TCCG-2401",
    title: "Municipal library HVAC controls retrofit",
    client: "City facilities office",
    kind: "Open Job",
    lane: "field",
    trade: "Smart HVAC",
    location: "Atlanta, GA",
    value: 124000,
    due: "May 30",
    priority: "Critical",
    crew: "Crew A",
    progress: 72,
    risk: "After-hours access window is tight",
    scope:
      "Replace legacy controls, tune air handlers, verify trend logs, and document utility incentive evidence.",
    deliverables: [
      "Controls cutover plan",
      "Commissioning trend report",
      "Owner training handoff",
    ],
    blockers: ["Security access roster", "Final sensor shipment"],
    esgImpact: "Estimated 18 percent electricity reduction",
    hvacImpact: "Two AHUs and 42 VAV boxes under active tuning",
  },
  {
    id: "TCCG-2402",
    title: "Mixed-use tenant improvement BIM coordination",
    client: "Meridian GC partners",
    kind: "Open Job",
    lane: "scheduled",
    trade: "BIM / VDC",
    location: "Charlotte, NC",
    value: 32000,
    due: "Jun 4",
    priority: "High",
    crew: "Crew B",
    progress: 38,
    risk: "RFI turnaround may delay ceiling rough-in",
    scope:
      "Coordinate Revit model conflicts, publish issue log, and package shop-drawing-ready extracts.",
    deliverables: ["Clash matrix", "Level 03 ceiling coordination", "RFI set"],
    blockers: ["Architectural model refresh"],
    esgImpact: "Reduces rework and material waste before procurement",
    hvacImpact: "MEP clearance model covers duct, hydronic, and controls runs",
  },
  {
    id: "TCCG-2403",
    title: "Warehouse ESG closeout and energy report",
    client: "Northline distribution",
    kind: "Open Job",
    lane: "inspection",
    trade: "ESG reporting",
    location: "Savannah, GA",
    value: 46000,
    due: "May 24",
    priority: "Medium",
    crew: "Crew C",
    progress: 86,
    risk: "Awaiting final waste diversion tickets",
    scope:
      "Assemble energy model deltas, waste documentation, safety record, and owner turnover package.",
    deliverables: ["ESG evidence binder", "Utility baseline memo", "Punch list"],
    blockers: ["Hauler ticket upload"],
    esgImpact: "68 percent construction waste diversion documented",
    hvacImpact: "Economizer verification complete for rooftop units",
  },
  {
    id: "TCCG-2404",
    title: "Medical clinic AHU replacement permit package",
    client: "Wellpath clinical group",
    kind: "Open Job",
    lane: "estimating",
    trade: "Preconstruction",
    location: "Raleigh, NC",
    value: 88000,
    due: "Jun 7",
    priority: "High",
    crew: "Unassigned",
    progress: 22,
    risk: "Long-lead equipment pricing expires this week",
    scope:
      "Finalize permit exhibits, phasing notes, infection-control plan, and alternate equipment pricing.",
    deliverables: ["Permit exhibit set", "ICRA sequence", "Bid alternate table"],
    blockers: ["Manufacturer lead time confirmation"],
    esgImpact: "High-efficiency replacement option under review",
    hvacImpact: "One 25-ton packaged AHU with temporary conditioning plan",
  },
  {
    id: "TCCG-2405",
    title: "Facility PM contract launch board",
    client: "TCCG internal operations",
    kind: "DAO Task",
    lane: "intake",
    trade: "Operations",
    location: "Remote",
    value: 18000,
    due: "Jun 12",
    priority: "Medium",
    crew: "Unassigned",
    progress: 12,
    risk: "Needs task template approval",
    scope:
      "Create repeatable service ticket templates for seasonal HVAC maintenance and owner reporting.",
    deliverables: ["PM checklist", "Dispatch tags", "Owner report fields"],
    blockers: ["Template review"],
    esgImpact: "Keeps energy performance data visible after turnover",
    hvacImpact: "Covers filter, belt, coil, sensor, and controls checks",
  },
  {
    id: "TCCG-2406",
    title: "School IAQ service response",
    client: "Charter campus network",
    kind: "Service Ticket",
    lane: "scheduled",
    trade: "Service",
    location: "Columbia, SC",
    value: 14500,
    due: "May 28",
    priority: "Critical",
    crew: "Crew A",
    progress: 45,
    risk: "Occupancy complaints escalated",
    scope:
      "Inspect ventilation, calibrate sensors, capture indoor air quality readings, and issue corrective actions.",
    deliverables: ["IAQ readings", "Controls adjustments", "Priority repair list"],
    blockers: ["Campus access after 4 PM"],
    esgImpact: "Health and comfort reporting for occupied learning space",
    hvacImpact: "Demand ventilation schedule and CO2 sensor calibration",
  },
];

const bidPipeline = [
  {
    name: "Airport terminal controls upgrade",
    stage: "Shortlist",
    value: "$420K",
    probability: "62%",
    owner: "Precon",
  },
  {
    name: "Multifamily energy retrofit",
    stage: "Site walk",
    value: "$185K",
    probability: "48%",
    owner: "HVAC",
  },
  {
    name: "Clinic renovation BIM support",
    stage: "Proposal",
    value: "$54K",
    probability: "71%",
    owner: "VDC",
  },
];

const compliancePulse = [
  { label: "Safety observations", value: "34", tone: "bg-emerald-500" },
  { label: "Open RFIs", value: "12", tone: "bg-amber-500" },
  { label: "Pending submittals", value: "7", tone: "bg-sky-500" },
  { label: "Critical risks", value: "2", tone: "bg-red-500" },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function priorityClasses(priority: Priority) {
  switch (priority) {
    case "Critical":
      return "border-red-200 bg-red-50 text-red-700";
    case "High":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "Medium":
      return "border-sky-200 bg-sky-50 text-sky-800";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function laneAccent(lane: LaneId) {
  switch (lane) {
    case "intake":
      return "bg-slate-500";
    case "estimating":
      return "bg-amber-500";
    case "scheduled":
      return "bg-sky-500";
    case "field":
      return "bg-emerald-500";
    case "inspection":
      return "bg-indigo-500";
    default:
      return "bg-stone-500";
  }
}

function nextLane(lane: LaneId) {
  const currentIndex = laneOrder.indexOf(lane);
  return laneOrder[Math.min(currentIndex + 1, laneOrder.length - 1)];
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function ConstructionOpsPlatform() {
  const [items, setItems] = useState<WorkItem[]>(initialWork);
  const [selectedId, setSelectedId] = useState(initialWork[0].id);
  const [query, setQuery] = useState("");
  const [tradeFilter, setTradeFilter] = useState("All");
  const [kindFilter, setKindFilter] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newTrade, setNewTrade] = useState("Smart HVAC");

  const trades = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.trade)))],
    [items],
  );

  const kinds = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.kind)))],
    [items],
  );

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          item.title,
          item.client,
          item.trade,
          item.location,
          item.id,
          item.kind,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesTrade =
        tradeFilter === "All" || item.trade === tradeFilter;
      const matchesKind = kindFilter === "All" || item.kind === kindFilter;

      return matchesQuery && matchesTrade && matchesKind;
    });
  }, [items, query, tradeFilter, kindFilter]);

  const selected =
    visibleItems.find((item) => item.id === selectedId) ??
    visibleItems[0] ??
    items[0] ??
    null;
  const hasVisibleItems = visibleItems.length > 0;

  const metrics = useMemo(() => {
    const activeValue = items.reduce((total, item) => total + item.value, 0);
    const critical = items.filter((item) => item.priority === "Critical").length;
    const assigned = items.filter((item) => item.crew !== "Unassigned").length;
    const avgProgress = items.length
      ? Math.round(
          items.reduce((total, item) => total + item.progress, 0) /
            items.length,
        )
      : 0;

    return [
      { label: "Active work value", value: formatCurrency(activeValue) },
      { label: "Open work items", value: String(items.length) },
      { label: "Assigned crews", value: `${assigned}/${items.length}` },
      { label: "Critical risks", value: String(critical) },
      { label: "Average progress", value: `${avgProgress}%` },
    ];
  }, [items]);

  function advanceSelected() {
    if (!selected) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              lane: nextLane(item.lane),
              progress: Math.min(item.progress + 14, 100),
            }
          : item,
      ),
    );
  }

  function assignCrew() {
    if (!selected) {
      return;
    }

    const availableCrew =
      crews.find((crew) => crew.discipline === selected.trade) ?? crews[0];

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              crew: availableCrew.name,
              lane: item.lane === "intake" ? "scheduled" : item.lane,
              progress: Math.max(item.progress, 30),
            }
          : item,
      ),
    );
  }

  function flagRisk() {
    if (!selected) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              priority: item.priority === "Critical" ? "High" : "Critical",
              risk:
                item.priority === "Critical"
                  ? "Risk is being monitored by the project lead"
                  : "Executive review required before the next field window",
            }
          : item,
      ),
    );
  }

  function createWorkItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTitle.trim();
    const client = newClient.trim() || "TCCG operations";

    if (!title) {
      return;
    }

    const id = `TCCG-${2400 + items.length + 1}`;
    const createdItem: WorkItem = {
      id,
      title,
      client,
      kind: "Open Job",
      lane: "intake",
      trade: newTrade,
      location: "New intake",
      value: 25000,
      due: "Next review",
      priority: "Medium",
      crew: "Unassigned",
      progress: 8,
      risk: "Needs scope validation",
      scope:
        "New request captured from the platform intake queue for preconstruction review.",
      deliverables: ["Scope validation", "Budget check", "Crew fit review"],
      blockers: ["Initial review"],
      esgImpact: "To be measured during intake",
      hvacImpact: "To be confirmed after site discovery",
    };

    setItems((currentItems) => [createdItem, ...currentItems]);
    setSelectedId(id);
    setNewTitle("");
    setNewClient("");
  }

  return (
    <div className="bg-[var(--bg-page)]">
      <section
        id="operations"
        className="scroll-mt-24 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]"
      >
        <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <Image
                  src={versionedAsset("/icon.png")}
                  alt="TC Construction Group"
                  width={48}
                  height={48}
                  priority
                  className="h-12 w-12"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                  TCCG Operations Platform
                </p>
                <h1 className="mt-1 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                  Construction work command center
                </h1>
              </div>
            </div>

            <div className="grid gap-2 text-sm sm:grid-cols-3 lg:min-w-[34rem]">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Mode
                </p>
                <p className="font-semibold text-slate-900">Field ops live</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Focus
                </p>
                <p className="font-semibold text-slate-900">HVAC + BIM + ESG</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Cycle
                </p>
                <p className="font-semibold text-slate-900">Q2 2026</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
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

              <div
                id="work"
                className="scroll-mt-24 rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-200 p-4">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        Work and task board
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Open jobs, DAO tasks, and service tickets in one field
                        workflow.
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_11rem_10rem] xl:w-[40rem]">
                      <label className="sr-only" htmlFor="work-search">
                        Search work
                      </label>
                      <input
                        id="work-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search job, client, trade, location"
                        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                      />

                      <label className="sr-only" htmlFor="trade-filter">
                        Filter trade
                      </label>
                      <select
                        id="trade-filter"
                        value={tradeFilter}
                        onChange={(event) => setTradeFilter(event.target.value)}
                        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                      >
                        {trades.map((trade) => (
                          <option key={trade} value={trade}>
                            {trade}
                          </option>
                        ))}
                      </select>

                      <label className="sr-only" htmlFor="kind-filter">
                        Filter type
                      </label>
                      <select
                        id="kind-filter"
                        value={kindFilter}
                        onChange={(event) => setKindFilter(event.target.value)}
                        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                      >
                        {kinds.map((kind) => (
                          <option key={kind} value={kind}>
                            {kind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="grid min-w-[54rem] grid-cols-6 gap-px bg-slate-200 2xl:min-w-0">
                    {lanes.map((lane) => {
                      const laneItems = visibleItems.filter(
                        (item) => item.lane === lane.id,
                      );

                      return (
                        <div
                          key={lane.id}
                          className="min-h-[31rem] bg-slate-50 p-3"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${laneAccent(
                                    lane.id,
                                  )}`}
                                />
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
                                No work matches this lane.
                              </div>
                            ) : (
                              laneItems.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedId(item.id)}
                                className={`w-full rounded-lg border bg-white p-3 text-left shadow-sm transition hover:border-slate-400 hover:shadow-md ${
                                  selected.id === item.id
                                    ? "border-slate-950 ring-2 ring-slate-200"
                                    : "border-slate-200"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-xs font-semibold text-slate-500">
                                    {item.id}
                                  </span>
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${priorityClasses(
                                      item.priority,
                                    )}`}
                                  >
                                    {item.priority}
                                  </span>
                                </div>
                                <h4 className="mt-2 min-h-12 text-sm font-semibold leading-5 text-slate-950">
                                  {item.title}
                                </h4>
                                <div className="mt-3 space-y-1 text-xs text-slate-600">
                                  <p>{item.client}</p>
                                  <p>{item.trade}</p>
                                  <p>{item.location}</p>
                                </div>
                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                                  <div
                                    className="h-full rounded-full bg-[var(--accent-primary)]"
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                                  <span>{item.crew}</span>
                                  <span>{item.progress}%</span>
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
                {selected && hasVisibleItems ? (
                  <>
                    <div className="border-b border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Selected work item
                          </p>
                          <h2 className="mt-2 text-xl font-semibold leading-7 text-slate-950">
                            {selected.title}
                          </h2>
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClasses(
                            selected.priority,
                          )}`}
                        >
                          {selected.priority}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-slate-500">Client</p>
                          <p className="font-semibold text-slate-950">
                            {selected.client}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Value</p>
                          <p className="font-semibold text-slate-950">
                            {formatCurrency(selected.value)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Due</p>
                          <p className="font-semibold text-slate-950">
                            {selected.due}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Crew</p>
                          <p className="font-semibold text-slate-950">
                            {selected.crew}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 p-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">
                            Progress
                          </span>
                          <span className="font-semibold text-slate-950">
                            {selected.progress}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[var(--accent-primary)]"
                            style={{ width: `${selected.progress}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-950">
                          Scope
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {selected.scope}
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">
                            Deliverables
                          </h3>
                          <ul className="mt-2 space-y-2 text-sm text-slate-600">
                            {selected.deliverables.map((deliverable) => (
                              <li key={deliverable} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span>{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">
                            Blockers
                          </h3>
                          <ul className="mt-2 space-y-2 text-sm text-slate-600">
                            {selected.blockers.map((blocker) => (
                              <li key={blocker} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                                <span>{blocker}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                        <p>
                          <span className="font-semibold text-slate-950">
                            Risk:
                          </span>{" "}
                          {selected.risk}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold text-slate-950">
                            ESG:
                          </span>{" "}
                          {selected.esgImpact}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold text-slate-950">
                            HVAC:
                          </span>{" "}
                          {selected.hvacImpact}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={assignCrew}
                          className="min-h-11 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Assign
                        </button>
                        <button
                          type="button"
                          onClick={advanceSelected}
                          className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          Advance
                        </button>
                        <button
                          type="button"
                          onClick={flagRisk}
                          className="min-h-11 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          Risk
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Selected work item
                    </p>
                    <h2 className="mt-2 text-xl font-semibold leading-7 text-slate-950">
                      No matching work item
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Adjust the current filters to return work to the board.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setTradeFilter("All");
                        setKindFilter("All");
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

      <section
        id="pipeline"
        className="scroll-mt-24 border-b border-[var(--border-subtle)] bg-white"
      >
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8 lg:py-12">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Bid pipeline
                </h2>
                <p className="text-sm text-slate-500">
                  Preconstruction opportunities tracked with owner and close
                  probability.
                </p>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {bidPipeline.length} active
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Opportunity</th>
                    <th className="px-4 py-3">Stage</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Probability</th>
                    <th className="px-4 py-3">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bidPipeline.map((bid) => (
                    <tr key={bid.name}>
                      <td className="px-4 py-4 font-medium text-slate-950">
                        {bid.name}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{bid.stage}</td>
                      <td className="px-4 py-4 text-slate-600">{bid.value}</td>
                      <td className="px-4 py-4 text-slate-600">
                        {bid.probability}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{bid.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
            <h2 className="text-lg font-semibold">Safety and ESG pulse</h2>
            <div className="mt-4 space-y-3">
              {compliancePulse.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${item.tone}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-white/70">
                      {item.label}
                    </p>
                  </div>
                  <span className="text-lg font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-6 text-white/75">
              Field data connects safety observations, RFIs, BIM issues, and ESG
              documentation before closeout.
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 bg-[var(--bg-page)] px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="mx-auto grid max-w-[90rem] gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="grid gap-3 sm:grid-cols-3">
            {crews.map((crew) => (
              <div
                key={crew.name}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-950">{crew.name}</h3>
                  <span className="text-sm font-semibold text-emerald-700">
                    {crew.capacity}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {crew.discipline}
                </p>
                <p className="mt-1 text-xs text-slate-500">{crew.lead}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${crew.capacity}%` }}
                  />
                </div>
                <p className="mt-3 text-xs font-medium text-slate-500">
                  {crew.location}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={createWorkItem}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              Capture new work
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="new-title"
                  className="text-sm font-medium text-slate-700"
                >
                  Work title
                </label>
                <input
                  id="new-title"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="Example: rooftop controls audit"
                  className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label
                  htmlFor="new-client"
                  className="text-sm font-medium text-slate-700"
                >
                  Client
                </label>
                <input
                  id="new-client"
                  value={newClient}
                  onChange={(event) => setNewClient(event.target.value)}
                  placeholder="Owner, GC, or internal"
                  className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label
                  htmlFor="new-trade"
                  className="text-sm font-medium text-slate-700"
                >
                  Trade
                </label>
                <select
                  id="new-trade"
                  value={newTrade}
                  onChange={(event) => setNewTrade(event.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                >
                  <option>Smart HVAC</option>
                  <option>BIM / VDC</option>
                  <option>ESG reporting</option>
                  <option>Preconstruction</option>
                  <option>Service</option>
                  <option>Operations</option>
                </select>
              </div>
              <button
                type="submit"
                className="min-h-11 w-full rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Add to intake
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
