import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedView from "../../components/ThemedView";

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView safe skipBottomPadding style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            height: 60 + insets.bottom, // Add bottom inset to avoid overlap
            paddingHorizontal: 10,

            paddingBottom: insets.bottom > 0 ? insets.bottom : 10, // Fallback to 10 if inset is 0
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#6849a7",
          tabBarActiveBackgroundColor: "#6849a9",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Music"
          options={{
            tabBarLabel: "Music",
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-notes-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Stories"
          options={{
            tabBarLabel: "Stories",
            tabBarIcon: ({ color }) => (
              <Ionicons name="play-circle-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="About"
          options={{
            tabBarLabel: "About",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </ThemedView>
  );
}
