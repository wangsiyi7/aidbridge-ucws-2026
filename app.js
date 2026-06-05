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
    const validView = ["workspace", "directory", "field", "review"].includes(view) ? view : "workspace";
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === validView));
    byId("workspace").hidden = validView !== "workspace";
    byId("directory").hidden = validView !== "directory";
    byId("field").hidden = validView !== "field";
    byId("review").hidden = validView !== "review";
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

  byId("flowPlayBtn").addEventListener("click", () => {
    if (flowTourTimer) {
      stopFlowTour();
      showToast("Flow tour stopped");
    } else {
      startFlowTour();
      showToast("Flow tour playing");
    }
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
    showToast("Directory reset");
  });

  renderDirectory(activeResourceDirectory, true);
  currentPack = loadSample(0);
  const params = new URLSearchParams(window.location.search);
  const requestedView = params.get("view") || window.location.hash.replace("#", "");
  showView(requestedView);
  if (params.get("demo") === "1") {
    window.setTimeout(startFlowTour, 600);
  }
}
