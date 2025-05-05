import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

function CustomTabBar(props: BottomTabBarProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push("/")}
      >
        <Ionicons name="home-outline" size={24} color="#aaa" />
      </TouchableOpacity>

      <View style={styles.fabWrapper}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/new-trip")}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push("/stats")}
      >
        <Ionicons name="pulse-outline" size={24} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="new-trip" />
      <Tabs.Screen name="stats" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 64,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
  },
  fabWrapper: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
});
