import { safeParseNumber } from "@/utils/safeParseNumber";
import { NewTripData, saveTripData } from "@/utils/storageHelper";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

export default function NewTripScreen() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    startVoltage: "",
    elevationGain: "",
    elevationLoss: "",
    distance: "",
  });

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Helper function to update form data
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Helper function to reset form data
  const resetFormData = () => {
    setFormData({
      origin: "",
      destination: "",
      startVoltage: "",
      elevationGain: "",
      elevationLoss: "",
      distance: "",
    });
  };

  const handleSubmit = () => {
    const {
      origin,
      destination,
      startVoltage,
      elevationGain,
      elevationLoss,
      distance,
    } = formData;

    if (!origin || !destination || !startVoltage) {
      alert("Please fill in all fields.");
      return;
    }
    if (isNaN(parseFloat(startVoltage))) {
      alert("Please enter a valid voltage.");
      return;
    }

    const parsedElevationGain = parseFloat(elevationGain || "0");
    const parsedElevationLoss = parseFloat(elevationLoss || "0");
    const parsedDistance = parseFloat(distance || "0");
    if (
      isNaN(parsedElevationGain) ||
      isNaN(parsedElevationLoss) ||
      isNaN(parsedDistance)
    ) {
      alert(
        "Please enter valid numeric values for elevation gain, loss, and distance."
      );
      return;
    }
    if (parsedDistance <= 0) {
      alert("Distance must be greater than 0.");
      return;
    }

    // Save the trip data
    const dat: NewTripData = {
      origin,
      destination,
      startVoltage: parseFloat(startVoltage),
      elevationGain: parsedElevationGain,
      elevationLoss: parsedElevationLoss,
      distance: parsedDistance,
    };

    saveTripData(dat)
      .then(() => {
        alert("Trip data saved successfully!");
        resetFormData(); // Reset the form after successful submission
      })
      .catch((error) => {
        console.error("Error saving trip data:", error);
        alert("Failed to save trip data.");
      });
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
        value={formData.origin}
        onChangeText={(value) => updateFormData("origin", value)}
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
        value={formData.destination}
        onChangeText={(value) => updateFormData("destination", value)}
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
        value={formData.startVoltage}
        onChangeText={(value) => updateFormData("startVoltage", value)}
        keyboardType="decimal-pad"
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
        value={formData.elevationGain}
        onChangeText={(value) =>
          updateFormData("elevationGain", safeParseNumber(value))
        }
        keyboardType="decimal-pad"
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
        value={formData.elevationLoss}
        onChangeText={(value) =>
          updateFormData("elevationLoss", safeParseNumber(value))
        }
        keyboardType="decimal-pad"
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
        value={formData.distance}
        onChangeText={(value) =>
          updateFormData("distance", safeParseNumber(value))
        }
        keyboardType="decimal-pad"
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
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
});
