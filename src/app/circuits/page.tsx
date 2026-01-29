'use client';

import { useCircuits } from '@/hooks/useCircuits';
import CircuitCard from './CircuitCard';
import Skeleton from '@/components/Skeleton';
import styles from './page.module.css';
import { useState } from 'react';
import Image from './CircuitImg.png';
const ITEMS_PER_PAGE = 6;

export default function CircuitsPage() {
  const { data: circuits = [], isLoading, error } = useCircuits();
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);

  const displayedCircuits = circuits.slice(0, displayedCount);
  const hasMore = displayedCount < circuits.length;

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + ITEMS_PER_PAGE);
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
     
        <h1>Circuiti F1</h1>
        <p className={styles.subtitle}>Scopri i circuiti di Formula 1</p>
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
            {displayedCircuits.map((circuit) => (
              <CircuitCard key={circuit.circuitId} {...circuit} />
            ))}
          </div>
        )}

        {!isLoading && !error && displayedCircuits.length === 0 && (
          <div className={styles.empty}>Nessun circuito trovato</div>
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
