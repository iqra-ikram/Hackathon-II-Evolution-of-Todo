# Data Model: Dynamic Dashboard

**Feature Branch**: `002-dynamic-dashboard`

## Entities

### DashboardData
Root object containing all dashboard widget data.

| Field | Type | Description |
|-------|------|-------------|
| customer_stat | StatCardData | Data for the Customer statistics card |
| product_stat | StatCardData | Data for the Product statistics card |
| product_chart | ProductChartData | Data for the main bar chart |
| timeline | TimelineData | Data for the Gantt timeline |

### StatCardData
Generic structure for the small statistics cards.

| Field | Type | Description |
|-------|------|-------------|
| title | String | "CUSTOMER" or "PRODUCT" |
| metric_1 | StatMetric | Left-side metric |
| metric_2 | StatMetric | Right-side metric |
| chart_points_1 | List[Int] | (Optional) Points for line chart |
| matrix_pattern | Int | (Optional) ID for dot matrix pattern |

### StatMetric
Single data point with trend.

| Field | Type | Description |
|-------|------|-------------|
| label | String | e.g., "Web Surfing" |
| value | Float | Percentage value |
| trend | Enum | "up" or "down" |

### ProductChartData
Data for the segmented bar chart.

| Field | Type | Description |
|-------|------|-------------|
| columns | List[ChartColumn] | List of vertical bars |
| total | Int | Total count displayed at bottom |

### ChartColumn
A single vertical bar containing multiple segments.

| Field | Type | Description |
|-------|------|-------------|
| segments | List[ChartSegment] | Segments (top/bottom) |

### ChartSegment
A portion of a bar.

| Field | Type | Description |
|-------|------|-------------|
| value | Int | Numeric value displayed |
| type | Enum | "valid", "invalid", "resources" |

### TimelineData
Data for the projects timeline.

| Field | Type | Description |
|-------|------|-------------|
| dates | List[String] | Y-axis date labels |
| items | List[TimelineItem] | The bars to render |
| total_projects | Int | Total count |

### TimelineItem
A single Gantt bar.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Unique ID |
| day_index | Int | Row index (0-6) |
| start_percent | Int | Horizontal start position (0-100) |
| width_percent | Int | Width duration (0-100) |
| category | Enum | "customer", "product", "web" |
| value | Int | Numeric value on bar |
| icon | String | (Optional) Icon char |
| avatars | Boolean | Whether to show avatars |
