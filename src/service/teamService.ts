import type { Team } from "@/types/team";

// Interfaccia per la risposta dell'API dei team
interface TeamsResponse {
  api: string;
  teams: Team[];
  limit: number;
  offset: number;
  total: number;
}

// Recupera la lista di tutti i team F1 (scuderie) dall'API esterna
// Supporta paginazione tramite limit e offset
export async function fetchTeams(limit: number = 50, offset: number = 0): Promise<Team[]> {
  try {
    const res = await fetch(`/api/teams?limit=${limit}&offset=${offset}`);
    
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei team');
    }

    const data: TeamsResponse = await res.json();
    return data.teams || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
