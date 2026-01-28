// Interfaccia che rappresenta un circuito F1 con informazioni complete
import type { Circuit } from "@/types/circuit";

// Interfaccia per la risposta dell'API dei circuiti
interface CircuitsResponse {
  api: string;
  circuits: Circuit[];
  limit: number;
  offset: number;
  total: number;
}

// Recupera la lista di tutti i circuiti F1 dall'API esterna
// Supporta paginazione tramite limit e offset
export async function fetchCircuits(limit: number = 50, offset: number = 0): Promise<Circuit[]> {
  try {
    const res = await fetch(`/api/circuits?limit=${limit}&offset=${offset}`);
    
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei circuiti');
    }

    const data: CircuitsResponse = await res.json();
    return data.circuits || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
