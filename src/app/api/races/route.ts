export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') || new Date().getFullYear();
    const month = searchParams.get('month') || String(new Date().getMonth() + 1).padStart(2, '0');
    const limit = searchParams.get('limit') || '30';

    const res = await fetch(
      `https://f1connectapi.vercel.app/api/${year}/${month}/race?limit=${limit}`
    );

    if (!res.ok) {
      throw new Error('Errore dal server API');
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}
