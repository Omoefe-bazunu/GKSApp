// components/UploadButton.js
import { Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UploadButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/upload"); // 👈 this must match the file path e.g. app/upload.js
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Upload New Song</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3b2772",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
