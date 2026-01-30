
/**
 * Componente card per visualizzare i dettagli di un pilota F1
 * Mostra informazioni come numero, nazionalità e data di nascita
 */

import styles from './DriverCard.module.css';
import { formatValue, formatDate } from '../../service/utils';

import type { Driver } from '../..//types/driver';

/**
 * Componente card per un pilota F1
 * 
 * @param props - Proprietà del pilota da visualizzare
 * @returns Card con informazioni dettagliate del pilota
 */
export default function DriverCard({
  driverId,
  name,
  surname,
  number,
  nationality,
  birthday,
  shortName
}: Driver) {
  // Genera URL Wikipedia per il pilota
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${name}_${surname}`;

  return (
    <div className={styles.card}>
      {/* Header con nome e numero di gara del pilota */}
      <div className={styles.header}>
        <h3 className={styles.name}>{name} {surname}</h3>
        <span className={styles.number}>#{number}</span>
      </div>
    

      {/* Lista di statistiche e dettagli del pilota */}
      <div className={styles.details}>
        <ul className={styles.statsList}>
          <li className={styles.statsItem}>
            <span className={styles.label}>Codice</span>
            <span className={styles.value}>{formatValue(shortName)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Nazionalità</span>
            <span className={styles.value}>{formatValue(nationality)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Data Nascita</span>
            <span className={styles.value}>{formatDate(birthday)}</span>
          </li>
        </ul>
      </div>
      
      {/* Link esterno per più informazioni su Wikipedia */}
      <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className={styles.wikiButton}>
        Più info
      </a>
    </div>
  );
}
