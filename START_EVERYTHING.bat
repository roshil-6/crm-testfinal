@echo off
echo ========================================
echo   STARTING CRM APPLICATION
echo ========================================
echo.

REM Stop any existing Node processes
echo Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo Starting Backend Server on port 5002...
start "CRM Backend" cmd /k "cd /d %~dp0server && node index.js"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend on port 3000...
start "CRM Frontend" cmd /k "cd /d %~dp0client && npm start"

echo.
echo ========================================
echo   APPLICATION STARTED!
echo ========================================
echo.
echo Backend: http://localhost:5002
echo Frontend: http://localhost:3000
echo.
echo Wait 30-60 seconds for frontend to compile...
echo.
echo Login Credentials:
echo   Email: rojishahead@toniosenora.com
echo   Password: rojishasenoramain000
echo.
pause
