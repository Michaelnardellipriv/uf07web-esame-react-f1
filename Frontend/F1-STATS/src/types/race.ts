/**
 * Type definition per la gara F1
 * Contiene tutte le informazioni relative ad una gara della Formula 1
 */

import type { Circuit } from "@/types/circuit";
import type { Driver } from "@/types/driver";
import type { Team } from "@/types/team";

/**
 * Interfaccia che rappresenta una gara di Formula 1 con tutte le relative statistiche
 */
export interface RaceStats {
  // Identificatore univoco della gara
  raceId: string;
  // ID della stagione/campionato a cui appartiene la gara
  championshipId: string;
  // Nome della gara (es: "Australian Grand Prix")
  raceName: string;
  // Numero del round della stagione
  round: number;
  // URL della pagina Wikipedia della gara
  url: string;
  // Numero di giri completati nella gara
  laps: number;
  
  // Calendario completo della gara con tutti gli orari degli eventi
  schedule: {
    // Data e ora della gara principale
    race: { date: string; time: string; };
    // Data e ora delle qualifiche
    qualy: { date: string; time: string; };
    // Data e ora delle prove libere 1
    fp1: { date: string; time: string; };
    // Data e ora delle prove libere 2
    fp2: { date: string; time: string; };
    // Data e ora delle prove libere 3
    fp3: { date: string; time: string; };
    // Data e ora delle qualifiche sprint (se presenti, altrimenti null)
    sprintQualy: { date: string | null; time: string | null; };
    // Data e ora della gara sprint (se presente, altrimenti null)
    sprintRace: { date: string | null; time: string | null; };
  };
  
  // Informazioni sul giro più veloce
  fast_lap: {
    // Tempo del giro più veloce
    fast_lap: string;
    // ID del pilota che ha fatto il giro più veloce
    fast_lap_driver_id: string;
    // ID del team del pilota che ha fatto il giro più veloce
    fast_lap_team_id: string;
  };
  
  // Circuito dove si è disputata la gara
  circuit: Circuit;
  
  // Pilota vincitore della gara
  winner: Driver;  
  // Team vincitore della gara (quello del pilota vincitore)
  teamWinner: Team; 
}