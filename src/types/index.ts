// Definizioni TypeScript avanzate
// Contiene Generics, Union Types, Intersection Types per il progetto

// Import dei tipi specifici dalle singole entità
import type { Driver } from './driver';
import type { Team } from './team';
import type { Season } from './season';
import type { RaceStats } from './race';
import type { Circuit } from './circuit';

// ===== TYPE ALIASES =====
// ID univoco per un'entitàa
export type EntityId = string;

// Timestamp ISO 8601
export type ISODate = string;

// Status di una richiesta asincrona
export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

// ===== GENERIC API RESPONSE =====
 /**Generic Response Type per tutte le API
 * @template T - Tipo dei dati nella risposta
 */
export type ApiResponse<T> = {
  data: T;
  error?: string | null;
  status: 'success' | 'error';
  timestamp: number;
};

/**
 * Generic Paginated Response
 * @template T - Tipo di ogni elemento
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
 */
export type F1Entity = Driver | Team | Season | RaceStats | Circuit;

/**
 * Union type per i tipi di dettaglio disponibili
 */
export type DetailPageType = 'driver' | 'team' | 'season' | 'race' | 'circuit';

// ====== INTERSECTION TYPES ======
/**
 * Entità F1 con metadati
 */
export type F1EntityWithMetadata = F1Entity & {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: string;
};

/**
 * Driver con statistiche aggiuntive
 */
export type DriverWithStats = Driver & {
  totalRaces: number;
  wins: number;
  podiums: number;
  pointsTotal: number;
};

/**
 * Team con statistiche aggiuntive
 */
export type TeamWithStats = Team & {
  totalRaces: number;
  constructorWins: number;
  driverWins: number;
};

// ====== QUERY STATE TYPES ======
/**
 * Generic Query State per React Query
 * @template T - Tipo dei dati
 */
export type QueryState<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * Mutation State generico
 * @template T - Tipo dei dati di ritorno
 * @template V - Tipo delle variabili
 */
export type MutationState<T, V = unknown> = QueryState<T> & {
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
