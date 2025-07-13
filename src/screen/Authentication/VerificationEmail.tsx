import React, { useState, useRef, useEffect } from 'react';
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

type VerificationEmailScreenProps = {
  navigation: any;
};

const VerificationEmailScreen = ({ navigation }: VerificationEmailScreenProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false); // State untuk mengubah tampilan

  // --- State & Logic untuk OTP Input ---
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputs = useRef<TextInput[]>([]);

  // Fungsi untuk meminta kode OTP
  const handleRequestCode = async () => {
    if (email === '') {
      Alert.alert('Email required', 'Please enter your email address.');
      return;
    }
    setLoading(true);
  
    // --- Console Log Ditambahkan Di Sini ---
    console.log(`Mencoba memanggil Edge Function 'send-otp' dengan email: ${email}`);
  
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { email },
      });
  
      // Log apapun respons yang kembali, baik data maupun error
      console.log('Respons dari Edge Function:', { data, error });
  
      if (error) {
        // Kita log seluruh objek error untuk detail yang lebih lengkap
        console.error('Detail Error dari Edge Function:', JSON.stringify(error, null, 2));
        Alert.alert('Error', `Edge Function failed: ${error.message}`);
      } else {
        Alert.alert('Code Sent', `A confirmation code has been sent to ${email}.`);
        setCodeSent(true);
      }
    } catch (catchError) {
      // Menangkap error yang mungkin lebih fatal (misal: network error)
      console.error('Error saat memanggil invoke:', catchError);
      Alert.alert('Invoke Error', 'Failed to invoke the edge function.');
    }
  
    setLoading(false);
  };
  
  // --- FUNGSI DIPERBARUI ---
  // Fungsi ini tidak lagi memverifikasi, hanya menavigasi dengan membawa data
  const handleVerifyCode = (code: string) => {
    // Kita tidak verifikasi di sini lagi.
    // Langsung navigasi ke halaman berikutnya sambil membawa email dan OTP.
    navigation.navigate('SetNewPassword', { email: email, otp: code });
  };

  // Efek untuk memanggil navigasi saat 6 digit OTP sudah terisi
  // Logika ini tetap sama dan akan memanggil handleVerifyCode yang baru
  useEffect(() => {
    const code = otp.join('');
    if (code.length === 6) {
      handleVerifyCode(code);
    }
  }, [otp]);


  // --- Render Tampilan (TIDAK ADA PERUBAHAN DI SINI) ---

  // Tampilan untuk memasukkan email
  const renderEmailInputView = () => (
    <>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send your confirmation code to reset password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="your.email@example.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      <TouchableOpacity
        style={[styles.button, styles.confirmButton, !email && styles.disabledButton]}
        onPress={handleRequestCode}
        disabled={!email || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.buttonText}>Request code</Text>
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
        <Image 
          source={require('../../assets/icons/arrowbacktologin.png')}
          style={styles.backIcon}
        />
        <Text style={[styles.buttonText, styles.backButtonText]}>Back to login</Text>
      </TouchableOpacity>
    </>
  );

  // Tampilan untuk memasukkan kode OTP
  const renderOtpInputView = () => (
    <>
      <Text style={styles.subtitle}>Enter your confirmation code</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) {
                inputs.current[index] = ref;
              }
            }}
            style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : null
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => {
              const newOtp = [...otp];
              newOtp[index] = text;
              setOtp(newOtp);
              if (text && index < 5) {
                inputs.current[index + 1].focus();
              }
            }}
            onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                    inputs.current[index - 1].focus();
                }
            }}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleRequestCode}>
        <Text style={styles.resendText}>Resend confirmation code</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/bukitvista-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {codeSent ? renderOtpInputView() : renderEmailInputView()}
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
    ...Typography.subheading,
    fontFamily: 'Satoshi-Medium',
    color: '#0E0E0E',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#1076BC',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    ...Typography.body,
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
  confirmButton: {
    backgroundColor: '#1076BC',
    position: 'relative',
  },
  disabledButton: { backgroundColor: '#A0CDEE' },
  buttonText: { ...Typography.heading, color: '#fff' },
  confirmIcon: { position: 'absolute', right: 10, width: 30, height: 30 },
  orText: { ...Typography.body, marginVertical: 20 },
  backButton: { backgroundColor: '#E9EAEC' },
  backButtonText: { ...Typography.heading, color: '#5B5E6B' },
  backIcon: { width: 30, height: 30, position: 'absolute', left: 10 },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  otpInput: {
    width: 48,
    height: 52,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    ...Typography.heading,
    fontSize: 22,
  },
  otpInputFilled: {
    borderColor: '#1076BC',
    color: '#1076BC',
  },
  resendText: {
    ...Typography.subheading,
    color: '#1076BC',
    fontFamily: 'Satoshi-Medium',
  },
});

export default VerificationEmailScreen;