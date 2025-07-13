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
  route: any;
};

const SetNewPasswordScreen = ({ navigation, route }: SetNewPasswordScreenProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // --- 1. TAMBAHKAN STATE UNTUK MELACAK FOKUS INPUT ---
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  
  const { email, otp } = route.params;

  const handleSetNewPassword = async () => {
    if (password.length < 6) {
      Alert.alert('Password too short', 'Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure your passwords match.');
      return;
    }

    setLoading(true);
    
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'recovery',
    });
    
    if (verifyError) {
      setLoading(false);
      Alert.alert('Invalid Code', verifyError.message);
      return; 
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (updateError) {
      Alert.alert('Error Updating Password', updateError.message);
    } else {
      Alert.alert(
        'Password Updated',
        'Your password has been updated successfully. Please login with your new password.'
      );
      navigation.navigate('Login');
    }
  };

  const isFormFilled = password.length > 0 && confirmPassword.length > 0;

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
        
        {/* --- 2. PERBARUI PROPS TextInput PERTAMA --- */}
        <TextInput
          style={[
            styles.input,
            isPasswordFocused && styles.inputFocused // Terapkan style jika fokus
          ]}
          placeholder="New password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          onFocus={() => setIsPasswordFocused(true)} // Set state fokus ke true
          onBlur={() => setIsPasswordFocused(false)} // Kembalikan ke false saat tidak fokus
        />
        {/* --- 2. PERBARUI PROPS TextInput KEDUA --- */}
        <TextInput
          style={[
            styles.input, 
            {marginTop: 15},
            isConfirmPasswordFocused && styles.inputFocused // Terapkan style jika fokus
          ]}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
          onFocus={() => setIsConfirmPasswordFocused(true)} // Set state fokus ke true
          onBlur={() => setIsConfirmPasswordFocused(false)} // Kembalikan ke false saat tidak fokus
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
    ...Typography.body, // Diubah dari heading
    fontFamily: 'Satoshi', // Diubah dari medium
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
  // --- 3. TAMBAHKAN STYLE BARU UNTUK KONDISI FOKUS ---
  inputFocused: {
    borderColor: '#1076BC', // Warna biru saat input aktif
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