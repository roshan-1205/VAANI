# Fix Vite parsing error by clearing cache and restarting

Write-Host "Fixing Vite parsing error..." -ForegroundColor Cyan
Write-Host ""

Set-Location frontend/user-dashboard

# Clear Vite cache
Write-Host "1. Clearing Vite cache..." -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "   Cache cleared" -ForegroundColor Green
} else {
    Write-Host "   No cache found" -ForegroundColor Gray
}

# Clear dist folder
Write-Host "2. Clearing dist folder..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "   Dist cleared" -ForegroundColor Green
} else {
    Write-Host "   No dist found" -ForegroundColor Gray
}

# Reinstall dependencies
Write-Host "3. Reinstalling dependencies..." -ForegroundColor Yellow
npm install
Write-Host "   Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "Cache cleared! Now restart:" -ForegroundColor Green
Write-Host "npm run dev" -ForegroundColor Cyan
Write-Host ""

Set-Location ../..
