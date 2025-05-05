import { TripData, clearAllTripData, getTripData } from "@/utils/storageHelper";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TripInfoCard from "../../components/TripInfoCard"; // Adjust the path if necessary

export default function StatsScreen() {
  const [tripData, setTripData] = useState<TripData[] | null>(null);

  useEffect(() => {
    const fetchTripData = async () => {
      const data = await getTripData();
      // unpack
      const tripArray = data ? Object.values(data) : [];
      // sort by trip date if available
      tripArray.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
      setTripData(tripArray);
    };

    fetchTripData();
  }, []);

  const handleClearAll = async () => {
    try {
      await clearAllTripData();
      setTripData(null); // Clear the state
      Alert.alert("Success", "All trip data has been cleared.");
    } catch (error) {
      console.error("Error clearing trip data:", error);
      Alert.alert("Error", "Failed to clear trip data.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {tripData && tripData.length > 0 ? (
          tripData.map((trip, index) => (
            <TripInfoCard key={index} trip={trip} />
          ))
        ) : (
          <Text style={styles.emptyText}>No trip data available.</Text>
        )}
        <Button title="Clear All Trips" onPress={handleClearAll} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
