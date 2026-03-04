# Paste your ACTUAL credentials here
$AccessKey = Read-Host "AKIAT73ZDQPEDHROWUML"
$SecretKey = Read-Host "CrUv/qORSVtz9nxtXvCxwQPlR3Rxh1tSRIcfGDEL" -AsSecureString
$SecretKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecretKey))

$awsDir = "$env:USERPROFILE\.aws"

# Update credentials
$credentialsContent = @"
[default]
aws_access_key_id = $AccessKey
aws_secret_access_key = $SecretKeyPlain
"@

$credentialsContent | Out-File -FilePath "$awsDir\credentials" -Encoding ASCII -Force

Write-Host "`nCredentials updated!" -ForegroundColor Green
Write-Host "Testing credentials..." -ForegroundColor Cyan

# Test by trying to bootstrap
cd $PSScriptRoot
npx cdk bootstrap aws://274595021768/ap-south-1
