'use client';

import { useState, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

/**
 * Interfaccia per le props del componente ErrorBoundary
 */
interface IErrorBoundaryProp {
  children: ReactNode;
}

/**
 * Interfaccia per lo stato interno del componente
 */
interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Componente per catturare e gestire errori nei componenti figli
 * Fornisce un fallback UI quando un errore viene rilevato
 * Rendered come client component per la gestione dello stato
 */
function ErrorBoundary({ children }: IErrorBoundaryProp) {
  // Stato interno per tracciare errori
  const [state, setState] = useState<IErrorBoundaryState>({
    hasError: false,
    error: null,
  });

  // Se c'e un errore, mostra l'interfaccia di fallback
  if (state.hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Oops! Qualcosa è andato storto</h2>
          <p className={styles.message}>
            {state.error?.message || 'Un errore inaspettato si è verificato'}
          </p>
          {/* Bottone per resettare lo stato di errore e riprovare */}
          <button 
            onClick={() => setState({ hasError: false, error: null })} 
            className={styles.button}
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  // Ritorna i figli se non c'e errore
  return children;
}

export default ErrorBoundary;
