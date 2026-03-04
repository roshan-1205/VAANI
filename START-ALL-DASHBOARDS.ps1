# VAANI - Start All Dashboards
# Starts all services on designated ports

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VAANI - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue -InformationLevel Quiet
    return $connection
}

# Check and kill processes on required ports
$ports = @(5173, 3000, 3001, 3002, 5000, 8000)
foreach ($port in $ports) {
    if (Test-Port $port) {
        Write-Host "Port $port is in use. Attempting to free it..." -ForegroundColor Yellow
        $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
        if ($process) {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Write-Host "Freed port $port" -ForegroundColor Green
        }
        Start-Sleep -Seconds 1
    }
}

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Cyan
Write-Host ""

# Start Backend API (Port 8000)
Write-Host "1. Starting Backend API (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Backend'; python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"
Start-Sleep -Seconds 3

# Start AI Server (Port 5000)
Write-Host "2. Starting AI Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\ai-backend'; npm run enhanced"
Start-Sleep -Seconds 3

# Start Main Frontend (Port 5173)
Write-Host "3. Starting Main Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"
Start-Sleep -Seconds 3

# Start User Dashboard (Port 3000)
Write-Host "4. Starting User Dashboard (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\user-dashboard'; npm start"
Start-Sleep -Seconds 3

# Start Admin Dashboard (Port 3001)
Write-Host "5. Starting Admin Dashboard (Port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\admin-dashboard'; `$env:PORT=3001; npm start"
Start-Sleep -Seconds 3

# Start Volunteer Dashboard (Port 3002)
Write-Host "6. Starting Volunteer Dashboard (Port 3002)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\volunteer-dashboard'; `$env:PORT=3002; npm start"
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All Services Started!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services are starting in separate windows..." -ForegroundColor Green
Write-Host "Please wait 30-60 seconds for all services to be ready." -ForegroundColor Yellow
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Cyan
Write-Host "  Main Site:          http://localhost:5173" -ForegroundColor White
Write-Host "  User Dashboard:     http://localhost:3000" -ForegroundColor White
Write-Host "  Admin Dashboard:    http://localhost:3001" -ForegroundColor White
Write-Host "  Volunteer Dashboard: http://localhost:3002" -ForegroundColor White
Write-Host "  AI Server:          http://localhost:5000" -ForegroundColor White
Write-Host "  Backend API:        http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to check service status..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Checking services..." -ForegroundColor Cyan
Write-Host ""

# Check each service
$services = @(
    @{Name="Main Frontend"; Port=5173; URL="http://localhost:5173"},
    @{Name="User Dashboard"; Port=3000; URL="http://localhost:3000"},
    @{Name="Admin Dashboard"; Port=3001; URL="http://localhost:3001"},
    @{Name="Volunteer Dashboard"; Port=3002; URL="http://localhost:3002"},
    @{Name="AI Server"; Port=5000; URL="http://localhost:5000/health"},
    @{Name="Backend API"; Port=8000; URL="http://localhost:8000/health"}
)

foreach ($service in $services) {
    if (Test-Port $service.Port) {
        Write-Host "✓ $($service.Name) (Port $($service.Port)): Running" -ForegroundColor Green
    } else {
        Write-Host "✗ $($service.Name) (Port $($service.Port)): Not Running" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "All services should be running now!" -ForegroundColor Green
Write-Host "If any service shows 'Not Running', wait a bit longer and check again." -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop all services, close all PowerShell windows." -ForegroundColor White
Write-Host ""
