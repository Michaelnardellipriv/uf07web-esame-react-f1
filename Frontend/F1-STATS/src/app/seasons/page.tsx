'use client';

import { useSeasons } from '../../hooks/useSeasons';
import SeasonCard from './SeasonCard';
import Skeleton from '../../components/Skeleton';
import styles from './page.module.css';
import { useState } from 'react';

const ITEMS_PER_PAGE = 6;

export default function SeasonsPage() {
  const { data: seasons = [], isLoading, error } = useSeasons();
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);

  const displayedSeasons = seasons.slice(0, displayedCount);
  const hasMore = displayedCount < seasons.length;

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Stagioni F1</h1>
        <p className={styles.subtitle}>Esplora tutte le stagioni di Formula 1</p>
      </div>

      <main className={styles.main}>
        {isLoading && displayedCount === ITEMS_PER_PAGE && (
          <div className={styles.grid}>
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}
        {!isLoading && error && <div className={styles.error}>Errore: {error.message}</div>}

        {!isLoading && !error && (
          <div className={styles.grid}>
            {displayedSeasons.map((season) => (
              <SeasonCard key={season.championshipId} {...season} />
            ))}
          </div>
        )}

        {!isLoading && !error && displayedSeasons.length === 0 && (
          <div className={styles.empty}>Nessuna stagione trovata</div>
        )}

        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button onClick={handleLoadMore} className={styles.loadMoreButton} disabled={isLoading}>
              {isLoading ? 'Caricamento...' : 'Carica altri elementi'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
