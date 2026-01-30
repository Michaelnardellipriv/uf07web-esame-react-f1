/**
 * Route handler API per il recupero di tutte le gare F1 dalla storia
 * Implementa un loop all'indietro nel tempo partendo dall'anno corrente
 * Carica dati per ogni anno disponibile fino al 1950
 * Utilizza caching di 1 ora per ottimizzare le prestazioni
 */
export async function GET() {
  // Array per accumulare tutte le gare fetched
  const allRaces: any[] = [];
  
  // Inizializza con l'anno corrente e scende all'indietro
  let year = new Date().getFullYear();
  let yearCount = 0; // Contatore anni caricati
  const minYear = 1950; // Limite minimo anno (inizio F1)

  try {
    console.log(`Inizio caricamento gare da ${year} all'indietro...`);

    // Loop decrescente dagli anni recenti ai precedenti
    while (year >= minYear) {
      try {
        console.log(`Caricamento gare anno ${year}...`);

        // Effettua richiesta all'API per l'anno specifico
        const res = await fetch(
          `https://f1connectapi.vercel.app/api/${year}`,
          {
            headers: {
              'User-Agent': 'Next.js Server',
              'Accept': 'application/json',
            },
            next: { revalidate: 3600 }, // Cache per 1 ora
          }
        );

        // Verifica se la risposta e valida
        if (!res.ok) {
          console.log(`Anno ${year}: API Error ${res.status}, fermo ciclo`);
          break;
        }

        const data = await res.json();

        // Ferma se non ci sono gare per questo anno
        if (!data.races || data.races.length === 0) {
          console.log(`Anno ${year}: Batch vuoto, fermo ciclo`);
          break;
        }

        console.log(`Anno ${year}: ${data.races.length} gare caricate`);
        allRaces.push(...data.races);
        yearCount++;

        // Decrementa l'anno per il prossimo ciclo
        year--;

        // Delay per evitare rate limiting dell'API
        await new Promise(r => setTimeout(r, 100));

      } catch (error) {
        console.error(`Errore anno ${year}:`, error);
        break;
      }
    }

    console.log(`Ciclo terminato - Totale gare: ${allRaces.length} da ${yearCount} anni`);

    return Response.json({
      races: allRaces,
      total: allRaces.length,
      yearsLoaded: yearCount,
    });

  } catch (error) {
    console.error('Errore generale:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}