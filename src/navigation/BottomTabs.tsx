import React from 'react';
import { Image, StyleSheet } from 'react-native'; // 1. IMPORT Image & StyleSheet
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        // --- 2. PERUBAHAN UTAMA ADA DI FUNGSI tabBarIcon ---
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          const iconStyle = { width: size, height: size, tintColor: color };

          // Logika untuk memilih ikon berdasarkan nama route dan status 'focused'
          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/navbarmenus/homeactiveicon.png')
              : require('../assets/navbarmenus/homeinactiveicon.png');
          } else if (route.name === 'Booking') {
            iconSource = focused
              ? require('../assets/navbarmenus/bookingactive.png')
              : require('../assets/navbarmenus/bookinginactive.png');
          } else if (route.name === 'My Property') {
            iconSource = focused
              ? require('../assets/navbarmenus/mypropertyactive.png')
              : require('../assets/navbarmenus/mypropertyinactive.png');
          } else if (route.name === 'Notification') {
            iconSource = focused
              ? require('../assets/navbarmenus/notificationactive.png')
              : require('../assets/navbarmenus/notificationinactive.png');
          } else if (route.name === 'Menu') {
            iconSource = focused
              ? require('../assets/navbarmenus/profileactive.png')
              : require('../assets/navbarmenus/profileinactive.png');
          }

          return <Image source={iconSource} style={iconStyle} />;
        },
        // --- 3. ATUR WARNA IKON DAN TEKS ---
        tabBarActiveTintColor: '#1076BC',  
        tabBarInactiveTintColor: '#5B5E6B', 
        headerShown: false,
      })}
    >
      {}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="My Property" component={MyProperty} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

export default BottomTabs;