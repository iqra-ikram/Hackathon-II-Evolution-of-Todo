---
id: 029
title: Fix kubectl-ai Configuration
stage: green
date: 2026-02-06
surface: agent
model: Antigravity (Gemini 2.0)
feature: 004-phase-iv-k8s
branch: main
user: iqra
command: go ahead
labels: ["kubectl-ai", "gemini-api", "fix", "configuration"]
links:
  spec: specs/004-phase-iv-k8s/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - ai-k8s.ps1
tests:
  - python test_api.py (verified gemini-flash-latest works)
---

## Prompt

"go ahead" (proceed with AI tool verification).

## Response snapshot

I attempted to verify `kubectl-ai` using `ai-k8s.ps1`.
1.  **Issue**: `kubectl-ai` failed to authenticate or returned no output.
2.  **Investigation**:
    *   Verified API key using `test_api.py`. Key is valid.
    *   Discovered `gemini-2.0-flash` (and others) were hitting rate limits or not found (404).
    *   Found `gemini-flash-latest` works correctly via API.
3.  **Fix**: Updated `ai-k8s.ps1` to:
    *   Use `GOOGLE_API_KEY` for `OPENAI_API_KEY`.
    *   Explicitly set `--openai-deployment-name "gemini-flash-latest"`.

## Outcome

- ✅ Impact: `kubectl-ai` is now configured with a working model (`gemini-flash-latest`).
- 🧪 Tests: API connectivity confirmed via Python script.
- 📁 Files: Updated `ai-k8s.ps1`.
- 🔁 Next prompts: User can use `.\ai-k8s.ps1 "prompt"` interactively.

## Evaluation notes (flywheel)

- Failure modes observed: Rate limits on newer models (Gemini 2.0), missing models in OpenAI compatibility layer.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
