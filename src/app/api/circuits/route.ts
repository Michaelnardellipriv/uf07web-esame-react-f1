export async function GET() {
  const allCircuits: any[] = [];
  const limit = 50;
  let offset = 0;
  let batchCount = 0;
  const maxBatches = 1000; // Safety: massimo 1000 batch

  try {
    console.log('Inizio caricamento tutti i circuiti...');

    while (batchCount < maxBatches) {
      const res = await fetch(
        `https://f1connectapi.vercel.app/api/circuits?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'User-Agent': 'Next.js Server',
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 }, // cache 1 ora
        }
      );

      // Se l'API non risponde, ferma
      if (!res.ok) {
        console.log(`API Error ${res.status}, fermo ciclo`);
        break;
      }

      const data = await res.json();
      const circuits = data.circuits ?? [];

      // Se non ci sono dati, ferma
      if (circuits.length === 0) {
        console.log('Batch vuoto, fermo ciclo');
        break;
      }

      console.log(`Batch ${batchCount + 1}: offset=${offset}, ${circuits.length} circuiti`);
      allCircuits.push(...circuits);

      // Se ricevi meno elementi del limit, ferma (ultimo batch)
      if (circuits.length < limit) {
        console.log('Ultimo batch completato, fermo ciclo');
        break;
      }

      offset += limit;
      batchCount++;

      // Evita il rate limit
      await new Promise(r => setTimeout(r, 300));
    }

    if (batchCount >= maxBatches) {
      console.warn(`Raggiunto massimo batch (${maxBatches})`);
    }

    console.log(`Ciclo terminato - Totale circuiti: ${allCircuits.length} in ${batchCount} batch`);
    
    return Response.json({ circuits: allCircuits, batchCount });

  } catch (error) {
    console.error('Errore circuits API:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}