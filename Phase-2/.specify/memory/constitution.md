<!--
SYNC IMPACT REPORT
Version: -> 1.0.0
Modified Principles:
- Added: I. Agentic Development Workflow
- Added: II. Modern Full-Stack Architecture
- Added: III. Secure Authentication & Authorization
- Added: IV. Data Isolation & Privacy
- Added: V. RESTful API Standards
Templates Status:
- .specify/templates/plan-template.md: ✅ Compatible
- .specify/templates/spec-template.md: ✅ Compatible
- .specify/templates/tasks-template.md: ✅ Compatible
-->
# Phase II: Todo Full-Stack Web Application Constitution

## Core Principles

### I. Agentic Development Workflow
The project strictly follows the Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via AI Agent (Claude Code / Gemini). No manual coding is allowed. The process, prompts, and iterations are reviewed to judge each phase and project.

### II. Modern Full-Stack Architecture
The application must adhere to the following stack:
- **Frontend**: Next.js 16+ (App Router)
- **Backend**: Python FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Architecture**: Frontend and Backend must be distinct services.

### III. Secure Authentication & Authorization
Authentication is implemented using Better Auth with JWT integration.
- **Mechanism**: Better Auth (Frontend) issues JWTs; FastAPI (Backend) verifies them.
- **Shared Secret**: Both services must use the same `BETTER_AUTH_SECRET` for signing/verification.
- **Enforcement**: All protected endpoints must require a valid JWT token in the `Authorization` header. Requests without valid tokens must receive `401 Unauthorized`.

### IV. Data Isolation & Privacy
User isolation is non-negotiable.
- **Visibility**: Each user must only see and modify their own tasks.
- **Implementation**: The backend must extract the user ID from the verified JWT and strictly filter all database queries by that ID.
- **Statelessness**: Authentication must be stateless; no shared database sessions between frontend and backend for auth verification.

### V. RESTful API Standards
The backend must expose a RESTful API with the following standard endpoints (enforced per user):
- `GET /api/{user_id}/tasks`: List all tasks
- `POST /api/{user_id}/tasks`: Create a new task
- `GET /api/{user_id}/tasks/{id}`: Get task details
- `PUT /api/{user_id}/tasks/{id}`: Update a task
- `DELETE /api/{user_id}/tasks/{id}`: Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete`: Toggle completion

## Security Requirements

### JWT Verification
FastAPI middleware must be used to verify JWT signatures and extract user identity before any business logic executes.

### Environment Variables
Secrets (specifically `BETTER_AUTH_SECRET` and database credentials) must be managed via environment variables and never hardcoded.

## Development Workflow

### Spec-Driven
All features must start with a specification (`/specs/<feature>/spec.md`) defining user stories and acceptance criteria before any code is written.

### Task-Based Execution
Implementation is broken down into small, testable tasks (`/specs/<feature>/tasks.md`) derived from the plan.

## Governance

This Constitution serves as the primary source of truth for the project's architectural and operational standards.
- **Supremacy**: This document supersedes all other documentation or verbal instructions.
- **Amendments**: Changes to these principles require a formal amendment to this Constitution, accompanied by a version bump and rationale.
- **Compliance**: All Pull Requests and Design Reviews must explicitly verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30