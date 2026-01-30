/**
 * Type definition per il circuito F1
 * Contiene tutte le informazioni relative ad un circuito della Formula 1
 */
export interface Circuit {
  // Identificatore univoco del circuito
  circuitId: string;
  // Nome del circuito (es: "Circuit of the Americas")
  circuitName: string;
  // Paese in cui si trova il circuito
  country: string;
  // Città in cui si trova il circuito
  city: string;
  // Lunghezza del circuito in metri
  circuitLength: string | number;
  // Record di giro per il circuito con il tempo
  lapRecord: string;
  // Anno della prima partecipazione di una gara F1 al circuito
  firstParticipationYear: number;
  // Numero di curve del circuito (opzionale)
  numberOfCorners?: number;
  // Numero di curve (alternativa al campo sopra, opzionale)
  corners?: number;
  // ID del pilota che ha fatto il giro più veloce (opzionale)
  fastestLapDriverId?: string;
  // ID del team che ha fatto il giro più veloce (opzionale)
  fastestLapTeamId?: string;
  // Anno in cui è stato stabilito il giro più veloce (opzionale)
  fastestLapYear?: number;
  // URL della pagina Wikipedia del circuito (opzionale)
  url?: string;
}
