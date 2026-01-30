/**
 * Service per la gestione dei dati dei circuiti F1
 * Fornisce funzioni per il fetch dei circuiti dall'API
 */

import type { Circuit } from "@/types/circuit";

/**
 * Interfaccia per la risposta dell'API dei circuiti
 */
interface CircuitsResponse {
  circuits: Circuit[];
  batchCount: number;
}

/**
 * Recupera la lista di tutti i circuiti F1 dall'API interna
 * La route API gestisce il caricamento progressivo con paginazione
 * 
 * @returns Promessa che risolve con un array di circuiti
 * @throws Errore se il fetch fallisce
 */
export async function fetchCircuits(): Promise<Circuit[]> {
  try {
    // Effettua richiesta all'endpoint API
    const res = await fetch('/api/circuits');
    
    // Verifica se la risposta e valida
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei circuiti');
    }
    
    // Parsa la risposta JSON
    const data: CircuitsResponse = await res.json();
    // Ritorna i circuiti o array vuoto se null
    return data.circuits || [];
    
  } catch (error) {
    // Rilancia l'errore con messaggio appropriato
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}