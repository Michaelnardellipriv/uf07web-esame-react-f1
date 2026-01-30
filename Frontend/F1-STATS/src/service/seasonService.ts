/**
 * Service per la gestione dei dati delle stagioni F1
 * Fornisce funzioni per il fetch delle stagioni dall'API
 */

import type { Season } from "../types/season";

/**
 * Interfaccia per la risposta dell'API delle stagioni
 */
interface SeasonsResponse {
  api: string;
  championships: Season[];
  limit: number;
  offset: number;
  total: number;
}

/**
 * Recupera tutte le stagioni F1 dall'API interna
 * Il ciclo di paginazione e gestito nel route.ts per evitare rate limit
 * 
 * @returns Promessa che risolve con un array di stagioni
 * @throws Errore se il fetch fallisce
 */
export async function fetchSeasons(): Promise<Season[]> {
  try {
    // Effettua richiesta all'endpoint API
    const res = await fetch('/api/seasons');

    // Verifica se la risposta e valida
    if (!res.ok) {
      throw new Error('Errore nel caricamento delle stagioni');
    }

    // Parsa la risposta JSON
    const data = await res.json();
    // Ritorna le stagioni o array vuoto se null
    return data.championships || [];
  } catch (error) {
    // Rilancia l'errore con messaggio appropriato
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
