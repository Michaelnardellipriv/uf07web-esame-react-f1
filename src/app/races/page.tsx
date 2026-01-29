'use client';
import { useRaces } from '@/hooks/useRaces';
import RaceCard from './RaceCard';
import Skeleton from '@/components/Skeleton';
import styles from './page.module.css';
import { useState } from 'react';
import type { RaceStats } from '@/types/race';

const ITEMS_PER_PAGE = 6;

export default function RacesPage() {
  const { data: allRaces = [], isLoading, error } = useRaces();
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);

  const displayedRaces = allRaces.slice(0, displayedCount);
  const hasMore = displayedCount < allRaces.length;

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gare F1</h1>
        <p className={styles.subtitle}>
          Visualizza tutte le gare di Formula 1 disponibili
        </p>
      </div>

      <main className={styles.main}>
        {isLoading && (
          <div className={styles.grid}>
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className={styles.error}>Errore: {error.message}</div>
        )}

        {!isLoading && !error && displayedRaces.length > 0 && (
          <div className={styles.grid}>
            {displayedRaces.map((race: RaceStats) => (
              <RaceCard key={race.raceId} {...race} />
            ))}
          </div>
        )}

        {!isLoading && !error && displayedRaces.length === 0 && (
          <div className={styles.empty}>Nessuna gara trovata</div>
        )}

        {hasMore && ( 
          <div className={styles.loadMoreContainer}>
            <button 
              type="button" 
              onClick={handleLoadMore} 
              className={styles.loadMoreButton} 
              disabled={isLoading}
            >
              {isLoading ? 'Caricamento...' : 'Carica altri elementi'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}