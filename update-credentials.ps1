# Quick AWS Credentials Update Script
# Replace the values below with your actual credentials

param(
    [Parameter(Mandatory=$true)]
    [string]$AccessKeyId,
    
    [Parameter(Mandatory=$true)]
    [string]$SecretAccessKey,
    
    [string]$Region = "ap-south-1"
)

$awsDir = "$env:USERPROFILE\.aws"

# Update credentials
$credentialsContent = @"
[default]
aws_access_key_id = $AccessKeyId
aws_secret_access_key = $SecretAccessKey
"@

$credentialsContent | Out-File -FilePath "$awsDir\credentials" -Encoding ASCII -Force

# Update config
$configContent = @"
[default]
region = $Region
output = json
"@

$configContent | Out-File -FilePath "$awsDir\config" -Encoding ASCII -Force

Write-Host "AWS credentials updated successfully!" -ForegroundColor Green
Write-Host "Region: $Region" -ForegroundColor Cyan
Write-Host "`nYou can now run: npx ampx sandbox" -ForegroundColor Green
