# VAANI OpenAI Integration Deployment Script
# This script deploys the updated Lambda function with OpenAI integration

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VAANI OpenAI Integration Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "amplify/backend.ts")) {
    Write-Host "Error: Please run this script from the VAANI directory" -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Checking AWS credentials..." -ForegroundColor Yellow
$awsCheck = aws sts get-caller-identity 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: AWS credentials not configured" -ForegroundColor Red
    Write-Host "Run: aws configure" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ AWS credentials verified" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Installing dependencies..." -ForegroundColor Yellow
cd amplify
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Deploying to AWS..." -ForegroundColor Yellow
Write-Host "This will update the Lambda function with OpenAI integration" -ForegroundColor Cyan
Write-Host "Estimated time: 2-3 minutes" -ForegroundColor Cyan
Write-Host ""

npx ampx sandbox

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "OpenAI Integration is now LIVE!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Open http://localhost:3001 (user dashboard)" -ForegroundColor White
    Write-Host "2. Click the microphone button" -ForegroundColor White
    Write-Host "3. Ask a civic-related question" -ForegroundColor White
    Write-Host "4. Listen to the AI-powered response!" -ForegroundColor White
    Write-Host ""
    Write-Host "Example questions:" -ForegroundColor Yellow
    Write-Host "- How do I report a pothole?" -ForegroundColor White
    Write-Host "- मेरे इलाके में पानी की समस्या है" -ForegroundColor White
    Write-Host "- Where can I track my complaint?" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "✗ DEPLOYMENT FAILED" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "- AWS credentials expired" -ForegroundColor White
    Write-Host "- Insufficient permissions" -ForegroundColor White
    Write-Host "- Network connectivity" -ForegroundColor White
    Write-Host ""
    exit 1
}
