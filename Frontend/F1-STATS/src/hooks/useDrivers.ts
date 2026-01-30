/**
 * Custom hook per il fetch della lista di piloti F1
 * Utilizza React Query con caching di 5 minuti per ottimizzare le prestazioni
 * Fornisce sia il fetch di tutti i piloti che di uno specifico
 */

import { useQuery } from "@tanstack/react-query";
import { fetchDrivers } from "../service/driverService";
import type { Driver } from "../types/driver";

/**
 * Hook che recupera tutti i piloti F1 con caching automatico
 * I dati vengono cachati per 5 minuti prima di essere richiesti di nuovo
 * 
 * @returns Oggetto useQuery con lo stato di caricamento e i dati dei piloti
 */
export function useDrivers() {
  return useQuery<Driver[], Error>({
    queryKey: ["drivers"],
    queryFn: async () => fetchDrivers(),
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}

/**
 * Hook per recuperare un singolo pilota per ID
 * Cerca nel lista di tutti i piloti e ritorna solo quello richiesto
 * 
 * @param driverId - ID univoco del pilota da cercare
 * @returns Oggetto useQuery con lo stato di caricamento e il pilota trovato
 * @throws Errore se il pilota non viene trovato
 */
export function useDriver(driverId: string) {
  return useQuery<Driver, Error>({
    queryKey: ["drivers", driverId],
    queryFn: async () => {
      // Fetch tutti i piloti
      const drivers = await fetchDrivers();
      // Cerca il pilota per ID
      const driver = drivers.find((d) => d.driverId === driverId);
      if (!driver) throw new Error("Driver non trovato");
      return driver;
    },
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}
