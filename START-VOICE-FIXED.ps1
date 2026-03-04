# Start VAANI Voice Assistant - Fixed Version

Write-Host "Starting VAANI Voice Assistant..." -ForegroundColor Cyan
Write-Host ""

# Start AI Backend
Write-Host "Starting AI Backend (Port 5000)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PWD/ai-backend'; node server.js"
Start-Sleep -Seconds 3

# Start User Dashboard
Write-Host "Starting User Dashboard (Port 5173)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PWD/frontend/user-dashboard'; npm run dev"

Write-Host ""
Write-Host "Services starting..." -ForegroundColor Green
Write-Host ""
Write-Host "Open: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Click microphone and speak!" -ForegroundColor White
