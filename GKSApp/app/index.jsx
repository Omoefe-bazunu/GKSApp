import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")} // Update with your image path
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>GKSApp</Text>
      <Text style={styles.tagline}>
        Enjoy rich spiritual songs, study edifying biblical topics & learn from
        thrilling animated bible stories and more.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("(main)/Home")}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    border: "8px solid #00",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default OnboardingScreen;
