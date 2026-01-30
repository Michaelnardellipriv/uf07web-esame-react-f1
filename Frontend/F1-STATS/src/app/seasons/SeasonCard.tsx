

/**
 * Componente card per visualizzare i dettagli di una stagione F1
 * Mostra anno e nome del campionato
 */

import styles from './SeasonCard.module.css';
import type { Season } from '../../types/season'; 

/**
 * Componente card per una stagione F1
 * 
 * @param props - Proprietà della stagione da visualizzare
 * @returns Card con informazioni della stagione
 */
export default function SeasonCard({

  championshipName,
  year,
  url
}: Season) {
 
  return (
    <div className={styles.card}>
      {/* Header con anno della stagione */}
      <div className={styles.header}>
        <h3 className={styles.year}>{year}</h3>
      </div>
   

      {/* Dettagli della stagione */}
      <div className={styles.details}>
        <ul className={styles.statsList}>
          <li className={styles.statsItem}>
            <span className={styles.label}>Campionato</span>
            <span className={styles.value}>{championshipName}</span>
          </li>
        </ul>
      </div>
      
      {/* Link esterno per più informazioni su Wikipedia */}
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.wikiButton}>
        Più info
      </a>
    </div>
  );
}
