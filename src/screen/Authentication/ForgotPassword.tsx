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

type ForgotPasswordScreenProps = {
  navigation: any; 
};

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (email === '') {
      Alert.alert('Email required', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'com.bvgo.app://auth', 
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        'Check your email',
        'A password reset link has been sent to your email address.'
      );
      navigation.goBack();
    }
    setLoading(false);
  };

  const isEmailFilled = email.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require('../../assets/bukitvista-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Enter your email to receive a password reset link
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.confirmButton, !isEmailFilled && styles.disabledButton]}
          onPress={handlePasswordReset}
          disabled={!isEmailFilled || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText}>Send Reset Link</Text>
              <Image 
                source={require('../../assets/icons/arrowlogin.png')} 
                style={styles.confirmIcon}
              />
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          {/* 2. MENGGANTI ASET GAMBAR IKON */}
          <Image 
            source={require('../../assets/icons/arrowbacktologin.png')}
            style={styles.backIcon}
          />
          <Text style={[styles.buttonText, styles.backButtonText]}>
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Menggunakan Typography yang sudah diimpor
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    ...Typography.heading, // Menggunakan style 'heading'
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F7F7F7',
    ...Typography.heading, // Teks di dalam input juga menggunakan 'heading'
    fontWeight: 'normal', // Tapi kita override agar tidak bold
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#1076BC',
    position: 'relative',
  },
  disabledButton: {
    backgroundColor: '#A0CDEE',
  },
  buttonText: {
    ...Typography.heading, // Tombol utama menggunakan 'heading'
    color: '#fff', // Dengan warna teks putih
  },
  confirmIcon: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
  },
  orText: {
    ...Typography.body, // Teks 'OR' menggunakan style 'body'
    marginVertical: 20,
  },
  backButton: {
    backgroundColor: '#E9EAEC',
  },
  backButtonText: {
    ...Typography.heading, // Tombol kembali juga 'heading'
    color: '#5B5E6B', // Tapi dengan warna dari 'body'
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
});

export default ForgotPasswordScreen;