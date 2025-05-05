import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import TripInfoCard from "../../components/TripInfoCard"; // Adjust the path if necessary
import { getTripData, TripData } from "../../utils/storageHelper";

export default function StatsScreen() {
  const [tripData, setTripData] = useState<TripData[] | null>(null);

  useEffect(() => {
    const fetchTripData = async () => {
      const data = await getTripData();
      setTripData(data);
    };

    fetchTripData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {tripData && tripData.length > 0 ? (
        tripData.map((trip, index) => <TripInfoCard key={index} trip={trip} />)
      ) : (
        <Text style={styles.emptyText}>No trip data available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
