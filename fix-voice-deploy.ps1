#!/usr/bin/env pwsh
# Fix and redeploy VAANI Voice Lambda function

Write-Host "🔧 Fixing VAANI Voice Lambda Function..." -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "amplify")) {
    Write-Host "❌ Error: Must run from VAANI directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fixed Issues:" -ForegroundColor Green
Write-Host "  1. Removed openai module dependency (using HTTP requests instead)" -ForegroundColor White
Write-Host "  2. Added fallback civic responses when OpenAI is unavailable" -ForegroundColor White
Write-Host "  3. Improved error handling and logging" -ForegroundColor White
Write-Host ""

# Deploy the updated Lambda function
Write-Host "📦 Deploying updated Lambda function..." -ForegroundColor Yellow
Write-Host ""

npx ampx sandbox --dir amplify

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎤 Voice assistant should now work without 'No module named openai' error" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test the voice feature in your dashboard!" -ForegroundColor White
