/**
 * Type definition per Circuit F1
 */
export interface Circuit {
  circuitId: string;
  circuitName: string;
  country: string;
  city: string;
  circuitLength: string | number;
  lapRecord: string;
  firstParticipationYear: number;
  numberOfCorners?: number;
  corners?: number;
  fastestLapDriverId?: string;
  fastestLapTeamId?: string;
  fastestLapYear?: number;
  url?: string;
}
