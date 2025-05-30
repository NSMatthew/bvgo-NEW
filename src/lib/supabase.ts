import Config from 'react-native-config'; //load file env
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = Config.SUPABASE_URL;
const supabaseAnonKey = Config.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env and react-native-config setup.');
}

// Inisialisasi Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ----------------------
// Task related types & functions
// ----------------------

export type Task = {
  id?: number;
  member_id: string;
  task_name: string;
  status: 'New' | 'Ongoing' | 'Done';
  created_at?: string;
};

// Fetch semua task berdasarkan member_id
export async function getTasksByMemberId(member_id: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('member_id', member_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Insert atau update task (upsert)
export async function upsertTask(task: Task): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .upsert(task, { onConflict: 'id' })
    .single();

  if (error) throw error;
  return data || null;
}