# Bootstrap AWS CDK for Amplify
# Run this AFTER adding IAM permissions

Write-Host "Bootstrapping AWS CDK for account 274595021768 in region ap-south-1..." -ForegroundColor Cyan

npx cdk bootstrap aws://274595021768/ap-south-1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nCDK Bootstrap successful!" -ForegroundColor Green
    Write-Host "Now you can run: npx ampx sandbox" -ForegroundColor Green
} else {
    Write-Host "`nCDK Bootstrap failed. Please check your IAM permissions." -ForegroundColor Red
}
