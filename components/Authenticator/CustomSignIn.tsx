import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signIn, signInWithRedirect } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

const CustomSignIn = () => {
  const { toSignUp } = useAuthenticator();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailPasswordSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn({ username: email, password });
    } catch (err: any) {
      setError(err.message || "Sign-in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithRedirect({ provider: "Google" });
    } catch (err: any) {
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      )}

      {!loading && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="Sign In with Email"
            onPress={handleEmailPasswordSignIn}
          />

          <View style={styles.divider}>
            <Text>OR</Text>
          </View>

          <Button
            title="Sign In with Google"
            onPress={handleSignInWithGoogle}
          />

          <TouchableOpacity onPress={toSignUp}>
            <Text style={styles.link}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  divider: {
    marginVertical: 16,
    alignItems: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    marginTop: 20,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default CustomSignIn;
