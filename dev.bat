@echo off
chcp 65001 >nul

REM Cartella dove si trova questo script
set SCRIPT_DIR=%~dp0

REM Controlla backend
if not exist "%SCRIPT_DIR%Backend" (
    echo Errore: Cartella Backend non trovata
    pause
    exit /b 1
)

REM Controlla frontend
if not exist "%SCRIPT_DIR%Frontend\F1-STATS" (
    echo Errore: Cartella Frontend\F1-STATS non trovata
    pause
    exit /b 1
)

REM Avvia concurrently usando percorsi assoluti
npx concurrently --kill-others-on-fail --names "Backend,Frontend" --prefix "[{name}]" --prefix-colors "blue,green" ^
    "cd /d \"%SCRIPT_DIR%Backend\" && npm run dev" ^
    "cd /d \"%SCRIPT_DIR%Frontend\F1-STATS\" && npm run dev"
