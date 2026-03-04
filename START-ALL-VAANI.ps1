# VAANI Complete Startup Script - PERMANENT SOLUTION
# Starts ALL services needed for VAANI to work

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   VAANI COMPLETE STARTUP" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exist
$frontendModules = Test-Path "VAANI/frontend/node_modules"
$userDashModules = Test-Path "VAANI/frontend/user-dashboard/node_modules"
$volDashModules = Test-Path "VAANI/frontend/volunteer-dashboard/node_modules"
$adminDashModules = Test-Path "VAANI/frontend/admin-dashboard/node_modules"

if (-not $frontendModules -or -not $userDashModules -or -not $volDashModules -or -not $adminDashModules) {
    Write-Host "⚠️  Missing node_modules. Installing dependencies..." -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $frontendModules) {
        Write-Host "Installing frontend dependencies..." -ForegroundColor Gray
        cd VAANI/frontend
        npm install
        cd ../..
    }
    
    if (-not $userDashModules) {
        Write-Host "Installing user-dashboard dependencies..." -ForegroundColor Gray
        cd VAANI/frontend/user-dashboard
        npm install
        cd ../../..
    }
    
    if (-not $volDashModules) {
        Write-Host "Installing volunteer-dashboard dependencies..." -ForegroundColor Gray
        cd VAANI/frontend/volunteer-dashboard
        npm install
        cd ../../..
    }
    
    if (-not $adminDashModules) {
        Write-Host "Installing admin-dashboard dependencies..." -ForegroundColor Gray
        cd VAANI/frontend/admin-dashboard
        npm install
        cd ../../..
    }
    
    Write-Host ""
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Starting all services..." -ForegroundColor Yellow
Write-Host ""

# Start Main Website (Port 5173)
Write-Host "[1/4] 🌐 Main Website (Port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'VAANI Main Website' -ForegroundColor Cyan; cd VAANI/frontend; npm run dev"
Start-Sleep -Seconds 4

# Start User Dashboard (Port 3000)
Write-Host "[2/4] 👤 User Dashboard (Port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'VAANI User Dashboard' -ForegroundColor Green; cd VAANI/frontend/user-dashboard; npm start"
Start-Sleep -Seconds 4

# Start Volunteer Dashboard (Port 3001)
Write-Host "[3/4] 🤝 Volunteer Dashboard (Port 3001)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'VAANI Volunteer Dashboard' -ForegroundColor Magenta; cd VAANI/frontend/volunteer-dashboard; npm start"
Start-Sleep -Seconds 4

# Start Admin Dashboard (Port 3002)
Write-Host "[4/4] 👨‍💼 Admin Dashboard (Port 3002)..." -ForegroundColor Red
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'VAANI Admin Dashboard' -ForegroundColor Red; cd VAANI/frontend/admin-dashboard; npm start"
Start-Sleep -Seconds 4

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   ✅ ALL SERVICES STARTING!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Please wait 30 seconds for all services to fully start..." -ForegroundColor Yellow
Write-Host ""
Write-Host "SERVICES:" -ForegroundColor White
Write-Host "  🌐 Main Website:        http://localhost:5173" -ForegroundColor Cyan
Write-Host "  👤 User Dashboard:      http://localhost:3000" -ForegroundColor Green
Write-Host "  🤝 Volunteer Dashboard: http://localhost:3001" -ForegroundColor Magenta
Write-Host "  👨‍💼 Admin Dashboard:     http://localhost:3002" -ForegroundColor Red
Write-Host ""
Write-Host "TEST CREDENTIALS:" -ForegroundColor Yellow
Write-Host "  User:      user@test.com / Test@123" -ForegroundColor Gray
Write-Host "  Volunteer: volunteer@test.com / Test@123" -ForegroundColor Gray
Write-Host "  Admin:     admin@test.com / Test@123" -ForegroundColor Gray
Write-Host ""
Write-Host "LOGIN FLOW:" -ForegroundColor Yellow
Write-Host "  1. Go to http://localhost:5173/login" -ForegroundColor White
Write-Host "  2. Enter email and password" -ForegroundColor White
Write-Host "  3. Auto-redirects to correct dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
