import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Error messages
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
      // Analisis error Supabase
      if (error.message.toLowerCase().includes("user not found")) {
        setError("Email is not registered!");
      } else if (error.message.toLowerCase().includes("invalid login credentials")) {
        setError("Incorrect password!");
      } else {
        setError(error.message);
      }
    } else {
      setError("");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icons/bukitvista-logo.png")}
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

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.disabledButton]}
        onPress={signInWithEmail}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
        <Image
          source={require("../assets/icons/arrowlogin.png")}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("../assets/icons/google-logo.png")}
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
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
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
    color: "#0E0E0E",
  },
  errorText: {
    color: "#DD0101",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#1076BC",
    fontSize: 12,
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
  },
  disabledButton: {
    backgroundColor: "#515C6F",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  arrowIcon: {
    width: 18,
    height: 18,
  },
  orText: {
    color: "#515C6F",
    marginVertical: 12,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#1076BC",
    fontWeight: "bold",
  },
});