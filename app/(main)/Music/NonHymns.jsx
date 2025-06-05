import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import MainHeader from "../../../components/header";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const NonHymnsList = () => {
  const navigation = useNavigation();

  return (
    <ThemedView safe style={[styles.safeArea, { flex: 1 }]}>
      <MainHeader />
      {/* Up arrow button - unchanged from your request */}
      <TouchableOpacity
        onPress={() => router.push("/Music")}
        style={[styles.backButton, { marginHorizontal: 10, marginTop: 10 }]}
      >
        <Ionicons name="arrow-up" size={24} color="#fff" />
      </TouchableOpacity>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Oops!</ThemedText>
        <ThemedText style={styles.subTitle}>No Music here yet.</ThemedText>
        <ThemedText style={styles.pText}>
          Rich and spirit-filled music of the GKS coming soon...
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
  },
  subTitle: {
    fontSize: 16,
  },
  pText: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default NonHymnsList;
