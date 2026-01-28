// Custom hook per il fetch della lista di stagioni F1
// Utilizza React Query con caching di 5 minuti

import { useQuery } from "@tanstack/react-query";
import { fetchSeasons } from "@/service/seasonService";
import type { Season } from "@/types/season";

// Hook che recupera tutte le stagioni F1 con caching
export function useSeasons() {
  return useQuery<Season[], Error>({
    queryKey: ["seasons"],
    queryFn: async () => fetchSeasons(),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}

// Hook per recuperare una singola stagione per ID
// Cerca nel list di tutte le stagioni
export function useSeason(seasonId: string) {
  return useQuery<Season, Error>({
    queryKey: ["seasons", seasonId],
    queryFn: async () => {
      const seasons = await fetchSeasons();
      const season = seasons.find((s) => s.championshipId === seasonId);
      if (!season) throw new Error("Stagione non trovata");
      return season;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}
