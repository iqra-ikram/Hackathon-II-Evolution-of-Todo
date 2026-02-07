export interface StatMetric {
  label: string;
  value: number;
  trend: "up" | "down";
}

export interface StatCardData {
  title: string;
  metric_1: StatMetric;
  metric_2: StatMetric;
  chart_points_1?: number[];
  chart_points_2?: number[];
  matrix_pattern?: number;
}

export interface ProductChartSegment {
  value: number;
  type: "valid" | "invalid" | "resources";
}

export interface ProductColumn {
  segments: ProductChartSegment[];
}

export interface ProductChartData {
  columns: ProductColumn[];
  total: number;
}

export interface TimelineItem {
  id: number;
  day_index: number;
  start_percent: number;
  width_percent: number;
  category: "customer" | "product" | "web";
  value: number;
  icon?: string;
  avatars: boolean;
}

export interface TimelineData {
  dates: string[];
  items: TimelineItem[];
  total_projects: number;
}

export interface DashboardResponse {
  customer_stat: StatCardData;
  product_stat: StatCardData;
  product_chart: ProductChartData;
  timeline: TimelineData;
}