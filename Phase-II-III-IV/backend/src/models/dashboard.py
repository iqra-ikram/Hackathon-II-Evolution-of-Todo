from pydantic import BaseModel
from typing import List, Optional

# --- Stat Card Models ---

class StatMetric(BaseModel):
    label: str
    value: float
    trend: str  # "up" or "down"

class StatCardData(BaseModel):
    title: str
    metric_1: StatMetric
    metric_2: StatMetric
    # For the line chart, we send a list of points (0-100)
    chart_points_1: Optional[List[int]] = None
    chart_points_2: Optional[List[int]] = None
    # For the dot matrix, we might just send a total or specific pattern ID
    matrix_pattern: Optional[int] = None

# --- Product Chart Models ---

class ProductChartSegment(BaseModel):
    value: int
    type: str # "valid", "invalid", "resources"

class ProductColumn(BaseModel):
    segments: List[ProductChartSegment]

class ProductChartData(BaseModel):
    columns: List[ProductColumn]
    total: int

# --- Timeline Models ---

class TimelineItem(BaseModel):
    id: int
    day_index: int # 0 to 6 (for the rows)
    start_percent: int
    width_percent: int
    category: str # "customer", "product", "web"
    value: int
    icon: Optional[str] = None
    avatars: bool = False

class TimelineData(BaseModel):
    dates: List[str]
    items: List[TimelineItem]
    total_projects: int

# --- Full Dashboard Response ---

class DashboardResponse(BaseModel):
    customer_stat: StatCardData
    product_stat: StatCardData
    product_chart: ProductChartData
    timeline: TimelineData