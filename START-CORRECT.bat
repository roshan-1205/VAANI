@echo off
echo ========================================
echo VAANI Voice Assistant - Correct Startup
echo ========================================
echo.

echo Starting AI Backend (Port 5000)...
start "AI Backend" cmd /k "cd ai-backend && node server.js"
timeout /t 3 /nobreak >nul

echo Starting User Dashboard (Port 3000)...
start "User Dashboard" cmd /k "cd frontend\user-dashboard && npm start"

echo.
echo ========================================
echo Services Started!
echo ========================================
echo.
echo AI Backend: http://localhost:5000
echo User Dashboard: http://localhost:3000
echo.
echo Click microphone and speak!
echo.
pause
