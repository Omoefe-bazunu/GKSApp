import { Stack } from "expo-router";

export default function MusicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#6849a7" },
        headerTintColor: "#fff",
      }}
    />
  );
}
