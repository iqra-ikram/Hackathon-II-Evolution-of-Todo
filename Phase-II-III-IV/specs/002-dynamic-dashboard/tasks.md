# Tasks: Dynamic Dashboard Integration

**Feature Branch**: `002-dynamic-dashboard`
**Status**: Ready for Implementation

## Implementation Strategy
- **MVP First**: Establish the backend API and data contract first (Phase 2), then wire up the frontend widgets one by one (Phases 3-5).
- **Incremental Delivery**: Each phase results in a working, testable component. Phase 2 gives a working API. Phase 3 connects the simplest widgets (stats). Phases 4 & 5 handle the complex charts.
- **Strict Visuals**: The visual output must remain identical to the static design.

## Dependencies
- Phase 2 (Backend) blocks Phases 3, 4, 5.
- Phase 3 (Frontend Foundation) blocks Phases 4, 5.

---

## Phase 1: Setup
*(No new infrastructure required, skipped)*

## Phase 2: Backend Foundation (Blocking)
**Goal**: Expose the dashboard data API so the frontend has a source of truth.

- [x] T001 Define Pydantic models for dashboard data in `backend/src/models/dashboard.py`
- [x] T002 Implement mock data generation and API endpoint `GET /api/v1/dashboard/data` in `backend/src/api/routes/dashboard.py`
- [x] T003 Register the dashboard router in `backend/src/main.py`

## Phase 3: User Story 1 - View Dynamic Dashboard
**Goal**: Frontend can fetch data and display the simple stat cards dynamically.
**Story**: [US1] View Dynamic Dashboard

- [x] T004 [US1] Define TypeScript interfaces matching backend models in `frontend/src/types/dashboard.ts`
- [x] T005 [P] [US1] Refactor `StatCard` to accept `StatCardData` props in `frontend/src/components/dashboard/StatCard.tsx`
- [x] T006 [US1] Implement `fetch` logic and loading state in `frontend/src/app/dashboard/page.tsx` and pass data to `StatCard`

## Phase 4: User Story 2 - Dynamic Product Chart
**Goal**: The main bar chart renders based on API data.
**Story**: [US2] Dynamic Product Chart Visualization

- [x] T007 [US2] Refactor `ProductChartCard` to accept `ProductChartData` and render dynamic columns in `frontend/src/components/dashboard/ProductChartCard.tsx`

## Phase 5: User Story 3 - Dynamic Timeline
**Goal**: The Gantt timeline renders based on API data.
**Story**: [US3] Dynamic Timeline Rendering

- [x] T008 [US3] Refactor `TimelineCard` to accept `TimelineData` and render dynamic items in `frontend/src/components/dashboard/TimelineCard.tsx`

## Phase 6: Polish & Cross-Cutting
**Goal**: Ensure visual perfection and smooth loading.

- [x] T009 Verify visual regression (0 pixel deviation) and smooth loading transition in `frontend/src/app/dashboard/page.tsx`
