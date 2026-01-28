// Custom hook per il fetch della lista di piloti F1
// Utilizza React Query con caching di 5 minuti

import { useQuery } from "@tanstack/react-query";
import { fetchDrivers } from "@/service/driverService";
import type { Driver } from "@/types/driver";

// Hook che recupera tutti i piloti F1 con caching
export function useDrivers() {
  return useQuery<Driver[], Error>({
    queryKey: ["drivers"],
    queryFn: async () => fetchDrivers(),
    staleTime: 1000 * 60 * 5, // 5 minuti prima di refetch
    retry: 3,
  });
}

// Hook per recuperare un singolo pilota per ID
// Cerca nel list di tutti i piloti
export function useDriver(driverId: string) {
  return useQuery<Driver, Error>({
    queryKey: ["drivers", driverId],
    queryFn: async () => {
      const drivers = await fetchDrivers();
      const driver = drivers.find((d) => d.driverId === driverId);
      if (!driver) throw new Error("Driver non trovato");
      return driver;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}
