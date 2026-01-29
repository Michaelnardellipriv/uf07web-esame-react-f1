// Interfaccia che rappresenta un circuito F1 con informazioni complete
import type { Circuit } from "@/types/circuit";

// Interfaccia per la risposta dell'API dei circuiti
interface CircuitsResponse {
  circuits: Circuit[];
  batchCount: number;
}

// Recupera la lista di tutti i circuiti F1 dall'API
// La route API già gestisce il caricamento progressivo
export async function fetchCircuits(): Promise<Circuit[]> {
  try {
    const res = await fetch('/api/circuits');
    
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei circuiti');
    }
    
    const data: CircuitsResponse = await res.json();
    return data.circuits || [];
    
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}