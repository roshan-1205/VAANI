@echo off
echo Starting VAANI Voice Assistant...
echo.

echo Starting AI Backend (Port 5000)...
start "AI Backend" cmd /k "cd ai-backend && node server.js"
timeout /t 3 /nobreak >nul

echo Starting User Dashboard (Port 5173)...
start "User Dashboard" cmd /k "cd frontend\user-dashboard && npm run dev"

echo.
echo Services started!
echo.
echo Open: http://localhost:5173
echo.
echo Click microphone and speak!
pause
