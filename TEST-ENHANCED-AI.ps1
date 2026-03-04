# Test VAANI Enhanced AI Server
# यह script AI server को test करता है

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VAANI Enhanced AI - Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
Write-Host "1. Checking if AI server is running..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -ErrorAction Stop
    Write-Host "✓ Server is running!" -ForegroundColor Green
    Write-Host "  Mode: $($health.mode)" -ForegroundColor White
    Write-Host "  Active Sessions: $($health.activeSessions)" -ForegroundColor White
    Write-Host "  Civic Issues: $($health.knowledgeBase.civicIssues)" -ForegroundColor White
    Write-Host "  FAQ Entries: $($health.knowledgeBase.faqEntries)" -ForegroundColor White
    Write-Host "  Emotion Types: $($health.knowledgeBase.emotionTypes)" -ForegroundColor White
} catch {
    Write-Host "✗ Server is not running!" -ForegroundColor Red
    Write-Host "  Start it with: ./START-ENHANCED-AI.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "2. Testing Knowledge Base..." -ForegroundColor Yellow
try {
    $kb = Invoke-RestMethod -Uri "http://localhost:5000/knowledge-base" -Method Get
    Write-Host "✓ Knowledge Base loaded!" -ForegroundColor Green
    Write-Host "  Civic Issues: $($kb.civicIssues -join ', ')" -ForegroundColor White
    Write-Host "  FAQ Count: $($kb.faqCount)" -ForegroundColor White
} catch {
    Write-Host "✗ Knowledge Base error!" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Testing AI Responses..." -ForegroundColor Yellow
Write-Host ""

# Test 1: Road Issue
Write-Host "Test 1: Road Issue (English)" -ForegroundColor Cyan
$test1 = @{
    message = "road has pothole"
    userId = "test-user-1"
} | ConvertTo-Json

try {
    $response1 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $test1
    Write-Host "✓ Response received!" -ForegroundColor Green
    Write-Host "  AI: $($response1.content.Substring(0, [Math]::Min(100, $response1.content.Length)))..." -ForegroundColor White
} catch {
    Write-Host "✗ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Water Issue
Write-Host "Test 2: Water Issue (English)" -ForegroundColor Cyan
$test2 = @{
    message = "no water supply for 3 days"
    userId = "test-user-2"
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $test2
    Write-Host "✓ Response received!" -ForegroundColor Green
    Write-Host "  AI: $($response2.content.Substring(0, [Math]::Min(100, $response2.content.Length)))..." -ForegroundColor White
} catch {
    Write-Host "✗ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Help Request
Write-Host "Test 3: Help Request" -ForegroundColor Cyan
$test3 = @{
    message = "how to file complaint"
    userId = "test-user-3"
} | ConvertTo-Json

try {
    $response3 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $test3
    Write-Host "✓ Response received!" -ForegroundColor Green
    Write-Host "  AI: $($response3.content.Substring(0, [Math]::Min(100, $response3.content.Length)))..." -ForegroundColor White
} catch {
    Write-Host "✗ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Greeting
Write-Host "Test 4: Greeting" -ForegroundColor Cyan
$test4 = @{
    message = "hello"
    userId = "test-user-4"
} | ConvertTo-Json

try {
    $response4 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $test4
    Write-Host "✓ Response received!" -ForegroundColor Green
    Write-Host "  AI: $($response4.content.Substring(0, [Math]::Min(100, $response4.content.Length)))..." -ForegroundColor White
} catch {
    Write-Host "✗ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Electricity Issue
Write-Host "Test 5: Electricity Issue" -ForegroundColor Cyan
$test5 = @{
    message = "power cut since morning"
    userId = "test-user-5"
} | ConvertTo-Json

try {
    $response5 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $test5
    Write-Host "✓ Response received!" -ForegroundColor Green
    Write-Host "  AI: $($response5.content.Substring(0, [Math]::Min(100, $response5.content.Length)))..." -ForegroundColor White
} catch {
    Write-Host "✗ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Testing Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: AI uses fallback responses when AWS Bedrock is not configured." -ForegroundColor Yellow
Write-Host "Fallback responses are based on comprehensive knowledge base." -ForegroundColor Yellow
Write-Host ""
Write-Host "To configure AWS Bedrock:" -ForegroundColor Cyan
Write-Host "  1. Update ai-backend/.env with AWS credentials" -ForegroundColor White
Write-Host "  2. Restart the server with START-ENHANCED-AI.ps1" -ForegroundColor White
Write-Host ""
