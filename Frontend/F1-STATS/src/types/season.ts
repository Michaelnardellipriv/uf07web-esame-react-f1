/**
 * Type definition per la stagione F1
 * Contiene tutte le informazioni relative ad una stagione/campionato della Formula 1
 */
export interface Season {
  // Identificatore univoco della stagione/campionato
  championshipId: string;
  // Nome completo della stagione/campionato (es: "2024 FIA Formula One World Championship")
  championshipName: string;
  // Anno della stagione
  year: number;
  // URL della pagina Wikipedia della stagione (opzionale)
  url?: string;
}
