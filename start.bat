@echo off
echo ====================================
echo  HAVICO Du Hoc - Khoi dong website
echo ====================================
echo.
echo Backend  : http://localhost:5020
echo Frontend : http://localhost:5021
echo Admin    : http://localhost:5021/admin  (mat khau: admin123)
echo.

:: Auto-install if node_modules missing
if not exist "%~dp0backend\node_modules" (
  echo [Auto] Cai dat backend dependencies...
  cd /d "%~dp0backend" && call npm install
)
if not exist "%~dp0frontend\node_modules" (
  echo [Auto] Cai dat frontend dependencies...
  cd /d "%~dp0frontend" && call npm install
)

echo Khoi dong backend...
start "HAVICO Backend :5020" cmd /k "cd /d "%~dp0backend" && node server.js"
timeout /t 2 /nobreak >nul

echo Khoi dong frontend...
start "HAVICO Frontend :5021" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo Website dang chay! Mo trinh duyet...
start http://localhost:5021
