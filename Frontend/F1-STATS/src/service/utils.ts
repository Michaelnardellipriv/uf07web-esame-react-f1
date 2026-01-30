/**
 * Utility service per funzioni di formattazione e validazione
 * Fornisce helper per gestire valori null, date e stringhe
 */

/**
 * Formatta un valore generico, mostrando placeholder se il valore e vuoto
 * Gestisce stringhe, numeri e altri tipi di dato
 * 
 * @param value - Il valore da formattare
 * @returns Stringa formattata o messaggio di placeholder
 */
export function formatValue(value: any): string {
  // Controlla se il valore e null, undefined o stringa vuota
  if (value === null || value === undefined || value === '') {
    return 'Dato non disponibile';
  }

  // Se e una stringa, trimma e controlla se vuota
  if (typeof value === 'string') {
    return value.trim() || 'Dato non disponibile';
  }

  // Se e un numero, converti a stringa
  if (typeof value === 'number') {
    return String(value);
  }

  // Per qualsiasi altro tipo, converti a stringa
  return String(value) || 'Dato non disponibile';
}

/**
 * Controlla se un valore e considerato "vuoto"
 * Valuta null, undefined, stringhe vuote e stringhe con solo spazi
 * 
 * @param value - Il valore da controllare
 * @returns true se il valore e vuoto, false altrimenti
 */
export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '');
}

/**
 * Formatta una data ISO nel formato leggibile italiano
 * Gestisce errori di parsing con messaggio di fallback
 * 
 * @param dateString - Data in formato ISO (es: "2024-01-15")
 * @returns Data formattata in italiano o messaggio di placeholder
 */
export function formatDate(dateString: string): string {
  // Controlla se la data e vuota
  if (isEmpty(dateString)) {
    return 'Dato non disponibile';
  }

  try {
    // Parsa la data e formatta secondo locale italiano
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    // In caso di errore di parsing, ritorna placeholder
    return 'Dato non disponibile';
  }
}
