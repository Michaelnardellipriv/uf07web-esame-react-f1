// Custom hook per il fetch della lista di circuiti F1
// Utilizza React Query con caching di 5 minuti

import { useQuery } from "@tanstack/react-query";
import { fetchCircuits } from "@/service/circuitService";
import type { Circuit } from "@/types/circuit";

// Hook che recupera tutti i circuiti F1 con caching
export function useCircuits() {
  return useQuery<Circuit[], Error>({
    queryKey: ["circuits"],
    queryFn: async () => fetchCircuits(),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}

// Hook per recuperare un singolo circuito per ID
// Cerca nel list di tutti i circuiti
export function useCircuit(circuitId: string) {
  return useQuery<Circuit, Error>({
    queryKey: ["circuits", circuitId],
    queryFn: async () => {
      const circuits = await fetchCircuits();
      const circuit = circuits.find((c) => c.circuitId === circuitId);
      if (!circuit) throw new Error("Circuito non trovato");
      return circuit;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}
