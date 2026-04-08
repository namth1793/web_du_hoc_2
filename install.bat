@echo off
echo ====================================
echo  HAVICO Du Hoc - Cai dat thu vien
echo ====================================
echo.
echo [1/2] Cai dat backend...
cd /d "%~dp0backend"
call npm install
echo.
echo [2/2] Cai dat frontend...
cd /d "%~dp0frontend"
call npm install
echo.
echo ====================================
echo  Cai dat hoan tat!
echo  Chay start.bat de khoi dong
echo ====================================
pause
