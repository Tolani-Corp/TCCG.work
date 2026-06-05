const GRANTS_GOV_SEARCH_URL = "https://api.grants.gov/v1/api/search2";
const GRANTS_GOV_FETCH_URL = "https://api.grants.gov/v1/api/fetchOpportunity";
const SAM_GOV_SEARCH_URL = "https://api.sam.gov/opportunities/v2/search";

export const TCCG_CAPTURE_SOURCE_TRUTH_ID = "tccg.capture_management.v1" as const;

export type CaptureSourceType = "grant" | "rfp" | "foundation" | "manual";
export type CaptureStage =
  | "source"
  | "qualify"
  | "go-no-go"
  | "teaming"
  | "proposal"
  | "submit";
export type CaptureDecision = "pursue" | "review" | "no-bid";
export type CaptureRisk = "Low" | "Medium" | "High";
export type ShortfallSeverity = "low" | "medium" | "high";

export interface CaptureShortfall {
  id: string;
  title: string;
  severity: ShortfallSeverity;
  trigger: string;
  mitigation: string;
  owner: string;
}

export interface CaptureOpportunity {
  id: string;
  sourceTruthId: typeof TCCG_CAPTURE_SOURCE_TRUTH_ID;
  sourceId: string;
  title: string;
  sourceName: string;
  sourceType: CaptureSourceType;
  sourceUrl?: string;
  deadline: string;
  postedDate?: string;
  value: string;
  agency?: string;
  location: string;
  naics?: string;
  setAside?: string;
  status?: string;
  matchedKeyword: string;
  summary: string;
  eligibility: string;
  restrictions: string;
  tags: string[];
  fitScore: number;
  confidence: number;
  decision: CaptureDecision;
  stage: CaptureStage;
  owner: string;
  probability: number;
  risk: CaptureRisk;
  shortfalls: CaptureShortfall[];
  nextActions: string[];
  evidence: string[];
}

export interface CaptureSourceStatus {
  id: string;
  name: string;
  url: string;
  status: "scanned" | "skipped" | "failed";
  count: number;
  note?: string;
}

export interface CaptureSearchInput {
  query?: string;
  keywords?: string[];
  limit?: number;
}

export interface CaptureSearchResult {
  sourceTruthId: typeof TCCG_CAPTURE_SOURCE_TRUTH_ID;
  generatedAt: string;
  queryKeywords: string[];
  opportunities: CaptureOpportunity[];
  sources: CaptureSourceStatus[];
  warnings: string[];
}

interface GrantsGovHit {
  id?: string | number;
  number?: string;
  title?: string;
  agencyCode?: string;
  agencyName?: string;
  openDate?: string;
  closeDate?: string;
  oppStatus?: string;
  docType?: string;
  alnist?: string[];
}

interface GrantsGovDetail {
  id?: number;
  opportunityNumber?: string;
  opportunityTitle?: string;
  agencyDetails?: { agencyName?: string };
  synopsis?: {
    agencyName?: string;
    synopsisDesc?: string;
    responseDateDesc?: string;
    originalDueDateDesc?: string;
    awardCeiling?: string;
    awardCeilingFormatted?: string;
    awardFloor?: string;
    awardFloorFormatted?: string;
    costSharing?: boolean;
    applicantTypes?: Array<{ description?: string }>;
    fundingInstruments?: Array<{ description?: string }>;
    fundingActivityCategories?: Array<{ description?: string }>;
  };
  forecast?: {
    agencyCode?: string;
    forecastDesc?: string;
    applicantEligibilityDesc?: string;
    estApplicationResponseDate?: string;
    estimatedFunding?: string;
    estimatedFundingFormatted?: string;
    costSharing?: boolean;
    applicantTypes?: Array<{ description?: string }>;
    fundingInstruments?: Array<{ description?: string }>;
    fundingActivityCategories?: Array<{ description?: string }>;
    agencyDetails?: { agencyName?: string };
  };
  alns?: Array<{ alnNumber?: string; programTitle?: string }>;
  cfdas?: Array<{ cfdaNumber?: string; programTitle?: string }>;
  docType?: string;
}

interface SamGovOpportunity {
  noticeId?: string;
  title?: string;
  solicitationNumber?: string;
  fullParentPathName?: string;
  organizationName?: string;
  postedDate?: string;
  type?: string;
  responseDeadLine?: string;
  reponseDeadLine?: string;
  naicsCode?: string;
  classificationCode?: string;
  setAside?: string;
  setAsideCode?: string;
  active?: string;
  description?: string;
  uiLink?: string;
  resourceLinks?: string[];
  links?: Array<{ href?: string }>;
  placeOfPerformance?: {
    city?: { name?: string };
    state?: { code?: string; name?: string };
    zip?: string;
  };
  data?: {
    award?: { amount?: number | string };
  };
  award?: { amount?: number | string };
}

interface RawCaptureLead {
  sourceId: string;
  title: string;
  sourceName: string;
  sourceType: CaptureSourceType;
  sourceUrl?: string;
  deadline?: string;
  postedDate?: string;
  value?: string;
  agency?: string;
  location?: string;
  naics?: string;
  setAside?: string;
  status?: string;
  matchedKeyword: string;
  summary?: string;
  eligibility?: string;
  restrictions?: string;
  tags?: string[];
}

export async function searchCaptureSources(
  input: CaptureSearchInput = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<CaptureSearchResult> {
  const generatedAt = new Date().toISOString();
  const keywords = resolveKeywords(input, env);
  const limit = clampInteger(
    input.limit ?? Number(env.CAPTURE_SOURCE_LIMIT),
    1,
    20,
    5,
  );
  const warnings: string[] = [];
  const sources: CaptureSourceStatus[] = [];
  const leads: RawCaptureLead[] = [];

  try {
    const grants = await scanGrantsGov(keywords, limit);
    leads.push(...grants);
    sources.push({
      id: "tccg.source.grants_gov.search2",
      name: "Grants.gov Search2 API",
      url: GRANTS_GOV_SEARCH_URL,
      status: "scanned",
      count: grants.length,
    });
  } catch (error) {
    const message = errorMessage(error);
    warnings.push(`Grants.gov scan failed: ${message}`);
    sources.push({
      id: "tccg.source.grants_gov.search2",
      name: "Grants.gov Search2 API",
      url: GRANTS_GOV_SEARCH_URL,
      status: "failed",
      count: 0,
      note: message,
    });
  }

  const samApiKey = optional(env.SAM_GOV_API_KEY);
  if (samApiKey) {
    try {
      const sam = await scanSamGov(keywords, samApiKey, limit);
      leads.push(...sam);
      sources.push({
        id: "tccg.source.sam_gov.opportunities",
        name: "SAM.gov Contract Opportunities API",
        url: SAM_GOV_SEARCH_URL,
        status: "scanned",
        count: sam.length,
      });
    } catch (error) {
      const message = errorMessage(error);
      warnings.push(`SAM.gov scan failed: ${message}`);
      sources.push({
        id: "tccg.source.sam_gov.opportunities",
        name: "SAM.gov Contract Opportunities API",
        url: SAM_GOV_SEARCH_URL,
        status: "failed",
        count: 0,
        note: message,
      });
    }
  } else {
    const note = "SAM_GOV_API_KEY is not configured.";
    warnings.push(`SAM.gov scan skipped because ${note}`);
    sources.push({
      id: "tccg.source.sam_gov.opportunities",
      name: "SAM.gov Contract Opportunities API",
      url: SAM_GOV_SEARCH_URL,
      status: "skipped",
      count: 0,
      note,
    });
  }

  if (!optional(env.CANDID_API_KEY)) {
    warnings.push("Candid foundation scan is registered but skipped because CANDID_API_KEY is not configured.");
    sources.push({
      id: "tccg.source.candid.grants_api",
      name: "Candid Grants API",
      url: "https://developer.candid.org/",
      status: "skipped",
      count: 0,
      note: "Licensed API key required.",
    });
  }

  const opportunities = dedupeLeads(leads)
    .map((lead) => buildCaptureOpportunity(lead))
    .sort((left, right) => right.fitScore - left.fitScore)
    .slice(0, Math.max(limit * keywords.length, limit));

  if (opportunities.length === 0) {
    warnings.push("No live capture leads were returned for the configured keywords.");
  }

  return {
    sourceTruthId: TCCG_CAPTURE_SOURCE_TRUTH_ID,
    generatedAt,
    queryKeywords: keywords,
    opportunities,
    sources,
    warnings,
  };
}

async function scanGrantsGov(
  keywords: string[],
  limit: number,
): Promise<RawCaptureLead[]> {
  const results: RawCaptureLead[] = [];

  for (const keyword of keywords) {
    const response = await fetch(GRANTS_GOV_SEARCH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rows: limit,
        keyword,
        oppStatuses: "forecasted|posted",
        startRecordNum: 0,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = (await response.json()) as {
      errorcode?: number;
      msg?: string;
      data?: { oppHits?: GrantsGovHit[] };
    };
    if (payload.errorcode && payload.errorcode !== 0) {
      throw new Error(payload.msg ?? `Grants.gov error ${payload.errorcode}`);
    }

    const mapped = await Promise.all(
      (payload.data?.oppHits ?? []).map((hit) =>
        mapGrantsGovHit(hit, keyword),
      ),
    );
    results.push(...mapped);
  }

  return results;
}

async function fetchGrantsGovOpportunity(
  opportunityId: string,
): Promise<GrantsGovDetail | undefined> {
  const response = await fetch(GRANTS_GOV_FETCH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ opportunityId: Number(opportunityId) }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    return undefined;
  }

  const payload = (await response.json()) as {
    errorcode?: number;
    data?: GrantsGovDetail;
  };
  return payload.errorcode === 0 ? payload.data : undefined;
}

async function mapGrantsGovHit(
  hit: GrantsGovHit,
  keyword: string,
): Promise<RawCaptureLead> {
  const id = hit.id === undefined ? undefined : String(hit.id);
  const detail = id
    ? await fetchGrantsGovOpportunity(id).catch(() => undefined)
    : undefined;
  const synopsis = detail?.synopsis;
  const forecast = detail?.forecast;
  const title = htmlToText(
    detail?.opportunityTitle ??
      hit.title ??
      hit.number ??
      "Untitled Grants.gov opportunity",
  );
  const description = synopsis?.synopsisDesc ?? forecast?.forecastDesc;
  const applicantTypes = (synopsis?.applicantTypes ?? forecast?.applicantTypes)
    ?.map((item) => item.description)
    .filter(Boolean);
  const fundingCategories = (
    synopsis?.fundingActivityCategories ?? forecast?.fundingActivityCategories
  )
    ?.map((item) => item.description)
    .filter(Boolean);
  const alnList =
    detail?.alns?.map((aln) =>
      [aln.alnNumber, aln.programTitle].filter(Boolean).join(" - "),
    ) ??
    detail?.cfdas?.map((cfda) =>
      [cfda.cfdaNumber, cfda.programTitle].filter(Boolean).join(" - "),
    ) ??
    hit.alnist;
  const agencyName =
    synopsis?.agencyName ??
    forecast?.agencyDetails?.agencyName ??
    detail?.agencyDetails?.agencyName ??
    hit.agencyName ??
    hit.agencyCode;

  return {
    sourceId: id ? `grants.gov:${id}` : `grants.gov:${hit.number ?? title}`,
    title,
    sourceName: agencyName
      ? `Grants.gov - ${htmlToText(agencyName)}`
      : "Grants.gov",
    sourceType: "grant",
    sourceUrl: id
      ? `https://www.grants.gov/search-results-detail/${id}`
      : "https://www.grants.gov/search-grants",
    deadline:
      normalizeDateLabel(
        synopsis?.responseDateDesc ??
          synopsis?.originalDueDateDesc ??
          forecast?.estApplicationResponseDate ??
          hit.closeDate,
      ) ?? (hit.oppStatus === "forecasted" ? "Forecasted" : "Unknown"),
    postedDate: normalizeDateLabel(hit.openDate),
    value: formatGrantsGovAwardValue(synopsis, forecast),
    agency: agencyName ? htmlToText(agencyName) : undefined,
    location: "Federal grant",
    status: hit.oppStatus,
    matchedKeyword: keyword,
    summary: [
      detail?.opportunityNumber ?? hit.number
        ? `Funding opportunity ${detail?.opportunityNumber ?? hit.number}.`
        : undefined,
      hit.oppStatus ? `Status: ${hit.oppStatus}.` : undefined,
      detail?.docType ?? hit.docType
        ? `Document type: ${detail?.docType ?? hit.docType}.`
        : undefined,
      description ? htmlToText(description).slice(0, 700) : undefined,
      alnList?.length ? `ALN: ${alnList.join(", ")}.` : undefined,
      fundingCategories?.length
        ? `Funding categories: ${fundingCategories.join(", ")}.`
        : undefined,
      keyword ? `Matched keyword: ${keyword}.` : undefined,
    ]
      .filter(Boolean)
      .join(" "),
    eligibility: applicantTypes?.length
      ? `Eligible applicant types: ${applicantTypes.join(", ")}.`
      : forecast?.applicantEligibilityDesc
        ? htmlToText(forecast.applicantEligibilityDesc).slice(0, 700)
        : "Eligibility must be verified in the Grants.gov package before pursuit.",
    restrictions: [
      "Federal grant compliance, reporting, registration, and audit controls may apply.",
      synopsis?.costSharing || forecast?.costSharing
        ? "Cost sharing is indicated in the opportunity detail."
        : undefined,
    ]
      .filter(Boolean)
      .join(" "),
    tags: inferCaptureTags(`${title} ${description ?? ""}`, keyword),
  };
}

async function scanSamGov(
  keywords: string[],
  apiKey: string,
  limit: number,
): Promise<RawCaptureLead[]> {
  const results: RawCaptureLead[] = [];
  const postedTo = new Date();
  const postedFrom = new Date(postedTo);
  postedFrom.setDate(postedFrom.getDate() - 180);

  for (const keyword of keywords) {
    const url = new URL(SAM_GOV_SEARCH_URL);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("postedFrom", formatSamDate(postedFrom));
    url.searchParams.set("postedTo", formatSamDate(postedTo));
    url.searchParams.set("title", keyword);

    const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (response.status === 404) {
      continue;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = (await response.json()) as {
      opportunitiesData?: SamGovOpportunity[];
    };
    for (const record of payload.opportunitiesData ?? []) {
      const title = htmlToText(
        record.title ?? record.solicitationNumber ?? "Untitled SAM.gov opportunity",
      );
      const sourceUrl =
        record.uiLink ??
        record.links?.find((link) => link.href)?.href ??
        (record.noticeId
          ? `https://sam.gov/opp/${record.noticeId}/view`
          : "https://sam.gov/opportunities");
      const state =
        record.placeOfPerformance?.state?.code ??
        record.placeOfPerformance?.state?.name;
      const city = record.placeOfPerformance?.city?.name;
      const awardAmount = record.data?.award?.amount ?? record.award?.amount;

      results.push({
        sourceId: record.noticeId
          ? `sam.gov:${record.noticeId}`
          : `sam.gov:${record.solicitationNumber ?? title}`,
        title,
        sourceName: record.organizationName
          ? `SAM.gov - ${htmlToText(record.organizationName)}`
          : record.fullParentPathName
            ? `SAM.gov - ${htmlToText(record.fullParentPathName)}`
            : "SAM.gov",
        sourceType: "rfp",
        sourceUrl,
        deadline:
          normalizeDateLabel(record.responseDeadLine ?? record.reponseDeadLine) ??
          "Unknown",
        postedDate: normalizeDateLabel(record.postedDate),
        value: awardAmount
          ? `$${Number(awardAmount).toLocaleString()}`
          : "Unknown",
        agency: record.organizationName ?? record.fullParentPathName,
        location: [city, state].filter(Boolean).join(", ") || "Place of performance TBD",
        naics: record.naicsCode,
        setAside: record.setAside ?? record.setAsideCode,
        status: record.active ? `Active: ${record.active}` : record.type,
        matchedKeyword: keyword,
        summary: [
          record.solicitationNumber
            ? `Solicitation ${record.solicitationNumber}.`
            : undefined,
          record.type ? `Type: ${record.type}.` : undefined,
          record.naicsCode ? `NAICS: ${record.naicsCode}.` : undefined,
          record.classificationCode
            ? `Classification: ${record.classificationCode}.`
            : undefined,
          keyword ? `Matched keyword: ${keyword}.` : undefined,
          record.description ? `Description link: ${record.description}.` : undefined,
          record.resourceLinks?.length
            ? `${record.resourceLinks.length} resource link(s) attached.`
            : undefined,
        ]
          .filter(Boolean)
          .join(" "),
        eligibility:
          "Procurement eligibility, SAM registration, set-aside fit, bonding, insurance, and subcontracting requirements must be verified.",
        restrictions:
          "Public procurement deadlines, site-walk controls, Q&A windows, insurance, bonding, wage, safety, and response-format requirements may apply.",
        tags: inferCaptureTags(
          `${title} ${record.naicsCode ?? ""} ${record.type ?? ""}`,
          keyword,
        ),
      });
    }
  }

  return results;
}

function buildCaptureOpportunity(lead: RawCaptureLead): CaptureOpportunity {
  const tags = normalizeTags(lead.tags ?? inferCaptureTags(lead.title, lead.matchedKeyword));
  const score = scoreCaptureFit(lead, tags);
  const shortfalls = detectCaptureShortfalls(lead, score.fitScore, score.confidence);
  const decision = decideCapture(score.fitScore, shortfalls);
  const stage: CaptureStage = decision === "pursue" ? "qualify" : "source";
  const owner = inferOwner(tags, lead.sourceType);

  return {
    id: `capture.${slugify(lead.sourceId || lead.title)}`,
    sourceTruthId: TCCG_CAPTURE_SOURCE_TRUTH_ID,
    sourceId: lead.sourceId,
    title: lead.title,
    sourceName: lead.sourceName,
    sourceType: lead.sourceType,
    sourceUrl: lead.sourceUrl,
    deadline: lead.deadline ?? "Unknown",
    postedDate: lead.postedDate,
    value: lead.value ?? "Unknown",
    agency: lead.agency,
    location: lead.location ?? "TBD",
    naics: lead.naics,
    setAside: lead.setAside,
    status: lead.status,
    matchedKeyword: lead.matchedKeyword,
    summary: lead.summary ?? "No summary returned from the source API.",
    eligibility: lead.eligibility ?? "Eligibility not yet verified.",
    restrictions: lead.restrictions ?? "Restrictions not yet reviewed.",
    tags,
    fitScore: score.fitScore,
    confidence: score.confidence,
    decision,
    stage,
    owner,
    probability: Math.max(18, Math.min(82, Math.round(score.fitScore * 0.72))),
    risk: inferRisk(lead, shortfalls),
    shortfalls,
    nextActions: buildNextActions(lead, decision, shortfalls),
    evidence: buildEvidenceList(lead),
  };
}

function scoreCaptureFit(
  lead: RawCaptureLead,
  tags: string[],
): { fitScore: number; confidence: number } {
  const text = [
    lead.title,
    lead.summary,
    lead.eligibility,
    lead.restrictions,
    lead.naics,
    lead.matchedKeyword,
    tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  const fitTerms = [
    "hvac",
    "controls",
    "building automation",
    "energy",
    "efficiency",
    "retrofit",
    "indoor air quality",
    "iaq",
    "commissioning",
    "construction",
    "facilities",
    "bim",
    "vdc",
    "sustainability",
    "resilience",
    "workforce",
  ];
  const exactMatches = fitTerms.filter((term) => text.includes(term));
  const tagScore = tags.reduce((total, tag) => {
    if (["smart-hvac", "energy-retrofit", "building-controls"].includes(tag)) {
      return total + 14;
    }
    if (["construction", "bim-vdc", "esg-compliance", "workforce"].includes(tag)) {
      return total + 9;
    }
    return total + 4;
  }, 0);
  const sourceScore = lead.sourceType === "rfp" ? 12 : 6;
  const awardScore = parseMoney(lead.value) >= 50_000 ? 9 : parseMoney(lead.value) > 0 ? 5 : 0;
  const naicsScore = lead.naics?.startsWith("238") || lead.naics?.startsWith("541")
    ? 10
    : lead.naics
      ? 4
      : 0;
  const deadlineScore = lead.deadline && lead.deadline !== "Unknown" ? 6 : 0;
  const fitScore = clamp(
    34 + exactMatches.length * 5 + tagScore + sourceScore + awardScore + naicsScore + deadlineScore,
    0,
    98,
  );
  const confidence = clamp(
    48 +
      (lead.sourceUrl ? 12 : 0) +
      (lead.summary && lead.summary.length > 120 ? 14 : 0) +
      (lead.eligibility ? 8 : 0) +
      (lead.deadline && lead.deadline !== "Unknown" ? 8 : 0) +
      (lead.value && lead.value !== "Unknown" ? 5 : 0),
    0,
    95,
  );

  return { fitScore, confidence };
}

function detectCaptureShortfalls(
  lead: RawCaptureLead,
  fitScore: number,
  confidence: number,
): CaptureShortfall[] {
  const shortfalls: CaptureShortfall[] = [];

  if (!lead.sourceUrl) {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.source-document`,
      title: "Source document missing",
      severity: "high",
      trigger: "The lead does not include a source URL.",
      mitigation: "Attach the source notice, package link, or downloaded solicitation before qualification.",
      owner: "Capture Manager",
    });
  }

  if (confidence < 76 || !lead.summary || lead.summary.length < 120) {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.evidence`,
      title: "Evidence gap",
      severity: confidence < 64 ? "high" : "medium",
      trigger: "The source returned limited detail for a confident go/no-go call.",
      mitigation: "Pull the full package, capture eligibility, owner contacts, exhibits, and response instructions.",
      owner: "Preconstruction",
    });
  }

  if (!lead.deadline || lead.deadline === "Unknown") {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.deadline`,
      title: "Deadline not verified",
      severity: "high",
      trigger: "The response date is missing or ambiguous.",
      mitigation: "Verify due date, Q&A cutoff, site-walk dates, and amendment cadence in the source portal.",
      owner: "Capture Manager",
    });
  } else if (daysUntil(lead.deadline) !== undefined && Number(daysUntil(lead.deadline)) < 21) {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.schedule`,
      title: "Compressed pursuit window",
      severity: "medium",
      trigger: `Deadline is ${lead.deadline}.`,
      mitigation: "Run a fast go/no-go, assign an owner, and limit scope to pursuits with existing proof and pricing.",
      owner: "Operations Lead",
    });
  }

  if (lead.sourceType === "rfp") {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.procurement`,
      title: "Procurement readiness",
      severity: "high",
      trigger: "SAM.gov opportunities require contracting compliance review.",
      mitigation: "Confirm UEI/SAM status, NAICS fit, set-aside eligibility, insurance, bonding, wage, and response format.",
      owner: "Compliance Lead",
    });

    shortfalls.push({
      id: `${slugify(lead.sourceId)}.site-walk`,
      title: "Site-walk and Q&A control",
      severity: "medium",
      trigger: "Field verification and addenda can change construction bid risk.",
      mitigation: "Identify mandatory pre-bid meetings, site access rules, Q&A deadline, and addendum watch owner.",
      owner: "Field Operations",
    });
  }

  if (/cost sharing|match|audit|registration|compliance|insurance|bonding/i.test(lead.restrictions ?? "")) {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.finance-compliance`,
      title: "Finance and compliance review",
      severity: "medium",
      trigger: lead.restrictions ?? "Compliance language detected.",
      mitigation: "Block proposal drafting until finance confirms match, reporting, insurance, bonding, and audit burden.",
      owner: "Finance",
    });
  }

  if (parseMoney(lead.value) >= 250_000 || fitScore >= 82) {
    shortfalls.push({
      id: `${slugify(lead.sourceId)}.teaming`,
      title: "Teaming plan needed",
      severity: "medium",
      trigger: "The opportunity is large enough or strategic enough to require partner planning.",
      mitigation: "Decide prime/sub role, identify specialty subs, confirm bonding capacity, and draft teaming notes.",
      owner: "Business Development",
    });
  }

  return shortfalls;
}

function decideCapture(
  fitScore: number,
  shortfalls: CaptureShortfall[],
): CaptureDecision {
  const hasHighShortfall = shortfalls.some((shortfall) => shortfall.severity === "high");
  if (fitScore >= 82 && !hasHighShortfall) return "pursue";
  if (fitScore >= 58) return "review";
  return "no-bid";
}

function inferRisk(
  lead: RawCaptureLead,
  shortfalls: CaptureShortfall[],
): CaptureRisk {
  if (shortfalls.some((shortfall) => shortfall.severity === "high")) {
    return "High";
  }
  if (lead.sourceType === "rfp" || shortfalls.length >= 2) {
    return "Medium";
  }
  return "Low";
}

function buildNextActions(
  lead: RawCaptureLead,
  decision: CaptureDecision,
  shortfalls: CaptureShortfall[],
): string[] {
  if (decision === "no-bid") {
    return [
      "Archive with no-bid reason unless strategic context changes.",
      "Save source and keywords for future capture intelligence.",
    ];
  }

  const actions = [
    "Verify source package, deadline, eligibility, and response instructions.",
    "Run go/no-go with bid owner, estimator, field lead, and compliance owner.",
    "Create pricing, evidence, and partner workstreams only after qualification.",
  ];

  if (lead.sourceType === "rfp") {
    actions.unshift("Confirm NAICS, set-aside, bonding, insurance, and site-walk requirements.");
  }

  return [...actions, ...shortfalls.slice(0, 4).map((shortfall) => shortfall.mitigation)];
}

function buildEvidenceList(lead: RawCaptureLead): string[] {
  return [
    lead.sourceUrl ? "Source URL captured" : undefined,
    lead.deadline && lead.deadline !== "Unknown" ? `Deadline: ${lead.deadline}` : undefined,
    lead.value && lead.value !== "Unknown" ? `Value: ${lead.value}` : undefined,
    lead.naics ? `NAICS: ${lead.naics}` : undefined,
    lead.setAside ? `Set-aside: ${lead.setAside}` : undefined,
    lead.summary ? "Summary extracted" : undefined,
  ].filter(Boolean) as string[];
}

function resolveKeywords(
  input: CaptureSearchInput,
  env: NodeJS.ProcessEnv,
): string[] {
  const configured = splitList(env.CAPTURE_KEYWORDS);
  const requested = input.keywords?.map((keyword) => keyword.trim()).filter(Boolean) ?? [];
  const query = splitList(input.query);
  const defaults = [
    "smart HVAC",
    "HVAC controls",
    "building automation",
    "energy efficiency retrofit",
    "indoor air quality",
    "construction workforce",
    "BIM",
    "green building",
  ];
  return [
    ...new Set(
      [
        ...(query.length ? query : []),
        ...(requested.length ? requested : []),
        ...(configured.length ? configured : []),
        ...defaults,
      ]
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  ].slice(0, 8);
}

function inferCaptureTags(title: string, keyword: string): string[] {
  const text = `${title} ${keyword}`.toLowerCase();
  const tags: string[] = [];
  if (/hvac|air handler|ahu|vav|mechanical|heat pump|ventilation|iaq|indoor air/.test(text)) {
    tags.push("smart-hvac");
  }
  if (/controls|automation|sensor|building management|bms|commissioning/.test(text)) {
    tags.push("building-controls");
  }
  if (/energy|efficien|retrofit|weatherization|decarbon|green building/.test(text)) {
    tags.push("energy-retrofit", "esg-compliance");
  }
  if (/construction|renovation|facility|facilities|infrastructure|building/.test(text)) {
    tags.push("construction");
  }
  if (/bim|vdc|model|coordination|digital twin/.test(text)) {
    tags.push("bim-vdc");
  }
  if (/workforce|training|apprentice|career|small business/.test(text)) {
    tags.push("workforce");
  }
  if (/resilien|sustainab|climate|emissions|waste/.test(text)) {
    tags.push("esg-compliance");
  }
  return [...new Set(tags.length ? tags : ["capture-review"])];
}

function dedupeLeads(leads: RawCaptureLead[]): RawCaptureLead[] {
  const seen = new Set<string>();
  const deduped: RawCaptureLead[] = [];

  for (const lead of leads) {
    const key = `${lead.sourceUrl ?? ""}|${lead.sourceId}|${lead.title}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(lead);
  }

  return deduped;
}

function inferOwner(tags: string[], sourceType: CaptureSourceType): string {
  if (tags.includes("smart-hvac") || tags.includes("building-controls")) {
    return "HVAC Lead";
  }
  if (tags.includes("bim-vdc")) return "VDC Lead";
  if (tags.includes("esg-compliance")) return "ESG Lead";
  if (sourceType === "rfp") return "Preconstruction";
  return "Business Development";
}

function normalizeTags(tags: string[]): string[] {
  return [
    ...new Set(
      tags
        .map((tag) =>
          tag
            .toLowerCase()
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
        )
        .filter(Boolean),
    ),
  ];
}

function splitList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function clampInteger(
  value: number | undefined,
  min: number,
  max: number,
  fallback: number,
): number {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.round(value)));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatSamDate(value: Date): string {
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${month}/${day}/${value.getFullYear()}`;
}

function normalizeDateLabel(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) {
    return htmlToText(trimmed);
  }
  return date.toISOString().slice(0, 10);
}

function daysUntil(value: string): number | undefined {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const today = new Date();
  const msPerDay = 86_400_000;
  return Math.ceil((date.getTime() - today.getTime()) / msPerDay);
}

function formatGrantsGovAwardValue(
  synopsis: GrantsGovDetail["synopsis"] | undefined,
  forecast: GrantsGovDetail["forecast"] | undefined,
): string {
  const ceiling = formatAwardAmount(
    synopsis?.awardCeilingFormatted ?? synopsis?.awardCeiling,
  );
  const floor = formatAwardAmount(
    synopsis?.awardFloorFormatted ?? synopsis?.awardFloor,
  );
  const estimated = formatAwardAmount(
    forecast?.estimatedFundingFormatted ?? forecast?.estimatedFunding,
  );
  if (ceiling && floor && ceiling !== floor) return `${floor}-${ceiling}`;
  if (ceiling) return ceiling;
  if (floor) return floor;
  if (estimated) return estimated;
  return "Unknown";
}

function formatAwardAmount(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("$")) return trimmed;
  const numeric = Number(trimmed.replace(/,/g, ""));
  if (Number.isFinite(numeric)) {
    return `$${numeric.toLocaleString()}`;
  }
  return htmlToText(trimmed);
}

function parseMoney(value: string | undefined): number {
  const normalized = (value ?? "").toLowerCase().replace(/[$,\s]/g, "");
  const match = normalized.match(/(\d+(?:\.\d+)?)(k|m)?/);
  if (!match) return 0;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return 0;
  if (match[2] === "m") return base * 1_000_000;
  if (match[2] === "k") return base * 1_000;
  return base;
}

function htmlToText(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
