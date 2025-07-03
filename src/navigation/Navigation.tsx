import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

// Import Screen yang sudah ada
import Splash from '../screen/Splash';
import Login from '../screen/Authentication/Login';
import BottomTabs from './BottomTabs';
import Menu from '../screen/MenuSetting/Menu';
import EditPersonalInformation from '../screen/MenuSetting/EditPersonalInformation';
import TeamPage from '../screen/MyPropertyMenu/TeamPage';

// --- 1. IMPORT SCREEN BARU UNTUK LUPA PASSWORD ---
import VerificationEmailScreen from '../screen/Authentication/VerificationEmail';
import SetNewPasswordScreen from '../screen/Authentication/SetNewPassword';

const Stack = createNativeStackNavigator<RootStackParamList>();

// --- 2. (OPSIONAL) TAMBAHKAN SCREEN BARU KE DEEP LINKING ---
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      Home: 'home/:userId',
      Menu: 'menu',
      EditPersonalInformation: 'edit-personal-information',
      TeamPage: 'team-page',
      // Tambahkan screen baru di sini
      VerificationEmail: 'verify-email',
      SetNewPassword: 'set-new-password',
    },
  },
};

const Navigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* Screen yang sudah ada */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen
          name="EditPersonalInformation"
          component={EditPersonalInformation}
          options={{ headerShown: true, title: 'Personal Information' }}
        />
        <Stack.Screen
          name="TeamPage"
          component={TeamPage}
          options={{ headerShown: true, title: 'Team' }}
        />

        {/* --- 3. DAFTARKAN SCREEN BARU DI NAVIGATOR --- */}
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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;