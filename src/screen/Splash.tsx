import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: SplashProps) => {
  const useRootStack = true;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (useRootStack) {
        navigation.navigate('Login');
      } else {
        Linking.openURL('myapp://login');
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../assets/icons/BVGOlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.fromText}>from</Text>
        <Image
          source={require('../assets/icons/bukitvista-logo.png')}
          style={styles.fromLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  bvgoText: {
    fontSize: 28,
    fontFamily: 'Satoshi-Bold',
    color: '#1076BC',
    marginTop: 12,
  },
  bottomContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fromText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: '#0E0E0E',
    marginBottom: 8,
  },
  fromLogo: {
    width: 120,
    height: 40,
  },
});

export default Splash;