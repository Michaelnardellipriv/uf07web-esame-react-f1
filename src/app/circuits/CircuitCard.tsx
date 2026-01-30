'use client';

/**
 * Componente card per visualizzare i dettagli di un circuito F1
 * Mostra informazioni come città, paese, lunghezza, numero di curve e debutto storico
 */

import styles from './CircuitCard.module.css';
import { formatValue } from '@/service/utils';
import Link from 'next/link';
import type { Circuit } from '@/types/circuit';

/**
 * Componente card per un circuito F1
 * 
 * @param props - Proprietà del circuito da visualizzare
 * @returns Card con informazioni dettagliate del circuito
 */
export default function CircuitCard({
  
  circuitName,
  country,
  city,
  circuitLength,
  lapRecord,
  firstParticipationYear,
  numberOfCorners,
  url
 
}: Circuit) {
 
  return (
    <div className={styles.card}>
      {/* Header con nome del circuito */}
      <div className={styles.header}>
        <h3 className={styles.name}>{circuitName}</h3>
      </div>
    

      {/* Lista di statistiche e dettagli del circuito */}
      <div className={styles.details}>
        <ul className={styles.statsList}>
          <li className={styles.statsItem}>
            <span className={styles.label}>Città</span>
            <span className={styles.value}>{formatValue(city)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Paese</span>
            <span className={styles.value}>{formatValue(country)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Lunghezza</span>
            <span className={styles.value}>{formatValue(circuitLength)} m</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Curve</span>
            <span className={styles.value}>{formatValue(numberOfCorners)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Debutto</span>
            <span className={styles.value}>{formatValue(firstParticipationYear)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Miglior Giro</span>
            <span className={styles.value}>{formatValue(lapRecord)}</span>
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
