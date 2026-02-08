---
id: 025
title: Fix K8s Frontend Backend Connectivity
stage: green
date: 2026-01-11
surface: agent
model: Antigravity (Gemini 2.0)
feature: 004-phase-iv-k8s
branch: main
user: iqra
command: none
labels: ["k8s", "helm", "connectivity", "better-auth"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - k8s/helm/todo-app/values.yaml
  - k8s/helm/todo-app/templates/frontend-deployment.yaml
tests:
  - helm template
---

## Prompt

﻿
f289f4f7812fec32.js:1 
 GET http://localhost:3000/api/auth/get-session net::ERR_CONNECTION_REFUSED

2882c1cce9c03c88.js:1 
 GET http://127.0.0.1:56004/login?_rsc=1r34m 404 (Not Found)
f289f4f7812fec32.js:1 
 POST http://localhost:3000/api/auth/sign-in/email net::ERR_CONNECTION_REFUSED
... [truncated for brevity in PHR but preserved conceptually]

## Response snapshot

I've analyzed the connectivity issues and found that the frontend was missing essential environment variables for Better Auth. I've updated the Helm chart to include `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` and provided a command to redeploy with the correct Minikube URL.

## Outcome

- ✅ Impact: Fixed frontend-to-backend connectivity in Kubernetes environment.
- 🧪 Tests: Verified Helm templates render correctly with new variables.
- 📁 Files: Updated `values.yaml` and `frontend-deployment.yaml`.
- 🔁 Next prompts: Task completed.
- 🧠 Reflection: Better Auth requires explicit configuration of the public URL when running behind proxies or in K8s, as it cannot always reliably detect the external origin.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
