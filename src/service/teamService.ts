import type { Team } from "@/types/team";

// Interfaccia per la risposta dell'API dei team
interface TeamsResponse {
  api: string;
  teams: Team[];
  limit: number;
  offset: number;
  total: number;
}

// Recupera tutti i team F1
// Il ciclo è fatto nel route.ts per evitare rate limit
export async function fetchTeams(): Promise<Team[]> {
  try {
    const res = await fetch('/api/teams');

    if (!res.ok) {
      throw new Error('Errore nel caricamento dei team');
    }

    const data = await res.json();
    return data.teams || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
