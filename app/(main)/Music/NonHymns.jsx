import { StyleSheet } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import MainHeader from "../../../components/header";
import Spacer from "../../../components/Spacer";

const NonHymnsList = () => {
  return (
    <ThemedView safe style={[styles.safeArea, { flex: 1 }]}>
      <MainHeader />
      <Spacer />
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
