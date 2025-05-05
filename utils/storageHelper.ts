// utils/storageHelper.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

export type TripData = {
  origin: string;
  destination: string;
  voltage: string;
  tripInsights: {
    elevationGain: number;
    elevationLoss: number;
    distance: number;
  };
};

const TRIP_DATA_KEY = "@tripData";

/**
 * Appends a trip to the stored trip data array.
 */
export const saveTripData = async (tripData: TripData): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(TRIP_DATA_KEY);
    const tripArray: TripData[] = existingData ? JSON.parse(existingData) : [];
    tripArray.push(tripData);
    await AsyncStorage.setItem(TRIP_DATA_KEY, JSON.stringify(tripArray));
  } catch (e) {
    console.error("Failed to save trip data:", e);
  }
};

/**
 * Returns the array of saved trip data.
 */
export const getTripData = async (): Promise<TripData[] | null> => {
  try {
    const storedData = await AsyncStorage.getItem(TRIP_DATA_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (e) {
    console.error("Failed to load trip data:", e);
    return null;
  }
};

/**
 * Clears all saved trip data.
 */
export const removeTripData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TRIP_DATA_KEY);
  } catch (e) {
    console.error("Failed to remove trip data:", e);
  }
};
