'use client';

import styles from './Skeleton.module.css';

/**
 * Componente placeholder visualizzato durante il caricamento dei dati
 * Mostra uno scheletro animato con shimmer effect per migliorare l'esperienza utente
 * Rendered come client component per l'animazione
 */
function Skeleton() {
  return (
    <div className={styles.card}>
      {/* Header placeholder con titolo e sottotitolo */}
      <div className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.smallSkeleton}></div>
      </div>

      {/* Placeholder per i dati/statistiche */}
      <div className={styles.details}>
        <div className={styles.statSkeleton}></div>
        <div className={styles.statSkeleton}></div>
        <div className={styles.statSkeleton}></div>
        <div className={styles.statSkeleton}></div>
      </div>

      {/* Placeholder per il bottone */}
      <div className={styles.buttonSkeleton}></div>
    </div>
  );
}

export default Skeleton;
