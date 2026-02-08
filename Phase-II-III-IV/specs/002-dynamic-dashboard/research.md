# Research & Technical Decisions: Dynamic Dashboard

**Feature Branch**: `002-dynamic-dashboard`  
**Date**: 2025-12-30

## Research Findings

### R1: Data Modeling for Dashboard
**Decision**: Use Pydantic models for strict typing and validation.
**Rationale**: Pydantic integrates seamlessly with FastAPI and ensures the JSON response structure is consistent and documented (via OpenAPI). It allows us to define nested models like `StatCardData` and `TimelineData` easily.
**Implementation**: Created `backend/src/models/dashboard.py`.

### R2: Frontend State Management
**Decision**: Use React `useState` and `useEffect` for data fetching.
**Rationale**: For this dashboard, local state is sufficient as the data is read-only and fetched once on mount. No complex global state (Redux/Zustand) is needed yet.
**Implementation**: Fetch logic in `frontend/src/app/dashboard/page.tsx`.

### R3: API Structure
**Decision**: Create a single aggregated endpoint `GET /api/v1/dashboard/data`.
**Rationale**: Reduces network round-trips. Instead of fetching "stats", "timeline", and "chart" separately, one call retrieves the initial dashboard state, which improves perceived performance (SC-001).
**Implementation**: `backend/src/api/routes/dashboard.py`.

### R4: Rendering Complex Charts
**Decision**: Custom CSS/SVG within React components.
**Rationale**: To maintain "pixel-perfect" fidelity to the design without fighting an external charting library's defaults (like Recharts or Chart.js), we implement the visual logic (bar heights, colors, positioning) directly in React using Tailwind CSS and simple SVGs.
**Implementation**: `ProductChartCard.tsx` and `TimelineCard.tsx`.

## Technical Plan

### Phase 1: Data Models & Contracts
- Define Pydantic models in backend.
- Define TypeScript interfaces in frontend.
- Generate OpenAPI contract.

### Phase 2: Implementation
- Implement backend endpoint with mock data generation.
- Update frontend components to accept props.
- Wire up `page.tsx` to fetch data.
