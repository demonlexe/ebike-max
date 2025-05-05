// components/FooterNavigation.tsx
import Icon from "@react-native-vector-icons/ionicons";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const FooterNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="home-outline" size={24} color="#aaa" />
      </TouchableOpacity>

      <View style={styles.fabWrapper}>
        <TouchableOpacity style={styles.fab}>
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconButton}>
        <Icon name="pulse-outline" size={24} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
};

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

export default FooterNavigation;
