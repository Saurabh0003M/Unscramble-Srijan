@echo off
setlocal enabledelayedexpansion
title Unscramble-Srijan AI LegalTech Platform

cd /d "%~dp0"

echo ============================================================
echo   Starting Unscramble-Srijan...
echo ============================================================

:: --- Prerequisites: Python 3.11+ and Node 20+ on PATH -------------------
where python >nul 2>&1 || goto :nopython
where npm    >nul 2>&1 || goto :nonode

:: --- Free ports 8000, 8001, 5000, and 5173 ------------------------------
echo [1/4] Checking and freeing required ports (8000, 8001, 5000, 5173)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8001" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1

:: --- Caseflow AI (Port 8001) --------------------------------------------
echo [2/4] Starting Caseflow AI on port 8001...
pushd caseflow-ai
if not exist "venv\Scripts\python.exe" (
    python -m venv venv
)
set "CASEFLOW_PY=venv\Scripts\python.exe"
"!CASEFLOW_PY!" -m pip install -q --disable-pip-version-check -r requirements.txt
start "Caseflow AI" /min cmd /c ""!CASEFLOW_PY!" -m uvicorn app.main:app --port 8001 --host 0.0.0.0"
popd

:: --- Contract AI (Port 8000) --------------------------------------------
echo [3/4] Starting Contract AI on port 8000...
pushd contract-ai
if not exist "venv\Scripts\python.exe" (
    python -m venv venv
)
set "CONTRACT_PY=venv\Scripts\python.exe"
"!CONTRACT_PY!" -m pip install -q --disable-pip-version-check -r requirements.txt
start "Contract AI" /min cmd /c ""!CONTRACT_PY!" -m uvicorn main:app --port 8000 --host 0.0.0.0"
popd

:: --- Scheduler API (Port 5000) ------------------------------------------
echo [4/4] Starting Scheduler API and Frontend...
pushd scheduler-api
if not exist "node_modules" call npm install >nul 2>&1
start "Scheduler API" /min cmd /c "npm start"
popd

:: --- Frontend (Port 5173) -----------------------------------------------
pushd frontend
if not exist "node_modules" call npm install >nul 2>&1
start "Frontend Dashboard" /min cmd /c "npm run dev -- --port 5173"
popd

:: --- Wait for servers to initialize -------------------------------------
echo Waiting for servers to initialize (10s)...
timeout /t 10 /nobreak >nul

echo.
echo Launching browser at http://localhost:5173 ...
start "" http://localhost:5173

cls
echo ============================================================
echo   Unscramble-Srijan is RUNNING!
echo ============================================================
echo   - Frontend UI:   http://localhost:5173
echo   - Contract AI:   http://localhost:8000
echo   - Caseflow AI:   http://localhost:8001
echo   - Scheduler API: http://localhost:5000
echo ============================================================
echo.
echo   [!] Keep this window OPEN while using the application.
echo   Press any key to STOP all servers and exit...
echo ============================================================
pause >nul

echo.
echo Shutting down Unscramble-Srijan servers...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8001" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
echo Done. All servers stopped.
timeout /t 1 /nobreak >nul
exit /b 0

:nopython
echo.
echo [ERROR] Python was not found on PATH.
pause >nul
exit /b 1

:nonode
echo.
echo [ERROR] Node.js / npm was not found on PATH.
pause >nul
exit /b 1
