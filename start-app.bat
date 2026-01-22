@echo off
cd /d "%~dp0"
echo Starting CRM Application...
echo.

echo Starting Backend Server on port 5001...
start "CRM Backend Server" cmd /k "cd /d %~dp0server && npm start"

timeout /t 5 /nobreak >nul

echo Starting Frontend Client on port 3000...
start "CRM Frontend Client" cmd /k "cd /d %~dp0client && npm start"

echo.
echo Application is starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3000
echo.
echo Check the opened command windows for server status.
echo Press any key to exit this window (servers will continue running)...
pause >nul
