import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator, // Import ActivityIndicator untuk loading
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Typography } from "../../styles/typography"; // Import Typography

// --- 1. TERIMA PROPS NAVIGATION ---
// Ubah definisi komponen untuk menerima 'navigation'
const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Both email and password must be filled!");
      return false;
    }
    return true;
  };

  async function signInWithEmail() {
    if (!validate()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("user not found")) {
        setError("Email is not registered!");
      } else if (error.message.toLowerCase().includes("invalid login credentials")) {
        setError("Incorrect password!");
      } else {
        setError(error.message);
      }
    } else {
      setError("");
      // Navigasi ke Home terjadi secara otomatis oleh listener auth di App.tsx atau Navigation.tsx
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/bukitvista-logo.png")}
        style={styles.logo}
      />

      <Text style={styles.description}>
        Insert your registered email and password
      </Text>

      <View
        style={[
          styles.inputContainer,
          error && error === "Email is not registered!" ? styles.inputErrorContainer : null,
        ]}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor="#5B5E6B"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          error && error === "Incorrect password!" ? styles.inputErrorContainer : null,
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="#5B5E6B"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* --- 2. TAMBAHKAN FUNGSI onPress --- */}
      <TouchableOpacity 
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('VerificationEmail')}
      >
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.disabledButton]}
        onPress={signInWithEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.loginButtonText}>Log In</Text>
            <Image
              source={require("../../assets/icons/arrowlogin.png")}
              style={styles.arrowIcon}
            />
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("../../assets/icons/google-logo.png")}
          style={styles.googleLogo}
        />
        <Text style={styles.googleButtonText}>Continue With Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 80,
  },
  description: {
    ...Typography.subheading, // Terapkan Typography
    color: "#5B5E6B",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#1076BC",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    width: "100%",
  },
  inputErrorContainer: {
    borderColor: "#DD0101",
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    ...Typography.body, 
  },
  errorText: {
    ...Typography.body, 
    color: "#DD0101",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    ...Typography.body, // Terapkan Typography
    color: "#1076BC",
    fontFamily: 'Satoshi-Medium',
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#1076BC",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 16,
    height: 50, // Samakan tinggi tombol
  },
  disabledButton: {
    backgroundColor: "#5B5E6B",
  },
  loginButtonText: {
    ...Typography.heading, // Terapkan Typography
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    marginLeft: 18, // Beri space agar center dengan adanya icon
  },
  arrowIcon: {
    width: 18,
    height: 18,
  },
  orText: {
    ...Typography.body, // Terapkan Typography
    color: "#5B5E6B",
    marginTop: 5,
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1076BC",
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    ...Typography.heading, // Terapkan Typography
    color: "#1076BC",
  },
});

export default Login;