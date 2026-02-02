@echo off
cd /d "%~dp0server"
echo Starting Backend Server...
echo.
echo Server will run on: http://localhost:5001
echo.
echo Keep this window open!
echo.
node index.js
pause
