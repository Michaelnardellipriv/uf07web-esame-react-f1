export async function GET() {
  const allRaces: any[] = [];
  let year = new Date().getFullYear();
  let yearCount = 0;
  const minYear = 1950; // Safety: massimo fino al 1950

  try {
    console.log(`Inizio caricamento gare da ${year} all'indietro...`);

    while (year >= minYear) {
      try {
        console.log(`Caricamento gare anno ${year}...`);

        const res = await fetch(
          `https://f1connectapi.vercel.app/api/${year}`,
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
          console.log(`Anno ${year}: API Error ${res.status}, fermo ciclo`);
          break;
        }

        const data = await res.json();

        // ❌ Se non ci sono dati, ferma
        if (!data.races || data.races.length === 0) {
          console.log(`Anno ${year}: Batch vuoto, fermo ciclo`);
          break;
        }

        console.log(`Anno ${year}: ${data.races.length} gare caricate`);
        allRaces.push(...data.races);
        yearCount++;

        year--;

        // Delay per evitare rate limit
        await new Promise(r => setTimeout(r, 300));

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