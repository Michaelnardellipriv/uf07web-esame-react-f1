# Formula 1 Dashboard – React + Vite + Next.js Backend

## Descrizione del progetto

Questa applicazione è una **Single Page Application (SPA)** moderna sviluppata con **React 19** (frontend Vite) e **Next.js 16** (backend API) che consente di esplorare e visualizzare dati completi relativi al mondo della Formula 1, inclusi stagioni, gare, piloti, team e circuiti.

Il progetto è stato realizzato come prova d'esame **UF07WEB (A.S. 2025/26)** e dimostra l'implementazione di:

- Architettura **separata Frontend/Backend**: React+Vite per la UI, Next.js per le API
- Consumo di API REST esterne con gestione avanzata della cache
- Routing dinamico con React Router
- State management asincrono con TanStack Query (ex React Query)
- TypeScript con tipi complessi (generici, union types, intersection types)
- Architettura a strati (Backend API → Services → Custom Hooks → Components)
- Error handling e loading states per UX ottimale
- CORS handling tra frontend e backend

---

## Obiettivi principali

- Consumare dati da un'API REST esterna (F1 Connect API)
- Implementare routing multi-pagina con Next.js App Router
- Gestire lo stato asincrono e il caching dei dati con React Query
- Applicare TypeScript per la type safety su tutto il progetto
- Creare componenti riutilizzabili e responsivi
- Implementare error boundaries e fallback UI
- Seguire best practices nell'organizzazione del codice

---

## Tecnologie e versioni

| Tecnologia           | Versione  | Utilizzo                          |
| -------------------- | --------- | --------------------------------- |
| **React**            | 19.2.3    | Framework UI (Frontend)           |
| **Vite**             | 5.4.x     | Build tool e dev server           |
| **React Router**     | 7.13.0    | Routing SPA (Frontend)            |
| **Next.js**          | 16.1.5    | Server e API routes (Backend)     |
| **TypeScript**       | 5.x       | Type safety completa              |
| **TanStack Query**   | 5.90.20   | Data fetching e caching           |
| **CSS Modules**      | Built-in  | Styling scoped                    |
| **Fetch API**        | Native    | HTTP requests                     |

---

## API esterna

L'applicazione utilizza la **F1 Connect API** (https://f1connectapi.vercel.app) che fornisce informazioni su:

| Risorsa      | Endpoint        | Descrizione                                      |
| ------------ | --------------- | ------------------------------------------------ |
| **Circuiti** | `/api/circuits` | Tutti i circuiti di F1 con dati di geolocalizzazione |
| **Piloti**   | `/api/drivers`  | Lista completa di piloti con biografie          |
| **Team**     | `/api/teams`    | Scuderie di Formula 1                            |
| **Stagioni** | `/api/seasons`  | Cronologia delle stagioni F1                     |
| **Gare**     | `/api/races`    | Dettagli delle gare per ogni stagione            |

**Caratteristiche:**

- Nessuna autenticazione richiesta (API pubblica)
- Nessuna API key necessaria
- Rate limiting: ~300ms tra le richieste
- Supporta paginazione tramite offset/limit
- Ottimizzato per queries su dati storici (1950-presente)

---

## Struttura del progetto

```
uf07web-esame-react-f1/
│
├── Frontend/F1-STATS/                # React + Vite (SPA)
│   ├── src/
│   │   ├── App.tsx                   # Root component con routing
│   │   ├── main.tsx                  # Entry point
│   │   │
│   │   ├── app/                      # Pagine (gestite da React Router)
│   │   │   ├── circuits/
│   │   │   ├── drivers/
│   │   │   ├── races/
│   │   │   ├── seasons/
│   │   │   ├── teams/
│   │   │   └── 404/not-found.tsx
│   │   │
│   │   ├── components/               # Componenti riutilizzabili
│   │   │   ├── Navbar.tsx            # Navigazione (React Router)
│   │   │   ├── Skeleton.tsx          # Loader skeleton
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── CircuitCard.tsx
│   │   │   ├── DriverCard.tsx
│   │   │   ├── RaceCard.tsx
│   │   │   ├── SeasonCard.tsx
│   │   │   └── TeamCard.tsx
│   │   │
│   │   ├── hooks/                    # Custom React Hooks
│   │   │   ├── useCircuits.ts
│   │   │   ├── useDrivers.ts
│   │   │   ├── useRaces.ts
│   │   │   ├── useSeasons.ts
│   │   │   └── useTeams.ts
│   │   │
│   │   ├── service/                  # Servizi API (chiama backend)
│   │   │   ├── circuitService.ts
│   │   │   ├── driverService.ts
│   │   │   ├── raceService.ts
│   │   │   ├── seasonService.ts
│   │   │   ├── teamService.ts
│   │   │   └── utils.ts
│   │   │
│   │   ├── types/                    # Type definitions TypeScript
│   │   │   ├── circuit.ts
│   │   │   ├── driver.ts
│   │   │   ├── race.ts
│   │   │   ├── season.ts
│   │   │   ├── team.ts
│   │   │   └── index.ts
│   │   │
│   │   └── .env.local                # VITE_API_URL=http://localhost:3000
│   │
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│   
├       |── src/                              # Next.js Backend (API routes)
│   └── app/
│       ├── api/                      # API Endpoints (con CORS)
│       │   ├── circuits/route.ts     # GET http://localhost:3000/api/circuits
│       │   ├── drivers/route.ts      # GET http://localhost:3000/api/drivers
│       │   ├── races/route.ts        # GET http://localhost:3000/api/races
│       │   ├── seasons/route.ts      # GET http://localhost:3000/api/seasons
│       │   └── teams/route.ts        # GET http://localhost:3000/api/teams
│       │
│       └── globals.css
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Installazione e avvio

### Prerequisiti

- Node.js 18+ e npm/yarn
- Git

### Step 1: Clonare il repository

```bash
git clone https://github.com/Michaelnardellipriv/uf07web-esame-react-f1.git
cd uf07web-esame-react-f1
```

### Step 2: Installare le dipendenze

```bash
# Installa dipendenze del backend (Next.js)
npm install

# Installa dipendenze del frontend (React+Vite)
cd Frontend/F1-STATS
npm install
cd ../..
```


### Step 3: Avviare l'applicazione
**Opzione A: Script shell automatico (CONSIGLIATO)**

Dalla root del progetto:

**Su Linux/macOS:**
```bash
chmod +x dev.sh
./dev.sh
```

**Su Windows:**
```cmd
dev.bat
```

Questo avvia automaticamente:
- Backend Next.js su `http://localhost:3000`
- Frontend Vite su `http://localhost:5173`

**Opzione B: Script npm**

```bash
npm run dev:all
```

**Opzione C: Manual (due terminali separati)**

Terminale 1 - Backend:
```bash
npm run dev
```

Terminale 2 - Frontend:
```bash
cd Frontend/F1-STATS
npm run dev
```

### Step 4: Aprire nel browser

```
http://localhost:5173
```

---

## Comandi disponibili

### Backend (Next.js)

```bash
# Avviare in modalità sviluppo (http://localhost:3000)
npm run dev

# Build per produzione
npm run build

# Avviare versione prodotta
npm start

# Verifica TypeScript
npx tsc --noEmit

# Linting
npm run lint
```

### Frontend (React+Vite)

```bash
cd Frontend/F1-STATS

# Avviare in modalità sviluppo (http://localhost:5173)
npm run dev

# Build per produzione
npm run build

# Preview della build
npm run preview

# Linting
npm run lint
```

## Funzionalità implementate

### Core Features (Requisiti minimi)

- **5 pagine principali**: Drivers, Teams, Seasons, Races, Circuits
- **Routing dinamico**: React Router con navigazione tramite Navbar
- **Chiamate API GET**: Tutte le risorse fetch da backend Next.js
- **TanStack Query**: Caching con staleTime 5 minuti, retry 3 volte
- **TypeScript**: Type safety completa su types, components, hooks
- **Error Handling**: Try/catch su API, Error Boundary su UI
- **Loading States**: Skeleton components durante fetch
- **Architettura Frontend/Backend**: Separazione completa tra UI e API

### Advanced Features

- **Architettura a strati**: Services separati dalla logica di UI
- **Custom Hooks**: useCircuits, useDrivers, useRaces, useSeasons, useTeams
- **Type generici**: QueryState, ApiResponse, PaginatedResponse
- **Union types**: F1Entity per type narrowing
- **Intersection types**: EntityWithMetadata per composizione
- **Async/await**: Tutti i servizi async con proper error handling
- **Paginazione**: Offset-based per circuiti/piloti/team, year-based per gare
- **JSDoc Comments**: Documentazione inline su tutti i file
- **CORS Handling**: Header CORS configurati nel backend
- **Variabili d'ambiente**: VITE_API_URL per configurazione frontend

### UX/UI Features

- **Navbar responsiva**: Navigazione semplice tra le pagine
- **Card components**: Visualizzazione elegante dei dati
- **Skeleton loaders**: Shimmer animation durante caricamento
- **Wikipedia links**: Link diretti ai profili Wikipedia
- **CSS Modules**: Stili scoped per evitare conflitti
- **Fallback UI**: Messaggi di errore user-friendly

---

## Architettura e pattern

### Data Flow

```
API F1 esterna (f1connectapi.vercel.app)
    ↓
Backend Next.js API Routes (/api/[entity])
    ├─ Paginazione automatica
    ├─ Delay per rate limiting
    ├─ Caching 1 ora
    └─ CORS headers
    ↓
Frontend React+Vite Services (circuitService, etc.)
    ↓
Custom Hooks (useCircuits, useDrivers, etc. + TanStack Query)
    ├─ Caching 5 minuti
    ├─ Retry automatico (3 volte)
    └─ Background refetch
    ↓
Components (Card components, Navbar, etc.)
    ↓
UI (Browser - localhost:5173)
```

### Separazione Frontend/Backend

```
FRONTEND (React + Vite)
├─ Porta: 5173
├─ Responsabilità:
│  ├─ Routing pagine
│  ├─ UI components
│  ├─ State management (TanStack Query)
│  └─ User interactions
└─ Comunica via HTTP fetch

         ↕ HTTP + CORS

BACKEND (Next.js)
├─ Porta: 3000
├─ Responsabilità:
│  ├─ API Endpoints (/api/*)
│  ├─ Paginazione dati
│  ├─ Rate limiting
│  ├─ Caching
│  └─ Aggregazione API esterna
└─ Espone endpoint REST
```

### TanStack Query Configuration

```typescript
- queryKey: array-based per cache granularity
- staleTime: 5 minuti (300,000 ms)
- retry: 3 tentativi su fallimento
- refetchOnWindowFocus: true (default)
```

### TypeScript Advanced Patterns

```typescript
// Generici con constraints
type QueryState<T> = { data: T; loading: boolean; error: string | null }

// Union types per type narrowing
type F1Entity = Circuit | Driver | Team | Season | RaceStats

// Intersection types per composizione
type EntityWithMetadata = F1Entity & { createdAt: Date }

// Record utility type per mapping
type EntityMap = Record<string, F1Entity>
```

---

## Error Handling

L'applicazione implementa error handling su più livelli:

### API Layer

- Try/catch blocks in API routes e services
- Proper HTTP status codes (200, 404, 500)
- Error messages loggati in console per debug

### React Layer

- Error Boundary component per catturare errori
- Fallback UI con messaggi utente
- React Query retry logic per network failures

### UX Layer

- Loading skeletons durante fetch
- Error messages displayed all'utente
- Graceful degradation

---

## Stato e caching

**TanStack Query** (nel frontend) gestisce il caching intelligente:

- Dati in cache per 5 minuti
- Refetch automatico quando la finestra torna in focus
- Retry automatico (fino a 3 volte) su errori temporanei
- Mutation support per operazioni future (POST/PUT/DELETE)

**Next.js** (nel backend) cachea le risposte dell'API esterna:

- Dati cacheati per 1 ora
- Paginazione automatica gestita server-side
- Rate limiting con delay (300ms tra batch)

---

## Styling

Il progetto utilizza **CSS Modules** per scoping locale dei stili:

- Nessun conflitto di naming globale
- Organizzazione 1:1 con componenti
- File: `[ComponentName].module.css`

---

## Aggiungere nuove funzionalità

### Aggiungere una nuova pagina

1. Creare cartella in `src/app/[entity]/`
2. Creare `page.tsx` e `page.module.css`
3. Aggiungere link in `Navbar.tsx`
4. (Opzionale) Creare hook in `src/hooks/`

### Aggiungere un nuovo service

1. Creare file in `src/service/[entity]Service.ts`
2. Implementare funzioni async `fetch[Entity]()`
3. Importare in hook custom

### Aggiungere nuovi tipi

1. Creare file in `src/types/[entity].ts`
2. Definire interfaces TypeScript
3. Esportare da `src/types/index.ts`

---

## Troubleshooting

### "Cannot find module" error nel frontend

**Causa**: Dipendenze non installate o VITE_API_URL non configurato  
**Soluzione**: 
```bash
cd Frontend/F1-STATS
npm install
# Crea .env.local con VITE_API_URL=http://localhost:3000
```

### CORS error "Access-Control-Allow-Origin"

**Causa**: Backend non stà su localhost:3000 o script dev:all non avviato correttamente  
**Soluzione**: 
```bash
# Assicurati che entrambi i server siano avviati
npm run dev:all
# Oppure manualmente in due terminali
```

### API non raggiungibile (errore 404)

**Causa**: Frontend chiama localhost:5173 al posto di localhost:3000  
**Soluzione**: Verifica che nel service layer usi `http://localhost:3000/api/*`

### Frontend mostra "Cannot GET /"

**Causa**: Apri localhost:3000 al posto di localhost:5173  
**Soluzione**: Usa `http://localhost:5173` per il frontend, `http://localhost:3000` solo per API debug

### TypeScript errors nel frontend

**Causa**: Type mismatch o missing imports  
**Soluzione**: 
```bash
cd Frontend/F1-STATS
npx tsc --noEmit
```

### Stale cache data

**Causa**: Dati cacheati non si aggiornano  
**Soluzione**: Ridurre `staleTime` in hooks o usare `refetchInterval`

---

## Requisiti esame UF07WEB

Questo progetto soddisfa i seguenti requisiti:

| Requisito                          | Status      | Note                                    |
| ---------------------------------- | ----------- | --------------------------------------- |
| Routing con React Router / Next.js | COMPLETATO  | App Router con 5 pagine                 |
| Consumo API REST                   | COMPLETATO  | F1 Connect API con 5 endpoint           |
| React Query / SWR                  | COMPLETATO  | React Query con caching configurato    |
| TypeScript completo                | COMPLETATO  | Type safety su tutto il progetto        |
| Architettura (services + hooks)    | COMPLETATO  | 3 strati: API → Services → Hooks → UI  |
| Error handling e loading states    | COMPLETATO  | Try/catch + Error Boundary + Skeleton   |
| JSDoc Comments                     | COMPLETATO  | Documentazione inline completa          |
| Componenti riutilizzabili          | COMPLETATO  | Card components, Navbar, Skeleton, etc. |
| CSS responsivo                     | COMPLETATO  | CSS Modules con mobile-first approach   |
| Advanced TypeScript                | COMPLETATO  | Generici, union types, intersection types |

---

## Autore

**Michael Nardelli**  
<Michael06.nardelli@gmail.com>  
A.S. 2025/26

---

## Licenza

Questo progetto è sviluppato per scopi educativi come prova d'esame UF07WEB.
