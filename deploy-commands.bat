@echo off
REM VAANImai - AWS Amplify Deployment Commands (Windows)
REM Repository: https://github.com/roshan-1205/VAANImai

echo.
echo ========================================
echo VAANImai - AWS Amplify Deployment
echo ========================================
echo.

REM Check if amplify.yml exists
if not exist "amplify.yml" (
    echo Error: amplify.yml not found!
    echo Please run this script from the VAANI directory
    pause
    exit /b 1
)

echo Found amplify.yml
echo.

REM Git status
echo Checking Git status...
git status
echo.

REM Ask for confirmation
set /p confirm="Do you want to commit and push to GitHub? (y/n): "

if /i "%confirm%"=="y" (
    echo.
    echo Adding files to Git...
    git add .
    
    echo.
    echo Committing changes...
    git commit -m "Add AWS Amplify deployment configuration - Add amplify.yml for automated builds - Add comprehensive deployment guides (English and Hindi) - Add environment variables template - Update repository URLs to roshan-1205/VAANImai - Ready for production deployment"
    
    echo.
    echo Pushing to GitHub...
    git push origin main
    
    echo.
    echo ========================================
    echo Successfully pushed to GitHub!
    echo ========================================
    echo.
    echo Next Steps:
    echo 1. Go to: https://console.aws.amazon.com/amplify
    echo 2. Click 'Create new app' - 'Host web app'
    echo 3. Select 'GitHub' and authorize
    echo 4. Select repository: roshan-1205/VAANImai
    echo 5. Select branch: main
    echo 6. Add environment variables (see .env.production.example^)
    echo 7. Click 'Save and deploy'
    echo.
    echo For detailed instructions, read:
    echo    - DEPLOYMENT-GUIDE.md (English^)
    echo    - AMPLIFY-DEPLOYMENT-HINDI.md (Hindi^)
    echo    - QUICK-DEPLOY.md (Quick reference^)
    echo.
    echo Your app will be live in 5-10 minutes!
    echo.
) else (
    echo.
    echo Deployment cancelled
    echo.
    echo To deploy manually, run:
    echo   git add .
    echo   git commit -m "Add AWS Amplify deployment configuration"
    echo   git push origin main
    echo.
)

pause
