import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator // Impor untuk loading indicator
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // Impor Supabase

// --- Impor semua screen Anda (tidak berubah) ---
import Splash from '../screen/Splash';
import Login from '../screen/Authentication/Login';
import VerificationEmailScreen from '../screen/Authentication/VerificationEmail';
import SetNewPasswordScreen from '../screen/Authentication/SetNewPassword';
import BottomTabs from './BottomTabs';
import TeamPage from '../screen/MyPropertyMenu/TeamPage';
import FAQ from '../screen/MenuSetting/FAQ';

const Stack = createNativeStackNavigator<RootStackParamList>();


// --- BAGIAN INI TIDAK BERUBAH ---
// Ini adalah navigator Anda yang sudah ada, saya ubah namanya menjadi AppNavigator
const AppNavigator = ({ session }: { session: Session | null }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          <>
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen
              name="TeamPage"
              component={TeamPage}
              options={({ navigation }) => ({ 
                headerShown: true, 
                title: '',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { 
                  fontFamily: 'Satoshi-Bold',
                },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ 
                      marginLeft: 15,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      source={require('../assets/icons/backbutton.png')}
                      style={{ 
                        width: 15, 
                        height: 15,
                        tintColor: '#1076BC'
                      }}
                    />
                    <Text style={{ 
                      color: '#1076BC', 
                      marginLeft: 100,
                      fontSize: 20, 
                      fontWeight: '600', 
                    }}>
                      My Team
                    </Text>
                  </TouchableOpacity>
                ),
              })}
            />
          <Stack.Screen
              name="FAQ"
              component={FAQ}
              options={({ navigation }) => ({ 
                headerShown: true, 
                title: '',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { 
                  fontFamily: 'Satoshi-Bold',
                },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ 
                      marginLeft: 15,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      source={require('../assets/icons/backbutton.png')}
                      style={{ 
                        width: 15, 
                        height: 15,
                        tintColor: '#1076BC'
                      }}
                    />
                    <Text style={{ 
                      color: '#1076BC', 
                      marginLeft: 120,
                      fontSize: 20, 
                      fontWeight: '600', 
                    }}>
                      FAQ
                    </Text>
                  </TouchableOpacity>
                ),
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={Splash} options={{
              // Sembunyikan splash dari back-history setelah navigasi
              animationTypeForReplace: 'pop' 
            }}/>
            <Stack.Screen name="Login" component={Login} />
                     <Stack.Screen
              name="VerificationEmail"
              component={VerificationEmailScreen}
              options={({ navigation }) => ({ 
                headerShown: true, 
                title: '',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { 
                  fontFamily: 'Satoshi-Bold',
                },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ 
                      marginLeft: 15,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      source={require('../assets/icons/backbutton.png')}
                      style={{ 
                        width: 15, 
                        height: 15,
                        tintColor: '#1076BC'
                      }}
                    />
                    <Text style={{ 
                      color: '#1076BC', 
                      marginLeft: 75,
                      fontSize: 20, 
                      fontWeight: '600', 
                    }}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                ),
              })}
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


// --- INI SOLUSI BARUNYA ---
// Komponen pembungkus yang memiliki 3 "kesadaran"
const Navigation = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek sesi saat aplikasi pertama kali dimuat
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    // Dengarkan perubahan status otentikasi
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 1. KESADARAN "LOADING"
  if (loading) {
    return <Splash />;
  }
  
  // 2 & 3. KESADARAN "SUDAH LOGIN" ATAU "BELUM LOGIN"
  // Kirim hasil sesi (ada atau tidak) ke navigator Anda
  return <AppNavigator session={session} />;
};


export default Navigation; // Pastikan export-nya adalah komponen pembungkus yang baru