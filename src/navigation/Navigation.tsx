import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import type { Session } from '@supabase/supabase-js';

// --- 1. IMPORT SEMUA SCREEN YANG DIPERLUKAN ---
import Splash from '../screen/Splash';
import Login from '../screen/Authentication/Login';
import VerificationEmailScreen from '../screen/Authentication/VerificationEmail';
import SetNewPasswordScreen from '../screen/Authentication/SetNewPassword';
import BottomTabs from './BottomTabs';
import TeamPage from '../screen/MyPropertyMenu/TeamPage'; // <-- IMPORT TeamPage

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          // --- JIKA USER SUDAH LOGIN ---
          // Daftarkan semua layar yang bisa diakses setelah login di sini
          <>
            <Stack.Screen name="Home" component={BottomTabs} />
            {/* --- 2. DAFTARKAN TeamPage SEBAGAI LAYAR DI STACK UTAMA --- */}
            <Stack.Screen
              name="TeamPage"
              component={TeamPage}
              options={{ 
                headerShown: true, 
                title: 'My Team',
                // Style tambahan agar terlihat seperti desain Anda
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { fontFamily: 'Satoshi-Bold' },
                headerShadowVisible: false,
              }}
            />
            {/* Anda bisa mendaftarkan layar detail lainnya di sini */}
          </>
        ) : (
          // --- JIKA USER BELUM LOGIN ---
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="VerificationEmail"
              component={VerificationEmailScreen}
              options={{ headerShown: true, title: 'Forgot Password' }}
            />
            <Stack.Screen
              name="SetNewPassword"
              component={SetNewPasswordScreen}
              options={{ headerShown: true, title: 'Set New Password' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;