@echo off
echo ========================================
echo   Quick Vercel Deployment
echo ========================================
echo.

cd client

echo Installing Vercel CLI (if needed)...
call npm install -g vercel

echo.
echo Starting Vercel deployment...
echo.
echo Follow the prompts:
echo 1. Login to Vercel (if not logged in)
echo 2. Link to existing project or create new
echo 3. Confirm settings
echo.

vercel --prod

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your demo link will be shown above.
echo.
pause
