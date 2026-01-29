export async function GET() {
  const allTeams: any[] = [];
  const limit = 50;
  let offset = 0;
  let batchCount = 0;
  const maxBatches = 1000; // Safety: massimo 1000 batch

  try {
    console.log('Inizio caricamento tutti i team...');

    while (batchCount < maxBatches) {
      const res = await fetch(
        `https://f1connectapi.vercel.app/api/teams?limit=${limit}&offset=${offset}`,
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
      const teams = data.teams ?? [];

      // ❌ Se non ci sono dati, ferma
      if (teams.length === 0) {
        console.log(`Batch vuoto, fermo ciclo`);
        break;
      }

      console.log(`Batch ${batchCount + 1}: offset=${offset}, ${teams.length} team`);
      allTeams.push(...teams);

      // ❌ Se ricevi meno elementi del limit, ferma (ultimo batch)
      if (teams.length < limit) {
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

    console.log(`Ciclo terminato - Totale team: ${allTeams.length} in ${batchCount} batch`);
    return Response.json({ teams: allTeams, batchCount });

  } catch (error) {
    console.error('Errore teams API:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}
