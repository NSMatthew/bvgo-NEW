// src/data/newsletters.ts

import { supabase } from '../lib/supabase';
import { Newsletter } from '../lib/mergeSort';

/**
 * Fungsi ini bertugas mengambil data dari tabel 'newsletters' di Supabase.
 * Ia hanya mengambil kolom yang dibutuhkan oleh interface Newsletter.
 */
export async function getNewsletters(): Promise<Newsletter[]> {
  // 1. Ambil hanya kolom yang ada di interface: id, title, releaseDate.
  const { data, error } = await supabase
    .from('newsletters')
    .select('id, title, releaseDate');

  if (error) {
    console.error('Error fetching newsletters:', error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  // 2. Data dari Supabase sudah cocok dengan interface, tidak perlu mapping lagi.
  //    TypeScript akan otomatis memvalidasi bahwa 'data' sesuai dengan 'Newsletter[]'.
  return data;
}