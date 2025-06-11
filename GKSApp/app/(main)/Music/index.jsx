import { router } from "expo-router";
import { StyleSheet } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import MainHeader from "../../../components/header";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";

const MusicScreen = () => {
  return (
    <ThemedView safe style={styles.safeArea}>
      <MainHeader />
      <Spacer />

      <ThemedView style={styles.section}>
        <Ionicons name="musical-notes-outline" size={40} color="#fff" />
        <ThemedText style={styles.sectionTitle}>Hymns</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Enjoy rich hymns from our collections
        </ThemedText>
        <ThemedButton
          text="Open"
          onPress={() => router.push("/Music/HymnsList")}
          backgroundColor="#fff"
        />
      </ThemedView>

      <ThemedView style={styles.divider} />

      <ThemedView style={styles.section}>
        <Ionicons name="list-outline" size={40} color="#fff" />
        <ThemedText style={styles.sectionTitle}>Non-Hymns</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Listen to spiritually edifying songs that are not hymns
        </ThemedText>
        <ThemedButton
          text="Open"
          onPress={() => router.push("/Music/NonHymnsList")}
          backgroundColor="#fff"
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  section: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  sectionDescription: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#fff",
    marginHorizontal: 30,
    opacity: 0.5,
  },
});

export default MusicScreen;
