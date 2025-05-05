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
  const [tripInsights, setTripInsights] = useState<{
    elevationGain?: number;
    elevationLoss?: number;
    distance?: number;
  }>({
    elevationGain: undefined,
    elevationLoss: undefined,
    distance: undefined,
  });

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleSubmit = () => {
    console.log({ origin, destination, voltage, tripInsights });
  };

  const stringifyIfNumber = (value: number | undefined) => {
    if (value === undefined) {
      return undefined;
    }
    return String(value);
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

      <Text style={[styles.label, { color: colors.text }]}>Elevation Gain</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="e.g. 341 ft"
        placeholderTextColor={colors.placeholder}
        value={stringifyIfNumber(tripInsights.elevationGain)}
        onChangeText={(value) =>
          setTripInsights({ ...tripInsights, elevationGain: parseFloat(value) })
        }
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: colors.text }]}>Elevation Loss</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="e.g. 335 ft"
        placeholderTextColor={colors.placeholder}
        value={stringifyIfNumber(tripInsights.elevationLoss)}
        onChangeText={(value) =>
          setTripInsights({ ...tripInsights, elevationLoss: parseFloat(value) })
        }
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: colors.text }]}>Distance</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="e.g. 8.3 miles"
        placeholderTextColor={colors.placeholder}
        value={stringifyIfNumber(tripInsights.distance)}
        onChangeText={(value) =>
          setTripInsights({ ...tripInsights, distance: parseFloat(value) })
        }
        keyboardType="numeric"
      />

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
