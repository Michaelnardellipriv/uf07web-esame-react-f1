'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useMemo } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minuti
            gcTime: 1000 * 60 * 10, // 10 minuti
          },
        },
      }),
    []
  );

  return (
    <html lang="it">
      <body>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            {children}
          </QueryClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
