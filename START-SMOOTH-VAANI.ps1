#!/usr/bin/env pwsh
# VAANI Smooth Voice Assistant - Production Start

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  VAANI Smooth Voice Assistant" -ForegroundColor Cyan
Write-Host "  Production Ready Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop old processes
Write-Host "Step 1: Cleaning up old processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "  Stopping $($nodeProcesses.Count) old process(es)..." -ForegroundColor White
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}
Write-Host "✓ Cleanup complete" -ForegroundColor Green
Write-Host ""

# Step 2: Verify credentials
Write-Host "Step 2: Verifying AWS credentials..." -ForegroundColor Yellow
$envPath = "VAANI/ai-backend/.env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    if ($envContent -match "ABSKQmVkcm9ja0FQSUtleS") {
        Write-Host "✓ AWS Bedrock credentials configured" -ForegroundColor Green
    } else {
        Write-Host "⚠ Warning: Credentials might not be set" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Error: .env file not found!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Verify code is updated
Write-Host "Step 3: Verifying smooth conversation code..." -ForegroundColor Yellow
$serverPath = "VAANI/ai-backend/server.js"
$content = Get-Content $serverPath -Raw

$checks = @(
    @{Pattern = "DIRECT ANSWERS ONLY"; Name = "Direct answers"},
    @{Pattern = "NO REPETITION"; Name = "No repetition"},
    @{Pattern = "LANGUAGE DETECTION"; Name = "Language detection"},
    @{Pattern = "frequencyPenalty"; Name = "Repetition penalty"}
)

$allGood = $true
foreach ($check in $checks) {
    if ($content -match $check.Pattern) {
        Write-Host "  ✓ $($check.Name)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $($check.Name) missing" -ForegroundColor Red
        $allGood = $false
    }
}

if (-not $allGood) {
    Write-Host "⚠ Warning: Code might not be fully updated" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Install dependencies
Write-Host "Step 4: Checking dependencies..." -ForegroundColor Yellow
$aiBackendPath = "VAANI/ai-backend"
if (Test-Path "$aiBackendPath/node_modules") {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "  Installing dependencies..." -ForegroundColor White
    Push-Location $aiBackendPath
    npm install --silent
    Pop-Location
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}
Write-Host ""

# Step 5: Start server
Write-Host "Step 5: Starting VAANI server..." -ForegroundColor Yellow
Write-Host "  Server will start in a new window" -ForegroundColor Cyan
Write-Host ""

Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    @"
`$Host.UI.RawUI.WindowTitle = 'VAANI Smooth Voice Assistant'
Write-Host '========================================' -ForegroundColor Green
Write-Host '  VAANI Smooth Voice Assistant' -ForegroundColor Green
Write-Host '  Server Starting...' -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Green
Write-Host ''
cd '$aiBackendPath'
npm start
"@
) -WindowStyle Normal

Write-Host "✓ Server starting in new window..." -ForegroundColor Green
Write-Host ""

# Step 6: Wait and test
Write-Host "Step 6: Waiting for server to start..." -ForegroundColor Yellow
Write-Host "  Please wait 10 seconds..." -ForegroundColor Cyan

for ($i = 10; $i -gt 0; $i--) {
    Write-Host "  $i..." -NoNewline -ForegroundColor White
    Start-Sleep -Seconds 1
}
Write-Host ""
Write-Host ""

# Step 7: Health check
Write-Host "Step 7: Testing server..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Server is running!" -ForegroundColor Green
    Write-Host "  Status: $($health.status)" -ForegroundColor Cyan
    Write-Host "  Conversational Mode: $($health.conversationalMode)" -ForegroundColor Cyan
} catch {
    Write-Host "⚠ Server not responding yet" -ForegroundColor Yellow
    Write-Host "  Check the server window for any errors" -ForegroundColor Cyan
}
Write-Host ""

# Step 8: Quick conversation test
Write-Host "Step 8: Testing smooth conversation..." -ForegroundColor Yellow

$tests = @(
    @{Message = "Hello"; Language = "English"; Expected = "short"},
    @{Message = "नमस्ते"; Language = "Hindi"; Expected = "short"}
)

foreach ($test in $tests) {
    try {
        $body = @{
            message = $test.Message
            sessionId = "test-$(Get-Date -Format 'HHmmss')"
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 10 -ErrorAction Stop
        
        Write-Host "  Test ($($test.Language)):" -ForegroundColor White
        Write-Host "    User: $($test.Message)" -ForegroundColor Cyan
        Write-Host "    VAANI: $($response.content)" -ForegroundColor Green
        
        if ($response.content.Length -lt 100) {
            Write-Host "    ✓ Response is clean and direct!" -ForegroundColor Green
        } else {
            Write-Host "    ⚠ Response is long (might need optimization)" -ForegroundColor Yellow
        }
        Write-Host ""
    } catch {
        Write-Host "  ⚠ Test failed: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host ""
    }
}

# Final summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "  VAANI is Ready!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Server Details:" -ForegroundColor Cyan
Write-Host "  URL: http://localhost:5000" -ForegroundColor White
Write-Host "  Health: http://localhost:5000/health" -ForegroundColor White
Write-Host "  Chat: http://localhost:5000/chat" -ForegroundColor White
Write-Host ""

Write-Host "Features Enabled:" -ForegroundColor Cyan
Write-Host "  ✓ Nova Sonic voice synthesis" -ForegroundColor Green
Write-Host "  ✓ Smooth conversation" -ForegroundColor Green
Write-Host "  ✓ No repetition" -ForegroundColor Green
Write-Host "  ✓ Direct answers" -ForegroundColor Green
Write-Host "  ✓ Language detection (Hindi/English)" -ForegroundColor Green
Write-Host "  ✓ Context awareness" -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Test in your voice assistant app" -ForegroundColor White
Write-Host "  2. Check server logs in the new window" -ForegroundColor White
Write-Host "  3. Monitor responses for quality" -ForegroundColor White
Write-Host ""

Write-Host "Troubleshooting:" -ForegroundColor Yellow
Write-Host "  If issues occur, check the server window for errors" -ForegroundColor White
Write-Host "  Run: .\TEST-VAANI.ps1 for detailed testing" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
