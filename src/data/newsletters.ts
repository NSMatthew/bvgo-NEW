import { supabase } from '../lib/supabase';
import { Newsletter } from '../lib/mergeSort';

export async function getNewsletters(): Promise<Newsletter[]> {
  const { data, error } = await supabase
    .from('newsletters')
    .select('id, title, releaseDate')
    .order('releaseDate', { ascending: false });

  if (error) {
    console.error('Error fetching newsletters:', error.message);
    return [];
  }

  return data.map(item => ({
    id: item.id,
    title: item.title,
    releaseDate: new Date(item.releaseDate),
  }));
}