import type { RaceStats } from "../types/race";

interface RacesResponse {
  races: RaceStats[];
  total: number;
  yearsLoaded: number;
}

/**
 * Recupera tutte le gare disponibili
 */
export async function fetchRaces(): Promise<Array<{ year: string; races: RaceStats[] }>> {
  try {
    console.log('Richiesta tutte le gare...');
    
    const res = await fetch('/api/races', {
      headers: { 'Accept': 'application/json' },
    });
    
    if (!res.ok) {
      console.log(`Errore API: ${res.status}`);
      return [];
    }
    
    const data: RacesResponse = await res.json();
    
    if (!data.races || data.races.length === 0) {
      console.log('Nessuna gara trovata');
      return [];
    }

    console.log(`Ricevute ${data.races.length} gare dall'API`);
    
    // Organizza le gare per anno
    const racesByYear = new Map<string, RaceStats[]>();
    
    data.races.forEach((race: any) => {
      // Estrai l'anno dalla data della gara
      const year = new Date(race.schedule.race.date).getFullYear().toString();
      
      if (!racesByYear.has(year)) {
        racesByYear.set(year, []);
      }
      
      racesByYear.get(year)!.push({
        ...race,
        season: year
      });
    });
    
    // Converti in array ordinato per anno (dal più recente)
    const result = Array.from(racesByYear.entries())
      .map(([year, races]) => ({ year, races }))
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));
    
    console.log(`Totale: ${result.length} anni con ${data.races.length} gare`);
    return result;
    
  } catch (error) {
    console.error('Errore nel fetch delle gare:', error);
    return [];
  }
}