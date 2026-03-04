# Quick Start Script - VAANI All Services
# Run this script to start all services at once

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting VAANI Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if already running
$viteRunning = Get-Process | Where-Object {$_.ProcessName -eq "node"} | Select-String "5173" -Quiet
$userDashRunning = Get-Process | Where-Object {$_.ProcessName -eq "node"} | Select-String "3001" -Quiet

if ($viteRunning -or $userDashRunning) {
    Write-Host "⚠️  Services may already be running" -ForegroundColor Yellow
    Write-Host "Check: http://localhost:5173 and http://localhost:3001" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
}

Write-Host "Starting services..." -ForegroundColor Yellow
Write-Host ""

# Start Main Frontend (Vite)
Write-Host "1. Starting Main Frontend (port 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"
Start-Sleep -Seconds 3

# Start User Dashboard
Write-Host "2. Starting User Dashboard (port 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\user-dashboard'; `$env:PORT=3001; npm start"
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Services Starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Please wait 30-60 seconds for services to fully start..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Then access:" -ForegroundColor Cyan
Write-Host "  Main Site: http://localhost:5173" -ForegroundColor White
Write-Host "  User Dashboard: http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "To test voice assistant:" -ForegroundColor Yellow
Write-Host "  1. Go to http://localhost:5173" -ForegroundColor White
Write-Host "  2. Login with user credentials" -ForegroundColor White
Write-Host "  3. Click microphone button" -ForegroundColor White
Write-Host "  4. Speak your question!" -ForegroundColor White
Write-Host ""

# Wait and open browser
Start-Sleep -Seconds 10
Write-Host "Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"
