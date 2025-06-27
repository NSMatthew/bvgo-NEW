import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: SplashProps) => {
  // GANTI `true` ➝ `false` kalau ingin pakai href
  const useRootStack = true;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (useRootStack) {
        navigation.navigate('Login'); // 🔁 Versi: NativeStack Type-safe
      } else {
        Linking.openURL('myapp://login'); // 🔁 Versi: HREF style (deep link-like)
      }
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('/assets/images/logoBVsplash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 60,
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
    fontWeight: 'bold',
    color: '#0070C0',
    marginTop: 10,
  },
  bottomContent: {
    alignItems: 'center',
    gap: 8,
  },
  fromText: {
    fontSize: 16,
    color: '#000',
  },
  fromLogo: {
    width: 100,
    height: 40,
  },
});

export default Splash;