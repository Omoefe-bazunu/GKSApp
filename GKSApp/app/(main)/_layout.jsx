import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView";

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView safe skipBottomPadding style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/bg.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "rgba(255,255,255,0.9)",
              borderTopWidth: 0,
              height: 60 + insets.bottom,
              paddingHorizontal: 10,
              paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            },
            tabBarLabelPosition: "below-icon",
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
                <Ionicons
                  name="musical-notes-outline"
                  size={24}
                  color={color}
                />
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
            name="Quiz"
            options={{
              tabBarLabel: "Quiz",
              tabBarIcon: ({ color }) => (
                <Ionicons name="book-outline" size={24} color={color} />
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
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // opacity: 0.9,
  },
});
