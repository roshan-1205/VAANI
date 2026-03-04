from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, protected
from app.config import settings
from mangum import Mangum

app = FastAPI(title="VAANI Authentication API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(protected.router, prefix="/api", tags=["Protected Routes"])

@app.get("/")
async def root():
    return {"message": "VAANI Authentication API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# AWS Lambda handler
handler = Mangum(app)
