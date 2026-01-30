/**
 * Service per la gestione dei dati dei piloti F1
 * Fornisce funzioni per il fetch dei piloti dall'API
 */

import type { Driver } from "../types/driver";

/**
 * Interfaccia per la risposta dell'API dei piloti
 */
interface DriversResponse {
  api: string;
  drivers: Driver[];
  limit: number;
  offset: number;
  total: number;
}

/**
 * Recupera tutti i piloti F1 dall'API interna
 * Il ciclo di paginazione e gestito nel route.ts per evitare rate limit
 * 
 * @returns Promessa che risolve con un array di piloti
 * @throws Errore se il fetch fallisce
 */
export async function fetchDrivers(): Promise<Driver[]> {
  try {
    // Effettua richiesta all'endpoint API
    const res = await fetch('http://localhost:3000/api/drivers');

    // Verifica se la risposta e valida
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei piloti');
    }

    // Parsa la risposta JSON
    const data = await res.json();
    // Ritorna i piloti o array vuoto se null
    return data.drivers || [];
  } catch (error) {
    // Rilancia l'errore con messaggio appropriato
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
