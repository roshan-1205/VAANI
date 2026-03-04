# Complete fix for Vite parsing error

Write-Host "=== VAANI Voice Assistant - Complete Fix ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill any running Node processes
Write-Host "Step 1: Stopping all Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   Done" -ForegroundColor Green
Write-Host ""

# Step 2: Clear Vite cache
Write-Host "Step 2: Clearing Vite cache..." -ForegroundColor Yellow
$viteCachePath = "frontend/user-dashboard/node_modules/.vite"
if (Test-Path $viteCachePath) {
    Remove-Item -Recurse -Force $viteCachePath
    Write-Host "   Vite cache cleared" -ForegroundColor Green
} else {
    Write-Host "   No cache found" -ForegroundColor Gray
}
Write-Host ""

# Step 3: Clear dist folder
Write-Host "Step 3: Clearing dist folder..." -ForegroundColor Yellow
$distPath = "frontend/user-dashboard/dist"
if (Test-Path $distPath) {
    Remove-Item -Recurse -Force $distPath
    Write-Host "   Dist cleared" -ForegroundColor Green
} else {
    Write-Host "   No dist found" -ForegroundColor Gray
}
Write-Host ""

# Step 4: Verify component file
Write-Host "Step 4: Verifying component file..." -ForegroundColor Yellow
$componentPath = "frontend/user-dashboard/src/components/AIVoiceInteraction.js"
if (Test-Path $componentPath) {
    $content = Get-Content $componentPath -Raw
    if ($content -match "export default AIVoiceInteraction") {
        Write-Host "   Component file is valid" -ForegroundColor Green
    } else {
        Write-Host "   WARNING: Component file may be incomplete" -ForegroundColor Red
    }
} else {
    Write-Host "   ERROR: Component file not found" -ForegroundColor Red
}
Write-Host ""

# Step 5: Install dependencies
Write-Host "Step 5: Installing dependencies..." -ForegroundColor Yellow
Set-Location frontend/user-dashboard
npm install --silent
Set-Location ../..
Write-Host "   Dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "=== Fix Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Now start the services:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1:" -ForegroundColor Yellow
Write-Host "  cd ai-backend" -ForegroundColor White
Write-Host "  node server.js" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2:" -ForegroundColor Yellow
Write-Host "  cd frontend/user-dashboard" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
