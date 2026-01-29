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
// Carica progressivamente i dati in cicli (30 elementi per volta)
export async function fetchCircuits(limit: number = 50, offset: number = 0): Promise<Circuit[]> {
  try {
    const allCircuits: Circuit[] = [];
    let currentOffset = offset;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(`/api/circuits?limit=${limit}&offset=${currentOffset}`);
      
      if (!res.ok) {
        throw new Error('Errore nel caricamento dei circuiti');
      }

      const data: CircuitsResponse = await res.json();
      const circuits = data.circuits || [];

      // Aggiunge i circuiti caricati
      allCircuits.push(...circuits);

      // Se ricevi meno elementi del limit, significa che hai raggiunto la fine
      if (circuits.length < limit) {
        hasMore = false;
      } else {
        currentOffset += limit;
      }
    }

    return allCircuits;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
