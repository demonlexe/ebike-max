import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

export default function NewTripScreen() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [voltage, setVoltage] = useState("");

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleSubmit = () => {
    console.log({ origin, destination, voltage });
  };

  const colors = {
    background: isDarkMode ? "#000" : "#f9f9f9",
    text: isDarkMode ? "#fff" : "#000",
    invertText: isDarkMode ? "#000" : "#fff",
    inputBackground: isDarkMode ? "#1c1c1e" : "#fff",
    border: isDarkMode ? "#3a3a3c" : "#ccc",
    placeholder: isDarkMode ? "#999" : "#666",
    sectionBackground: isDarkMode ? "#2c2c2e" : "#f0f0f0",
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.label, { color: colors.text }]}>Origin</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="e.g. Waffle House, 1647 11th Avenue NE"
        placeholderTextColor={colors.placeholder}
        value={origin}
        onChangeText={setOrigin}
      />

      <Text style={[styles.label, { color: colors.text }]}>Destination</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="e.g. Downtown San Francisco"
        placeholderTextColor={colors.placeholder}
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Bike Starting Voltage
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="e.g. 49.7"
        placeholderTextColor={colors.placeholder}
        value={voltage}
        onChangeText={setVoltage}
        keyboardType="numeric"
      />

      <View
        style={[
          styles.mapPlaceholder,
          { backgroundColor: colors.sectionBackground },
        ]}
      >
        <Text style={{ color: colors.placeholder }}>[Map Placeholder]</Text>
      </View>

      <Text style={[styles.label, { color: colors.text }]}>Trip Insights</Text>
      <Text style={[styles.insightText, { color: colors.text }]}>
        ↑ 341 ft ・↓ 335 ft ・8.3 miles
      </Text>
      <View
        style={[
          styles.chartPlaceholder,
          { backgroundColor: colors.sectionBackground },
        ]}
      >
        <Text style={{ color: colors.placeholder }}>[Chart Placeholder]</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Done" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  insightText: {
    fontSize: 14,
    marginBottom: 8,
  },
  chartPlaceholder: {
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
});
