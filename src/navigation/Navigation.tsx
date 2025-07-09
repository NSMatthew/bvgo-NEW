import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import type { Session } from '@supabase/supabase-js'; // <-- 1. Pastikan ini di-import

// ... (semua import screen Anda)
import Splash from '../screen/Splash';
import Login from '../screen/Authentication/Login';
import BottomTabs from './BottomTabs';
// ... dll

const Stack = createNativeStackNavigator<RootStackParamList>();

// <-- 2. Pastikan baris ini sudah diubah
const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          // JIKA USER SUDAH LOGIN
          <>
            <Stack.Screen name="Home" component={BottomTabs} />
            {/* ... (layar-layar setelah login) ... */}
          </>
        ) : (
          // JIKA USER BELUM LOGIN
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            {/* ... (layar-layar autentikasi) ... */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;