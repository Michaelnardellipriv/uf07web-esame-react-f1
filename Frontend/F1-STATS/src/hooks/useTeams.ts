/**
 * Custom hook per il fetch della lista di team F1
 * Utilizza React Query con caching di 5 minuti per ottimizzare le prestazioni
 * Fornisce sia il fetch di tutti i team che di uno specifico
 */

import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../service/teamService";
import type { Team } from "../types/team";

/**
 * Hook che recupera tutti i team F1 con caching automatico
 * I dati vengono cachati per 5 minuti prima di essere richiesti di nuovo
 * 
 * @returns Oggetto useQuery con lo stato di caricamento e i dati dei team
 */
export function useTeams() {
  return useQuery<Team[], Error>({
    queryKey: ["teams"],
    queryFn: async () => fetchTeams(),
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}

/**
 * Hook per recuperare un singolo team per ID
 * Cerca nel lista di tutti i team e ritorna solo quello richiesto
 * 
 * @param teamId - ID univoco del team da cercare
 * @returns Oggetto useQuery con lo stato di caricamento e il team trovato
 * @throws Errore se il team non viene trovato
 */
export function useTeam(teamId: string) {
  return useQuery<Team, Error>({
    queryKey: ["teams", teamId],
    queryFn: async () => {
      // Fetch tutti i team
      const teams = await fetchTeams();
      // Cerca il team per ID
      const team = teams.find((t) => t.teamId === teamId);
      if (!team) throw new Error("Team non trovato");
      return team;
    },
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}
