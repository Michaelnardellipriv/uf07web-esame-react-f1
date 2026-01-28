/**
 * Formatta un valore, mostrando "Dato non disponibile" se vuoto
 */
export function formatValue(value: any): string {
  if (value === null || value === undefined || value === '') {
    return 'Dato non disponibile';
  }

  if (typeof value === 'string') {
    return value.trim() || 'Dato non disponibile';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return String(value) || 'Dato non disponibile';
}

/**
 * Controlla se un valore è vuoto
 */
export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '');
}

/**
 * Formatta una data nel formato italiano
 */
export function formatDate(dateString: string): string {
  if (isEmpty(dateString)) {
    return 'Dato non disponibile';
  }

  try {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return 'Dato non disponibile';
  }
}
