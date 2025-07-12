import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import type { Session } from '@supabase/supabase-js';

// Import semua screen
import Splash from '../screen/Splash';
import Login from '../screen/Authentication/Login';
import VerificationEmailScreen from '../screen/Authentication/VerificationEmail';
import SetNewPasswordScreen from '../screen/Authentication/SetNewPassword';
import BottomTabs from './BottomTabs';
import TeamPage from '../screen/MyPropertyMenu/TeamPage';
import FAQ from '../screen/MenuSetting/FAQ';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          <>
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen
              name="TeamPage"
              component={TeamPage}
              // --- UBAH DARI OBJEK MENJADI FUNGSI DI SINI ---
              options={({ navigation }) => ({ 
                headerShown: true, 
                title: '',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { 
                  fontFamily: 'Satoshi-Bold',
                },
                headerShadowVisible: false,
                // 'navigation' sekarang sudah tersedia di dalam lingkup ini
                headerLeft: () => (
                  <TouchableOpacity 
                    // Panggilan ini sekarang valid
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
                      marginLeft: 100, // Perhatikan: margin ini mungkin mendorong teks terlalu jauh
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
                title: 'FAQ',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { 
                  fontFamily: 'Satoshi-Bold',
                },
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ marginLeft: 15 }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../assets/icons/backbutton.png')}
                        style={{ width: 15, height: 15 }}
                      />
                    </View>
                  </TouchableOpacity>
                ),
                headerRight: () => <View style={{ width: 20 }} />,
              })}
            />
          </>
        ) : (
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