@echo off
echo ========================================
echo AWS Bedrock Quota Increase Request
echo ========================================
echo.

echo Configuring AWS CLI...
aws configure set aws_access_key_id AKIAT73ZDQPEIFWFVNKU
aws configure set aws_secret_access_key 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
aws configure set region us-east-1
aws configure set output json

echo.
echo Requesting quota increase for Bedrock Nova Lite...
echo.

REM Request quota increase for Nova Lite tokens per minute
aws service-quotas request-service-quota-increase ^
    --service-code bedrock ^
    --quota-code L-F9C42A4F ^
    --desired-value 100000 ^
    --region us-east-1

echo.
echo ========================================
echo Quota increase request submitted!
echo ========================================
echo.
echo Check status with:
echo aws service-quotas list-requested-service-quota-change-history-by-quota --service-code bedrock --quota-code L-F9C42A4F --region us-east-1
echo.
pause
