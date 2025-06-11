import { StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import MainHeader from "../../components/header";
import Spacer from "../../components/Spacer";

const AboutScreen = () => {
  return (
    <ThemedView safe style={styles.safeArea}>
      <MainHeader />
      <Spacer />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>About</ThemedText>
        <ThemedText style={styles.subTitle}>
          GKSApp is a free platform where you can access the Theocratic songs of
          praise (Hymns) and other melodious songs used for worship at God’s
          Kingdom Society, The Church of the Living God, as well as watch
          edifying and entertaining biblical animation videos amongst other
          features
        </ThemedText>
        <ThemedText style={[styles.subTitle, { marginTop: 10 }]}>
          The App was designed and developed by HIGH-ER ENTERPRISES, a digital
          solutions start-up founded and managed by Omoefe Bazunu.
        </ThemedText>

        <ThemedText style={styles.pText}>
          +2349043970401; info@higher.com.ng www.higher.com.ng
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
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  pText: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: 20,
    borderColor: "#fff",
  },
});

export default AboutScreen;
