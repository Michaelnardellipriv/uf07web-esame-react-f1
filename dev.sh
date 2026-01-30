#!/bin/bash

# Script per avviare Backend (Next.js) e Frontend (React+Vite) in parallelo
# Utilizzo: ./dev.sh
# Platform: Linux / macOS

echo ""
echo "======================================"
echo " F1 STATS - Avvio in parallelo"
echo "======================================"
echo ""

# Colori per output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Controlla se siamo nella root del progetto
if [ ! -d "Backend" ] || [ ! -d "Frontend/F1-STATS" ]; then
    echo -e "$} Errore: Esegui questo script dalla root del progetto${NC}"
    echo ""
    echo "Struttura attesa:"
    echo "  ├── Backend/ (Backend Next.js)"
    echo "  ├── Frontend/F1-STATS/ (Frontend Vite)"
    echo "  └── dev.sh (questo file)"
    exit 1
fi

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "$ Node.js non trovato. Installa Node.js 18+${NC}"
    exit 1
fi

# Installa concurrently se non presente (nella root)
if ! npm list concurrently &> /dev/null 2>&1; then
    echo -e "$ Installando concurrently nella root...${NC}"
    npm install concurrently --save-dev
    if [ $? -ne 0 ]; then
        echo -e "$ Errore durante l'installazione di concurrently${NC}"
        exit 1
    fi
fi

echo -e "$ Backend (Next.js) partirà su: http://localhost:3000$"
echo -e "$ Frontend (Vite) partirà su: http://localhost:5173$}"
echo ""
echo -e "$ Aspetta che i server siano pronti...$"
echo -e "$ Ctrl+C per fermare entrambi i server$"
echo ""

# Avvia backend e frontend in parallelo
npx concurrently \
    --kill-others-on-fail \
    --names "Backend,Frontend" \
    --prefix "[{name}]" \
    --prefix-colors "blue,green" \
    "cd Backend && npm run dev" \
    "cd Frontend/F1-STATS && npm run dev"
