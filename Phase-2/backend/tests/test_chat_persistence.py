import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from unittest.mock import AsyncMock, patch
import jwt

from src.main import app
from src.core.database import get_session
from src.core.config import settings

# Setup Test DB
engine = create_engine("sqlite://", connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session_override():
    with Session(engine) as session:
        yield session

app.dependency_overrides[get_session] = get_session_override

client = TestClient(app)

@patch("src.services.agent_service.agent_service.get_response", new_callable=AsyncMock)
def test_chat_persistence(mock_get_response):
    mock_get_response.return_value = "Hello back!"
    
    create_db_and_tables()
    user_id = "test_user_1"
    token = jwt.encode({"sub": user_id}, settings.BETTER_AUTH_SECRET, algorithm="HS256")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Send Message
    response = client.post(
        f"/api/v1/{user_id}/chat",
        json={"message": "Hi"},
        headers=headers
    )
    assert response.status_code == 200
    data = response.json()
    conversation_id = data["conversation_id"]
    assert data["response"] == "Hello back!"

    # 2. Verify Conversation in DB
    response = client.get(f"/api/v1/{user_id}/conversations", headers=headers)
    assert response.status_code == 200
    convs = response.json()
    assert len(convs) >= 1
    # Check if our conversation is in the list
    found = any(c["id"] == conversation_id for c in convs)
    assert found

    # 3. Verify Messages
    response = client.get(f"/api/v1/{user_id}/conversations/{conversation_id}/messages", headers=headers)
    assert response.status_code == 200
    msgs = response.json()
    assert len(msgs) == 2 # User + Assistant
    assert msgs[0]["role"] == "user"
    assert msgs[0]["content"] == "Hi"
    assert msgs[1]["role"] == "assistant"
    assert msgs[1]["content"] == "Hello back!"
