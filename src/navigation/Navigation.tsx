import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

import Splash from '../screen/Splash';
import Login from '../screen/Login';
import BottomTabs from './BottomTabs'; 
import Menu from '../screen/MenuSetting/Menu';  // Import Menu screen
import EditPersonalInformation from '../screen/MenuSetting/EditPersonalInformation'; // Import EditPersonalInformation screen

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      Home: 'home/:userId', 
      Menu: 'menu',  // Optional deep linking path
      EditPersonalInformation: 'edit-personal-information', // Optional deep linking path
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
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen 
          name="EditPersonalInformation" 
          component={EditPersonalInformation} 
          options={{ headerShown: true, title: 'Personal Information' }} // Show header with title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;