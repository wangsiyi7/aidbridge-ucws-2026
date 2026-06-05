const STORAGE_KEY = "aidbridge.supabase.config";

function browserStorage() {
  return typeof window !== "undefined" && window.localStorage ? window.localStorage : undefined;
}

export function normalizeSupabaseConfig(config = {}) {
  const url = String(config.url || config.supabaseUrl || "").trim().replace(/\/+$/, "");
  const anonKey = String(config.anonKey || config.supabaseAnonKey || config.key || "").trim();
  return { url, anonKey };
}

export function getStoredSupabaseConfig() {
  const fromWindow = typeof window !== "undefined" ? window.AIDBRIDGE_SUPABASE : undefined;
  if (fromWindow?.url && fromWindow?.anonKey) return normalizeSupabaseConfig(fromWindow);
  const storage = browserStorage();
  if (!storage) return { url: "", anonKey: "" };
  try {
    return normalizeSupabaseConfig(JSON.parse(storage.getItem(STORAGE_KEY) || "{}"));
  } catch {
    return { url: "", anonKey: "" };
  }
}

export function saveSupabaseConfig(config) {
  const normalized = normalizeSupabaseConfig(config);
  if (!normalized.url || !normalized.anonKey) {
    throw new Error("Supabase URL and anon key are required.");
  }
  const storage = browserStorage();
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function clearSupabaseConfig() {
  const storage = browserStorage();
  if (storage) storage.removeItem(STORAGE_KEY);
}

export function isSupabaseConfigured(config = getStoredSupabaseConfig()) {
  const normalized = normalizeSupabaseConfig(config);
  return Boolean(normalized.url && normalized.anonKey);
}

export function buildActionPackRecord(pack, source = "aidbridge-browser") {
  return {
    source,
    case_ref: `${pack.input.channel || "Case"}-${Date.now()}`,
    location: pack.input.location || "Unknown",
    channel: pack.input.channel || "Unknown",
    language: pack.input.language || "English",
    operator_mode: pack.input.mode || "Community volunteer",
    urgency: pack.score.urgency,
    confidence: pack.score.confidence,
    risk_band: pack.score.band,
    detected_needs: pack.needs.map((need) => ({
      id: need.id,
      label: need.label,
      matchedSignals: need.hits?.length || 0
    })),
    resources: pack.resources.map((resource) => ({
      name: resource.name,
      type: resource.type,
      trust: resource.trust,
      matchedNeeds: resource.matchedNeeds,
      why: resource.why
    })),
    first_response: pack.firstResponse,
    redacted_summary: pack.redactedSummary,
    field_pack: pack.fieldPack,
    evaluation: JSON.parse(pack.evaluationJson),
    impact: pack.impact,
    launch: pack.launch,
    flow: pack.flow
  };
}

export function buildOpsDeskRecord(ops, source = "aidbridge-browser") {
  return {
    source,
    open_cases: ops.metrics.openCases,
    critical_cases: ops.metrics.criticalCases,
    average_urgency: ops.metrics.averageUrgency,
    minutes_saved: ops.metrics.minutesSaved,
    matched_routes: ops.metrics.matchedRoutes,
    resource_pressure: ops.metrics.pressure,
    next_case_id: ops.nextCaseId,
    queue: ops.queue,
    resource_load: ops.resourceLoad,
    bottlenecks: ops.bottlenecks,
    ops_brief: ops.opsBrief
  };
}

async function supabaseRequest(path, options = {}, config = getStoredSupabaseConfig()) {
  const normalized = normalizeSupabaseConfig(config);
  if (!isSupabaseConfigured(normalized)) {
    throw new Error("Supabase is not configured.");
  }
  const response = await fetch(`${normalized.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: normalized.anonKey,
      Authorization: `Bearer ${normalized.anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.message || data?.error || response.statusText;
    throw new Error(`Supabase ${response.status}: ${message}`);
  }
  return data;
}

export async function syncActionPackToSupabase(pack, config) {
  const record = buildActionPackRecord(pack);
  const rows = await supabaseRequest("aidbridge_action_packs", {
    method: "POST",
    body: JSON.stringify(record)
  }, config);
  return rows?.[0] || record;
}

export async function syncOpsDeskToSupabase(ops, config) {
  const record = buildOpsDeskRecord(ops);
  const rows = await supabaseRequest("aidbridge_ops_desks", {
    method: "POST",
    body: JSON.stringify(record)
  }, config);
  return rows?.[0] || record;
}

export async function fetchRecentSupabaseRecords(config, limit = 5) {
  const safeLimit = Math.max(1, Math.min(20, Number(limit) || 5));
  const [packs, ops] = await Promise.all([
    supabaseRequest(`aidbridge_action_packs?select=id,created_at,case_ref,urgency,risk_band,location,channel&order=created_at.desc&limit=${safeLimit}`, {
      method: "GET",
      headers: { Prefer: "" }
    }, config),
    supabaseRequest(`aidbridge_ops_desks?select=id,created_at,open_cases,critical_cases,minutes_saved,resource_pressure,next_case_id&order=created_at.desc&limit=${safeLimit}`, {
      method: "GET",
      headers: { Prefer: "" }
    }, config)
  ]);
  return { packs, ops };
}
