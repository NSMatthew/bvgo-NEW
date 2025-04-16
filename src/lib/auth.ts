import { supabase } from './supabase'; // Mengimpor supabase yang sudah dikonfigurasi
import { User, Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthResponse = {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

// Fungsi untuk Register Pengguna Baru
export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error('Error Register:', error.message);
    return { user: null, session: null, error };
  }

  // Setelah register berhasil, simpan email dan password ke tabel 'users'
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      { email: data?.user?.email, password } // Simpan email dan password
    ]);

  if (insertError) {
    console.error('Error inserting into users table:', insertError.message);
    return { user: null, session: null, error: insertError };
  }

  return { user: data?.user || null, session: data?.session || null, error: null };
}

// Fungsi untuk Login Pengguna
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Error Login:', error.message);
    return { user: null, session: null, error };
  }

  // Jika login sukses, simpan session token ke AsyncStorage
  if (data?.session) {
    await AsyncStorage.setItem('userToken', data.session.access_token);  // Menyimpan token
  }

  return { user: data?.user || null, session: data?.session || null, error: null };
}

// Fungsi untuk Logout Pengguna
export const logoutUser = async (): Promise<{ success: boolean; error: string | null }> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error Logout:', error.message);
    return { success: false, error: error.message };
  }

  // Hapus token dari AsyncStorage saat logout
  await AsyncStorage.removeItem('userToken');

  return { success: true, error: null };
}