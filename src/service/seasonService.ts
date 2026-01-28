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

// Recupera la lista di tutte le stagioni F1 (championships) dall'API esterna
// Supporta paginazione tramite limit e offset
export async function fetchSeasons(limit: number = 50, offset: number = 0): Promise<Season[]> {
  try {
    const res = await fetch(`/api/seasons?limit=${limit}&offset=${offset}`);
    
    if (!res.ok) {
      throw new Error('Errore nel caricamento delle stagioni');
    }

    const data: SeasonsResponse = await res.json();
    return data.championships || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
