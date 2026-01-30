/**
 * Pagina root dell'applicazione
 * Reindirizza automaticamente verso la home page
 */

import { redirect } from 'next/navigation';

/**
 * Componente pagina root
 * Effettua un redirect verso /Home al caricamento
 */
export default function RootPage() {
  // Reindirizza verso la pagina home
  redirect('/Home');
}