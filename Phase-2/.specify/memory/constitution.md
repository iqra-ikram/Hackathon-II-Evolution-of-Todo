<!--
SYNC IMPACT REPORT
Version: 1.0.0 -> 2.0.0
Modified Principles:
- Renamed & Updated: II. Modern Full-Stack Architecture -> II. Intelligent Agentic Stack (Added Grok, MCP, OpenAI Agents SDK)
- Renamed & Updated: V. RESTful API Standards -> V. Stateless Chat & MCP Architecture
- Added: VI. Grok Model Mandate
Templates Status:
- .specify/templates/plan-template.md: ✅ Compatible
- .specify/templates/spec-template.md: ✅ Compatible
- .specify/templates/tasks-template.md: ✅ Compatible
-->
# Phase II: Hackathon Intelligent Todo Agent Constitution

## Core Principles

### I. Agentic Development Workflow
The project strictly follows the Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via AI Agent (Claude Code / Gemini). No manual coding is allowed. The process, prompts, and iterations are reviewed to judge each phase and project.

### II. Intelligent Agentic Stack
The application must adhere to the following stack:
- **Frontend**: Next.js 16+ (App Router) utilizing OpenAI ChatKit (or functional equivalent).
- **Backend**: Python FastAPI.
- **AI Logic**: OpenAI Agents SDK.
- **Tooling**: Official MCP (Model Context Protocol) SDK.
- **Database**: Neon Serverless PostgreSQL (SQLModel ORM).
- **Authentication**: Better Auth.

### III. Model Context Protocol (MCP) First
All task operations (Create, Read, Update, Delete) MUST be exposed as **MCP Tools** (`add_task`, `list_tasks`, `complete_task`, `delete_task`, `update_task`).
- The AI Agent interacts with the database *exclusively* through these tools (or via internal service calls mapped to these tools).
- Tools must be stateless and operate directly on the persisted database state.

### IV. Stateless Chat Architecture
The system must operate on a stateless request cycle:
1.  **Persist**: User messages and Assistant responses are stored in the database immediately.
2.  **Context**: Full conversation history is fetched from the DB for each turn.
3.  **Process**: The Agent processes the context and invokes tools.
4.  **No In-Memory State**: The server must not rely on in-memory session storage between requests.

### V. Grok Model Mandate
**Grok** is the exclusive Large Language Model (LLM) for this project.
- **Integration**: Use the OpenAI Agents SDK (or compatible client) but configure the API to target xAI's Grok.
- **Credentials**: Use `GROK_API_KEY` (or xAI equivalent) instead of `OPENAI_API_KEY`.
- **Constraint**: Do NOT use OpenAI's native models (GPT-4o, etc.) unless strictly for fallback compatibility testing.

### VI. Secure Data Isolation
User isolation is non-negotiable.
- **Scope**: All queries (MCP tools and API endpoints) must be scoped to the authenticated `user_id`.
- **Auth**: Better Auth validates identity; the backend enforces scope.

## Governance

This Constitution serves as the primary source of truth for the project's architectural and operational standards.
- **Supremacy**: This document supersedes all other documentation or verbal instructions.
- **Amendments**: Changes to these principles require a formal amendment to this Constitution, accompanied by a version bump and rationale.
- **Compliance**: All Pull Requests and Design Reviews must explicitly verify compliance with these principles.

**Version**: 2.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2026-01-02