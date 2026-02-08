from sqlmodel import SQLModel, create_engine, Session
from src.core.config import settings

# connection_args={"check_same_thread": False} is only for sqlite
engine = create_engine(settings.DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
