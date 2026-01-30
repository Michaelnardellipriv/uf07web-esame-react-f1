/**
 * Type definition per il pilota F1
 * Contiene tutte le informazioni anagrafiche relative ad un pilota della Formula 1
 */
export interface Driver {
  // Identificatore univoco del pilota
  driverId: string;
  // Nome del pilota
  name: string;
  // Cognome del pilota
  surname: string;
  // Numero di gara assegnato al pilota
  number: number;
  // Nazionalità del pilota (opzionale)
  nationality?: string;
  // Paese di origine del pilota (opzionale, alternativa a nationality)
  country?: string;
  // Data di nascita del pilota in formato ISO
  birthday: string;
  // Codice abbreviato del pilota (es: "VER" per Max Verstappen)
  shortName: string;
  // URL della pagina Wikipedia del pilota (opzionale)
  url?: string;
}
