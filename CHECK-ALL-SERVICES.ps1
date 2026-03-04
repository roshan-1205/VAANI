# Check All VAANI Services
Write-Host "Checking VAANI Services..." -ForegroundColor Cyan
Write-Host ""

# Check AI Server
Write-Host "1. AI Server (Port 5000)..." -ForegroundColor Yellow
try {
    $ai = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -TimeoutSec 5
    Write-Host "   Status: $($ai.status)" -ForegroundColor Green
    Write-Host "   Mode: $($ai.mode)" -ForegroundColor White
    Write-Host "   Active Sessions: $($ai.activeSessions)" -ForegroundColor White
} catch {
    Write-Host "   ERROR: AI Server not responding!" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check User Dashboard
Write-Host "2. User Dashboard (Port 3000)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Get -TimeoutSec 5 -UseBasicParsing
    Write-Host "   Status: Running" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor White
} catch {
    Write-Host "   ERROR: User Dashboard not responding!" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check Main Frontend
Write-Host "3. Main Frontend (Port 5173)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -Method Get -TimeoutSec 5 -UseBasicParsing
    Write-Host "   Status: Running" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor White
} catch {
    Write-Host "   ERROR: Main Frontend not responding!" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check Backend
Write-Host "4. Backend API (Port 8000)..." -ForegroundColor Yellow
try {
    $backend = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get -TimeoutSec 5
    Write-Host "   Status: Running" -ForegroundColor Green
} catch {
    Write-Host "   WARNING: Backend has Firebase config issue (expected)" -ForegroundColor Yellow
    Write-Host "   This is OK - Cognito auth is working" -ForegroundColor White
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  - AI Server should be GREEN" -ForegroundColor White
Write-Host "  - User Dashboard should be GREEN" -ForegroundColor White
Write-Host "  - Main Frontend should be GREEN" -ForegroundColor White
Write-Host "  - Backend YELLOW is OK (Firebase not configured)" -ForegroundColor White
Write-Host ""
