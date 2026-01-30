'use client';

import { useDrivers } from '../../hooks/useDrivers';
import DriverCard from './DriverCard';
import Skeleton from '../../components/Skeleton';
import styles from './page.module.css';
import { useState } from 'react';
import type {Driver} from "../../types/driver";

const ITEMS_PER_PAGE = 6;

export default function DriversPage() {
  const { data: drivers = [], isLoading, error } = useDrivers();
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);

  const displayedDrivers = drivers.slice(0, displayedCount);
  const hasMore = displayedCount < drivers.length;

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Piloti F1</h1>
        <p className={styles.subtitle}>Scopri i profili dettagliati di tutti i piloti</p>
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
            {displayedDrivers.map((driver:Driver) => (
              <DriverCard key={driver.driverId} {...driver} />
            ))}
          </div>
        )}

        {!isLoading && !error && displayedDrivers.length === 0 && (
          <div className={styles.empty}>Nessun pilota trovato</div>
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
