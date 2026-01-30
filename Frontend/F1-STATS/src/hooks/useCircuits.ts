/**
 * Custom hook per il fetch della lista di circuiti F1
 * Utilizza React Query con caching di 5 minuti per ottimizzare le prestazioni
 * Fornisce sia il fetch di tutti i circuiti che di uno specifico
 */

import { useQuery } from "@tanstack/react-query";
import { fetchCircuits } from "../service/circuitService";
import type { Circuit } from "../types/circuit";

/**
 * Hook che recupera tutti i circuiti F1 con caching automatico
 * I dati vengono cachati per 5 minuti prima di essere richiesti di nuovo
 * 
 * @returns Oggetto useQuery con lo stato di caricamento e i dati dei circuiti
 */
export function useCircuits() {
  return useQuery<Circuit[], Error>({
    queryKey: ["circuits"],
    queryFn: async () => fetchCircuits(),
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}

/**
 * Hook per recuperare un singolo circuito per ID
 * Cerca nel lista di tutti i circuiti e ritorna solo quello richiesto
 * 
 * @param circuitId - ID univoco del circuito da cercare
 * @returns Oggetto useQuery con lo stato di caricamento e il circuito trovato
 * @throws Errore se il circuito non viene trovato
 */
export function useCircuit(circuitId: string) {
  return useQuery<Circuit, Error>({
    queryKey: ["circuits", circuitId],
    queryFn: async () => {
      // Fetch tutti i circuiti
      const circuits = await fetchCircuits();
      // Cerca il circuito per ID
      const circuit = circuits.find((c) => c.circuitId === circuitId);
      if (!circuit) throw new Error("Circuito non trovato");
      return circuit;
    },
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}
