// Custom hook per il fetch della lista di gare F1
// Utilizza React Query con caching di 5 minuti

import { useQuery } from "@tanstack/react-query";
import { fetchRaces } from "../service/raceService";
import type { RaceStats } from "../types/race";

// Hook che recupera tutte le gare F1 con caching
// Supporta filtri opzionali per anno e mese
export function useRaces(year?: number, month?: number) {
  return useQuery<RaceStats[], Error>({
    queryKey: ["races", year, month],
    queryFn: async () => {
      const data = await fetchRaces();
      return data.flatMap((item) => item.races);
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}

// Hook per recuperare una singola gara per ID
// Cerca nel list di tutte le gare
export function useRace(raceId: string) {
  return useQuery<RaceStats, Error>({
    queryKey: ["races", raceId],
    queryFn: async () => {
      const data = await fetchRaces();
      const allRaces = data.flatMap((item) => item.races);
      const race = allRaces.find((r) => r.raceId === raceId);
      if (!race) throw new Error("Gara non trovata");
      return race;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}
