import React from "react";
import { StyleSheet, View } from "react-native";

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyBox: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
});
