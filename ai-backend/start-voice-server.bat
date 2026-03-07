@echo off
echo ========================================
echo Starting VAANI Voice Assistant Server
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

echo.
echo Starting server...
echo Server will run on http://localhost:5000
echo Press Ctrl+C to stop
echo.

node server-production.js

pause
