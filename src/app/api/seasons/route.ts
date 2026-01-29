export async function GET() {
  const allSeasons: any[] = [];
  const limit = 50;
  let offset = 0;
  let batchCount = 0;
  const maxBatches = 1000; // Safety: massimo 1000 batch

  try {
    console.log('Inizio caricamento tutte le stagioni...');

    while (batchCount < maxBatches) {
      const res = await fetch(
        `https://f1connectapi.vercel.app/api/seasons?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'User-Agent': 'Next.js Server',
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 }, // cache 1 ora
        }
      );

      // ❌ Se l'API non risponde, ferma
      if (!res.ok) {
        console.log(`API Error ${res.status}, fermo ciclo`);
        break;
      }

      const data = await res.json();
      const seasons = data.championships ?? [];

      // ❌ Se non ci sono dati, ferma
      if (seasons.length === 0) {
        console.log(`Batch vuoto, fermo ciclo`);
        break;
      }

      console.log(`Batch ${batchCount + 1}: offset=${offset}, ${seasons.length} stagioni`);
      allSeasons.push(...seasons);

      // ❌ Se ricevi meno elementi del limit, ferma (ultimo batch)
      if (seasons.length < limit) {
        console.log(`Ultimo batch completato, fermo ciclo`);
        break;
      }

      offset += limit;
      batchCount++;

      // ⏱️ evita il rate limit
      await new Promise(r => setTimeout(r, 300));
    }

    if (batchCount >= maxBatches) {
      console.warn(`Raggiunto massimo batch (${maxBatches})`);
    }

    console.log(`Ciclo terminato - Totale stagioni: ${allSeasons.length} in ${batchCount} batch`);
    return Response.json({ championships: allSeasons, batchCount });

  } catch (error) {
    console.error('Errore seasons API:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}
   