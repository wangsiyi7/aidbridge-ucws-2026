import {
  buildActionPack,
  buildIdeaConstellation,
  buildOpsDesk,
  directoryToCsv,
  parseResourceCsv
} from "../app.js";

export {
  buildActionPack,
  buildIdeaConstellation,
  buildOpsDesk,
  directoryToCsv,
  parseResourceCsv
};

export const CODEX_BRIDGE_SCHEMA = {
  name: "AidBridge Codex Bridge",
  version: "aidbridge-codex-bridge-2026-06-05",
  browserGlobal: "window.AidBridgeCodex",
  events: {
    input: "aidbridge:codex-idea",
    ready: "aidbridge:hub-ready",
    output: "aidbridge:hub-built"
  },
  moduleMethods: [
    "buildCodexHub",
    "buildIdeaConstellation",
    "buildOpsDesk",
    "buildActionPack",
    "directoryToCsv",
    "parseResourceCsv"
  ]
};

export function buildCodexHub(payload = {}) {
  const pack = payload.pack || buildActionPack({
    text: payload.caseInput || payload.text || "Urgent community aid request needs safe triage, resource routing, privacy redaction, and human handoff.",
    location: payload.location || "Singapore",
    channel: payload.channel || "Codex",
    language: payload.language || "English",
    mode: payload.mode || "Hackathon builder"
  }, payload.resourceDirectory);
  return buildIdeaConstellation({
    ideaText: payload.ideaText || payload.text || ""
  }, pack);
}

export function dispatchCodexIdea(ideaText, options = {}) {
  if (typeof window === "undefined") {
    return buildCodexHub({ ideaText, ...options });
  }
  const detail = { ideaText, ...options };
  window.dispatchEvent(new CustomEvent("aidbridge:codex-idea", { detail }));
  return detail;
}
