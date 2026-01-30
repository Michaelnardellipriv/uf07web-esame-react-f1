# Formula 1 Dashboard – React + TypeScript

## Descrizione del progetto

Questa applicazione è una **Single Page Application (SPA)** moderna sviluppata con **Next.js 16**, **React 19** e **TypeScript** che consente di esplorare e visualizzare dati completi relativi al mondo della Formula 1, inclusi stagioni, gare, piloti, team e circuiti.

Il progetto è stato realizzato come prova d'esame **UF07WEB (A.S. 2025/26)** e dimostra l'implementazione di:

- Consumo di API REST esterne con gestione avanzata della cache
- Routing dinamico con Next.js App Router
- State management asincrono con React Query
- TypeScript con tipi complessi (generici, union types, intersection types)
- Architettura a strati (API routes → services → hooks → components)
- Error handling e loading states per UX ottimale

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

| Tecnologia    | Versione  | Utilizzo                          |
| ------------- | --------- | --------------------------------- |
| **React**     | 19.2.3    | Framework UI                      |
| **Next.js**   | 16.1.5    | Server e routing (App Router)     |
| **TypeScript**| 5.x       | Type safety completa              |
| **React Query** | 5.90.20 | Data fetching e caching           |
| **CSS Modules** | Built-in | Styling scoped                   |
| **Fetch API** | Native    | HTTP requests                     |

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
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (Backend)
│   │   ├── circuits/route.ts # GET /api/circuits
│   │   ├── drivers/route.ts  # GET /api/drivers
│   │   ├── races/route.ts    # GET /api/races
│   │   ├── seasons/route.ts  # GET /api/seasons
│   │   └── teams/route.ts    # GET /api/teams
│   ├── circuits/             # Pagina circuiti
│   ├── drivers/              # Pagina piloti
│   ├── races/                # Pagina gare
│   ├── seasons/              # Pagina stagioni
│   ├── teams/                # Pagina team
│   ├── layout.tsx            # Layout root (con QueryProvider)
│   ├── page.tsx              # Home page
│   └── globals.css           # Stili globali
│
├── components/               # Componenti riutilizzabili
│   ├── Navbar.tsx            # Barra di navigazione
│   ├── QueryProvider.tsx     # Provider React Query (client-side)
│   ├── Skeleton.tsx          # Skeleton loader
│   ├── ErrorBoundary.tsx     # Error catching
│   ├── CircuitCard.tsx       # Card per circuiti
│   ├── DriverCard.tsx        # Card per piloti
│   ├── RaceCard.tsx          # Card per gare (complessa)
│   ├── SeasonCard.tsx        # Card per stagioni
│   └── TeamCard.tsx          # Card per team
│
├── hooks/                    # Custom React Hooks
│   ├── useCircuits.ts        # Hook per circuiti
│   ├── useDrivers.ts         # Hook per piloti
│   ├── useRaces.ts           # Hook per gare
│   ├── useSeasons.ts         # Hook per stagioni
│   └── useTeams.ts           # Hook per team
│
├── service/                  # Servizi API (Business Logic)
│   ├── circuitService.ts     # Logica circuiti
│   ├── driverService.ts      # Logica piloti
│   ├── raceService.ts        # Logica gare
│   ├── seasonService.ts      # Logica stagioni
│   ├── teamService.ts        # Logica team
│   └── utils.ts              # Utility functions (format, helpers)
│
└── types/                    # Type definitions TypeScript
    ├── circuit.ts            # Interface Circuit
    ├── driver.ts             # Interface Driver
    ├── race.ts               # Interface RaceStats
    ├── season.ts             # Interface Season
    ├── team.ts               # Interface Team
    └── index.ts              # Types globali e avanzati
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
npm install
```

### Step 3: Avviare il server di sviluppo

```bash
npm run dev
```

### Step 4: Aprire nel browser

```
http://localhost:3000
```

---

## Comandi disponibili

```bash
# Avviare in modalità sviluppo (hot reload)
npm run dev

# Build per produzione
npm run build

# Avviare versione prodotta
npm start

# Verifica TypeScript
npx tsc --noEmit

# Linting (se configurato)
npm run lint
```

---

## Funzionalità implementate

### Core Features (Requisiti minimi)

- **5 pagine principali**: Drivers, Teams, Seasons, Races, Circuits
- **Routing dinamico**: Navigate tra pagine via Navbar
- **Chiamate API GET**: Tutte le risorse fetch da API esterna
- **React Query**: Caching con staleTime 5 minuti, retry 3 volte
- **TypeScript**: Type safety completa su types, components, hooks
- **Error Handling**: Try/catch su API, Error Boundary su UI
- **Loading States**: Skeleton components durante fetch

### Advanced Features

- **Architettura a strati**: Services separati dalla logica di UI
- **Custom Hooks**: useCircuits, useDrivers, useRaces, useSeasons, useTeams
- **Type generici**: QueryState, ApiResponse, PaginatedResponse
- **Union types**: F1Entity per type narrowing
- **Intersection types**: EntityWithMetadata per composizione
- **Async/await**: Tutti i servizi async con proper error handling
- **Paginazione**: Offset-based per circuiti/piloti/team, year-based per gare
- **JSDoc Comments**: Documentazione inline su tutti i file

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
API esterna (f1connectapi.vercel.app)
    ↓
API Routes (/api/[entity])
    ↓
Services (circuitService, driverService, etc.)
    ↓
Custom Hooks (useCircuits, useDrivers, etc. + React Query)
    ↓
Components (Card components, Navbar, etc.)
    ↓
UI (Browser)
```

### React Query Configuration

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

**React Query** gestisce il caching intelligente:

- Dati in cache per 5 minuti
- Refetch automatico quando la finestra torna in focus
- Retry automatico (fino a 3 volte) su errori temporanei
- Mutation support per operazioni future (POST/PUT/DELETE)

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

### "No QueryClient set" error

**Causa**: QueryProvider non wrapping l'app  
**Soluzione**: Verificare che `src/app/layout.tsx` utilizzi `<QueryProvider>` wrapper

### API non raggiungibile

**Causa**: f1connectapi.vercel.app offline o rete assente  
**Soluzione**: Verificare connessione internet, controllare console per dettagli

### TypeScript errors

**Causa**: Type mismatch o missing imports  
**Soluzione**: Eseguire `npx tsc --noEmit` per vedere tutti gli errori

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
