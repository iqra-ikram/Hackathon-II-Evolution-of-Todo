# Research: Phase II Todo App Integration

**Date**: 2025-12-30
**Feature**: Phase II Todo Full-Stack Web Application

## Authentication Strategy: Better Auth + FastAPI

### Decision
Use **Better Auth** (frontend-only mode with plugin) to handle UI and session management, configuring it to issue a **JWT** that the **FastAPI** backend verifies independently.

### Rationale
- **Separation**: Frontend handles login complexity (social, email flows); Backend remains stateless.
- **Performance**: No database lookup required on backend for every request (stateless JWT verification).
- **Compliance**: Meets Constitution Principle III.

### Implementation Details
- **Signing Key**: Both projects must share a `BETTER_AUTH_SECRET` environment variable.
- **Algorithm**: HS256 (Symmetric) for simplicity in MVP, or RS256 (Asymmetric) if key rotation needed later. *Decision: HS256 for MVP.*
- **Token Location**: Frontend includes `Authorization: Bearer <token>` in all API requests.
- **Verification**: FastAPI middleware decodes JWT using `BETTER_AUTH_SECRET`.

### Alternatives Considered
- **Session Tokens**: Requires backend to query frontend's DB or a shared Redis. *Rejected: Violates stateless goal.*
- **Proxy**: Next.js proxying all requests. *Rejected: Adds latency and complexity.*

## Database Schema: SQLModel

### Decision
Use **SQLModel** (Pydantic + SQLAlchemy) for defining entities and database interaction.

### Rationale
- **Type Safety**: Native Python type hints integration.
- **FastAPI Synergy**: Designed by the same author, reduces boilerplate.

### Schema Design
- **User Table**: Minimal (ID, email). *Note: Better Auth owns the "real" user table in its own schema, but we may need a local shadow record or just rely on the ID in the JWT.* 
  - *Refinement*: To keep it simple, Backend will trust the `sub` (User ID) in the JWT. It might create a local `User` record on first access if Foreign Keys are needed for integrity, or simply store `owner_id` as a string/UUID on the `Task` table without a hard FK constraint to a table it doesn't fully own.
  - *Decision*: Store `owner_id` on `Task` table. Do not duplicate Auth User table in Backend unless strictly necessary for other features.

## API Client

### Decision
Use **fetch** with a custom wrapper in Next.js.

### Rationale
- Native to web platform.
- Lightweight compared to Axios.
- Easy to attach Authorization headers globally.
