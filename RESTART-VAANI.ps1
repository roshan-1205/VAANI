#!/usr/bin/env pwsh
# VAANI Complete Restart Script

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  VAANI Complete Restart" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop all running Node processes
Write-Host "Step 1: Stopping old Node processes..." -ForegroundColor Yellow

$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node process(es) running" -ForegroundColor Yellow
    foreach ($process in $nodeProcesses) {
        Write-Host "  Stopping process ID: $($process.Id)" -ForegroundColor White
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
    Write-Host "✓ All Node processes stopped" -ForegroundColor Green
} else {
    Write-Host "✓ No Node processes running" -ForegroundColor Green
}

Write-Host ""

# Step 2: Verify server.js is updated
Write-Host "Step 2: Verifying updated code..." -ForegroundColor Yellow

$serverPath = "VAANI/ai-backend/server.js"
if (Test-Path $serverPath) {
    $content = Get-Content $serverPath -Raw
    if ($content -match "DIRECT ANSWERS ONLY") {
        Write-Host "✓ Updated code detected" -ForegroundColor Green
    } else {
        Write-Host "⚠ Warning: Code might not be updated" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Error: server.js not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Start AI Backend
Write-Host "Step 3: Starting AI Backend..." -ForegroundColor Yellow

$aiBackendPath = "VAANI/ai-backend"
if (Test-Path $aiBackendPath) {
    Write-Host "Starting server in background..." -ForegroundColor White
    
    # Start in new window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$aiBackendPath'; Write-Host 'Starting VAANI AI Backend...' -ForegroundColor Green; npm start" -WindowStyle Normal
    
    Write-Host "✓ AI Backend starting..." -ForegroundColor Green
    Write-Host "  Check the new window for server logs" -ForegroundColor Cyan
} else {
    Write-Host "❌ Error: ai-backend folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Wait for server to start
Write-Host "Step 4: Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Step 5: Test the server
Write-Host "Step 5: Testing server..." -ForegroundColor Yellow

try {
    $testUrl = "http://localhost:5000/health"
    $response = Invoke-RestMethod -Uri $testUrl -Method Get -TimeoutSec 5 -ErrorAction Stop
    
    if ($response.status -eq "healthy") {
        Write-Host "✓ Server is running!" -ForegroundColor Green
        Write-Host "  Status: $($response.status)" -ForegroundColor Cyan
        Write-Host "  Conversational Mode: $($response.conversationalMode)" -ForegroundColor Cyan
    } else {
        Write-Host "⚠ Server responded but status unclear" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Server not responding yet (this is normal)" -ForegroundColor Yellow
    Write-Host "  Wait 10-15 seconds and try again" -ForegroundColor Cyan
}

Write-Host ""

# Step 6: Test with a message
Write-Host "Step 6: Testing conversation..." -ForegroundColor Yellow

Start-Sleep -Seconds 3

try {
    $testMessage = @{
        message = "Hello"
        sessionId = "test-restart-$(Get-Date -Format 'HHmmss')"
        userId = "test-user"
    } | ConvertTo-Json

    $chatUrl = "http://localhost:5000/chat"
    $chatResponse = Invoke-RestMethod -Uri $chatUrl -Method Post -Body $testMessage -ContentType "application/json" -TimeoutSec 10 -ErrorAction Stop
    
    Write-Host "✓ Conversation test successful!" -ForegroundColor Green
    Write-Host "  Response: $($chatResponse.content)" -ForegroundColor Cyan
    
    # Check if response is clean and direct
    if ($chatResponse.content.Length -lt 100) {
        Write-Host "✓ Response is clean and direct!" -ForegroundColor Green
    } else {
        Write-Host "⚠ Response might be too long" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "⚠ Conversation test failed" -ForegroundColor Yellow
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Server might still be starting..." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Restart Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Check the new window for server logs" -ForegroundColor White
Write-Host "2. Test with: curl -X POST http://localhost:5000/chat -d '{\"message\":\"Hello\"}'" -ForegroundColor White
Write-Host "3. Or use your voice assistant app" -ForegroundColor White
Write-Host ""

Write-Host "Server URL: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Health Check: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
