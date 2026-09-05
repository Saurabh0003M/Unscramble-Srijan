Write-Host 'Starting Unscramble-Srijan Multi-Agent Legal Platform...' -ForegroundColor Green

# 1. Start Caseflow AI (Python)
Write-Host 'Starting Caseflow AI...' -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -Command "cd caseflow-ai; if (-Not (Test-Path venv)) { python -m venv venv }; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload"" -WindowStyle Normal

# 2. Start Contract AI (Python)
Write-Host 'Starting Contract AI...' -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -Command "cd contract-ai; if (-Not (Test-Path venv)) { python -m venv venv }; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn main:app --host 0.0.0.0 --port 8000 --reload"" -WindowStyle Normal

# 3. Start Scheduler API (Node.js)
Write-Host 'Starting Scheduler API...' -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -Command "cd scheduler-api; npm install; npm start"" -WindowStyle Normal

# 4. Start Frontend (React/Vite)
Write-Host 'Starting Frontend Dashboard...' -ForegroundColor Magenta
Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -Command "cd frontend; npm install; npm run dev"" -WindowStyle Normal

Write-Host 'All services launched in separate windows!' -ForegroundColor Green
