# Start VAANI Enhanced AI Server
# यह script enhanced AI server को start करता है

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VAANI Enhanced AI Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if ai-backend directory exists
if (-not (Test-Path "ai-backend")) {
    Write-Host "Error: ai-backend directory not found!" -ForegroundColor Red
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "ai-backend/node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Set-Location ai-backend
    npm install
    Set-Location ..
    Write-Host "Dependencies installed!" -ForegroundColor Green
}

# Check .env file
if (-not (Test-Path "ai-backend/.env")) {
    Write-Host "Warning: .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    
    $envContent = @"
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
PORT=5000
"@
    
    $envContent | Out-File -FilePath "ai-backend/.env" -Encoding UTF8
    Write-Host ".env file created. Please update with your AWS credentials." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting Enhanced AI Server..." -ForegroundColor Green
Write-Host "Features:" -ForegroundColor Cyan
Write-Host "  - Comprehensive Knowledge Base" -ForegroundColor White
Write-Host "  - Emotional Intelligence" -ForegroundColor White
Write-Host "  - Context-Aware Responses" -ForegroundColor White
Write-Host "  - Multi-language Support" -ForegroundColor White
Write-Host "  - Issue-Specific Guidance" -ForegroundColor White
Write-Host ""
Write-Host "Server will start on: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

Set-Location ai-backend
npm run enhanced
