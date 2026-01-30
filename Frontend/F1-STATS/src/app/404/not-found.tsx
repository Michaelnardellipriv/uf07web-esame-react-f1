

import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Pagina non trovata</p>
        <p className={styles.description}>
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link to="/" className={styles.cta}>
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
