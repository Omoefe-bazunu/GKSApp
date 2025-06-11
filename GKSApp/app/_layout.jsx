import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Onboarding",
        }}
      />
      <Stack.Screen
        name="(main)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
