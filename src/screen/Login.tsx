import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // State khusus error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.trim()) {
      setEmailError("Email harus diisi!");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Format email tidak valid");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password harus diisi!");
      valid = false;
    }

    return valid;
  };

  async function signInWithEmail() {
    if (!validate()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setGeneralError(error.message);
    else setGeneralError("");

    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!validate()) return;

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error) setGeneralError(error.message);
    else setGeneralError("");

    if (!session)
      Alert.alert("Success");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <TextInput
        placeholder="Email"
        style={[styles.input, emailError ? styles.inputError : null]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Password"
        style={[styles.input, passwordError ? styles.inputError : null]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {generalError ? <Text style={styles.generalError}>{generalError}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Sign in" onPress={signInWithEmail} disabled={loading} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign up" onPress={signUpWithEmail} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
  generalError: {
    color: "red",
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 8,
  },
});