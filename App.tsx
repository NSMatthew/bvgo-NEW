// App.tsx

import React, { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { supabase } from './src/lib/supabase'; // Pastikan path ini benar
import type { Session } from '@supabase/supabase-js';

const App = () => {
  // State untuk menyimpan informasi sesi login
  const [session, setSession] = useState<Session | null>(null);
  // State untuk loading awal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Coba dapatkan sesi yang sudah ada saat aplikasi pertama kali jalan
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Pasang listener onAuthStateChange
    // Listener ini akan berjalan setiap kali ada event login atau logout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (loading) setLoading(false);
    });

    // 3. Jangan lupa untuk unsubscribe saat komponen di-unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Selama loading, kita bisa tampilkan layar kosong atau splash screen
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Berikan informasi sesi ke komponen Navigation */}
      <Navigation session={session} />
    </>
  );
};

export default App;