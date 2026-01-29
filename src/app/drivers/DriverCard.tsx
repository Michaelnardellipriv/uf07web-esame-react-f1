'use client';

import styles from './DriverCard.module.css';
import { formatValue, formatDate } from '@/service/utils';
import Link from 'next/link';
import type { Driver } from '@/types/driver';

export default function DriverCard({
  driverId,
  name,
  surname,
  number,
  nationality,
  birthday,
  shortName
}: Driver) {
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${name}_${surname}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name} {surname}</h3>
        <span className={styles.number}>#{number}</span>
      </div>
    

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
      
      <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className={styles.wikiButton}>
        Più info
      </a>
    </div>
  );
}
