/**
 * Service per la gestione dei dati dei team F1
 * Fornisce funzioni per il fetch dei team dall'API
 */

import type { Team } from "@/types/team";

/**
 * Interfaccia per la risposta dell'API dei team
 */
interface TeamsResponse {
  api: string;
  teams: Team[];
  limit: number;
  offset: number;
  total: number;
}

/**
 * Recupera tutti i team F1 dall'API interna
 * Il ciclo di paginazione e gestito nel route.ts per evitare rate limit
 * 
 * @returns Promessa che risolve con un array di team
 * @throws Errore se il fetch fallisce
 */
export async function fetchTeams(): Promise<Team[]> {
  try {
    // Effettua richiesta all'endpoint API
    const res = await fetch('/api/teams');

    // Verifica se la risposta e valida
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei team');
    }

    // Parsa la risposta JSON
    const data = await res.json();
    // Ritorna i team o array vuoto se null
    return data.teams || [];
  } catch (error) {
    // Rilancia l'errore con messaggio appropriato
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
