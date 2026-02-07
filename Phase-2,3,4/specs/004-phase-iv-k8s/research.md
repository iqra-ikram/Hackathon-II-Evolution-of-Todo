# Research: Phase IV: Local Kubernetes Deployment

**Feature Branch**: `004-phase-iv-k8s`
**Date**: 2026-01-08

## Unknowns & Decisions

### 1. Dockerfile Optimization for Next.js & FastAPI
- **Question**: Best practices for multi-stage builds to minimize image size?
- **Decision**: Use multi-stage builds (Builder -> Runner).
- **Rationale**: Reduces final image size by excluding build tools and intermediate artifacts.
- **Agent Action**: Use `docker ai` (Gordon) to generate initial `Dockerfile` for each service.

### 2. Helm Chart Structure
- **Question**: One chart vs. separate charts?
- **Decision**: Umbrella Chart (`todo-app`) with subcharts or multiple deployments in one chart.
- **Rationale**: Simpler management for a tightly coupled stack. Will use a single chart with multiple Deployment/Service templates for simplicity in Phase IV.
- **Agent Action**: Use `kubectl-ai` to generate base manifests, then wrap in Helm.

### 3. Local Service Exposure
- **Question**: How to access Frontend on Windows/Minikube?
- **Decision**: `minikube service todo-frontend` or `minikube tunnel`.
- **Rationale**: `minikube tunnel` provides a LoadBalancer IP which mimics cloud behavior better.

### 4. Database Connectivity
- **Question**: Connect to Neon (External) or Local Postgres?
- **Decision**: Support BOTH via `values.yaml`. Default to External (Neon) for continuity with Phase III data.
- **Rationale**: Simplifies state management; no need to migrate data yet.

## Alternatives Considered

- **Kompose**: Generating K8s manifests from `docker-compose.yml`.
  - *Rejected*: Less flexible than Helm; Constitution mandates declarative Helm charts.
- **Plain Manifests**: Managing raw YAML files.
  - *Rejected*: Harder to manage configuration differences (local vs. prod) compared to Helm.
