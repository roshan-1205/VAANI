# VAANI Frontend Startup Script
# This script starts the main website and all three dashboards

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VAANI Complete Frontend Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Main Website (Port 5173)
Write-Host "[1/4] Starting Main Website on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd VAANI/frontend; npm run dev"
Start-Sleep -Seconds 3

# Start User Dashboard (Port 3000)
Write-Host "[2/4] Starting User Dashboard on http://localhost:3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd VAANI/frontend/user-dashboard; npm start"
Start-Sleep -Seconds 3

# Start Volunteer Dashboard (Port 3001)
Write-Host "[3/4] Starting Volunteer Dashboard on http://localhost:3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd VAANI/frontend/volunteer-dashboard; npm start"
Start-Sleep -Seconds 3

# Start Admin Dashboard (Port 3002)
Write-Host "[4/4] Starting Admin Dashboard on http://localhost:3002..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd VAANI/frontend/admin-dashboard; npm start"
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  VAANI Frontend is Starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Main Website:        http://localhost:5173" -ForegroundColor Cyan
Write-Host "User Dashboard:      http://localhost:3000" -ForegroundColor Cyan
Write-Host "Volunteer Dashboard: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Admin Dashboard:     http://localhost:3002" -ForegroundColor Cyan
Write-Host ""
Write-Host "Login Flow:" -ForegroundColor Yellow
Write-Host "1. Go to http://localhost:5173/login" -ForegroundColor White
Write-Host "2. Login with your credentials" -ForegroundColor White
Write-Host "3. Redirects based on role:" -ForegroundColor White
Write-Host "   - User      → http://localhost:3000 (Dashboard.js)" -ForegroundColor Gray
Write-Host "   - Volunteer → http://localhost:3001 (Overview.js)" -ForegroundColor Gray
Write-Host "   - Admin     → http://localhost:3002 (Dashboard.js)" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
