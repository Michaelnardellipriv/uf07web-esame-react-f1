
/**
 * Type definition per il team F1
 * Contiene tutte le informazioni relative ad una squadra della Formula 1
 */
export interface Team {
  // Identificatore univoco del team
  teamId: string;
  // Nome del team
  teamName: string;
  // Nazionalità del team (opzionale)
  teamNationality?: string;
  // Paese di origine del team (opzionale, alternativa a teamNationality)
  country?: string;
  // Anno della prima partecipazione del team (typo nel nome, opzionale)
  firstAppeareance?: number;
  // Anno della prima partecipazione del team (opzionale)
  firstAppearance?: number;
  // Numero di campionati costruttori vinti dal team
  constructorsChampionships: number;
  // Numero di campionati piloti vinti dai piloti del team
  driversChampionships: number;
  // URL della pagina Wikipedia del team (opzionale)
  url?: string;
}
