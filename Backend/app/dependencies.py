from fastapi import Header, HTTPException, status
from typing import Optional
from app.firebase_admin import verify_token, get_user

async def get_current_user(authorization: Optional[str] = Header(None)):
    """Dependency to get current authenticated user"""
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing"
        )
    
    try:
        # Extract token from "Bearer <token>"
        if not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authorization header format"
            )
        
        token = authorization.split("Bearer ")[1]
        decoded_token = verify_token(token)
        
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}"
        )

def require_role(required_role: str):
    """Factory function to create role-based dependencies"""
    async def role_checker(authorization: Optional[str] = Header(None)):
        user = await get_current_user(authorization)
        
        # Get custom claims
        user_role = user.get("role")
        
        if not user_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No role assigned. Please contact administrator."
            )
        
        if user_role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {required_role}, Your role: {user_role}"
            )
        
        return user
    
    return role_checker
