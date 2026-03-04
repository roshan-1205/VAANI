#!/usr/bin/env pwsh
# VAANI Quick Deploy - Nova Sonic Integrated

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  VAANI Quick Deploy" -ForegroundColor Cyan
Write-Host "  Nova Sonic API Integrated" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Changes Made:" -ForegroundColor Yellow
Write-Host "  ✓ Nova Sonic API key added to Lambda" -ForegroundColor Green
Write-Host "  ✓ Bedrock Nova Lite for AI processing" -ForegroundColor Green
Write-Host "  ✓ Direct answers, no external calls" -ForegroundColor Green
Write-Host "  ✓ Language detection (Hindi/English)" -ForegroundColor Green
Write-Host ""

Write-Host "Deploying to AWS..." -ForegroundColor Yellow
Write-Host ""

Set-Location VAANI

# Deploy with Amplify
Write-Host "Running: amplify push --yes" -ForegroundColor Cyan
amplify push --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Deployment Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "What's Deployed:" -ForegroundColor Cyan
    Write-Host "  ✓ Lambda with Nova Sonic API" -ForegroundColor Green
    Write-Host "  ✓ Bedrock Nova Lite for AI" -ForegroundColor Green
    Write-Host "  ✓ Direct, clean responses" -ForegroundColor Green
    Write-Host "  ✓ No repetition" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Test Your Voice Assistant:" -ForegroundColor Cyan
    Write-Host "  1. Open your voice assistant app" -ForegroundColor White
    Write-Host "  2. Say 'Hello' or 'नमस्ते'" -ForegroundColor White
    Write-Host "  3. Should get SHORT, DIRECT response" -ForegroundColor White
    Write-Host ""
    
    Write-Host "Expected Responses:" -ForegroundColor Cyan
    Write-Host "  'Hello' → 'Hi! What's the problem?'" -ForegroundColor Green
    Write-Host "  'नमस्ते' → 'हाँ बोलो, क्या problem है?'" -ForegroundColor Green
    Write-Host ""
    
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Deployment Failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check the error messages above" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
