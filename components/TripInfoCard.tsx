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
import { TripData } from "../utils/storageHelper";

type Props = {
  trip: TripData;
};

const TripInfoCard: React.FC<Props> = ({ trip }) => {
  const [endVoltage, setEndVoltage] = useState<number | undefined>(
    trip.endVoltage
  );
  const [isEditing, setIsEditing] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const colors = {
    background: isDarkMode ? "#1c1c1e" : "#fff",
    text: isDarkMode ? "#fff" : "#000",
    border: isDarkMode ? "#333" : "#ddd",
    secondaryText: isDarkMode ? "#aaa" : "#555",
  };

  const handleSaveEndVoltage = () => {
    if (endVoltage !== undefined) {
      // Save the updated endVoltage to the trip data (you may need to update AsyncStorage here)
      Alert.alert("Success", "End voltage saved!");
      setIsEditing(false);
    } else {
      Alert.alert("Error", "Please enter a valid voltage.");
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
      {endVoltage !== undefined ? (
        <Text style={[styles.text, { color: colors.secondaryText }]}>
          Voltage Used: {endVoltage - trip.startVoltage} V
        </Text>
      ) : (
        <>
          {isEditing ? (
            <View>
              <TextInput
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder="Enter end voltage"
                placeholderTextColor={colors.secondaryText}
                keyboardType="numeric"
                onChangeText={(text) => setEndVoltage(Number(text))}
              />
              <Button title="Save" onPress={handleSaveEndVoltage} />
            </View>
          ) : (
            <Button
              title="Add End Voltage"
              onPress={() => setIsEditing(true)}
            />
          )}
        </>
      )}
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Elevation Gain: {trip.tripInsights.elevationGain} ft
      </Text>
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Elevation Loss: {trip.tripInsights.elevationLoss} ft
      </Text>
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Distance: {trip.tripInsights.distance} mi
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});

export default TripInfoCard;
