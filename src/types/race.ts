
import type { Circuit } from './circuit';

/**
 * Type definition per Race F1
 */
export interface RaceStats {
  round: string;
  date: string;
  time: string;
  raceId: string;
  raceName: string;
  circuit: Circuit;
}
