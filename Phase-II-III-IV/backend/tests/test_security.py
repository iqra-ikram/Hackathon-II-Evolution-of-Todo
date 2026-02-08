from fastapi import HTTPException
import jwt
import pytest
from src.core.config import settings
from src.core.security import get_current_user_id
from fastapi.security import HTTPAuthorizationCredentials

def test_get_current_user_id_valid():
    token = jwt.encode({"sub": "user123"}, settings.BETTER_AUTH_SECRET, algorithm="HS256")
    credentials = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)
    user_id = get_current_user_id(credentials)
    assert user_id == "user123"

def test_get_current_user_id_invalid():
    token = jwt.encode({"sub": "user123"}, "wrongsecret", algorithm="HS256")
    credentials = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)
    with pytest.raises(HTTPException) as excinfo:
        get_current_user_id(credentials)
    assert excinfo.value.status_code == 401
