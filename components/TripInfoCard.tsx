import { safeParseNumber } from "@/utils/safeParseNumber";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { TripData, updateTripData } from "../utils/storageHelper";

type Props = {
  trip: TripData;
  refreshData: () => void; // Callback to refresh parent data
};

const TripInfoCard: React.FC<Props> = ({ trip, refreshData }) => {
  const [editingEndVoltage, setEditingEndVoltage] = useState<
    string | number | undefined
  >(trip.endVoltage);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const colors = {
    background: isDarkMode ? "#1c1c1e" : "#fff",
    text: isDarkMode ? "#fff" : "#000",
    border: isDarkMode ? "#333" : "#ddd",
    secondaryText: isDarkMode ? "#aaa" : "#555",
  };

  const handleSaveEndVoltage = async () => {
    if (editingEndVoltage === undefined || isNaN(Number(editingEndVoltage))) {
      Alert.alert("Error", "Please enter a valid end voltage.");
      return;
    }

    try {
      // Update the trip data in AsyncStorage
      await updateTripData(trip.id, { endVoltage: Number(editingEndVoltage) });
      Alert.alert("Success", "End voltage updated successfully!");
      refreshData(); // Trigger parent to refresh data
    } catch (error) {
      console.error("Failed to update trip data:", error);
      Alert.alert("Error", "Failed to update trip data.");
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {trip.origin} → {trip.destination}
      </Text>
      {trip.endVoltage !== undefined ? (
        <Text style={[styles.text, { color: colors.secondaryText }]}>
          Voltage Used: {trip.startVoltage - trip.endVoltage}V (
          {trip.startVoltage}V to {trip.endVoltage}V)
        </Text>
      ) : (
        <View>
          <View style={styles.voltageRow}>
            <View style={styles.voltageContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Start Voltage
              </Text>
              <Text style={[styles.text, { color: colors.secondaryText }]}>
                {trip.startVoltage}V
              </Text>
            </View>
            <View style={styles.voltageContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                End Voltage
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder="Enter end voltage"
                placeholderTextColor={colors.secondaryText}
                keyboardType="decimal-pad"
                value={editingEndVoltage?.toString()}
                onChangeText={(text) =>
                  setEditingEndVoltage(safeParseNumber(text))
                }
              />
            </View>
          </View>
          <Button title="Save" onPress={handleSaveEndVoltage} />
        </View>
      )}
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Elevation Gain: {trip.elevationGain} ft
      </Text>
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Elevation Loss: {trip.elevationLoss} ft
      </Text>
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Distance: {trip.distance} mi
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  voltageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  voltageContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default TripInfoCard;
