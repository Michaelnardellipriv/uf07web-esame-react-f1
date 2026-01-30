/**
 * Definizioni TypeScript avanzate del progetto
 * Contiene Generic Types, Union Types, Intersection Types per il progetto F1
 * Fornisce una base solida per type-safety in tutta l'applicazione
 */

// Import dei tipi specifici dalle singole entità
import type { Driver } from './driver';
import type { Team } from './team';
import type { Season } from './season';
import type { RaceStats } from './race';
import type { Circuit } from './circuit';

// ===== TYPE ALIASES =====
/**
 * ID univoco per un'entita F1
 */
export type EntityId = string;

/**
 * Data nel formato ISO 8601 (es: "2024-01-15T10:30:00Z")
 */
export type ISODate = string;

/**
 * Status di una richiesta asincrona
 */
export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

// ===== GENERIC API RESPONSE =====
/**
 * Tipo generico di risposta per tutte le API
 * @template T - Tipo dei dati nella risposta
 */
export type ApiResponse<T> = {
  data: T;
  error?: string | null;
  status: 'success' | 'error';
  timestamp: number;
};

/**
 * Tipo generico di risposta con paginazione
 * @template T - Tipo di ogni elemento nella lista
 */
export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
}>;

// ====== UNION TYPES ======
/**
 * Union type per tutti gli entity F1
 * Rappresenta qualsiasi entita principale del dominio F1
 */
export type F1Entity = Driver | Team | Season | RaceStats | Circuit;

/**
 * Union type per i tipi di dettaglio disponibili
 * Usato per routing e rendering dinamico
 */
export type DetailPageType = 'driver' | 'team' | 'season' | 'race' | 'circuit';

// ====== INTERSECTION TYPES ======
/**
 * Entita F1 con metadati di sistema
 * Estende qualsiasi entita F1 con timestamp e ID di tracciamento
 */
export type F1EntityWithMetadata = F1Entity & {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: string;
};

/**
 * Driver con statistiche aggiuntive
 * Estende il driver base con dati statistici
 */
export type DriverWithStats = Driver & {
  totalRaces: number;
  wins: number;
  podiums: number;
  pointsTotal: number;
};

/**
 * Team con statistiche aggiuntive
 * Estende il team base con dati statistici
 */
export type TeamWithStats = Team & {
  totalRaces: number;
  constructorWins: number;
  driverWins: number;
};

// ====== QUERY STATE TYPES ======
/**
 * Tipo generico per lo stato di una query (fetch di dati)
 * @template T - Tipo dei dati fetched
 */
export type QueryState<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * Tipo generico per lo stato di una mutation (modifica di dati)
 * @template T - Tipo dei dati di ritorno
 * @template V - Tipo delle variabili di input
 */
export type MutationState<T, V = unknown> = QueryState<T> & {
  mutate: (variables: V) => Promise<T>;
  isSubmitting: boolean;
};

// ====== FILTERING & SORTING ======
/**
 * Tipo generico per le opzioni di filtro
 * @template T - Tipo dell'entita da filtrare
 */
export type FilterOptions<T> = Partial<Record<keyof T, string | number | boolean>>;

/**
 * Configurazione per l'ordinamento di dati
 */
export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

/**
 * Configurazione di una colonna in una tabella o lista
 * @template T - Tipo della colonna
 */
export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

// ====== UTILITY TYPES ======
/**
 * Deep Readonly - rende ricorsivamente tutti i campi readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Nullable - versione nullable di un tipo
 */
export type Nullable<T> = T | null;

/**
 * Optional - versione optional di un tipo
 */
export type Optional<T> = T | undefined;

/**
 * Tipo per una funzione asincrona
 */
export type AsyncFunction<T, Args extends any[] = []> = (...args: Args) => Promise<T>;

/**
 * Type guard helper - funzione che verifica il tipo
 */
export type TypeGuard<T> = (value: unknown) => value is T;

// ====== CALLBACK TYPES ======
/**
 * Tipo generico per un callback
 * @template T - Tipo del parametro del callback
 */
export type Callback<T = void> = (data?: T) => void;

/**
 * Handler per gli errori
 */
export type ErrorHandler = (error: Error) => void;

/**
 * Handler per il successo
 * @template T - Tipo dei dati di successo
 */
export type SuccessHandler<T = unknown> = (data: T) => void;
  mutate: (variables: V) => Promise<T>;
  isSubmitting: boolean;
};

// ====== FILTERING & SORTING ======
/**
 * Generic Filter Type
 * @template T - Tipo dell'entità da filtrare
 */
export type FilterOptions<T> = Partial<Record<keyof T, string | number | boolean>>;

/**
 * Generic Sort Configuration
 */
export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

/**
 * Table/List Configuration generico
 * @template T - Tipo della colonna
 */
export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

// ====== UTILITY TYPES ======
/**
 * Deep Readonly type
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Nullable version di un tipo
 */
export type Nullable<T> = T | null;

/**
 * Optional version di un tipo
 */
export type Optional<T> = T | undefined;

/**
 * Async function type
 */
export type AsyncFunction<T, Args extends any[] = []> = (...args: Args) => Promise<T>;

/**
 * Type guard helper
 */
export type TypeGuard<T> = (value: unknown) => value is T;

// ====== CALLBACK TYPES ======
/**
 * Generic callback type
 * @template T - Tipo del parametro
 */
export type Callback<T = void> = (data?: T) => void;

/**
 * Error handler type
 */
export type ErrorHandler = (error: Error) => void;

/**
 * Success handler type
 * @template T - Tipo dei dati di successo
 */
export type SuccessHandler<T = unknown> = (data: T) => void;
