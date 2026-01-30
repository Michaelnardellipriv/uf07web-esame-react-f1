/**
 * Custom hook per il fetch della lista di stagioni F1
 * Utilizza React Query con caching di 5 minuti per ottimizzare le prestazioni
 * Fornisce sia il fetch di tutte le stagioni che di una specifica
 */

import { useQuery } from "@tanstack/react-query";
import { fetchSeasons } from "@/service/seasonService";
import type { Season } from "@/types/season";

/**
 * Hook che recupera tutte le stagioni F1 con caching automatico
 * I dati vengono cachati per 5 minuti prima di essere richiesti di nuovo
 * 
 * @returns Oggetto useQuery con lo stato di caricamento e i dati delle stagioni
 */
export function useSeasons() {
  return useQuery<Season[], Error>({
    queryKey: ["seasons"],
    queryFn: async () => fetchSeasons(),
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}

/**
 * Hook per recuperare una singola stagione per ID
 * Cerca nel lista di tutte le stagioni e ritorna solo quella richiesta
 * 
 * @param seasonId - ID univoco della stagione da cercare
 * @returns Oggetto useQuery con lo stato di caricamento e la stagione trovata
 * @throws Errore se la stagione non viene trovata
 */
export function useSeason(seasonId: string) {
  return useQuery<Season, Error>({
    queryKey: ["seasons", seasonId],
    queryFn: async () => {
      // Fetch tutte le stagioni
      const seasons = await fetchSeasons();
      // Cerca la stagione per ID
      const season = seasons.find((s) => s.championshipId === seasonId);
      if (!season) throw new Error("Stagione non trovata");
      return season;
    },
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}
