# Implementation Plan: Phase IV: Local Kubernetes Deployment

**Branch**: `004-phase-iv-k8s` | **Date**: 2026-01-08 | **Spec**: [specs/004-phase-iv-k8s/spec.md](./spec.md)
**Input**: Feature specification from `specs/004-phase-iv-k8s/spec.md`

## Summary

Containerize the existing Todo Chatbot application (Next.js Frontend + FastAPI Backend) using Docker and deploy it to a local Minikube cluster using Helm Charts. Leverage AI agents (Gordon, kubectl-ai, kagent) for all operational tasks.

## Technical Context

**Language/Version**: Python 3.11+, Node.js v18+, Docker, Helm 3+
**Primary Dependencies**: 
- **DevOps**: Docker Desktop, Minikube, Helm, kubectl-ai, kagent
- **App**: FastAPI, Next.js 16, Neon DB (PostgreSQL)
**Storage**: PostgreSQL (Neon Serverless - external, or local container for dev parity)
**Testing**: `docker run`, `helm test`, manual verification via Minikube IP
**Target Platform**: Local Kubernetes (Minikube) simulating Cloud Native environment
**Project Type**: Cloud-Native Web Application (Microservices)
**Performance Goals**: Build time < 5min, Deployment ready < 2min
**Constraints**: Must run locally on developer machine; minimal code changes to app logic.
**Scale/Scope**: 2 microservices (Frontend, Backend) + 1 DB dependency

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. AI-Assisted DevOps**: Plan explicitly uses Gordon/kubectl-ai/kagent. ✅
- **II. Cloud-Native Architecture**: Docker & Minikube are the targets. ✅
- **III. Declarative Infrastructure**: Helm Charts will be created. ✅
- **IV. Local Development Parity**: Minikube is the environment. ✅
- **V. Intelligent Todo Chatbot**: Preserves Phase III app architecture. ✅

## Project Structure

### Documentation (this feature)

```text
specs/004-phase-iv-k8s/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A - Infrastructure focus)
├── quickstart.md        # Phase 1 output (Deployment guide)
├── contracts/           # Phase 1 output (N/A - Infrastructure focus)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
# Root infrastructure configs
k8s/
├── helm/
│   ├── todo-app/        # Main Chart
│   │   ├── charts/      # Subcharts (frontend, backend)
│   │   ├── templates/   # Manifest templates
│   │   └── values.yaml  # Default configuration
│   └── values-local.yaml # Local overrides

# Application Source (Existing)
backend/
├── Dockerfile           # NEW
├── .dockerignore        # NEW
└── src/

frontend/
├── Dockerfile           # NEW
├── .dockerignore        # NEW
└── src/
```

**Structure Decision**: Standard Helm Chart structure in `k8s/helm/` separate from app source code to maintain clean separation of concerns.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       |            |                                     |