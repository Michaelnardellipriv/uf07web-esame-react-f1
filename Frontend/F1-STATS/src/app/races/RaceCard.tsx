/**
 * Componente card riusabile per visualizzare i dettagli di una gara F1
 * Mostra informazioni su circuito, gara, pilota vincitore e team vincitore
 * Rendered come client component per l'interattività
 */

'use client';
import styles from './RaceCard.module.css';
import { formatValue, formatDate } from '../../service/utils';
import type { RaceStats } from '../../types/race';

/**
 * Componente card per una gara F1
 * 
 * @param race - Dati della gara da visualizzare
 * @returns Card con informazioni della gara organizzate per sezioni
 */
export default function RaceCard(race: RaceStats) {
  // Formatta la data della gara
  const formattedDate = formatDate(race.schedule.race.date);
  // Genera URL Wikipedia per la gara
  const wikipediaUrl = race.url || `https://en.wikipedia.org/wiki/${race.raceName.replace(/\s+/g, '_')}_Grand_Prix`;

  return (
    <div className={styles.card}>
      {/* Header con nome e numero della gara */}
      <div className={styles.header}>
        <h3 className={styles.name}>{race.raceName}</h3>
        <span className={styles.number}> {race.round}</span>
      </div>

      {/* Lista di dettagli della gara */}
      <ul className={styles.detailsList}>
        {/* Sezione informazioni circuito */}
        <li className={styles.detailItem}>
          <h4 className={styles.sectionLabel}> Circuito</h4>
          <ul className={styles.statsList}>
            <li className={styles.statsItem}>
              <span className={styles.label}>Nome</span>
              <span className={styles.value}>{formatValue(race.circuit.circuitName)}</span>
            </li>
            <li className={styles.statsItem}>
              <span className={styles.label}>Città</span>
              <span className={styles.value}>{formatValue(race.circuit.city)}</span>
            </li>
            <li className={styles.statsItem}>
              <span className={styles.label}>Paese</span>
              <span className={styles.value}>{formatValue(race.circuit.country)}</span>
            </li>
            {/* Mostra numero di curve se disponibile */}
            {race.circuit.corners && (
              <li className={styles.statsItem}>
                <span className={styles.label}>Curve</span>
                <span className={styles.value}>{race.circuit.corners}</span>
              </li>
            )}
          </ul>
           <div className={styles.separator}></div>
        </li>
        
        {/* Sezione dettagli della gara */}
        <li className={styles.detailItem}>
          <h4 className={styles.sectionLabel}> Dettagli Gara</h4>
          <ul className={styles.statsList}>
            {/* Informazioni pilota vincitore */}
            {race.winner && (
              <li className={styles.statsItem}>
                <span className={styles.label}>Pilota</span>
                <span className={styles.value}>
                  {race.winner.number && `#${race.winner.number} `}
                  {formatValue(`${race.winner.name} ${race.winner.surname}`)}
                  {race.winner.shortName && ` (${race.winner.shortName})`}
                </span>
              </li>
            )}

            {/* Informazioni team vincitore */}
            {race.teamWinner && (
              <li className={styles.statsItem}>
                <span className={styles.label}>Team Vincitore</span>
                <span className={styles.value}>{formatValue(race.teamWinner.teamName)}</span>
              </li>
            )}

            {/* Numero di giri completati */}
            {race.laps && (
              <li className={styles.statsItem}>
                <span className={styles.label}>Giri</span>
                <span className={styles.value}>{race.laps}</span>
              </li>
            )}
            
            {/* Data della gara */}
            <li className={styles.statsItem}>
              <span className={styles.label}>Data</span>
              <span className={styles.value}>{formattedDate}</span>
            </li>
          </ul>
        </li>
      </ul>

      {/* Linea di separazione */}
      <div className={styles.separator}></div>

      {/* Link a Wikipedia per più dettagli */}
      <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className={styles.wikiButton}>
        Più dettagli →
      </a>
    </div>
  );
}