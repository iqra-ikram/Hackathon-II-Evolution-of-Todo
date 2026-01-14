from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional

security = HTTPBearer(auto_error=False)

def get_current_user_id(request: Request) -> str:
    # 1. Check for Trusted Proxy Header (X-User-Id)
    # In a real production environment, you MUST verify the request source IP
    # or use a shared secret for this header to prevent spoofing.
    # For this localhost setup, we trust it.
    
    user_id = request.headers.get("X-User-Id")
    if user_id:
        return user_id

    # Fallback (Legacy/Direct Access) - Kept for reference or direct calls if needed
    # But for now, we expect X-User-Id from the Next.js proxy
    
    print("DEBUG: No X-User-Id header found")
    print(f"DEBUG: Headers: {request.headers}")
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated (Proxy header missing)",
    )
