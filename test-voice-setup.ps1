#!/usr/bin/env pwsh
# Test VAANI Voice Assistant Setup

Write-Host "🧪 Testing VAANI Voice Assistant Setup..." -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Test 1: Check Node.js
Write-Host "1️⃣ Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Test 2: Check ai-backend files
Write-Host "2️⃣ Checking ai-backend files..." -ForegroundColor Yellow
if (Test-Path "ai-backend/server.js") {
    Write-Host "   ✅ server.js found" -ForegroundColor Green
} else {
    Write-Host "   ❌ server.js not found" -ForegroundColor Red
    $allGood = $false
}

if (Test-Path "ai-backend/.env") {
    Write-Host "   ✅ .env file found" -ForegroundColor Green
} else {
    Write-Host "   ❌ .env file not found" -ForegroundColor Red
    $allGood = $false
}

# Test 3: Check frontend files
Write-Host "3️⃣ Checking frontend files..." -ForegroundColor Yellow
if (Test-Path "frontend/user-dashboard/src/components/AIVoiceInteraction.js") {
    Write-Host "   ✅ AIVoiceInteraction.js found" -ForegroundColor Green
} else {
    Write-Host "   ❌ AIVoiceInteraction.js not found" -ForegroundColor Red
    $allGood = $false
}

# Test 4: Check if ai-backend is running
Write-Host "4️⃣ Checking if ai-backend is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/cache-stats" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✅ AI Backend is running on port 5000" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  AI Backend not running (this is OK if you haven't started it yet)" -ForegroundColor Yellow
    Write-Host "   💡 Run: cd ai-backend && node server.js" -ForegroundColor Cyan
}

# Test 5: Check OpenAI API key
Write-Host "5️⃣ Checking OpenAI API key..." -ForegroundColor Yellow
if (Test-Path "ai-backend/.env") {
    $envContent = Get-Content "ai-backend/.env" -Raw
    if ($envContent -match "OPENAI_API_KEY=sk-") {
        Write-Host "   ✅ OpenAI API key configured" -ForegroundColor Green
    } else {
        Write-Host "   ❌ OpenAI API key not found in .env" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

if ($allGood) {
    Write-Host "✅ All checks passed! Ready to start voice assistant" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Run: .\START-VOICE-ASSISTANT.ps1" -ForegroundColor White
    Write-Host "   2. Open: http://localhost:5173" -ForegroundColor White
    Write-Host "   3. Click microphone and speak!" -ForegroundColor White
} else {
    Write-Host "⚠️  Some checks failed. Please fix the issues above." -ForegroundColor Yellow
}

Write-Host ""
