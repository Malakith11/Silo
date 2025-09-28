/**
 * Orchestrator: loads agent manifests + contexts and calls OpenAI (gpt-4o).
 * Usage:
 *   pnpm ai ui compass "Task: Add AEGIS score chip to COMPASS cards; unit+e2e tests."
 *
 * Environment:
 *   OPENAI_API_KEY=sk-...
 *   (optional) AI_MODEL=gpt-4o
 *   (optional) AI_TEMP=0.2
 */

import fs from "fs";
import path from "path";
import OpenAI from "openai";

type Manifest = {
  name: string;
  purpose: string;
  required_globals?: string[];
  primary_context: string;
  additional_context?: string[];
  change_checklist?: string[];
  denylist?: string[];
  tools?: string[];
};

const ROOT = process.cwd();
const MANIFESTS_DIR = path.join(ROOT, "agents", "manifests");

// ---- tiny helpers ----------------------------------------------------------

const read = (p: string) => fs.readFileSync(p, "utf8");
const exists = (p: string) => fs.existsSync(p);
const r = (p: string) => path.isAbsolute(p) ? p : path.join(ROOT, p);

function loadManifest(nameOrFile: string): Manifest {
  const file = nameOrFile.endsWith(".json") ? nameOrFile : `${nameOrFile}.json`;
  const full = path.join(MANIFESTS_DIR, file);
  if (!exists(full)) throw new Error(`Manifest not found: ${full}`);
  return JSON.parse(read(full));
}

function unique<T>(arr: T[]) { return [...new Set(arr)]; }

function safeSlice(text: string, maxChars: number) {
  return text.length > maxChars ? text.slice(0, maxChars) + "\n\n[...truncated...]" : text;
}

// ---- prompt assembly -------------------------------------------------------

function assembleSystem(manifests: Manifest[]) {
  // Always include GLOBALS if present
  const globals = [
    "agents/contexts/GLOBALS.md",
    "agents/contexts/GLOBAL_SPEC.md"
  ].filter(exists).map(r);

  const files: string[] = [];

  // Required globals from manifests (if they list them)
  manifests.forEach(m => (m.required_globals ?? []).forEach(p => files.push(r(p))));

  // Primary + additional
  manifests.forEach(m => {
    files.push(r(m.primary_context));
    (m.additional_context ?? []).forEach(p => files.push(r(p)));
  });

  const allFiles = unique([...globals, ...files]).filter(exists);
  const parts: string[] = [];

  // A short base preamble for coding agents
  parts.push(`You are a careful engineer working on the SILO app.
- Obey product truth and guardrails in GLOBAL docs first.
- Prefer deterministic, testable code. For code changes, output clear diffs or files.
- Respect privacy (no PII in logs) and RLS/authorization rules.
- If implementing UI, follow design tokens and accessibility rules.
- Add/update tests when changing behavior.`);

  // Concatenate contexts; cap each file to avoid massive prompts
  const PER_FILE_LIMIT = 80_000; // chars; adjust if you hit context limits
  for (const f of allFiles) {
    const body = safeSlice(read(f), PER_FILE_LIMIT);
    parts.push(`\n==== FILE: ${path.relative(ROOT, f)} ====\n${body}`);
  }

  // Add per-manifest checklists & deny lists at the end to guide the model
  manifests.forEach(m => {
    if (m.change_checklist?.length) {
      parts.push(`\n==== ${m.name} • Change Checklist ====\n- ${m.change_checklist.join("\n- ")}`);
    }
    if (m.denylist?.length) {
      parts.push(`\n==== ${m.name} • Denylist (Do NOT do) ====\n- ${m.denylist.join("\n- ")}`);
    }
  });

  return parts.join("\n");
}

// ---- main runner -----------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(`Usage:
  pnpm ai <agent1> [agent2 ...] "<Your natural-language task>"

Example:
  pnpm ai ui compass "Task: Add AEGIS score chip to COMPASS cards; include unit+e2e tests."`);
    process.exit(1);
  }

  // Last arg is the natural-language task; prior args are agent names
  const task = args.pop() as string;
  const agentNames = args;

  const manifests = agentNames.map(loadManifest);

  const system = assembleSystem(manifests);

  const userPrompt = `Task:\n${task}\n\nConstraints:\n- Follow all guardrails and checklists above.\n- Only use tools implied by the manifests; if unsure, propose a plan first.\n- Return clear, minimal diffs or new file contents when changing code.`;

  const model = process.env.AI_MODEL || "gpt-4o";
  const temperature = Number(process.env.AI_TEMP ?? 0.2);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  if (!client.apiKey) {
    throw new Error("OPENAI_API_KEY is not set in your environment.");
  }

  const resp = await client.chat.completions.create({
    model,
    temperature,
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ]
  });

  const out = resp.choices?.[0]?.message?.content ?? "";
  // Print cleanly so you can pipe to a file if needed
  process.stdout.write(out.endsWith("\n") ? out : out + "\n");
}

main().catch(e => {
  console.error(e?.message || e);
  process.exit(1);
});
