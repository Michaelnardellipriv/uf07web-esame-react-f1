'use client';

import styles from './SeasonCard.module.css';
import { Season } from '@/types/season'; 


export default function SeasonCard({

  championshipName,
  year,
  url
}: Season) {
 
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.year}>{year}</h3>
      </div>
   

      <div className={styles.details}>
        <ul className={styles.statsList}>
          <li className={styles.statsItem}>
            <span className={styles.label}>Campionato</span>
            <span className={styles.value}>{championshipName}</span>
          </li>
        </ul>
      </div>
      
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.wikiButton}>
        Più info
      </a>
    </div>
  );
}
