#!/usr/bin/env pwsh
# Start VAANI Voice Assistant with all required services

Write-Host "🎤 Starting VAANI Voice Assistant..." -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "ai-backend")) {
    Write-Host "❌ Error: Must run from VAANI directory" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing ai-backend dependencies..." -ForegroundColor Yellow
Set-Location ai-backend
npm install
Set-Location ..

Write-Host ""
Write-Host "🚀 Starting services..." -ForegroundColor Cyan
Write-Host ""

# Start ai-backend server
Write-Host "1️⃣ Starting AI Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd ai-backend; node server.js"
Start-Sleep -Seconds 3

# Start frontend
Write-Host "2️⃣ Starting User Dashboard (Port 5173)..." -ForegroundColor Yellow
Set-Location frontend/user-dashboard
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "npm run dev"
Set-Location ../..

Write-Host ""
Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Open your browser:" -ForegroundColor Cyan
Write-Host "   User Dashboard: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🎤 Voice Assistant Features:" -ForegroundColor Cyan
Write-Host "   ✓ Instant speech recognition (Web Speech API)" -ForegroundColor White
Write-Host "   ✓ Fast AI responses (2-3 seconds)" -ForegroundColor White
Write-Host "   ✓ Natural voice output" -ForegroundColor White
Write-Host "   ✓ Works offline for speech recognition" -ForegroundColor White
Write-Host ""
Write-Host "📝 How to use:" -ForegroundColor Yellow
Write-Host "   1. Login to dashboard" -ForegroundColor White
Write-Host "   2. Click microphone button" -ForegroundColor White
Write-Host "   3. Speak your civic issue" -ForegroundColor White
Write-Host "   4. Get instant AI response" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: Use Chrome or Edge for best voice recognition" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop services" -ForegroundColor Gray
