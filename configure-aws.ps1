# AWS Configuration Script for Amplify
# Run this script to set up your AWS credentials

# Create .aws directory if it doesn't exist
$awsDir = "$env:USERPROFILE\.aws"
if (-not (Test-Path $awsDir)) {
    New-Item -ItemType Directory -Path $awsDir -Force
    Write-Host "Created .aws directory" -ForegroundColor Green
}

# Create credentials file
$credentialsContent = @"
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID_HERE
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY_HERE
"@

$credentialsPath = "$awsDir\credentials"
$credentialsContent | Out-File -FilePath $credentialsPath -Encoding ASCII -Force
Write-Host "Created credentials file at: $credentialsPath" -ForegroundColor Green

# Create config file
$configContent = @"
[default]
region = ap-south-1
output = json
"@

$configPath = "$awsDir\config"
$configContent | Out-File -FilePath $configPath -Encoding ASCII -Force
Write-Host "Created config file at: $configPath" -ForegroundColor Green

Write-Host "`nIMPORTANT: Edit the credentials file and replace YOUR_ACCESS_KEY_ID_HERE and YOUR_SECRET_ACCESS_KEY_HERE with your actual AWS credentials" -ForegroundColor Yellow
Write-Host "`nCredentials file location: $credentialsPath" -ForegroundColor Cyan
Write-Host "`nAfter updating credentials, run: npx ampx sandbox" -ForegroundColor Green
