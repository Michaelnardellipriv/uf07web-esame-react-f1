// Interfaccia che rappresenta un pilota F1
import type { Driver } from "@/types/driver";

// Interfaccia per la risposta dell'API dei piloti
interface DriversResponse {
  api: string;
  drivers: Driver[];
  limit: number;
  offset: number;
  total: number;
}

// Recupera tutti i piloti F1
// Il ciclo è fatto nel route.ts per evitare rate limit
export async function fetchDrivers(): Promise<Driver[]> {
  try {
    const res = await fetch('/api/drivers');

    if (!res.ok) {
      throw new Error('Errore nel caricamento dei piloti');
    }

    const data = await res.json();
    return data.drivers || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
