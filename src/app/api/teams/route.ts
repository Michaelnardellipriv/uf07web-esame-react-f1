export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';

    const res = await fetch(
      `https://f1connectapi.vercel.app/api/teams?limit=${limit}&offset=${offset}`
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
