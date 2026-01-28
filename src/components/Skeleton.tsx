'use client';

import styles from './Skeleton.module.css';

// Componente placeholder durante il caricamento dei dati
// Mostra uno scheletro animato con shimmer effect
function Skeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.smallSkeleton}></div>
      </div>

      <div className={styles.details}>
        <div className={styles.statSkeleton}></div>
        <div className={styles.statSkeleton}></div>
        <div className={styles.statSkeleton}></div>
        <div className={styles.statSkeleton}></div>
      </div>

      <div className={styles.buttonSkeleton}></div>
    </div>
  );
}

export default Skeleton;
