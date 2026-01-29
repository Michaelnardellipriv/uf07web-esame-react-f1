// Interfaccia che rappresenta una stagione F1 (championship)
import type { Season } from "@/types/season";

// Interfaccia per la risposta dell'API delle stagioni
interface SeasonsResponse {
  api: string;
  championships: Season[];
  limit: number;
  offset: number;
  total: number;
}

// Recupera tutte le stagioni F1
// Il ciclo è fatto nel route.ts per evitare rate limit
export async function fetchSeasons(): Promise<Season[]> {
  try {
    const res = await fetch('/api/seasons');

    if (!res.ok) {
      throw new Error('Errore nel caricamento delle stagioni');
    }

    const data = await res.json();
    return data.championships || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
