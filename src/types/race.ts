// types/race.ts
import type { Circuit } from "@/types/circuit";
import type { Driver } from "@/types/driver";
import type { Team } from "@/types/team";
export interface RaceStats {
  raceId: string;
  championshipId: string;
  raceName: string;
  round: number;
  url: string;
  laps: number;
  
  schedule: {
    race: { date: string; time: string; };
    qualy: { date: string; time: string; };
    fp1: { date: string; time: string; };
    fp2: { date: string; time: string; };
    fp3: { date: string; time: string; };
    sprintQualy: { date: string | null; time: string | null; };
    sprintRace: { date: string | null; time: string | null; };
  };
  
  fast_lap: {
    fast_lap: string;
    fast_lap_driver_id: string;
    fast_lap_team_id: string;
  };
  
  circuit: Circuit;
  
  
  winner: Driver;  
  teamWinner: Team; 
}