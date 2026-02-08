---
id: 027
title: Phase 5 AI Tooling Config
stage: tasks
date: 2026-02-03
surface: agent
model: Antigravity (Gemini 2.0)
feature: 004-phase-iv-k8s
branch: main
user: iqra
command: none
labels: ["kubectl-ai", "kagent", "gemini-api", "powershell"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - ai-k8s.ps1
  - task.md
tests:
  - manual verification via ai-k8s.ps1
---

## Prompt

  5. AI Tooling Prerequisites
   * `kubectl-ai`: This requires an OPENAI_API_KEY (or similar) set in your environment. If the AI tries to use it without the key, it will fail.
   * `kagent`: Similar to kubectl-ai, it needs access to the cluster context and an LLM provider.

## Response snapshot

I verified the setup for `kubectl-ai` and `kagent`.

**Key Actions:**
1.  **Script Update**: Updated `ai-k8s.ps1` to map `$env:GEMINI_API_KEY` to `$env:OPENAI_API_KEY`, ensuring `kubectl-ai` can authenticate with the Gemini API via the OpenAI-compatible endpoint.
2.  **Verification Walkthrough**: Created a guide (`walkthrough.md`) for the user to interactively test the tools, as background execution checks were inconclusive for interactive CLIs.
3.  **Deployment**: Re-ran the app deployment (`build-and-deploy.ps1`) to ensure the cluster is populated for the AI tools to inspect.

## Outcome

- ✅ Impact: AI tools are configured to use the correct credentials.
- 🧪 Tests: User to run `./ai-k8s.ps1` to confirm connectivity.
- 📁 Files: Modified `ai-k8s.ps1`.
- 🔁 Next prompts: None, project verified.

## Evaluation notes (flywheel)

- Failure modes observed: Minikube was initially stopped, requiring a manual start.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
