# Test VAANI Enhanced AI
Write-Host "Testing VAANI Enhanced AI..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1. Health Check..." -ForegroundColor Yellow
$health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
Write-Host "Status: $($health.status)" -ForegroundColor Green
Write-Host "Civic Issues: $($health.knowledgeBase.civicIssues)" -ForegroundColor White
Write-Host "FAQ Entries: $($health.knowledgeBase.faqEntries)" -ForegroundColor White
Write-Host ""

# Test 2: Road Issue
Write-Host "2. Testing Road Issue..." -ForegroundColor Yellow
$body1 = '{"message": "road has pothole", "userId": "test1"}'
$resp1 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $body1
Write-Host "Response: $($resp1.content.Substring(0, 150))..." -ForegroundColor White
Write-Host ""

# Test 3: Water Issue
Write-Host "3. Testing Water Issue..." -ForegroundColor Yellow
$body2 = '{"message": "no water supply", "userId": "test2"}'
$resp2 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $body2
Write-Host "Response: $($resp2.content.Substring(0, 150))..." -ForegroundColor White
Write-Host ""

# Test 4: Help
Write-Host "4. Testing Help Request..." -ForegroundColor Yellow
$body3 = '{"message": "how to file complaint", "userId": "test3"}'
$resp3 = Invoke-RestMethod -Uri "http://localhost:5000/chat" -Method Post -ContentType "application/json" -Body $body3
Write-Host "Response: $($resp3.content.Substring(0, 150))..." -ForegroundColor White
Write-Host ""

Write-Host "All tests completed!" -ForegroundColor Green
