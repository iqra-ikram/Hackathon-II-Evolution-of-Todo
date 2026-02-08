# Feature Specification: Dynamic Dashboard Integration

**Feature Branch**: `002-dynamic-dashboard`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "i want that ui of dashboard will remain look like the current ui but i want a dynamic data so if we need to make more api in backend you can make it but do not change the current design the dynamic data will sync in the current desgn after doing all the things tell me all the features"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Dynamic Dashboard (Priority: P1)

A user visiting the dashboard sees real-time (or fetched) data instead of hardcoded placeholders, while the visual experience remains identical to the original design.

**Why this priority**: This is the core request—replacing static content with dynamic data.

**Independent Test**: Can be tested by verifying that the data displayed matches the API response and that visual regression tests pass (UI looks the same).

**Acceptance Scenarios**:

1. **Given** the user navigates to `/dashboard`, **When** the page loads, **Then** the system fetches data from the backend API.
2. **Given** the data fetch is successful, **When** the components render, **Then** they display the values returned by the API (percentages, chart bars, timeline items) exactly as styled in the mockup.
3. **Given** the data fetch is in progress, **When** the page is loading, **Then** a subtle loading state is shown (or a skeleton that matches the dark theme) to avoid layout shift.
4. **Given** the backend returns different values on a subsequent reload, **When** the page refreshes, **Then** the UI reflects these new values (e.g., bar chart heights change, percentages update).

---

### User Story 2 - Dynamic Product Chart Visualization (Priority: P2)

The main bar chart adjusts its visual bars based on the data received, correctly mapping "types" (valid, invalid, resources) to their respective colors (`#A3E635`, `#F97316`, `white`) and heights.

**Why this priority**: The chart is a complex visual element that needs to map data attributes to visual styles dynamically.

**Independent Test**: Can be tested by mocking API responses with specific edge-case values (e.g., 0% height, 100% height, different types) and verifying the rendered output.

**Acceptance Scenarios**:

1. **Given** the API returns a column with `type: "valid"`, **When** the chart renders, **Then** that segment is colored Lime Green (`#A3E635`).
2. **Given** the API returns a column with `type: "invalid"`, **When** the chart renders, **Then** that segment is colored Orange (`#F97316`).
3. **Given** the API returns a value of 100, **When** the chart renders, **Then** the bar height fills its container (relative to max height logic).

---

### User Story 3 - Dynamic Timeline Rendering (Priority: P3)

The "Projects Timeline" Gantt chart renders items based on start time, duration, and category provided by the backend.

**Why this priority**: This is the most complex UI component involving positioning logic.

**Independent Test**: Can be tested by providing timeline items with various start/end times and categories.

**Acceptance Scenarios**:

1. **Given** a timeline item with `category: "customer"`, **When** rendered, **Then** the bar is Lime Green.
2. **Given** an item with `start_percent: 50` and `width_percent: 25`, **When** rendered, **Then** the bar starts at the center and spans one-quarter of the width.
3. **Given** multiple items for the same "day", **When** rendered, **Then** they appear on the correct row index.

### Edge Cases

- What happens when the API fails or times out? (Should show an error state or fallback to cached/empty state without breaking layout).
- What happens if the data values exceed expected ranges (e.g., >100%)? (UI should clamp values or handle overflow gracefully).
- What happens if text content (e.g., names) is longer than the design allows? (Truncation with ellipsis to preserve layout).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a backend API endpoint (e.g., `GET /api/dashboard/data`) that returns aggregated data for all dashboard widgets.
- **FR-002**: System MUST define a strict JSON schema for the dashboard data that includes:
    - Stat Cards (label, value, trend, chart points).
    - Product Chart (columns with segments, types, values).
    - Timeline (items with start/width, category, icon/avatar).
- **FR-003**: Frontend MUST fetch this data on component mount.
- **FR-004**: Frontend components (`StatCard`, `ProductChartCard`, `TimelineCard`) MUST accept data props and render dynamic content instead of hardcoded JSX.
- **FR-005**: The UI implementation MUST NOT deviate from the established design (colors, spacing, fonts, border radii) regardless of the data content.
- **FR-006**: System MUST handle loading states gracefully, preferably with a loading spinner or skeleton screen that matches the dark theme.

### Key Entities

- **DashboardData**: Composite object containing all widget data.
- **StatMetric**: Represents a single statistic (value, label, trend).
- **ChartColumn**: Represents a vertical bar in the product chart (list of segments).
- **TimelineEvent**: Represents a single bar in the Gantt chart (start, duration, type).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Dashboard loads and renders dynamic data in under 500ms (perceived latency) on a standard broadband connection.
- **SC-002**: Visual regression testing confirms 0 pixel deviations from the static design when rendered with the original mock data.
- **SC-003**: API response structure adheres strictly to the defined TypeScript interfaces/Pydantic models.
- **SC-004**: All interactive elements (hover states, filters) remain functional after data binding.
