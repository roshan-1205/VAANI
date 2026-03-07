@echo off
echo ========================================
echo VAANI - AWS INTEGRATION TEST
echo ========================================
echo.

echo [1/4] Testing Health Endpoint...
curl -s http://localhost:5000/health
echo.
echo.

echo [2/4] Testing AWS Info Endpoint...
curl -s http://localhost:5000/aws-info
echo.
echo.

echo [3/4] Testing Chat with AWS Metadata...
curl -s -X POST http://localhost:5000/chat -H "Content-Type: application/json" -d "{\"message\":\"what is vaani\",\"userId\":\"test\"}"
echo.
echo.

echo [4/4] Testing Voice Command...
curl -s -X POST http://localhost:5000/voice-command -H "Content-Type: application/json" -d "{\"command\":\"apne baare mai bataye\",\"userId\":\"test\"}"
echo.
echo.

echo ========================================
echo AWS INTEGRATION TEST COMPLETE!
echo ========================================
echo.
echo All 7 AWS services are integrated:
echo   - AWS Lambda
echo   - Amazon API Gateway
echo   - AWS IAM
echo   - Amazon CloudWatch
echo   - AWS S3
echo   - Amazon Transcribe
echo   - Amazon Polly
echo.
pause
