const NEED_RULES = [
  {
    id: "medical",
    label: "Medical care",
    weight: 34,
    words: ["fever", "bleeding", "injury", "pain", "clinic", "medicine", "hospital", "sick", "dizzy", "pregnant"],
    route: "Escalate to emergency medical care or nearest clinic; confirm ability to travel safely."
  },
  {
    id: "housing",
    label: "Safe shelter",
    weight: 28,
    words: ["homeless", "sleep", "evicted", "shelter", "street", "room", "unsafe", "locked out"],
    route: "Find a temporary safe location, then connect to shelter, social service, or trusted host network."
  },
  {
    id: "food",
    label: "Food access",
    weight: 16,
    words: ["hungry", "food", "meal", "milk", "groceries", "eat", "rice", "formula"],
    route: "Route to food bank, community pantry, meal delivery, or emergency grocery voucher."
  },
  {
    id: "legal",
    label: "Legal or work rights",
    weight: 24,
    words: ["passport", "salary", "wages", "boss", "employer", "police", "visa", "contract", "threat", "abuse"],
    route: "Preserve evidence, avoid confrontation, and connect to legal aid or worker-rights NGO."
  },
  {
    id: "mental",
    label: "Mental health risk",
    weight: 38,
    words: ["suicide", "kill myself", "hopeless", "panic", "self harm", "cannot breathe", "scared", "alone"],
    route: "Keep the person engaged, assess immediate danger, and escalate to crisis hotline or emergency support."
  },
  {
    id: "child",
    label: "Child or elder safeguarding",
    weight: 32,
    words: ["child", "baby", "elder", "grandma", "grandfather", "school", "minor", "mother", "family"],
    route: "Prioritize safeguarding, identify responsible adult, and escalate to family service or protection channel."
  },
  {
    id: "documents",
    label: "Documents and access",
    weight: 18,
    words: ["id", "document", "papers", "birth certificate", "bank", "sim card", "account", "lost"],
    route: "List missing documents, required replacements, and the agency or service counter to contact."
  }
];

const SAMPLE_CASES = [
  {
    text: "A cleaner from Bangladesh says his dorm room is locked, employer kept passport, no salary for 2 months. He has fever and is scared to go hospital because boss threatened police.",
    location: "Singapore",
    channel: "WhatsApp",
    language: "English",
    mode: "NGO worker"
  },
  {
    text: "Student says classmate has not eaten since yesterday and is sleeping in the library after family conflict. She says she feels hopeless but does not want teachers to know.",
    location: "Singapore",
    channel: "Walk-in desk",
    language: "English",
    mode: "School counsellor"
  },
  {
    text: "A mother messages in mixed English and Mandarin: baby has no milk, rent due tonight, husband injured, no one can pick up food. She can receive WhatsApp only.",
    location: "Singapore",
    channel: "Hotline",
    language: "Mixed",
    mode: "Community volunteer"
  }
];

const OPS_DESK_CASES = [
  {
    id: "MW-042",
    title: "Dorm locked + fever",
    owner: "Migrant worker desk",
    text: SAMPLE_CASES[0].text,
    location: "Singapore",
    channel: "WhatsApp",
    language: "English",
    mode: "NGO worker"
  },
  {
    id: "SC-118",
    title: "Student sleeping in library",
    owner: "School care lead",
    text: SAMPLE_CASES[1].text,
    location: "Singapore",
    channel: "Walk-in desk",
    language: "English",
    mode: "School counsellor"
  },
  {
    id: "FR-077",
    title: "Baby formula + rent tonight",
    owner: "Family relay lead",
    text: SAMPLE_CASES[2].text,
    location: "Singapore",
    channel: "Hotline",
    language: "Mixed",
    mode: "Community volunteer"
  },
  {
    id: "DO-204",
    title: "Lost documents + no bank access",
    owner: "Document navigator",
    text: "A delivery rider lost his wallet, work permit copy, bank card, and SIM. He cannot receive salary this week and needs help replacing documents before his shift tomorrow.",
    location: "Singapore",
    channel: "Email",
    language: "English",
    mode: "Mutual aid lead"
  }
];

const TRANSLATED_OPENERS = {
  English: "I am here with you. I will ask only what is needed and help you reach the safest next step.",
  Mandarin: "我在这里陪你。我们只确认必要信息，然后一起找到最安全的下一步。",
  Malay: "Saya di sini bersama anda. Saya hanya akan tanya perkara penting dan bantu cari langkah paling selamat.",
  Tamil: "நான் உங்களுடன் இருக்கிறேன். தேவையான தகவல்களை மட்டும் கேட்டு பாதுகாப்பான அடுத்த படியை காண உதவுகிறேன்.",
  Hindi: "Main aapke saath hoon. Sirf zaroori baat puchunga aur sabse surakshit agla kadam dhoondhne mein madad karunga.",
  Mixed: "I am here with you. 我们先确认安全, then choose the safest next step."
};

export const DEFAULT_RESOURCE_DIRECTORY = [
  {
    name: "Migrant Worker Care Desk",
    type: "Medical + work-rights intake",
    needs: ["medical", "legal", "documents", "housing"],
    languages: ["English", "Mandarin", "Tamil", "Hindi", "Bengali"],
    availability: "Same-day callback",
    trust: 94,
    fit: "Strong for worker health, withheld documents, wage disputes, and safe escalation."
  },
  {
    name: "ShelterLink Night Desk",
    type: "Temporary safe shelter",
    needs: ["housing", "food", "mental", "child"],
    languages: ["English", "Mandarin", "Malay", "Tamil"],
    availability: "Night and weekend routing",
    trust: 90,
    fit: "Best when the first blocker is a safe place to stay tonight."
  },
  {
    name: "Community Pantry Relay",
    type: "Food and essentials",
    needs: ["food", "child", "medical"],
    languages: ["English", "Mandarin", "Malay"],
    availability: "2-hour volunteer relay",
    trust: 86,
    fit: "Fastest route for meals, baby formula, groceries, and delivery coordination."
  },
  {
    name: "Legal Aid Worker Rights",
    type: "Legal triage",
    needs: ["legal", "documents"],
    languages: ["English", "Mandarin", "Tamil", "Hindi"],
    availability: "Next business day",
    trust: 91,
    fit: "Useful when salary, passport, employer threats, visa, or police fears appear."
  },
  {
    name: "Document Access Navigator",
    type: "Document and account recovery",
    needs: ["documents"],
    languages: ["English", "Mandarin", "Malay", "Tamil", "Hindi"],
    availability: "Same-day checklist",
    trust: 96,
    fit: "Best for lost ID, papers, SIM, bank access, and replacement-service sequencing."
  },
  {
    name: "School Care Circle",
    type: "Student safeguarding",
    needs: ["mental", "child", "food", "housing"],
    languages: ["English", "Mandarin", "Malay", "Tamil"],
    availability: "School-hours rapid review",
    trust: 88,
    fit: "Designed for students, family conflict, school-based privacy, and counsellor handoff."
  },
  {
    name: "Family Service Connector",
    type: "Family stability",
    needs: ["child", "housing", "food", "documents"],
    languages: ["English", "Mandarin", "Malay", "Tamil", "Hindi"],
    availability: "Same-week case opening",
    trust: 84,
    fit: "Good for households with children, rent pressure, documents, and ongoing care needs."
  },
  {
    name: "Crisis Listening Line",
    type: "Mental health escalation",
    needs: ["mental", "medical"],
    languages: ["English", "Mandarin", "Malay", "Tamil", "Hindi"],
    availability: "Immediate responder",
    trust: 93,
    fit: "Use when self-harm, panic, hopelessness, or immediate emotional danger is present."
  }
];

const HUB_DEFAULT_IDEA = [
  "AidBridge: multilingual community-aid triage for UCWS Singapore Hackathon 2026.",
  "Input messy WhatsApp, hotline, or walk-in requests and produce safe action packs.",
  "Visualize risk, needs, privacy, resource routing, evidence, impact, and Project Wall submission readiness.",
  "Expose a Codex bridge API so future agents can inject ideas, read constellation nodes, and build submission copy."
].join("\n");

const HUB_DIMENSIONS = [
  {
    id: "problem",
    label: "Problem signal",
    group: "user",
    color: "#62f5d0",
    keywords: ["problem", "pain", "urgent", "messy", "risk", "delay", "unsafe", "help", "request", "crisis"],
    guide: "Name the painful moment and the user who feels it."
  },
  {
    id: "beneficiary",
    label: "Beneficiary",
    group: "user",
    color: "#9df2ff",
    keywords: ["volunteer", "ngo", "student", "worker", "counsellor", "community", "frontline", "migrant", "family", "user"],
    guide: "Specify the exact person helped, not a broad market."
  },
  {
    id: "ai",
    label: "AI layer",
    group: "system",
    color: "#8ea4ff",
    keywords: ["ai", "agent", "llm", "model", "rag", "extract", "classify", "score", "codex", "automation"],
    guide: "Explain where intelligence is used and why it improves the workflow."
  },
  {
    id: "data",
    label: "Data source",
    group: "system",
    color: "#caa8ff",
    keywords: ["data", "csv", "directory", "repo", "github", "api", "database", "resource", "input", "source"],
    guide: "Show what information feeds the system and how it stays trusted."
  },
  {
    id: "safety",
    label: "Safety guardrail",
    group: "system",
    color: "#ffb86c",
    keywords: ["privacy", "redact", "safe", "consent", "audit", "risk", "guardrail", "human", "handoff", "evidence"],
    guide: "State what the tool will not do and how humans remain in control."
  },
  {
    id: "visual",
    label: "Visual demo",
    group: "system",
    color: "#ff70ab",
    keywords: ["visual", "map", "graph", "node", "hub", "dashboard", "star", "flow", "canvas", "demo"],
    guide: "Give judges an instantly legible interaction they can remember."
  },
  {
    id: "evaluation",
    label: "Evaluation",
    group: "artifact",
    color: "#f7fb6a",
    keywords: ["test", "benchmark", "score", "metric", "json", "evaluation", "judge", "impact", "minutes", "readiness"],
    guide: "Attach measurable proof, not just claims."
  },
  {
    id: "submission",
    label: "Submission pack",
    group: "artifact",
    color: "#ffffff",
    keywords: ["submit", "project wall", "demo url", "repo", "pitch", "deck", "screenshot", "track", "tagline"],
    guide: "Convert the idea into fields, screenshots, links, and a short pitch."
  }
];

const HUB_ARTIFACTS = [
  {
    id: "demo",
    label: "Live demo URL",
    color: "#62f5d0",
    detail: "Public GitHub Pages demo with ?demo=1 autoplay for judges."
  },
  {
    id: "repo",
    label: "GitHub repo",
    color: "#8ea4ff",
    detail: "Public source code, tests, benchmark, and deployment docs."
  },
  {
    id: "wall",
    label: "Project Wall fields",
    color: "#ff70ab",
    detail: "Copy-ready title, tagline, description, stack, screenshot, and pitch copy."
  },
  {
    id: "codex",
    label: "Codex bridge API",
    color: "#f7fb6a",
    detail: "Browser global and ES module for injecting ideas and reading star-map payloads."
  }
];

export function normalizeText(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function splitList(value) {
  return String(value || "")
    .split(/[|;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeNeedId(value) {
  const key = normalizeText(value).replace(/[^a-z]/g, "");
  const map = {
    medical: "medical",
    medicalcare: "medical",
    health: "medical",
    housing: "housing",
    shelter: "housing",
    safeshelter: "housing",
    food: "food",
    foodaccess: "food",
    legal: "legal",
    workrights: "legal",
    legalorworkrights: "legal",
    mental: "mental",
    mentalhealth: "mental",
    mentalhealthrisk: "mental",
    child: "child",
    elder: "child",
    safeguarding: "child",
    documents: "documents",
    docs: "documents",
    access: "documents"
  };
  return map[key] || key || "general";
}

function parseCsvRows(csv) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;
  const source = String(csv || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(value.trim());
      value = "";
    } else if (char === "\n" && !inQuotes) {
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function directoryToCsv(directory = DEFAULT_RESOURCE_DIRECTORY) {
  const header = ["name", "type", "needs", "languages", "availability", "trust", "fit"];
  const rows = directory.map((resource) => [
    resource.name,
    resource.type,
    resource.needs.join("|"),
    resource.languages.join("|"),
    resource.availability,
    resource.trust,
    resource.fit
  ]);
  return [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
}

export function parseResourceCsv(csv) {
  const rows = parseCsvRows(csv);
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => normalizeText(header).replace(/[^a-z]/g, ""));
  const indexOf = (name) => headers.indexOf(name);
  const indexes = {
    name: indexOf("name"),
    type: indexOf("type"),
    needs: indexOf("needs"),
    languages: indexOf("languages"),
    availability: indexOf("availability"),
    trust: indexOf("trust"),
    fit: indexOf("fit")
  };
  if (indexes.name < 0 || indexes.needs < 0) {
    throw new Error("CSV must include name and needs columns.");
  }
  return rows.slice(1).map((row) => {
    const get = (key) => (indexes[key] >= 0 ? row[indexes[key]] : "");
    const trust = Number.parseInt(get("trust"), 10);
    const needs = splitList(get("needs")).map(normalizeNeedId);
    return {
      name: get("name"),
      type: get("type") || "Community resource",
      needs: needs.length ? needs : ["general"],
      languages: splitList(get("languages")).length ? splitList(get("languages")) : ["English"],
      availability: get("availability") || "Manual review",
      trust: Number.isFinite(trust) ? Math.max(0, Math.min(100, trust)) : 75,
      fit: get("fit") || "Imported local resource."
    };
  }).filter((resource) => resource.name);
}

export function redactSensitiveInfo(text) {
  return String(text || "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/(?:\+?\d[\s-]?){7,}\d/g, "[phone]")
    .replace(/\b[A-Z]\d{7,9}\b/gi, "[document-id]")
    .replace(/\b(passport|visa|id)\s*(number|no\.?)?\s*[:#-]?\s*[A-Z0-9-]{5,}\b/gi, "$1 [redacted]")
    .replace(/\b(room|unit|block)\s+(?=[A-Z0-9-]*\d)[A-Z0-9-]{2,}\b/gi, "$1 [redacted]")
    .trim();
}

export function detectNeeds(text) {
  const normalized = normalizeText(text);
  return NEED_RULES.map((rule) => {
    const hits = rule.words.filter((word) => normalized.includes(word));
    return {
      id: rule.id,
      label: rule.label,
      weight: rule.weight,
      route: rule.route,
      hits
    };
  }).filter((item) => item.hits.length > 0);
}

export function scoreCase(text, needs) {
  const normalized = normalizeText(text);
  const emergencyBoost = ["urgent", "now", "tonight", "threat", "bleeding", "suicide", "baby", "police"].filter((word) =>
    normalized.includes(word)
  ).length * 8;
  const score = Math.min(100, needs.reduce((sum, item) => sum + item.weight + item.hits.length * 3, 0) + emergencyBoost);
  const confidence = Math.min(96, 54 + needs.length * 9 + Math.min(18, normalized.length / 28));
  return {
    urgency: Math.round(score),
    confidence: Math.round(confidence),
    band: score >= 75 ? "Critical" : score >= 45 ? "High" : score >= 24 ? "Moderate" : "Low"
  };
}

export function matchResources(needs, input, score, resourceDirectory = DEFAULT_RESOURCE_DIRECTORY) {
  const needIds = new Set(needs.map((need) => need.id));
  const preferredLanguage = input.language || "English";
  return resourceDirectory.map((resource) => {
    const matchedNeeds = resource.needs.filter((need) => needIds.has(need));
    const languageFit = resource.languages.includes(preferredLanguage) || preferredLanguage === "Mixed";
    const urgencyFit = score.urgency >= 75 && /immediate|same-day|night/i.test(resource.availability);
    const scoreValue = resource.trust + matchedNeeds.length * 17 + (languageFit ? 9 : 0) + (urgencyFit ? 8 : 0);
    return {
      ...resource,
      matchedNeeds,
      languageFit,
      score: scoreValue,
      why: [
        matchedNeeds.length ? `covers ${matchedNeeds.length} detected need(s)` : "kept as backup route",
        languageFit ? `supports ${preferredLanguage}` : "requires translation support",
        urgencyFit ? "fits urgent timing" : resource.availability
      ].join("; ")
    };
  })
    .filter((resource) => resource.matchedNeeds.length > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function buildActionPack(input, resourceDirectory = DEFAULT_RESOURCE_DIRECTORY) {
  const text = input.text || "";
  const needs = detectNeeds(text);
  const score = scoreCase(text, needs);
  const topNeeds = needs.length ? needs : [{
    id: "general",
    label: "General support",
    weight: 8,
    route: "Clarify the immediate problem, confirm safety, and route to the closest trusted support desk.",
    hits: []
  }];
  const language = input.language || "English";
  const opener = TRANSLATED_OPENERS[language] || TRANSLATED_OPENERS.English;
  const firstResponse = [
    opener,
    score.urgency >= 75
      ? "This looks time-sensitive: confirm current location, immediate danger, and whether emergency services are needed."
      : "Start by confirming location, consent to record the case, and the one need that must be solved first."
  ].join(" ");
  const actions = makeActions(topNeeds, input, score);
  const evidence = makeEvidence(topNeeds, text, input, score);
  const resources = matchResources(topNeeds, input, score, resourceDirectory);
  const redactedSummary = makeRedactedSummary(text, topNeeds);
  const followup = makeFollowup(score);
  const handoff = makeHandoff(topNeeds, input, score);
  const pack = {
    input,
    needs: topNeeds,
    score,
    firstResponse,
    actions,
    evidence,
    resources,
    redactedSummary,
    followup,
    handoff,
    routes: topNeeds.map((need) => ({ label: need.label, route: need.route })),
    fieldPack: formatFieldPack({ input, needs: topNeeds, score, firstResponse, actions, evidence, resources, redactedSummary, followup, handoff })
  };
  pack.audit = auditActionPack(pack);
  pack.impact = estimateImpact(pack);
  pack.launch = buildSingaporeLaunchPlan(pack);
  pack.flow = buildFlowMap(pack);
  pack.evaluationJson = formatEvaluationJson(pack);
  return pack;
}

export function auditActionPack(pack) {
  const checks = [
    {
      id: "safety",
      label: "Safety escalation is explicit",
      weight: 22,
      passed: pack.score.urgency < 75 || (
        /time-sensitive/i.test(pack.firstResponse) &&
        pack.actions.some((action) => /immediate danger|emergency service|trusted responder/i.test(action))
      ),
      detail: "Critical cases must visibly prioritize danger, location, callback channel, and escalation."
    },
    {
      id: "privacy",
      label: "Privacy brief is redacted",
      weight: 18,
      passed: !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(pack.redactedSummary) &&
        !/(?:\+?\d[\s-]?){7,}\d/.test(pack.redactedSummary) &&
        !/\b[A-Z]\d{7,9}\b/i.test(pack.redactedSummary),
      detail: "Exportable summaries should remove direct contact details and document identifiers."
    },
    {
      id: "evidence",
      label: "Evidence ledger supports the decision",
      weight: 16,
      passed: pack.evidence.length >= 3 && pack.evidence.some((item) => /Risk band/i.test(item)),
      detail: "The case should explain why the risk score and need labels were chosen."
    },
    {
      id: "resource-fit",
      label: "Trusted resource route is matched",
      weight: 18,
      passed: pack.resources.length > 0 && pack.resources[0].matchedNeeds.length > 0,
      detail: "The plan should connect detected needs to a named support route."
    },
    {
      id: "handoff",
      label: "Human ownership is clear",
      weight: 14,
      passed: pack.handoff.includes("Risk is") && pack.actions.some((action) => /human owner|follow-up/i.test(action)),
      detail: "A real operator needs a named next owner and a closing condition."
    },
    {
      id: "field-readiness",
      label: "Field pack is copy-ready",
      weight: 12,
      passed: pack.fieldPack.includes("AIDBRIDGE FIELD PACK") &&
        pack.fieldPack.includes("NEXT 60 MINUTES") &&
        pack.followup.length >= 3,
      detail: "The output must be usable in a case note or volunteer chat without extra setup."
    }
  ];
  const score = checks.reduce((sum, check) => sum + (check.passed ? check.weight : 0), 0);
  return {
    score,
    band: score >= 90 ? "Judge-ready" : score >= 75 ? "Review once" : "Needs operator review",
    passed: checks.filter((check) => check.passed).length,
    total: checks.length,
    checks
  };
}

function countSensitiveSignals(text) {
  const source = String(text || "");
  const patterns = [
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
    /(?:\+?\d[\s-]?){7,}\d/g,
    /\b[A-Z]\d{7,9}\b/gi,
    /\b(passport|visa|id)\s*(number|no\.?)?\s*[:#-]?\s*[A-Z0-9-]{5,}\b/gi,
    /\b(room|unit|block)\s+(?=[A-Z0-9-]*\d)[A-Z0-9-]{2,}\b/gi
  ];
  return patterns.reduce((sum, pattern) => sum + (source.match(pattern) || []).length, 0);
}

export function estimateImpact(pack) {
  const highRiskLoad = pack.score.urgency >= 75 ? 16 : pack.score.urgency >= 45 ? 9 : 4;
  const baselineMinutes = 18 + pack.needs.length * 7 + highRiskLoad + (pack.resources.length ? 6 : 14);
  const aidbridgeMinutes = 4 + pack.needs.length * 2 + (pack.resources.length ? 2 : 8);
  const minutesSaved = Math.max(0, baselineMinutes - aidbridgeMinutes);
  const privacySignalsRedacted = countSensitiveSignals(pack.input.text);
  const handoffCompleteness = pack.audit.score;
  return {
    baselineMinutes,
    aidbridgeMinutes,
    minutesSaved,
    privacySignalsRedacted,
    resourceRoutes: pack.resources.length,
    followupCheckpoints: pack.followup.length,
    handoffCompleteness,
    summary: `${minutesSaved} estimated operator minutes saved; ${pack.resources.length} matched route(s); ${pack.followup.length} follow-up checkpoint(s); ${privacySignalsRedacted} sensitive signal(s) prepared for redaction.`
  };
}

export function buildSingaporeLaunchPlan(pack) {
  const supportedLanguages = new Set(DEFAULT_RESOURCE_DIRECTORY.flatMap((resource) => resource.languages));
  const localLanguages = ["English", "Mandarin", "Malay", "Tamil"];
  const expansionLanguages = ["Hindi", "Bengali", "Mixed"];
  const languageCoverage = localLanguages.filter((language) => supportedLanguages.has(language)).length;
  const expansionCoverage = expansionLanguages.filter((language) => supportedLanguages.has(language) || pack.input.language === language).length;
  const channel = pack.input.channel || "WhatsApp";
  const resourceTypes = new Set(pack.resources.map((resource) => resource.type));
  const hasUrgentRoute = pack.resources.some((resource) => /immediate|same-day|night|weekend/i.test(resource.availability));
  const checklist = [
    {
      id: "language",
      label: "Singapore multilingual coverage",
      weight: 18,
      passed: languageCoverage >= 4,
      detail: `${languageCoverage}/4 Singapore operating languages covered, with ${expansionCoverage} additional migrant/region language signal(s).`
    },
    {
      id: "channel",
      label: "WhatsApp and frontline intake fit",
      weight: 14,
      passed: /whatsapp|hotline|walk-in desk|email/i.test(channel),
      detail: `Current intake channel is ${channel}; the flow supports WhatsApp, hotline, walk-in, and email-style requests.`
    },
    {
      id: "directory",
      label: "Local resource-directory portability",
      weight: 16,
      passed: pack.resources.length > 0 && resourceTypes.size > 0,
      detail: `${pack.resources.length} trusted route(s) matched; teams can replace the demo directory with their own CSV.`
    },
    {
      id: "privacy",
      label: "Privacy-safe export posture",
      weight: 16,
      passed: pack.audit.checks.some((check) => check.id === "privacy" && check.passed),
      detail: "Redacted brief and Field Pack avoid direct phone, email, document, and sensitive location leakage."
    },
    {
      id: "handoff",
      label: "Human-in-the-loop operating model",
      weight: 14,
      passed: pack.audit.checks.some((check) => check.id === "handoff" && check.passed),
      detail: "The workflow keeps a trained human responsible for consent, escalation, follow-up, and closure."
    },
    {
      id: "proof",
      label: "Judge and buyer proof package",
      weight: 12,
      passed: pack.audit.score >= 90 && pack.impact.minutesSaved > 0,
      detail: `${pack.audit.score}/100 case audit and ${pack.impact.minutesSaved} estimated operator minutes saved.`
    },
    {
      id: "timing",
      label: "Urgent-response route readiness",
      weight: 10,
      passed: hasUrgentRoute,
      detail: hasUrgentRoute
        ? "At least one matched route supports urgent or same-day response."
        : "Add a verified urgent-response resource before production rollout."
    }
  ];
  const score = checklist.reduce((sum, item) => sum + (item.passed ? item.weight : 0), 0);
  const launchMarkets = [
    {
      label: "Singapore wedge",
      detail: "Start with NGOs, school care teams, mutual-aid desks, and migrant-worker support workflows."
    },
    {
      label: "SEA expansion path",
      detail: "Reuse the same schema with localized directories, languages, escalation rules, and partner handoff owners."
    },
    {
      label: "Enterprise/CSR fit",
      detail: "Position as a responsible intake layer for community programs, volunteer ops, and impact reporting."
    }
  ];
  return {
    score,
    band: score >= 90 ? "Singapore-ready" : score >= 75 ? "Launch pilot-ready" : "Needs local partner review",
    supportedLanguages: [...supportedLanguages].sort(),
    checklist,
    launchMarkets,
    summary: `${score}/100 Singapore launch readiness: multilingual intake, CSV resource portability, privacy-safe export, human handoff, and judge/buyer proof are bundled into one browser demo.`
  };
}

function responseWindow(score) {
  if (score.urgency >= 75) return "20 min";
  if (score.urgency >= 45) return "60 min";
  return "24 hr";
}

function pressureBand(value) {
  if (value >= 80) return "High";
  if (value >= 55) return "Watch";
  return "Balanced";
}

export function buildOpsDesk(cases = OPS_DESK_CASES, resourceDirectory = DEFAULT_RESOURCE_DIRECTORY) {
  const caseRows = cases.map((item, index) => {
    const pack = buildActionPack(item, resourceDirectory);
    const leadNeed = pack.needs[0]?.label || "Clarify";
    const topResource = pack.resources[0]?.name || "Manual review";
    return {
      id: item.id || `CASE-${index + 1}`,
      title: item.title || leadNeed,
      owner: item.owner || item.mode || "Duty lead",
      input: item,
      pack,
      urgency: pack.score.urgency,
      band: pack.score.band,
      confidence: pack.score.confidence,
      leadNeed,
      topResource,
      responseWindow: responseWindow(pack.score),
      nextAction: pack.actions[0],
      minutesSaved: pack.impact.minutesSaved
    };
  }).sort((a, b) => b.urgency - a.urgency || b.confidence - a.confidence);

  const resourceMap = new Map();
  caseRows.forEach((row) => {
    row.pack.resources.forEach((resource, resourceIndex) => {
      const current = resourceMap.get(resource.name) || {
        name: resource.name,
        type: resource.type,
        cases: 0,
        criticalCases: 0,
        pressure: 0,
        trust: resource.trust,
        fit: resource.fit
      };
      current.cases += 1;
      current.criticalCases += row.urgency >= 75 ? 1 : 0;
      current.pressure += Math.max(8, Math.round(row.urgency / (resourceIndex + 1)));
      resourceMap.set(resource.name, current);
    });
  });

  const resourceLoad = [...resourceMap.values()]
    .map((resource) => ({
      ...resource,
      pressure: Math.min(100, resource.pressure),
      band: pressureBand(Math.min(100, resource.pressure))
    }))
    .sort((a, b) => b.pressure - a.pressure || b.cases - a.cases);

  const metrics = {
    openCases: caseRows.length,
    criticalCases: caseRows.filter((row) => row.urgency >= 75).length,
    averageUrgency: Math.round(caseRows.reduce((sum, row) => sum + row.urgency, 0) / Math.max(1, caseRows.length)),
    minutesSaved: caseRows.reduce((sum, row) => sum + row.minutesSaved, 0),
    matchedRoutes: caseRows.reduce((sum, row) => sum + row.pack.resources.length, 0),
    privacySignals: caseRows.reduce((sum, row) => sum + row.pack.impact.privacySignalsRedacted, 0),
    pressure: resourceLoad[0]?.band || "Balanced"
  };

  const nextCase = caseRows[0];
  const bottlenecks = [
    metrics.criticalCases > 1
      ? `${metrics.criticalCases} critical cases need named human owners before any low-risk follow-up.`
      : "Critical load is manageable if the next case is owned now.",
    resourceLoad[0]
      ? `${resourceLoad[0].name} is the hottest route (${resourceLoad[0].pressure}/100 pressure).`
      : "No route pressure yet; keep manual review open.",
    metrics.privacySignals > 0
      ? `${metrics.privacySignals} sensitive signal(s) require redaction before sharing.`
      : "No direct sensitive signal detected in the current queue."
  ];

  const opsBrief = [
    "AIDBRIDGE OPS DESK",
    `Open cases: ${metrics.openCases}`,
    `Critical cases: ${metrics.criticalCases}`,
    `Average urgency: ${metrics.averageUrgency}/100`,
    `Estimated operator minutes saved: ${metrics.minutesSaved}`,
    "",
    "NEXT CASE",
    `${nextCase.id} - ${nextCase.title}`,
    `Owner: ${nextCase.owner}`,
    `Risk: ${nextCase.band} (${nextCase.urgency}/100), response window ${nextCase.responseWindow}`,
    `Lead need: ${nextCase.leadNeed}`,
    `Top route: ${nextCase.topResource}`,
    `First action: ${nextCase.nextAction}`,
    "",
    "BOTTLENECKS",
    ...bottlenecks.map((item) => `- ${item}`),
    "",
    "QUEUE",
    ...caseRows.map((row, index) => `${index + 1}. ${row.id} ${row.title} - ${row.band}, ${row.responseWindow}, route: ${row.topResource}`)
  ].join("\n");

  return {
    generatedAt: new Date().toISOString(),
    metrics,
    nextCaseId: nextCase?.id,
    queue: caseRows.map((row) => ({
      id: row.id,
      title: row.title,
      owner: row.owner,
      urgency: row.urgency,
      band: row.band,
      confidence: row.confidence,
      leadNeed: row.leadNeed,
      topResource: row.topResource,
      responseWindow: row.responseWindow,
      nextAction: row.nextAction,
      minutesSaved: row.minutesSaved
    })),
    resourceLoad,
    bottlenecks,
    opsBrief
  };
}

export function buildFlowMap(pack) {
  const leadNeed = pack.needs[0]?.label || "Clarify";
  const topResource = pack.resources[0]?.name || "Manual review";
  const topRoute = pack.routes[0]?.route || "Clarify the request and route to a trusted support desk.";
  return {
    title: `${pack.score.band} case flow`,
    nodes: [
      {
        id: "intake",
        label: "Signal intake",
        value: pack.input.channel || "Intake",
        tone: "blue",
        detail: `Incoming ${pack.input.channel || "message"} in ${pack.input.language || "English"} from ${pack.input.location || "unknown location"}. Capture consent, location, callback channel, and current danger before expanding the case.`
      },
      {
        id: "triage",
        label: "Need radar",
        value: `${pack.needs.length} need(s)`,
        tone: pack.score.urgency >= 75 ? "coral" : "gold",
        detail: `${pack.score.band} urgency (${pack.score.urgency}/100). Lead route: ${topRoute}`
      },
      {
        id: "route",
        label: "Resource route",
        value: `${pack.resources.length} match(es)`,
        tone: "teal",
        detail: pack.resources.length
          ? `Top match: ${topResource}. ${pack.resources[0].why}.`
          : "No verified resource matched yet; assign manual review and ask for missing eligibility details."
      },
      {
        id: "proof",
        label: "Evidence lock",
        value: `${pack.evidence.length} note(s)`,
        tone: "purple",
        detail: `${pack.evidence.length} evidence notes generated. Redacted summary: ${pack.redactedSummary}`
      },
      {
        id: "handoff",
        label: "Human handoff",
        value: `${pack.impact.minutesSaved} min saved`,
        tone: "sage",
        detail: `${pack.impact.summary} Handoff owner should verify consent, solve the first safety blocker, and update the ledger before closing.`
      }
    ],
    pulse: [
      `Lead need: ${leadNeed}`,
      `Top route: ${topResource}`,
      `Follow-up: ${pack.followup.length} checkpoints`,
      `Audit: ${pack.audit.score}/100`
    ]
  };
}

function slugify(value) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 44) || "idea";
}

function splitIdeaSegments(text) {
  const source = String(text || "").trim();
  if (!source) return [];
  const rough = source
    .split(/\n{2,}|\n\s*(?:[-*]|\d+[.)])\s+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter((item) => item.length > 12);
  if (rough.length > 1) return rough.slice(0, 9);
  return splitSentences(source).filter((item) => item.length > 12).slice(0, 7);
}

function inferProjectName(text) {
  const source = String(text || "").trim();
  const firstLine = source.split(/\n/).map((item) => item.trim()).find(Boolean) || "AidBridge";
  const colonMatch = firstLine.match(/^([A-Za-z0-9][A-Za-z0-9\s-]{1,38})\s*:/);
  if (colonMatch) return colonMatch[1].trim();
  const titleWords = firstLine
    .replace(/[^A-Za-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4);
  return titleWords.join(" ") || "AidBridge";
}

function summarizeIdea(text) {
  const sentence = splitSentences(text)[0] || String(text || "").replace(/\s+/g, " ").trim();
  return sentence.length > 160 ? `${sentence.slice(0, 157)}...` : sentence;
}

function dimensionScore(text, dimension) {
  const normalized = normalizeText(text);
  return dimension.keywords.reduce((sum, keyword) => sum + (normalized.includes(keyword) ? 1 : 0), 0);
}

function nodePosition(index, total, radius, start = -Math.PI / 2) {
  const angle = start + (Math.PI * 2 * index) / Math.max(1, total);
  return {
    x: 0.5 + Math.cos(angle) * radius,
    y: 0.5 + Math.sin(angle) * radius
  };
}

function makeSubmissionGuidance({ projectName, sourceText, dimensions, pack }) {
  const leadNeed = pack?.needs?.[0]?.label || "hackathon user pain";
  const strongest = dimensions.slice(0, 3).map((dimension) => dimension.label).join(", ");
  const tagline = projectName === "AidBridge"
    ? "Multilingual community-aid triage that turns messy help requests into verified action packs."
    : `A guided AI hub that turns ${leadNeed.toLowerCase()} ideas into a visual, submission-ready project map.`;
  const description = [
    `${projectName} turns raw hackathon thinking into a visible constellation of users, AI layers, data sources, guardrails, demo artifacts, and evaluation proof.`,
    `The strongest current angles are ${strongest || "problem clarity, evaluation, and submission readiness"}.`,
    "The Hub guides Project Wall filling by generating the title, tagline, track fit, proof points, demo links, and next actions from one idea input."
  ].join(" ");
  const missing = [
    "Confirm real team member names and profile links.",
    "Paste the final Project Wall URL after submission.",
    "Record a 60-90 second walkthrough if the platform exposes a demo video field."
  ];
  return {
    projectName,
    tagline,
    track: "Application; add DeepResearch if multi-select is allowed",
    description,
    demoUrl: "https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1",
    repoUrl: "https://github.com/wangsiyi7/aidbridge-ucws-2026",
    screenshot: "assets/screenshot-judge.png",
    keyProof: [
      `${dimensions.length} idea dimensions mapped`,
      pack ? `${pack.audit.score}/100 live case-quality audit` : "Live readiness audit",
      pack ? `${pack.impact.minutesSaved} operator minutes saved in the active sample` : "Impact estimate ready",
      "Browser API and ES module released for Codex handoff"
    ],
    guidedSteps: [
      {
        label: "Project name",
        value: projectName,
        detail: "Use the short, memorable name detected from the first line or keep AidBridge."
      },
      {
        label: "Tagline",
        value: tagline,
        detail: "Lead with the transformation, not implementation details."
      },
      {
        label: "Description",
        value: description,
        detail: "Mention user, workflow, visible constellation, safety, evidence, and API bridge."
      },
      {
        label: "Demo and repo",
        value: "Paste the live demo and GitHub repository URLs.",
        detail: "Use ?demo=1 so judges land on an active guided walkthrough."
      },
      {
        label: "Proof",
        value: "Attach screenshot, benchmark report, and evaluation JSON.",
        detail: "This turns the project from an idea into an auditable submission."
      }
    ],
    missing,
    sourceSummary: summarizeIdea(sourceText)
  };
}

export function buildIdeaConstellation(input = {}, pack) {
  const sourceText = (typeof input === "string" ? input : input.ideaText || input.text || "").trim() || HUB_DEFAULT_IDEA;
  const projectName = inferProjectName(sourceText);
  const segments = splitIdeaSegments(sourceText);
  const dimensionMatches = HUB_DIMENSIONS
    .map((dimension) => ({
      ...dimension,
      matchScore: dimensionScore(sourceText, dimension)
    }))
    .sort((a, b) => b.matchScore - a.matchScore || a.label.localeCompare(b.label));
  const selectedDimensions = dimensionMatches
    .filter((dimension, index) => dimension.matchScore > 0 || index < 5)
    .slice(0, 8);
  const nodes = [{
    id: "core",
    label: projectName,
    type: "core",
    group: "project",
    color: "#f7fb6a",
    x: 0.5,
    y: 0.5,
    radius: 24,
    score: 100,
    detail: summarizeIdea(sourceText)
  }];
  const edges = [];

  selectedDimensions.forEach((dimension, index) => {
    const position = nodePosition(index, selectedDimensions.length, 0.28, -Math.PI / 2);
    nodes.push({
      id: `dimension-${dimension.id}`,
      label: dimension.label,
      type: "dimension",
      group: dimension.group,
      color: dimension.color,
      x: position.x,
      y: position.y,
      radius: 13 + Math.min(7, dimension.matchScore * 2),
      score: Math.min(100, 52 + dimension.matchScore * 16),
      detail: `${dimension.guide} Matched ${dimension.matchScore} signal(s).`
    });
    edges.push({
      from: "core",
      to: `dimension-${dimension.id}`,
      strength: Math.min(1, 0.35 + dimension.matchScore * 0.16),
      reason: dimension.guide
    });
  });

  segments.forEach((segment, index) => {
    const position = nodePosition(index, Math.max(segments.length, 3), 0.41, Math.PI / 7);
    const bestDimension = selectedDimensions
      .map((dimension) => ({ dimension, score: dimensionScore(segment, dimension) }))
      .sort((a, b) => b.score - a.score)[0]?.dimension || selectedDimensions[index % selectedDimensions.length];
    const id = `idea-${index + 1}-${slugify(segment)}`;
    nodes.push({
      id,
      label: segment.length > 38 ? `${segment.slice(0, 35)}...` : segment,
      type: "idea",
      group: "user",
      color: bestDimension?.color || "#62f5d0",
      x: position.x,
      y: position.y,
      radius: 9 + Math.min(7, segment.length / 45),
      score: 70,
      detail: segment
    });
    edges.push({
      from: id,
      to: bestDimension ? `dimension-${bestDimension.id}` : "core",
      strength: 0.62,
      reason: bestDimension ? `Feeds ${bestDimension.label}` : "Feeds project core"
    });
  });

  HUB_ARTIFACTS.forEach((artifact, index) => {
    const position = nodePosition(index, HUB_ARTIFACTS.length, 0.46, Math.PI / 2.8);
    const id = `artifact-${artifact.id}`;
    nodes.push({
      id,
      label: artifact.label,
      type: "artifact",
      group: "artifact",
      color: artifact.color,
      x: position.x,
      y: position.y,
      radius: 12,
      score: 92,
      detail: artifact.detail
    });
    edges.push({
      from: "core",
      to: id,
      strength: 0.74,
      reason: "Submission artifact"
    });
  });

  const readiness = Math.min(100, Math.round(56 + selectedDimensions.length * 4 + HUB_ARTIFACTS.length * 2 + (pack?.audit?.score || 0) / 4));
  const guidance = makeSubmissionGuidance({ projectName, sourceText, dimensions: selectedDimensions, pack });
  return {
    schemaVersion: "aidbridge-hub-2026-06-05",
    generatedAt: new Date().toISOString(),
    projectName,
    readiness,
    sourceText,
    summary: guidance.description,
    nodes,
    edges,
    guidance,
    codexBridge: {
      browserGlobal: "window.AidBridgeCodex",
      module: "./api/codex-bridge.mjs",
      eventInput: "aidbridge:codex-idea",
      eventOutput: "aidbridge:hub-built",
      methods: ["buildIdeaConstellation", "buildFromIdea", "getCurrentHub", "setIdeaText", "importCodexContext"]
    }
  };
}

export function formatEvaluationJson(pack) {
  return JSON.stringify({
    project: "AidBridge",
    schemaVersion: "2026-06-04",
    trackFit: ["Application", "DeepResearch"],
    case: {
      location: pack.input.location || "Unknown",
      channel: pack.input.channel || "Unknown",
      language: pack.input.language || "English",
      operatorMode: pack.input.mode || "Community volunteer"
    },
    score: pack.score,
    detectedNeeds: pack.needs.map((need) => ({
      id: need.id,
      label: need.label,
      matchedSignals: need.hits.length
    })),
    firstResponse: pack.firstResponse,
    nextActions: pack.actions,
    evidenceLedger: pack.evidence,
    redactedSummary: pack.redactedSummary,
    matchedResources: pack.resources.map((resource) => ({
      name: resource.name,
      type: resource.type,
      matchedNeeds: resource.matchedNeeds,
      trust: resource.trust,
      why: resource.why
    })),
    followup: pack.followup,
    handoff: pack.handoff,
    impact: pack.impact,
    singaporeLaunch: pack.launch,
    flow: pack.flow,
    audit: {
      score: pack.audit.score,
      band: pack.audit.band,
      passed: pack.audit.passed,
      total: pack.audit.total,
      checks: pack.audit.checks.map((check) => ({
        id: check.id,
        label: check.label,
        passed: check.passed,
        weight: check.weight
      }))
    }
  }, null, 2);
}

let activeResourceDirectory = DEFAULT_RESOURCE_DIRECTORY;
let flowTourTimer;
let currentHub;
let currentOpsDesk;
let hubCanvasFrame;
let hubCanvasPhase = 0;
let selectedHubNodeId = "core";

function makeActions(needs, input, score) {
  const leadNeed = needs[0];
  const actions = [
    `Open with a calm consent check in ${input.language || "English"} and confirm exact location in ${input.location || "the current area"}.`,
    `Resolve the highest-risk item first: ${leadNeed.route}`,
    "Record only necessary facts: who is affected, current danger, callback channel, and proof already available.",
    "Assign a human owner and set a 20-minute follow-up checkpoint."
  ];
  if (score.urgency >= 75) {
    actions.splice(1, 0, "If there is immediate danger, keep the person on the line while a trusted responder or emergency service is contacted.");
  }
  return actions.slice(0, 5);
}

function makeEvidence(needs, text, input, score) {
  const snippets = splitSentences(text).slice(0, 3);
  const needEvidence = needs.map((need) => `${need.label}: matched ${need.hits.length || 1} signal(s)`);
  return [
    `Risk band: ${score.band} (${score.urgency}/100)`,
    `Channel: ${input.channel || "Unknown"}; operator: ${input.mode || "Community volunteer"}`,
    ...needEvidence,
    ...snippets.map((snippet) => `Source note: "${redactSensitiveInfo(snippet).slice(0, 110)}"`)
  ].slice(0, 8);
}

function makeRedactedSummary(text, needs) {
  const summary = splitSentences(redactSensitiveInfo(text)).slice(0, 2).join(". ");
  const needLabels = needs.map((need) => need.label).join(", ");
  return `${summary || "No case details supplied yet."} Priority themes: ${needLabels || "general support"}.`;
}

function splitSentences(text) {
  return String(text || "")
    .split(/[.!?。]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function makeFollowup(score) {
  if (score.urgency >= 75) {
    return [
      "0-5 min: confirm immediate danger and safe callback channel.",
      "5-20 min: contact first matched resource and assign a human owner.",
      "20-60 min: verify arrival, document evidence, and schedule next check."
    ];
  }
  if (score.urgency >= 45) {
    return [
      "0-10 min: confirm consent, location, and priority need.",
      "10-45 min: contact matched resource or queue owner.",
      "Same day: verify response and close the loop with requester."
    ];
  }
  return [
    "0-15 min: clarify request and confirm consent to record.",
    "Same day: share best resource route and ask for missing details.",
    "48 hours: follow up if no trusted handoff is confirmed."
  ];
}

function makeHandoff(needs, input, score) {
  const needLabels = needs.map((need) => need.label).join(", ");
  return `Case from ${input.channel || "intake"} in ${input.location || "unknown location"}. Risk is ${score.band}. Detected needs: ${needLabels}. Please contact the requester, verify consent, solve the first safety blocker, and update the evidence ledger before closing.`;
}

function formatFieldPack(pack) {
  return [
    "AIDBRIDGE FIELD PACK",
    `Location: ${pack.input.location || "Unknown"}`,
    `Channel: ${pack.input.channel || "Unknown"}`,
    `Language: ${pack.input.language || "English"}`,
    `Operator: ${pack.input.mode || "Community volunteer"}`,
    `Risk: ${pack.score.band} (${pack.score.urgency}/100)`,
    "",
    "FIRST RESPONSE",
    pack.firstResponse,
    "",
    "DETECTED NEEDS",
    ...pack.needs.map((need) => `- ${need.label}`),
    "",
    "NEXT 60 MINUTES",
    ...pack.actions.map((action, index) => `${index + 1}. ${action}`),
    "",
    "EVIDENCE LEDGER",
    ...pack.evidence.map((item) => `- ${item}`),
    "",
    "REDACTED CASE SUMMARY",
    pack.redactedSummary,
    "",
    "MATCHED RESOURCES",
    ...(pack.resources.length ? pack.resources.map((resource, index) => `${index + 1}. ${resource.name} - ${resource.type}; ${resource.why}`) : ["- No resource matched yet; use manual review."]),
    "",
    "FOLLOW-UP CLOCK",
    ...pack.followup.map((item) => `- ${item}`),
    "",
    "HUMAN HANDOFF",
    pack.handoff
  ].join("\n");
}

function byId(id) {
  return document.getElementById(id);
}

function renderPack(pack) {
  byId("urgencyScore").textContent = `${pack.score.urgency}`;
  byId("confidenceScore").textContent = `${pack.score.confidence}%`;
  byId("needsScore").textContent = `${pack.needs.length}`;
  byId("firstResponse").textContent = pack.firstResponse;
  byId("handoffScript").textContent = pack.handoff;
  byId("privacyBrief").textContent = pack.redactedSummary;
  byId("fieldPack").textContent = pack.fieldPack;
  byId("auditScore").textContent = `${pack.audit.score}`;
  byId("auditBand").textContent = `${pack.audit.band} (${pack.audit.passed}/${pack.audit.total})`;
  byId("evaluationJson").textContent = pack.evaluationJson;
  byId("impactSaved").textContent = `${pack.impact.minutesSaved}`;
  byId("impactBaseline").textContent = `${pack.impact.baselineMinutes} min`;
  byId("impactAidbridge").textContent = `${pack.impact.aidbridgeMinutes} min`;
  byId("impactRedacted").textContent = `${pack.impact.privacySignalsRedacted}`;
  byId("impactRoutes").textContent = `${pack.impact.resourceRoutes}`;
  byId("impactSummary").textContent = pack.impact.summary;
  byId("launchScore").textContent = `${pack.launch.score}`;
  byId("launchBand").textContent = pack.launch.band;
  byId("launchSummary").textContent = pack.launch.summary;
  byId("flowTitle").textContent = pack.flow.title;
  stopFlowTour();
  byId("flowPulse").replaceChildren(...pack.flow.pulse.map((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    return span;
  }));
  renderFlowDetail(pack.flow.nodes[0]);

  byId("actionList").replaceChildren(...pack.actions.map((action) => {
    const li = document.createElement("li");
    li.textContent = action;
    return li;
  }));

  byId("evidenceList").replaceChildren(...pack.evidence.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));

  byId("resourceMatchList").replaceChildren(...pack.resources.map((resource) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = resource.name;
    const span = document.createElement("span");
    span.textContent = `${resource.type}. ${resource.why}.`;
    li.append(strong, span);
    return li;
  }));

  byId("followupList").replaceChildren(...pack.followup.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));

  byId("auditList").replaceChildren(...pack.audit.checks.map((check) => {
    const li = document.createElement("li");
    li.className = check.passed ? "is-pass" : "is-review";
    const strong = document.createElement("strong");
    strong.textContent = check.label;
    const span = document.createElement("span");
    span.textContent = check.detail;
    li.append(strong, span);
    return li;
  }));

  byId("launchMarkets").replaceChildren(...pack.launch.launchMarkets.map((market) => {
    const div = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = market.label;
    const span = document.createElement("span");
    span.textContent = market.detail;
    div.append(strong, span);
    return div;
  }));

  byId("launchChecklist").replaceChildren(...pack.launch.checklist.map((item) => {
    const li = document.createElement("li");
    li.className = item.passed ? "is-pass" : "is-review";
    const strong = document.createElement("strong");
    strong.textContent = item.label;
    const span = document.createElement("span");
    span.textContent = item.detail;
    li.append(strong, span);
    return li;
  }));

  byId("flowNodes").replaceChildren(...pack.flow.nodes.map((node, index) => {
    const div = document.createElement("button");
    div.type = "button";
    div.className = `flow-node tone-${node.tone}${index === 0 ? " is-active" : ""}`;
    div.dataset.flowNode = node.id;
    div.style.setProperty("--offset", index % 2 ? "12px" : "0px");
    const label = document.createElement("span");
    label.textContent = node.label;
    const value = document.createElement("strong");
    value.textContent = node.value;
    div.append(label, value);
    div.addEventListener("click", () => {
      document.querySelectorAll(".flow-node").forEach((item) => item.classList.toggle("is-active", item === div));
      renderFlowDetail(node);
    });
    return div;
  }));

  byId("needChips").replaceChildren(...pack.needs.map((need) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = need.label;
    return span;
  }));

  byId("resourceRoutes").replaceChildren(...pack.routes.map((route) => {
    const div = document.createElement("div");
    div.className = "route-item";
    const strong = document.createElement("strong");
    strong.textContent = route.label;
    const text = document.createElement("span");
    text.textContent = route.route;
    div.append(strong, text);
    return div;
  }));

  byId("resourceMatches").replaceChildren(...pack.resources.map((resource) => {
    const div = document.createElement("div");
    div.className = "route-item";
    const strong = document.createElement("strong");
    strong.textContent = `${resource.name} (${resource.trust})`;
    const text = document.createElement("span");
    text.textContent = resource.fit;
    div.append(strong, text);
    return div;
  }));
}

function renderFlowDetail(node) {
  byId("flowDetailTitle").textContent = node.label;
  byId("flowDetailValue").textContent = node.value;
  byId("flowDetailText").textContent = node.detail;
}

function renderOpsDesk(ops) {
  currentOpsDesk = ops;
  byId("opsCaseCount").textContent = String(ops.metrics.openCases);
  byId("opsCriticalCount").textContent = String(ops.metrics.criticalCases);
  byId("opsMinutesSaved").textContent = String(ops.metrics.minutesSaved);
  byId("opsPressure").textContent = ops.metrics.pressure;
  byId("opsBrief").textContent = ops.opsBrief;

  byId("opsQueue").replaceChildren(...ops.queue.map((row, index) => {
    const article = document.createElement("article");
    article.className = `ops-case${index === 0 ? " is-next" : ""}`;
    const top = document.createElement("div");
    top.className = "ops-case-top";
    const title = document.createElement("strong");
    title.textContent = `${row.id} - ${row.title}`;
    const score = document.createElement("span");
    score.textContent = `${row.urgency}/100`;
    top.append(title, score);
    const meta = document.createElement("p");
    meta.textContent = `${row.band}; ${row.responseWindow}; owner: ${row.owner}`;
    const route = document.createElement("p");
    route.textContent = `Lead need: ${row.leadNeed}. Route: ${row.topResource}.`;
    const action = document.createElement("p");
    action.textContent = row.nextAction;
    article.append(top, meta, route, action);
    return article;
  }));

  byId("opsResourceLoad").replaceChildren(...ops.resourceLoad.map((resource) => {
    const item = document.createElement("div");
    item.className = "ops-load-item";
    const head = document.createElement("div");
    head.className = "ops-load-head";
    const title = document.createElement("strong");
    title.textContent = resource.name;
    const band = document.createElement("span");
    band.textContent = `${resource.band} ${resource.pressure}/100`;
    head.append(title, band);
    const bar = document.createElement("div");
    bar.className = "ops-load-bar";
    const fill = document.createElement("i");
    fill.style.width = `${resource.pressure}%`;
    bar.append(fill);
    const detail = document.createElement("p");
    detail.textContent = `${resource.cases} case(s), ${resource.criticalCases} critical; ${resource.type}.`;
    item.append(head, bar, detail);
    return item;
  }));
}

function selectFlowNode(index) {
  const nodes = Array.from(document.querySelectorAll(".flow-node"));
  if (!nodes.length) return false;
  nodes[Math.min(index, nodes.length - 1)].click();
  return index < nodes.length - 1;
}

function stopFlowTour() {
  if (flowTourTimer) {
    window.clearInterval(flowTourTimer);
    flowTourTimer = undefined;
  }
  const button = typeof document !== "undefined" ? byId("flowPlayBtn") : undefined;
  if (button) button.textContent = "Play Flow";
}

function startFlowTour() {
  stopFlowTour();
  let index = 0;
  selectFlowNode(index);
  byId("flowPlayBtn").textContent = "Stop Flow";
  flowTourTimer = window.setInterval(() => {
    index += 1;
    if (!selectFlowNode(index)) {
      stopFlowTour();
    }
  }, 1150);
}

function hubSeedFromPack(pack) {
  const needs = pack?.needs?.map((need) => need.label).join(", ") || "community aid triage";
  const routes = pack?.resources?.slice(0, 3).map((resource) => resource.name).join(", ") || "trusted local resources";
  return [
    "AidBridge: UCWS Singapore Hackathon hub for safer community aid response.",
    `Problem: frontline helpers receive urgent, messy requests involving ${needs}.`,
    "AI layer: deterministic triage now, upgradeable to LLM extraction and RAG over verified directories.",
    `Data source: local CSV resource directory, matched route list, and ${routes}.`,
    "Safety: privacy redaction, evidence ledger, human handoff, follow-up clock, and Judge Lens audit.",
    "Visual demo: Crisis Map plus this Hackathon Constellation Hub for idea-to-submission navigation.",
    "Submission pack: GitHub Pages demo, public repo, benchmark report, pitch deck, Project Wall fields, and Codex bridge API."
  ].join("\n");
}

function formatHubGuide(hub) {
  return [
    `PROJECT: ${hub.guidance.projectName}`,
    `TAGLINE: ${hub.guidance.tagline}`,
    `TRACK: ${hub.guidance.track}`,
    "",
    "DESCRIPTION:",
    hub.guidance.description,
    "",
    `DEMO: ${hub.guidance.demoUrl}`,
    `REPO: ${hub.guidance.repoUrl}`,
    `SCREENSHOT: ${hub.guidance.screenshot}`,
    "",
    "PROOF:",
    ...hub.guidance.keyProof.map((item) => `- ${item}`),
    "",
    "MISSING HUMAN FIELDS:",
    ...hub.guidance.missing.map((item) => `- ${item}`)
  ].join("\n");
}

function renderHubNodeDetail(node) {
  if (!node) return;
  byId("hubNodeTitle").textContent = node.label;
  byId("hubNodeDetail").textContent = `${node.type.toUpperCase()} / ${node.group}: ${node.detail}`;
}

function renderHubGuidance(hub) {
  byId("hubGuidanceList").replaceChildren(...hub.guidance.guidedSteps.map((step) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = step.label;
    const value = document.createElement("span");
    value.textContent = step.value;
    const detail = document.createElement("span");
    detail.textContent = step.detail;
    li.append(strong, value, detail);
    return li;
  }));
}

function renderHub(hub, selectedId = "core") {
  currentHub = hub;
  selectedHubNodeId = selectedId;
  byId("hubNodeCount").textContent = String(hub.nodes.length);
  byId("hubEdgeCount").textContent = String(hub.edges.length);
  byId("hubReadiness").textContent = `${hub.readiness}%`;
  byId("hubJsonOutput").textContent = JSON.stringify(hub, null, 2);
  document.documentElement.dataset.hubNodes = String(hub.nodes.length);
  document.documentElement.dataset.hubEdges = String(hub.edges.length);
  document.documentElement.dataset.hubReadiness = String(hub.readiness);
  renderHubGuidance(hub);
  renderHubNodeDetail(hub.nodes.find((node) => node.id === selectedHubNodeId) || hub.nodes[0]);
  window.dispatchEvent(new CustomEvent("aidbridge:hub-built", { detail: hub }));
  startHubCanvas();
}

function resizeHubCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.round(rect.width * ratio));
  const height = Math.max(320, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height, ratio };
}

function drawHubCanvas() {
  const canvas = byId("hubCanvas");
  if (!canvas || !currentHub) return;
  const { width, height, ratio } = resizeHubCanvas(canvas);
  const ctx = canvas.getContext("2d");
  const nodes = currentHub.nodes;
  const byNodeId = new Map(nodes.map((node) => [node.id, node]));
  const compact = width / ratio < 640;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#080d16";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.5;
  for (let index = 0; index < 90; index += 1) {
    const x = ((index * 73) % 1000) / 1000 * width;
    const y = ((index * 191) % 1000) / 1000 * height;
    const twinkle = 0.35 + Math.sin(hubCanvasPhase / 18 + index) * 0.22;
    ctx.fillStyle = `rgba(231, 248, 242, ${Math.max(0.12, twinkle)})`;
    ctx.fillRect(x, y, ratio, ratio);
  }
  ctx.restore();

  currentHub.edges.forEach((edge) => {
    const from = byNodeId.get(edge.from);
    const to = byNodeId.get(edge.to);
    if (!from || !to) return;
    const fromX = from.x * width;
    const fromY = from.y * height;
    const toX = to.x * width;
    const toY = to.y * height;
    const glow = 0.18 + edge.strength * 0.34;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = `rgba(98, 245, 208, ${glow})`;
    ctx.lineWidth = Math.max(1, edge.strength * 2.2 * ratio);
    ctx.stroke();
  });

  nodes.forEach((node) => {
    const x = node.x * width;
    const y = node.y * height;
    const active = node.id === selectedHubNodeId;
    const pulse = active ? 1.18 + Math.sin(hubCanvasPhase / 8) * 0.08 : 1;
    const radius = node.radius * ratio * pulse;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.3);
    gradient.addColorStop(0, node.color);
    gradient.addColorStop(0.4, `${node.color}cc`);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.lineWidth = active ? 3 * ratio : 1.4 * ratio;
    ctx.strokeStyle = active ? "#ffffff" : "rgba(255, 255, 255, 0.62)";
    ctx.stroke();

    const shouldLabel = !compact || active || node.type === "core" || node.type === "dimension";
    if (shouldLabel) {
      const maxLabel = compact ? 17 : 24;
      const label = node.label.length > maxLabel ? `${node.label.slice(0, maxLabel - 2)}...` : node.label;
      ctx.font = `${Math.max(10, (compact ? 10 : 12) * ratio)}px ui-monospace, Consolas, monospace`;
      ctx.fillStyle = active ? "#ffffff" : "rgba(231, 248, 242, 0.82)";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + radius + (compact ? 13 : 16) * ratio);
    }
  });
}

function startHubCanvas() {
  if (hubCanvasFrame) window.cancelAnimationFrame(hubCanvasFrame);
  const tick = () => {
    hubCanvasPhase += 1;
    drawHubCanvas();
    hubCanvasFrame = window.requestAnimationFrame(tick);
  };
  tick();
}

function pickHubNode(event) {
  if (!currentHub) return;
  const canvas = byId("hubCanvas");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const pointerX = (event.clientX - rect.left) * ratio;
  const pointerY = (event.clientY - rect.top) * ratio;
  let nearest;
  let nearestDistance = Number.POSITIVE_INFINITY;
  currentHub.nodes.forEach((node) => {
    const dx = node.x * canvas.width - pointerX;
    const dy = node.y * canvas.height - pointerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const target = Math.max(18, node.radius * ratio * 1.9);
    if (distance < target && distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  });
  if (!nearest) return;
  selectedHubNodeId = nearest.id;
  renderHubNodeDetail(nearest);
  drawHubCanvas();
}

function renderDirectory(directory, syncInput = false) {
  const tableBody = byId("directoryTableBody");
  if (!tableBody) return;
  if (syncInput) byId("directoryInput").value = directoryToCsv(directory);
  byId("directoryStatus").textContent = `${directory.length} resources loaded`;
  tableBody.replaceChildren(...directory.map((resource) => {
    const row = document.createElement("tr");
    [resource.name, resource.needs.join(", "), resource.languages.join(", "), String(resource.trust), resource.availability]
      .forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      });
    return row;
  }));
}

function getInput() {
  return {
    text: byId("caseInput").value,
    location: byId("locationInput").value,
    channel: byId("channelInput").value,
    language: byId("languageInput").value,
    mode: byId("modeInput").value
  };
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function loadSample(index) {
  const sample = SAMPLE_CASES[index % SAMPLE_CASES.length];
  byId("caseInput").value = sample.text;
  byId("locationInput").value = sample.location;
  byId("channelInput").value = sample.channel;
  byId("languageInput").value = sample.language;
  byId("modeInput").value = sample.mode;
  const pack = buildActionPack(sample, activeResourceDirectory);
  renderPack(pack);
  return pack;
}

if (typeof document !== "undefined") {
  let sampleIndex = 0;
  let currentPack;

  function showView(view) {
    const validView = ["workspace", "ops", "hub", "directory", "field", "review"].includes(view) ? view : "workspace";
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === validView));
    byId("workspace").hidden = validView !== "workspace";
    byId("ops").hidden = validView !== "ops";
    byId("hub").hidden = validView !== "hub";
    byId("directory").hidden = validView !== "directory";
    byId("field").hidden = validView !== "field";
    byId("review").hidden = validView !== "review";
    if (validView === "hub") window.setTimeout(drawHubCanvas, 40);
  }

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
    });
  });

  byId("analyzeBtn").addEventListener("click", () => {
    currentPack = buildActionPack(getInput(), activeResourceDirectory);
    renderPack(currentPack);
    showToast("Action pack generated");
  });

  byId("sampleBtn").addEventListener("click", () => {
    sampleIndex += 1;
    currentPack = loadSample(sampleIndex);
    showToast("Sample loaded");
  });

  byId("exportBtn").addEventListener("click", async () => {
    currentPack = currentPack || buildActionPack(getInput(), activeResourceDirectory);
    await navigator.clipboard.writeText(currentPack.fieldPack);
    showToast("Field pack copied");
  });

  byId("copyOpsBriefBtn").addEventListener("click", async () => {
    currentOpsDesk = currentOpsDesk || buildOpsDesk(OPS_DESK_CASES, activeResourceDirectory);
    await navigator.clipboard.writeText(currentOpsDesk.opsBrief);
    showToast("Ops brief copied");
  });

  byId("flowPlayBtn").addEventListener("click", () => {
    if (flowTourTimer) {
      stopFlowTour();
      showToast("Flow tour stopped");
    } else {
      startFlowTour();
      showToast("Flow tour playing");
    }
  });

  function buildHubFromInput() {
    currentPack = currentPack || buildActionPack(getInput(), activeResourceDirectory);
    const hub = buildIdeaConstellation({ ideaText: byId("hubIdeaInput").value }, currentPack);
    renderHub(hub);
    return hub;
  }

  byId("seedHubBtn").addEventListener("click", () => {
    currentPack = currentPack || buildActionPack(getInput(), activeResourceDirectory);
    byId("hubIdeaInput").value = hubSeedFromPack(currentPack);
    buildHubFromInput();
    showToast("AidBridge constellation loaded");
  });

  byId("buildHubBtn").addEventListener("click", () => {
    buildHubFromInput();
    showToast("Constellation built");
  });

  byId("hubCanvas").addEventListener("click", pickHubNode);
  byId("hubCanvas").addEventListener("mousemove", (event) => {
    const canvas = byId("hubCanvas");
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const pointerX = (event.clientX - rect.left) * ratio;
    const pointerY = (event.clientY - rect.top) * ratio;
    const hovering = currentHub?.nodes.some((node) => {
      const dx = node.x * canvas.width - pointerX;
      const dy = node.y * canvas.height - pointerY;
      return Math.sqrt(dx * dx + dy * dy) < Math.max(18, node.radius * ratio * 1.9);
    });
    canvas.style.cursor = hovering ? "pointer" : "crosshair";
  });

  byId("copyHubGuideBtn").addEventListener("click", async () => {
    const hub = currentHub || buildHubFromInput();
    await navigator.clipboard.writeText(formatHubGuide(hub));
    showToast("Hub guide copied");
  });

  byId("copyHubJsonBtn").addEventListener("click", async () => {
    const hub = currentHub || buildHubFromInput();
    await navigator.clipboard.writeText(JSON.stringify(hub, null, 2));
    showToast("Hub JSON copied");
  });

  byId("copyEvaluationBtn").addEventListener("click", async () => {
    currentPack = currentPack || buildActionPack(getInput(), activeResourceDirectory);
    await navigator.clipboard.writeText(currentPack.evaluationJson);
    showToast("Evaluation JSON copied");
  });

  byId("applyDirectoryBtn").addEventListener("click", () => {
    try {
      const imported = parseResourceCsv(byId("directoryInput").value);
      if (!imported.length) throw new Error("No resources found.");
      activeResourceDirectory = imported;
      renderDirectory(activeResourceDirectory, false);
      currentPack = buildActionPack(getInput(), activeResourceDirectory);
      renderPack(currentPack);
      renderOpsDesk(buildOpsDesk(OPS_DESK_CASES, activeResourceDirectory));
      showToast("Directory applied");
    } catch (error) {
      byId("directoryStatus").textContent = error.message || "Invalid CSV";
      showToast("Directory not applied");
    }
  });

  byId("resetDirectoryBtn").addEventListener("click", () => {
    activeResourceDirectory = DEFAULT_RESOURCE_DIRECTORY;
    renderDirectory(activeResourceDirectory, true);
    currentPack = buildActionPack(getInput(), activeResourceDirectory);
    renderPack(currentPack);
    renderOpsDesk(buildOpsDesk(OPS_DESK_CASES, activeResourceDirectory));
    showToast("Directory reset");
  });

  renderDirectory(activeResourceDirectory, true);
  currentPack = loadSample(0);
  renderOpsDesk(buildOpsDesk(OPS_DESK_CASES, activeResourceDirectory));
  byId("hubIdeaInput").value = hubSeedFromPack(currentPack);
  renderHub(buildIdeaConstellation({ ideaText: byId("hubIdeaInput").value }, currentPack));
  window.addEventListener("resize", drawHubCanvas);
  window.addEventListener("aidbridge:codex-idea", (event) => {
    const payload = event.detail || {};
    const ideaText = typeof payload === "string" ? payload : payload.ideaText || payload.text || HUB_DEFAULT_IDEA;
    byId("hubIdeaInput").value = ideaText;
    if (payload.caseInput) {
      byId("caseInput").value = payload.caseInput;
      currentPack = buildActionPack(getInput(), activeResourceDirectory);
      renderPack(currentPack);
    }
    const hub = buildHubFromInput();
    if (payload.showHub !== false) showView("hub");
    return hub;
  });
  const aidBridgeCodex = {
    version: "aidbridge-codex-bridge-2026-06-05",
    buildActionPack,
    buildIdeaConstellation,
    buildOpsDesk,
    getCurrentHub: () => currentHub,
    getCurrentOpsDesk: () => currentOpsDesk,
    setIdeaText: (ideaText) => {
      byId("hubIdeaInput").value = String(ideaText || "");
      return byId("hubIdeaInput").value;
    },
    buildFromIdea: (ideaText, options = {}) => {
      if (ideaText !== undefined) byId("hubIdeaInput").value = String(ideaText || "");
      const pack = options.pack || currentPack || buildActionPack(getInput(), activeResourceDirectory);
      const hub = buildIdeaConstellation({ ideaText: byId("hubIdeaInput").value }, pack);
      if (options.render !== false) renderHub(hub);
      return hub;
    },
    importCodexContext: (payload = {}) => {
      const ideaText = payload.ideaText || payload.text || byId("hubIdeaInput").value || HUB_DEFAULT_IDEA;
      byId("hubIdeaInput").value = ideaText;
      if (payload.caseInput) byId("caseInput").value = payload.caseInput;
      currentPack = buildActionPack(getInput(), activeResourceDirectory);
      renderPack(currentPack);
      const hub = buildIdeaConstellation({ ideaText }, currentPack);
      renderHub(hub);
      return hub;
    }
  };
  window.AidBridgeCodex = aidBridgeCodex;
  globalThis.AidBridgeCodex = aidBridgeCodex;
  document.documentElement.dataset.codexBridge = "ready";
  document.documentElement.dataset.hubNodes = String(currentHub?.nodes?.length || 0);
  window.dispatchEvent(new CustomEvent("aidbridge:hub-ready", { detail: aidBridgeCodex }));
  const params = new URLSearchParams(window.location.search);
  const requestedView = params.get("view") || window.location.hash.replace("#", "");
  showView(requestedView);
  if (params.get("demo") === "1") {
    window.setTimeout(startFlowTour, 600);
  }
}
