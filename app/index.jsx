import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Added import for navigation
import { Colors } from "../constants/Colors";

const OnboardingScreen = () => {
  const router = useRouter(); // Use the router hook for navigation

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>GKSApp</Text>
      <Text style={styles.tagline}>
        Enjoy rich spiritual songs & animated bible stories
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
  circle: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    marginBottom: 30,
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
