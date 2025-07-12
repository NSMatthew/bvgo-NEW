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
              options={{ 
                headerShown: true, 
                title: 'My Team',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#1076BC',
                headerTitleStyle: { 
                  fontFamily: 'Satoshi-Bold',
                },
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="FAQ"
              component={FAQ}
              options={({ navigation }) => ({
                headerShown: true,
                title: 'FAQ',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTitleStyle: {
                  color: '#1076BC',
                  fontSize: 20,
                  fontWeight: 'bold' as const,
                  textAlign: 'center' as const,
                  flex: 1,
                },
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ marginLeft: 15 }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../assets/icons/backbutton.png')}
                        style={{ width: 20, height: 20 }}
                      />
                      <Text style={{ color: '#585E6B', marginLeft: 8 }}>Back</Text>
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