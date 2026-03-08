#!/bin/bash
# Render.com start script for FastAPI Backend

echo "🚀 Starting VAANI FastAPI Backend on Render..."
uvicorn app.main:app --host 0.0.0.0 --port $PORT
