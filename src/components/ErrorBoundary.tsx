'use client';

import { useState, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

// Interfaccia per le props del componente
interface IErrorBoundaryProp {
  children: ReactNode;
}

// Interfaccia per lo stato interno
interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Componente per catturare e gestire errori nei componenti figli
function ErrorBoundary({ children }: IErrorBoundaryProp) {
  const [state, setState] = useState<IErrorBoundaryState>({
    hasError: false,
    error: null,
  });

  // Cattura gli errori durante il rendering
  if (state.hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Oops! Qualcosa è andato storto</h2>
          <p className={styles.message}>
            {state.error?.message || 'Un errore inaspettato si è verificato'}
          </p>
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

  return children;
}

export default ErrorBoundary;
