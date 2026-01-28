// Custom hook per il fetch della lista di team F1
// Utilizza React Query con caching di 5 minuti

import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "@/service/teamService";
import type { Team } from "@/types/team";

// Hook che recupera tutti i team F1 con caching
export function useTeams() {
  return useQuery<Team[], Error>({
    queryKey: ["teams"],
    queryFn: async () => fetchTeams(),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}

// Hook per recuperare un singolo team per ID
// Cerca nel list di tutti i team
export function useTeam(teamId: string) {
  return useQuery<Team, Error>({
    queryKey: ["teams", teamId],
    queryFn: async () => {
      const teams = await fetchTeams();
      const team = teams.find((t) => t.teamId === teamId);
      if (!team) throw new Error("Team non trovato");
      return team;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}
