# Formula 1 Dashboard – React + TypeScript

## Descrizione del progetto

Questa applicazione è una Single Page Application (SPA) sviluppata in React e TypeScript che consente di esplorare dati relativi al mondo della Formula 1, come stagioni, gare, piloti, team e circuiti.

Il progetto è stato realizzato come prova d’esame UF07WEB (A.S. 2025/26) e ha l’obiettivo di dimostrare l’utilizzo di API esterne, routing client-side e gestione dello stato asincrono.

---

## Obiettivi

- Consumare dati da un’API REST esterna
- Gestire il routing tra più pagine
- Visualizzare liste e dettagli
- Utilizzare TypeScript per la tipizzazione dei dati
- Gestire chiamate API tramite React Query

---

## Tecnologie utilizzate

- React
- TypeScript
- Next.js (App Router)
- @tanstack/react-query
- Fetch API
- CSS

---

## API utilizzata

L’applicazione utilizza una API pubblica dedicata alla Formula 1, che fornisce informazioni su:

- stagioni
- gare
- piloti
- team
- circuiti

Le chiamate vengono effettuate tramite richieste HTTP di tipo GET e gestite con React Query.

Non sono necessarie credenziali o API key.

---

## Struttura del progetto

```txt
src/
 ├─ app/              # Routing (Next.js App Router)
 ├─ components/       # Componenti riutilizzabili
 ├─ hooks/            # Custom hooks per React Query
 ├─ service/          # Funzioni per le chiamate API
 ├─ types/            # Interfacce TypeScript
 └─ providers/
```

Provider globali (React Query)

## Installazione ed esecuzione

Clonare il repository:

git clone <https://github.com/username/nome-repo.git>
Installare le dipendenze:

npm install
Avviare il progetto in modalità sviluppo:

npm run dev
Aprire il browser all’indirizzo:

<http://localhost:3000>

## Funzionalità implementate

Visualizzazione di liste di dati (stagioni, piloti, team, gare)

Navigazione tra più pagine tramite routing

Pagine di dettaglio con parametri dinamici

Chiamate API GET gestite con React Query

Tipizzazione dei dati API con TypeScript

Componenti riutilizzabili

Gestione dello stato di caricamento

## Note finali

Il progetto rispetta i requisiti minimi richiesti per la sufficienza dell’esame UF07WEB ed è stato strutturato con particolare attenzione alla leggibilità del codice e alla separazione delle responsabilità.

Possibili miglioramenti futuri includono:

chiamate API di tipo POST

gestione avanzata degli errori

paginazione dei dati

miglioramenti UI/UX
