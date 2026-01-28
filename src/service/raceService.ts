// Interfaccia che rappresenta una gara F1 con tutte le informazioni
import type { RaceStats } from "@/types/race";

// Interfaccia per la risposta dell'API delle gare
interface RacesResponse {
  api: string;
  races: RaceStats;
  limit: number;
  offset: number;
  total: number;
}

// Recupera la lista delle gare F1 dall'API esterna
// Include informazioni del circuito per ogni gara
export async function fetchRaces(limit: number = 20): Promise<RaceStats[]> {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    // Fetch del mese corrente e dei mesi precedenti se necessario
    const allRaces: RaceStats[] = [];
    let currentYear = year;
    let currentMonth = parseInt(month);

    // Fetcha fino a ottenere almeno 'limit' gare
    while (allRaces.length < limit && currentYear >= 2024) {
      const monthStr = String(currentMonth).padStart(2, '0');
      
      try {
        const res = await fetch(
          `/api/races?year=${currentYear}&month=${monthStr}&limit=30`
        );
        
        if (res.ok) {
          const data: RacesResponse = await res.json();
          if (data.races) {
            allRaces.push(data.races);
          }
        }
      } catch (err) {
        // Continua con il mese precedente se questo fallisce
      }

      // Vai al mese precedente
      currentMonth--;
      if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
      }
    }

    return allRaces.slice(0, limit);
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
