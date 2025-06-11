import { Pressable, StyleSheet, Text } from "react-native";

function ThemedButton({ text, onPress, backgroundColor = "#4a6de5", style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor },
        style,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: "#6849a7",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ThemedButton;
