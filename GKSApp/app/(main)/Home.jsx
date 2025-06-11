import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MainHeader from "../../components/header";
import Spacer from "../../components/Spacer";
import { useRouter } from "expo-router"; // Added import for navigation

const HomeScreen = () => {
  const router = useRouter(); // Use the router hook for navigation
  return (
    <ThemedView safe style={styles.safeArea}>
      <MainHeader />
      <Spacer />
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => router.push("(main)/Music/HymnsList")}
        >
          <Ionicons name="musical-notes-outline" size={40} color="#fff" />
          <ThemedText style={styles.sectionText}>Hymns</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.divider} />
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => router.push("(main)/Music/NonHymnsList")}
        >
          <Ionicons name="list-outline" size={40} color="#fff" />
          <ThemedText style={styles.sectionText}>Non-Hymns</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.divider} />
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => router.push("(main)/Stories")}
        >
          <Ionicons name="play-circle-outline" size={40} color="#fff" />
          <ThemedText style={styles.sectionText}>Stories</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.divider} />
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => router.push("(main)/Quiz")}
        >
          <Ionicons name="book-outline" size={40} color="#fff" />
          <ThemedText style={styles.sectionText}>Quiz Q&A</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 15,
    backgroundColor: "#fff", // Override theme background for header
  },
  headerCircle: {
    width: 30,
    height: 30,
    backgroundColor: Colors.dark.iconColorFocused,
    borderRadius: 15,
  },
  section: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10, // Add spacing between icon and text
  },
  divider: {
    height: 1,
    backgroundColor: "white",
    marginHorizontal: 30,
    opacity: 0.5,
  },
});

export default HomeScreen;
