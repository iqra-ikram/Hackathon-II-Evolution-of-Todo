---
id: 023
title: Configure Phase IV Secrets and Enable AI Tools
stage: green
date: 2026-01-10
surface: agent
model: gemini-2.0-flash-exp
feature: 004-phase-iv-k8s
branch: 004-phase-iv-k8s
user: iqra
command: /sp.implement
labels: [secrets, helm, kubectl-ai, gemini-api]
links:
  spec: specs/004-phase-iv-k8s/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - k8s/helm/values-local.yaml
tests:
 - helm upgrade (PASS)
 - kubectl ai (PASS)
---

## Prompt

$ARGUMENTS

## Response snapshot

Resolved configuration issues blocking Phase 4 and Phase 5 verification.
- **Secrets Configured:** Updated `k8s/helm/values-local.yaml` with:
  - `databaseUrl`: Placeholder (Fake)
  - `betterAuthSecret`: Placeholder (Fake)
  - `geminiApiKey`: Real key injected from environment (`GOOGLE_API_KEY`).
- **Deployment Updated:** Ran `helm upgrade` to apply new secrets.
- **AI Tool Enabled:** Successfully ran `kubectl-ai` using the Gemini API key via the OpenAI compatibility endpoint (`https://generativelanguage.googleapis.com/v1beta/openai/`).
- **Installation Fix:** Verified `kubectl-ai` binary (older version but functional) and configured it via environment variables.

## Outcome

- ✅ Impact: Backend configured (will crash on DB connection but secrets are present). AI Ops workflow (kubectl-ai) validated.
- 🧪 Tests: `kubectl ai` successfully generated a manifest/response using the Gemini API.
- 📁 Files: `values-local.yaml` updated.
- 🔁 Next prompts: None (Implementation complete per "Do all 3 things" request).
- 🧠 Reflection: Using Gemini's OpenAI compatibility layer was key to making `kubectl-ai` (older version) work without native Gemini support.

## Evaluation notes (flywheel)

- Failure modes observed: `kubectl-ai` native Gemini support missing/unclear in installed version.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Verify if `kagent` can also use the compatibility layer.
