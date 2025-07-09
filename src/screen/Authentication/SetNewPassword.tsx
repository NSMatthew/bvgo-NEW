import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { Typography } from '../../styles/typography';

type SetNewPasswordScreenProps = {
  navigation: any;
  route: any; // Untuk menerima data dari layar sebelumnya
};

const SetNewPasswordScreen = ({ navigation, route }: SetNewPasswordScreenProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // --- PERUBAHAN DI SINI ---
  // Ambil email dan otp dari parameter navigasi
  const { email, otp } = route.params;

  // --- FUNGSI DIPERBARUI ---
  const handleSetNewPassword = async () => {
    if (password.length < 6) {
      // Supabase punya aturan minimal 6 karakter, jadi kita samakan
      Alert.alert('Password too short', 'Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure your passwords match.');
      return;
    }

    setLoading(true);
    
    // Panggil Edge Function 'verifikasi-dan-update'
    // Saya ganti namanya ke Bahasa Inggris agar konsisten: 'verify-and-update'
    // Jika Anda menggunakan nama lain saat deploy, sesuaikan di sini.
    const { error } = await supabase.functions.invoke('verify-and-update', {
      body: { email, otp, newPassword: password },
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        'Password Updated',
        'Your password has been updated successfully. Please login with your new password.'
      );
      // Arahkan user kembali ke halaman Login
      navigation.navigate('Login');
    }
    setLoading(false);
  };

  const isFormFilled = password.length > 0 && confirmPassword.length > 0;

  // --- Render Tampilan (TIDAK ADA PERUBAHAN DI SINI) ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/bukitvista-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Set your new password</Text>
        
        <TextInput
          style={styles.input}
          placeholder="New password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        <TextInput
          style={[styles.input, {marginTop: 15}]}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, styles.confirmButton, !isFormFilled && styles.disabledButton]}
          onPress={handleSetNewPassword}
          disabled={!isFormFilled || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText}>Confirm</Text>
              <Image 
                source={require('../../assets/icons/arrowlogin.png')} 
                style={styles.confirmIcon}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- STYLES (TIDAK ADA PERUBAHAN DI SINI) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
  subtitle: {
    ...Typography.heading,
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    ...Typography.body,
    backgroundColor: '#F7F7F7',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButton: { backgroundColor: '#1076BC' },
  disabledButton: { backgroundColor: '#A0CDEE' },
  buttonText: { ...Typography.heading, color: '#fff' },
  confirmIcon: { position: 'absolute', right: 10, width: 30, height: 30 },
});

export default SetNewPasswordScreen;