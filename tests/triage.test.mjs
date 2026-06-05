import assert from "node:assert/strict";
import {
  auditActionPack,
  buildActionPack,
  buildFlowMap,
  buildIdeaConstellation,
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
assert.equal(pack.flow.nodes.length, 5, "creates five-step crisis map");
assert.ok(pack.flow.pulse.some((item) => item.includes("Audit")), "summarizes audit in crisis map");
assert.ok(pack.flow.nodes.every((node) => node.detail), "adds interactive flow details");

const audit = auditActionPack(pack);
assert.equal(audit.score, pack.audit.score, "standalone audit matches pack audit");
const impact = estimateImpact(pack);
assert.equal(impact.minutesSaved, pack.impact.minutesSaved, "standalone impact matches pack impact");
const flow = buildFlowMap(pack);
assert.equal(flow.nodes[0].id, "intake", "standalone flow starts at intake");
const evaluation = JSON.parse(formatEvaluationJson(pack));
assert.equal(evaluation.audit.band, pack.audit.band, "evaluation JSON includes audit band");
assert.equal(evaluation.detectedNeeds.length, pack.needs.length, "evaluation JSON includes detected needs");
assert.equal(evaluation.impact.minutesSaved, pack.impact.minutesSaved, "evaluation JSON includes impact estimate");
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

console.log("AidBridge triage tests passed.");
