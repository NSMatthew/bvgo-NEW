import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Screen Components
import Home from '../screen/Home';
import Booking from '../screen/Booking';
import MyProperty from '../screen/MyPropertyMenu/MyProperty';
import Notification from '../screen/Notification';
import Menu from '../screen/MenuSetting/Menu';

// Type Definitions
import { BottomTabParamList } from '../types/bottomTabTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'alert-circle-outline'; // Default icon

          if (route.name === 'Dashboard') {
            iconName = 'grid-outline';
          } else if (route.name === 'Booking') {
            iconName = 'list-outline';
          } else if (route.name === 'My Property') {
            iconName = 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Menu') {
            iconName = 'person-outline';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Home} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="My Property" component={MyProperty} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

export default BottomTabs;