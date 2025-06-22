import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

import Splash from '../screen/Splash';
import Login from '../screen/Login';
import BottomTabs from './BottomTabs';
import Menu from '../screen/MenuSetting/Menu';
import EditPersonalInformation from '../screen/MenuSetting/EditPersonalInformation';
import TeamPage from '../screen/MyPropertyMenu/TeamPage'; // ✅ Tambahkan import TeamPage

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      Home: 'home/:userId',
      Menu: 'menu',
      EditPersonalInformation: 'edit-personal-information',
      TeamPage: 'team-page', // ✅ Tambahkan deep linking TeamPage
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
          options={{ headerShown: true, title: 'Personal Information' }}
        />
        <Stack.Screen
          name="TeamPage"
          component={TeamPage}
          options={{ headerShown: true, title: 'Team' }} // ✅ Tambahkan screen TeamPage
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;