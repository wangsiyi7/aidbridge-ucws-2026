import assert from "node:assert/strict";
import {
  auditActionPack,
  buildActionPack,
  buildFlowMap,
  buildIdeaConstellation,
  buildOpsDesk,
  buildPartnerPilotPack,
  buildSingaporeLaunchPlan,
  buildSurgeLab,
  detectNeeds,
  directoryToCsv,
  estimateImpact,
  formatEvaluationJson,
  matchResources,
  normalizeText,
  parseResourceCsv,
  redactSensitiveInfo,
  scoreCase
} from "../app.js";
import {
  buildActionPackRecord,
  buildOpsDeskRecord,
  normalizeSupabaseConfig
} from "../api/supabase-client.mjs";

const caseText = "Employer kept passport, no salary, fever, and he is scared police will come tonight.";

assert.equal(normalizeText("  Fever   TONIGHT "), "fever tonight");

const needs = detectNeeds(caseText);
assert.ok(needs.some((need) => need.id === "medical"), "detects medical need");
assert.ok(needs.some((need) => need.id === "legal"), "detects legal/work-rights need");

const score = scoreCase(caseText, needs);
assert.ok(score.urgency >= 60, "scores urgent multi-need case");
assert.ok(score.confidence >= 70, "confidence rises with evidence");

const redacted = redactSensitiveInfo("Call +65 8888 7777, email helper@example.com, passport number A1234567.");
assert.ok(redacted.includes("[phone]"), "redacts phone number");
assert.ok(redacted.includes("[email]"), "redacts email");
assert.ok(redacted.includes("passport [redacted]"), "redacts document details");
assert.equal(redactSensitiveInfo("His room is locked."), "His room is locked.", "does not redact normal grammar");
assert.equal(redactSensitiveInfo("His room 12B is locked."), "His room [redacted] is locked.", "redacts room identifiers");

const resources = matchResources(needs, { language: "English" }, score);
assert.ok(resources.length > 0, "matches resources");
assert.ok(resources[0].matchedNeeds.length > 0, "resource includes matched needs");

const customCsv = [
  "name,type,needs,languages,availability,trust,fit",
  "Rapid Worker Clinic,Medical desk,medical|legal,English|Hindi,Immediate responder,99,Worker-first urgent care route",
  "\"Food, Baby Relay\",Essentials,food|child,English|Mandarin,2-hour relay,87,Handles groceries and formula"
].join("\n");
const customDirectory = parseResourceCsv(customCsv);
assert.equal(customDirectory.length, 2, "imports CSV resource directory");
assert.equal(customDirectory[0].needs[0], "medical", "normalizes need ids");
assert.ok(directoryToCsv(customDirectory).includes("Rapid Worker Clinic"), "exports directory CSV");

const customResources = matchResources(needs, { language: "Hindi" }, score, customDirectory);
assert.equal(customResources[0].name, "Rapid Worker Clinic", "custom directory changes top resource");

const pack = buildActionPack({
  text: caseText,
  location: "Singapore",
  channel: "WhatsApp",
  language: "English",
  mode: "NGO worker"
});

assert.ok(pack.firstResponse.includes("time-sensitive"), "creates urgent first response");
assert.ok(pack.actions.length >= 4, "creates action sequence");
assert.ok(pack.evidence.some((item) => item.includes("Risk band")), "adds evidence ledger");
assert.ok(pack.resources.length > 0, "adds matched resources");
assert.ok(pack.redactedSummary.includes("Priority themes"), "adds redacted case summary");
assert.ok(pack.followup.some((item) => item.includes("20")), "adds urgent follow-up clock");
assert.ok(pack.fieldPack.includes("AIDBRIDGE FIELD PACK"), "formats exportable pack");
assert.ok(pack.fieldPack.includes("MATCHED RESOURCES"), "exports matched resources");
assert.ok(pack.audit.score >= 80, "audits generated case quality");
assert.ok(pack.audit.checks.some((check) => check.id === "privacy" && check.passed), "audits privacy readiness");
assert.ok(pack.evaluationJson.includes('"project": "AidBridge"'), "adds machine-readable evaluation JSON");
assert.ok(pack.impact.minutesSaved > 0, "estimates operator time saved");
assert.ok(pack.impact.resourceRoutes > 0, "counts resource routes");
assert.ok(pack.launch.score >= 90, "scores Singapore launch readiness");
assert.ok(pack.launch.checklist.some((item) => item.id === "language" && item.passed), "audits Singapore language coverage");
assert.ok(pack.launch.launchMarkets.some((market) => market.label.includes("Singapore")), "adds Singapore wedge");
assert.equal(pack.flow.nodes.length, 5, "creates five-step crisis map");
assert.ok(pack.flow.pulse.some((item) => item.includes("Audit")), "summarizes audit in crisis map");
assert.ok(pack.flow.nodes.every((node) => node.detail), "adds interactive flow details");

const audit = auditActionPack(pack);
assert.equal(audit.score, pack.audit.score, "standalone audit matches pack audit");
const impact = estimateImpact(pack);
assert.equal(impact.minutesSaved, pack.impact.minutesSaved, "standalone impact matches pack impact");
const launch = buildSingaporeLaunchPlan(pack);
assert.equal(launch.score, pack.launch.score, "standalone Singapore launch plan matches pack launch plan");
const flow = buildFlowMap(pack);
assert.equal(flow.nodes[0].id, "intake", "standalone flow starts at intake");
const evaluation = JSON.parse(formatEvaluationJson(pack));
assert.equal(evaluation.audit.band, pack.audit.band, "evaluation JSON includes audit band");
assert.equal(evaluation.detectedNeeds.length, pack.needs.length, "evaluation JSON includes detected needs");
assert.equal(evaluation.impact.minutesSaved, pack.impact.minutesSaved, "evaluation JSON includes impact estimate");
assert.equal(evaluation.singaporeLaunch.score, pack.launch.score, "evaluation JSON includes Singapore launch lens");
assert.equal(evaluation.flow.nodes.length, pack.flow.nodes.length, "evaluation JSON includes crisis map");
assert.ok(evaluation.flow.nodes[0].detail.includes("Incoming"), "evaluation JSON includes flow detail");

const hub = buildIdeaConstellation([
  "AidBridge: visual UCWS hub for community-aid hackathon submission.",
  "Problem: volunteers need safe triage, privacy, evidence, resources, and Project Wall guidance.",
  "AI layer: Codex can inject ideas and read the generated star-map API payload."
].join("\n"), pack);
assert.ok(hub.nodes.length >= 12, "builds constellation nodes");
assert.ok(hub.edges.length >= 10, "builds constellation edges");
assert.ok(hub.nodes.some((node) => node.type === "artifact" && node.label.includes("Codex")), "adds Codex bridge artifact node");
assert.ok(hub.guidance.guidedSteps.some((step) => step.label === "Description"), "adds guided submission description");
assert.equal(hub.codexBridge.browserGlobal, "window.AidBridgeCodex", "documents browser bridge API");
assert.ok(hub.readiness >= 90, "scores final hub as submission-ready");

const ops = buildOpsDesk();
assert.equal(ops.metrics.openCases, 4, "builds a four-case operations queue");
assert.ok(ops.metrics.criticalCases >= 1, "counts critical cases");
assert.ok(ops.metrics.minutesSaved > pack.impact.minutesSaved, "rolls up multi-case impact");
assert.equal(ops.queue[0].urgency >= ops.queue[1].urgency, true, "sorts queue by urgency");
assert.ok(ops.resourceLoad.length > 0, "computes resource load");
assert.ok(ops.opsBrief.includes("AIDBRIDGE OPS DESK"), "exports copy-ready ops brief");

const surge = buildSurgeLab("worker-dorm-night");
assert.equal(surge.metrics.casesAdded, 4, "adds scenario cases to surge lab");
assert.ok(surge.metrics.totalCases > ops.metrics.openCases, "surge lab expands the operations queue");
assert.ok(surge.metrics.criticalCases >= ops.metrics.criticalCases, "surge lab preserves critical priority");
assert.ok(surge.firstMoves.length >= 4, "surge lab produces first moves");
assert.ok(surge.brief.includes("AIDBRIDGE SURGE LAB"), "exports copy-ready surge brief");
assert.ok(surge.scenario.judgeAngle.includes("Singapore"), "frames surge with Singapore judge angle");

const pilot = buildPartnerPilotPack("migrant-worker-ngo", pack, ops, surge);
assert.ok(pilot.readiness.score >= 85, "builds a high-confidence partner pilot pack");
assert.ok(pilot.rollout.length >= 6, "adds a 14-day rollout");
assert.ok(pilot.successMetrics.some((item) => item.includes("case-quality audit")), "uses live proof in pilot metrics");
assert.ok(pilot.guardrails.some((item) => item.includes("emergency")), "keeps human-safety guardrails");
assert.ok(pilot.brief.includes("AIDBRIDGE PARTNER PILOT PACK"), "exports copy-ready partner pilot brief");

const normalizedSupabase = normalizeSupabaseConfig({
  url: "https://example.supabase.co/",
  anonKey: "anon-key"
});
assert.equal(normalizedSupabase.url, "https://example.supabase.co", "normalizes Supabase URL");
const packRecord = buildActionPackRecord(pack);
assert.equal(packRecord.urgency, pack.score.urgency, "builds Supabase action-pack record");
assert.ok(packRecord.evaluation.project === "AidBridge", "stores evaluation JSON in Supabase record");
const opsRecord = buildOpsDeskRecord(ops);
assert.equal(opsRecord.open_cases, ops.metrics.openCases, "builds Supabase ops record");
assert.ok(opsRecord.queue.length >= 4, "stores ops queue in Supabase record");

console.log("AidBridge triage tests passed.");
