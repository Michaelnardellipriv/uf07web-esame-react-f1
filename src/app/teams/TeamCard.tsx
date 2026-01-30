'use client';

/**
 * Componente card per visualizzare i dettagli di un team F1
 * Mostra informazioni come nazionalità, anno debutto, campionati costruttori e piloti
 */

import styles from './TeamCard.module.css';
import { formatValue } from '@/service/utils';
import Link from 'next/link';

/**
 * Interfaccia per le proprietà del componente TeamCard
 */
interface TeamCardProps {
  teamId: string;
  teamName: string;
  teamNationality?: string;
  country?: string;
  firstAppeareance?: number;
  firstAppearance?: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url?: string;
}

/**
 * Componente card per un team F1
 * 
 * @param props - Proprietà del team da visualizzare
 * @returns Card con informazioni dettagliate del team
 */
export default function TeamCard({
  teamId,
  teamName,
  teamNationality,
  firstAppeareance,
  constructorsChampionships,
  driversChampionships,
  url
}: TeamCardProps) {
  // Genera URL Wikipedia per il team
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${teamName.replace(/\s+/g, '_')}`;

  return (
    <div className={styles.card}>
      {/* Header con nome del team */}
      <div className={styles.header}>
        <h3 className={styles.name}>{teamName}</h3>
      </div>
   

      {/* Lista di statistiche e dettagli del team */}
      <div className={styles.details}>
        <ul className={styles.statsList}>
          <li className={styles.statsItem}>
            <span className={styles.label}>Nazione</span>
            <span className={styles.value}>{formatValue(teamNationality)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Debutto</span>
            <span className={styles.value}>{formatValue(firstAppeareance)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Costruttori Campioni</span>
            <span className={styles.value}>{formatValue(constructorsChampionships)}</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.label}>Piloti Campioni</span>
            <span className={styles.value}>{formatValue(driversChampionships)}</span>
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
