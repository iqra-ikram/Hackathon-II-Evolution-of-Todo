<!--
SYNC IMPACT REPORT
Version: 2.0.0 -> 4.0.0
Modified Principles:
- Replaced: All previous principles (Phase II focus) with Phase IV Infrastructure focus.
- Added: I. AI-Assisted DevOps (Mandate Gordon, kubectl-ai, Kagent)
- Added: II. Cloud-Native Architecture (Docker, Kubernetes/Minikube)
- Added: III. Declarative Infrastructure (Helm Charts)
- Added: IV. Local Development Parity (Minikube target)
- Added: V. Intelligent Todo Chatbot (Retain Phase III context)
Templates Status:
- .specify/templates/plan-template.md: ✅ Compatible
- .specify/templates/spec-template.md: ✅ Compatible
- .specify/templates/tasks-template.md: ✅ Compatible
-->
# Phase IV: Local Kubernetes Deployment Constitution

## Core Principles

### I. AI-Assisted DevOps
Operations MUST utilize AI agents as the primary interface.
- **Docker**: Use Docker AI Agent (Gordon) for container management and troubleshooting (`docker ai`).
- **Kubernetes**: Use `kubectl-ai` for declarative command generation and `kagent` for cluster analysis/optimization.
- **Manual Fallback**: Standard CLI commands are permitted only when AI agents are unavailable or fail.

### II. Cloud-Native Architecture
The system MUST be deployed as a set of containerized microservices.
- **Containerization**: All components (Frontend, Backend) must be containerized using Docker.
- **Orchestration**: Kubernetes (via Minikube) is the sole orchestration target for this phase.
- **Registry**: Local Docker registry or Docker Desktop shared context is preferred for development speed.

### III. Declarative Infrastructure
All infrastructure and deployment configurations MUST be declarative.
- **Helm Charts**: Deployment logic must be encapsulated in Helm Charts.
- **No Imperative Drift**: Avoid manual `kubectl create/edit` for persistent changes; commit changes to Charts/Manifests.

### IV. Local Development Parity
The local environment (Minikube) MUST mirror production architectural patterns.
- **Minikube**: Use Minikube as the local cluster.
- **Ingress**: Expose services via Minikube Ingress or port-forwarding that simulates real service discovery.

### V. Intelligent Todo Chatbot
The core application remains the Phase III Todo Chatbot.
- **Stack**: Next.js Frontend + FastAPI Backend + Neon DB + Better Auth + Grok/OpenAI Agents SDK.
- **Continuity**: Phase IV focuses on *deployment* of the existing Phase III application; application code changes should be minimal unless required for containerization.

## Governance

This Constitution serves as the primary source of truth for the project's architectural and operational standards.
- **Supremacy**: This document supersedes all other documentation or verbal instructions.
- **Amendments**: Changes to these principles require a formal amendment to this Constitution, accompanied by a version bump and rationale.
- **Compliance**: All Pull Requests and Design Reviews must explicitly verify compliance with these principles.

**Version**: 4.0.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08
