
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "F1 STATS",
  description: "Dashboard completa per dati Formula 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head />
      <body>
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}