
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Benvenuto su F1 STATS</h1>
          <p className={styles.heroSubtitle}>
            Il tuo hub statistiche per la Formula 1. Scopri piloti, team e prestazioni.
          </p>
        </div>
      </section>

    
    </div>
  );
}
