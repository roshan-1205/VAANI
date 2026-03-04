# Check AWS Lambda Logs
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VAANI Lambda Logs Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$functionName = "amplify-vaani-aayus-sandb-VoiceProcessorFunction11-fLx4x2Xw3Gwu"
$logGroup = "/aws/lambda/$functionName"

Write-Host "Function: $functionName" -ForegroundColor Yellow
Write-Host "Log Group: $logGroup" -ForegroundColor Yellow
Write-Host ""

Write-Host "Fetching latest logs..." -ForegroundColor Green
Write-Host ""

try {
    # Get latest log stream
    $streams = aws logs describe-log-streams `
        --log-group-name $logGroup `
        --order-by LastEventTime `
        --descending `
        --max-items 1 `
        --query 'logStreams[0].logStreamName' `
        --output text

    if ($streams) {
        Write-Host "Latest log stream: $streams" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Recent log events:" -ForegroundColor Yellow
        Write-Host "-------------------" -ForegroundColor Yellow
        
        # Get recent logs
        aws logs tail $logGroup --since 10m --format short
    } else {
        Write-Host "No log streams found" -ForegroundColor Red
    }
} catch {
    Write-Host "Error fetching logs: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure AWS CLI is configured:" -ForegroundColor Yellow
    Write-Host "  aws configure" -ForegroundColor White
}

Write-Host ""
Write-Host "To view logs in AWS Console:" -ForegroundColor Cyan
Write-Host "https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/`$252Faws`$252Flambda`$252F$functionName" -ForegroundColor White
