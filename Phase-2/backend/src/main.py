from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from src.core.config import settings
from src.core.database import create_db_and_tables
from src.api.routes import tasks, dashboard, chat

@asynccontextmanager
async def lifespan(app: FastAPI):
    # In production, use Alembic. For MVP, this is fine.
    create_db_and_tables()
    # Reload trigger
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

app.include_router(tasks.router, prefix=settings.API_V1_STR, tags=["tasks"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(chat.router, prefix=settings.API_V1_STR, tags=["chat"])

# CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Global Exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to Todo API"}
