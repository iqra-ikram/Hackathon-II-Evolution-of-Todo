from fastapi import APIRouter
from src.models.dashboard import (
    DashboardResponse, 
    StatCardData, 
    StatMetric, 
    ProductChartData, 
    ProductColumn, 
    ProductChartSegment,
    TimelineData,
    TimelineItem
)
import random

router = APIRouter()

@router.get("/data", response_model=DashboardResponse)
async def get_dashboard_data():
    # --- Mock Logic for Demonstration ---
    
    # 1. Customer Stats
    customer_stats = StatCardData(
        title="CUSTOMER",
        metric_1=StatMetric(label="Web Surfing", value=2.4, trend="up"),
        metric_2=StatMetric(label="Radio Station", value=1.1, trend="down"),
        chart_points_1=[30, 40, 35, 50, 45, 60, 55, 70, 60, 80],
        chart_points_2=[20, 30, 25, 40, 30, 45, 35, 50, 40, 60]
    )

    # 2. Product Stats (Dot Matrix)
    product_stats = StatCardData(
        title="PRODUCT",
        metric_1=StatMetric(label="Partners", value=2.8, trend="up"),
        metric_2=StatMetric(label="Owners", value=3.2, trend="down"),
        matrix_pattern=1 # Frontend handles the visual logic
    )

    # 3. Product Chart (Bar Chart)
    # Generate random values for 9 columns
    columns = []
    total_products = 0
    for _ in range(9):
        # Determine types for this column (mimicking the design: mainly 2 segments)
        val1 = random.randint(20, 90)
        val2 = random.randint(20, 60)
        total_products += (val1 + val2)
        
        # Randomly assign types to match colors
        # Green=valid, Orange=invalid, White=resources
        types = ["valid", "invalid", "resources"]
        t1 = random.choice(types)
        t2 = random.choice([t for t in types if t != t1])
        
        columns.append(ProductColumn(segments=[
            ProductChartSegment(value=val1, type=t1),
            ProductChartSegment(value=val2, type=t2)
        ]))

    product_chart = ProductChartData(
        columns=columns,
        total=total_products
    )

    # 4. Timeline Data
    dates = ["30.09", "29.09", "28.09", "27.09", "26.09", "25.09", "24.09"]
    items = [
        TimelineItem(id=1, day_index=0, start_percent=10, width_percent=35, category="customer", value=16, icon="S"),
        TimelineItem(id=2, day_index=1, start_percent=60, width_percent=35, category="product", value=29, icon="X"),
        TimelineItem(id=3, day_index=2, start_percent=20, width_percent=40, category="web", value=15, avatars=True),
        TimelineItem(id=4, day_index=3, start_percent=30, width_percent=40, category="customer", value=21, icon="Ball"),
        TimelineItem(id=5, day_index=4, start_percent=15, width_percent=25, category="web", value=10, icon="D"),
        TimelineItem(id=6, day_index=5, start_percent=30, width_percent=25, category="product", value=15, icon="F"),
        TimelineItem(id=7, day_index=6, start_percent=45, width_percent=50, category="customer", value=19, avatars=True),
        TimelineItem(id=8, day_index=7, start_percent=35, width_percent=25, category="web", value=8, icon="T"),
    ]
    
    timeline = TimelineData(
        dates=dates,
        items=items,
        total_projects=284
    )

    return DashboardResponse(
        customer_stat=customer_stats,
        product_stat=product_stats,
        product_chart=product_chart,
        timeline=timeline
    )