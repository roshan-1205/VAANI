#!/usr/bin/env pwsh
# Quick Test Script for VAANI

Write-Host "`n=== Testing VAANI ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -TimeoutSec 5
    Write-Host "✓ Server is running" -ForegroundColor Green
    Write-Host "  Status: $($health.status)" -ForegroundColor White
    Write-Host "  Conversational: $($health.conversationalMode)" -ForegroundColor White
} catch {
    Write-Host "❌ Server not running!" -ForegroundColor Red
    Write-Host "Run: .\RESTART-VAANI.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: Hindi Conversation
Write-Host "Test 2: Hindi Conversation" -ForegroundColor Yellow
$hindiTest = @{
    message = "नमस्ते"
    sessionId = "test-hindi-$(Get-Date -Format 'HHmmss')"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -Body $hindiTest -ContentType "application/json" -TimeoutSec 10
    Write-Host "User: नमस्ते" -ForegroundColor Cyan
    Write-Host "VAANI: $($response.content)" -ForegroundColor Green
    
    # Check if response is in Hindi and short
    if ($response.content.Length -lt 100) {
        Write-Host "✓ Response is clean and direct!" -ForegroundColor Green
    } else {
        Write-Host "⚠ Response is too long (should be < 100 chars)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: English Conversation
Write-Host "Test 3: English Conversation" -ForegroundColor Yellow
$englishTest = @{
    message = "Hello"
    sessionId = "test-english-$(Get-Date -Format 'HHmmss')"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -Body $englishTest -ContentType "application/json" -TimeoutSec 10
    Write-Host "User: Hello" -ForegroundColor Cyan
    Write-Host "VAANI: $($response.content)" -ForegroundColor Green
    
    if ($response.content.Length -lt 100) {
        Write-Host "✓ Response is clean and direct!" -ForegroundColor Green
    } else {
        Write-Host "⚠ Response is too long" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Direct Question
Write-Host "Test 4: Direct Question" -ForegroundColor Yellow
$questionTest = @{
    message = "सड़क में गड्ढा है"
    sessionId = "test-question-$(Get-Date -Format 'HHmmss')"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -Body $questionTest -ContentType "application/json" -TimeoutSec 10
    Write-Host "User: सड़क में गड्ढा है" -ForegroundColor Cyan
    Write-Host "VAANI: $($response.content)" -ForegroundColor Green
    
    # Check if response is a question (should ask for location)
    if ($response.content -match "कहाँ|where|location") {
        Write-Host "✓ Response asks for details (good!)" -ForegroundColor Green
    } else {
        Write-Host "⚠ Response should ask for location" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Tests Complete ===" -ForegroundColor Green
Write-Host ""

Write-Host "If tests failed:" -ForegroundColor Yellow
Write-Host "1. Run: .\RESTART-VAANI.ps1" -ForegroundColor White
Write-Host "2. Wait 10 seconds" -ForegroundColor White
Write-Host "3. Run this test again" -ForegroundColor White
Write-Host ""
