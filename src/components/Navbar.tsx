'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';

/**
 * Componente di navigazione principale dell'applicazione
 * Fornisce link verso tutte le sezioni principali (piloti, squadre, stagioni, gare, circuiti)
 * Rendered come client component per supportare l'interattività
 */
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo e link alla pagina home */}
        <Link href="/Home" className={styles.logo}>
          F1 STATS
        </Link>

        {/* Link di navigazione principale verso le sezioni */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="/drivers" className={styles.link}>
              Piloti
            </Link>
          </li>
          <li>
            <Link href="/teams" className={styles.link}>
              Squadre
            </Link>
          </li>
          <li>
            <Link href="/seasons" className={styles.link}>
              Stagioni
            </Link>
          </li>
          <li>
            <Link href="/races" className={styles.link}>
              Gare
            </Link>
          </li>
          <li>
            <Link href="/circuits" className={styles.link}>
              Circuiti
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
