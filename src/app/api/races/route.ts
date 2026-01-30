/**
 * Route handler API per il recupero di tutte le gare F1 dalla storia
 * Implementa richieste parallele per velocità massima
 * Carica dati per ogni anno disponibile fino al 1950
 * Utilizza caching di 1 ora per ottimizzare le prestazioni
 */
export async function GET() {
  const minYear = 1950;
  const currentYear = new Date().getFullYear();
  
  try {
    console.log(`Inizio caricamento gare in parallelo da ${currentYear} a ${minYear}...`);

    // Genera array di anni da caricare
    const years = Array.from(
      { length: currentYear - minYear + 1 },
      (_, i) => currentYear - i
    );

    // Carica tutti gli anni in parallelo
    const results = await Promise.allSettled(
      years.map(year =>
        fetch(`https://f1connectapi.vercel.app/api/${year}`, {
          headers: {
            'User-Agent': 'Next.js Server',
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 },
        })
          .then(res => res.json())
          .then(data => ({ year, data }))
      )
    );

    // Elabora risultati
    const allRaces: any[] = [];
    let yearsLoaded = 0;

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.data?.races?.length > 0) {
        allRaces.push(...result.value.data.races);
        yearsLoaded++;
      }
    });

    console.log(`Ciclo terminato - Totale gare: ${allRaces.length} da ${yearsLoaded} anni`);

    return Response.json({
      races: allRaces,
      total: allRaces.length,
      yearsLoaded,
    });

  } catch (error) {
    console.error('Errore generale:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}
