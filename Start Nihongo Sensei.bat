@echo off
chcp 65001 >nul
title Nihongo Sensei - http://localhost:8787
cd /d "%~dp0"

rem Build once if the production files are missing
if not exist "client\dist\index.html" (
  echo [Nihongo Sensei] Dang build ban web lan dau...
  call npm run build || goto :error
)
if not exist "server\dist\index.js" (
  call npm run build -w server || goto :error
)

rem If the server is already running, just open the browser
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 http://localhost:8787/api/health; exit 0 } catch { exit 1 }"
if %errorlevel%==0 (
  echo [Nihongo Sensei] May chu da chay san. Dang mo trinh duyet...
  start "" http://localhost:8787
  exit /b 0
)

echo [Nihongo Sensei] Dang khoi dong may chu tai http://localhost:8787
echo [Nihongo Sensei] Dong cua so nay de tat may chu.
start "" /b cmd /c "timeout /t 2 >nul & start "" http://localhost:8787"
node server\dist\index.js
exit /b 0

:error
echo [Nihongo Sensei] Co loi khi build. Hay chay "npm install" roi thu lai.
pause
exit /b 1
