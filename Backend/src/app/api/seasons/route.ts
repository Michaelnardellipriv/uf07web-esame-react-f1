/**
 * Route handler API per il recupero di tutte le stagioni F1
 * Implementa paginazione con offset per gestire grandi quantita di dati
 * Utilizza caching di 1 ora per ottimizzare le prestazioni
 */

// Funzione helper per i CORS header
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Gestisci preflight CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function GET() {
  // Array per accumulare tutte le stagioni fetched
  const allSeasons: any[] = [];
  
  // Parametri paginazione
  const limit = 77; // Numero di elementi per richiesta
  let offset = 0; // Offset della paginazione
  let batchCount = 0; // Contatore batch
  const maxBatches = 1000; // Limite massimo batch per sicurezza

  try {
    console.log('Inizio caricamento tutte le stagioni...');

    // Loop fino a raggiungere il limite o non avere piu dati
    while (batchCount < maxBatches) {
      // Effettua richiesta all'API esterna con paginazione
      const res = await fetch(
        `https://f1connectapi.vercel.app/api/seasons?limit=${limit}&offset=${offset}`,
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
        console.log(`API Error ${res.status}, fermo ciclo`);
        break;
      }

      const data = await res.json();
      const seasons = data.championships ?? [];

      // Ferma se non ci sono piu dati
      if (seasons.length === 0) {
        console.log(`Batch vuoto, fermo ciclo`);
        break;
      }

      console.log(`Batch ${batchCount + 1}: offset=${offset}, ${seasons.length} stagioni`);
      allSeasons.push(...seasons);

      // Ferma se ricevi meno elementi del limit (ultimo batch)
      if (seasons.length < limit) {
        console.log(`Ultimo batch completato, fermo ciclo`);
        break;
      }

      // Incrementa offset e contatore
      offset += limit;
      batchCount++;

      // Delay per evitare rate limiting dell'API
      await new Promise(r => setTimeout(r, 300));
    }

    // Warning se raggiungiamo il limite massimo batch
    if (batchCount >= maxBatches) {
      console.warn(`Raggiunto massimo batch (${maxBatches})`);
    }

    console.log(`Ciclo terminato - Totale stagioni: ${allSeasons.length} in ${batchCount} batch`);
    // Ritorna le stagioni come JSON
    return Response.json({ championships: allSeasons, batchCount }, {
      headers: corsHeaders(),
    });

  } catch (error) {
    console.error('Errore seasons API:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
   