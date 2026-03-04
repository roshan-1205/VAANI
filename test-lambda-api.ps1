# Test Lambda API
Write-Host "Testing VAANI Lambda API..." -ForegroundColor Cyan
Write-Host ""

# Test health endpoint
Write-Host "1. Testing health endpoint..." -ForegroundColor Yellow
$healthUrl = "https://ng3jov95pk.execute-api.us-east-1.amazonaws.com/prod/health"

try {
    $response = Invoke-RestMethod -Uri $healthUrl -Method Get
    Write-Host "✓ Health check passed!" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor White
} catch {
    Write-Host "✗ Health check failed!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "API is ready for voice processing!" -ForegroundColor Green
Write-Host "URL: https://ng3jov95pk.execute-api.us-east-1.amazonaws.com/prod/voice" -ForegroundColor Cyan
