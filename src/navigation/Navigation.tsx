import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

import Splash from '../screen/Splash';
import Login from '../screen/Login';
import BottomTabs from './BottomTabs'; // ✅

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      Home: 'home/:userId', // nanti redirect ke BottomTabs
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
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home">
          {() => <BottomTabs />} {/* 👈 render tab sebagai 'Home' */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;