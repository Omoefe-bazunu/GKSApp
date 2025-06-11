import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const MainHeader = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>GKSApp</ThemedText>
      <TouchableOpacity>
        <Ionicons name="notifications" size={24} color="#6849a7" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6849a7",
  },
});

export default MainHeader;
