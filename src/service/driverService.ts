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

// Recupera la lista di tutti i piloti F1 dall'API esterna
// Supporta paginazione tramite limit e offset
export async function fetchDrivers(limit: number = 50, offset: number = 0): Promise<Driver[]> {
  try {
    const res = await fetch(`/api/drivers?limit=${limit}&offset=${offset}`);
    
    if (!res.ok) {
      throw new Error('Errore nel caricamento dei piloti');
    }

    const data: DriversResponse = await res.json();
    return data.drivers || [];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Errore sconosciuto');
  }
}
