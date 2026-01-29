'use client';

import styles from './TeamCard.module.css';
import { formatValue } from '@/service/utils';
import Link from 'next/link';

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

export default function TeamCard({
  teamId,
  teamName,
  teamNationality,
  firstAppeareance,
  constructorsChampionships,
  driversChampionships,
  url
}: TeamCardProps) {
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${teamName.replace(/\s+/g, '_')}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{teamName}</h3>
      </div>
   

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
      
      <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className={styles.wikiButton}>
        Più info
      </a>
    </div>
  );
}
