// utils/storageHelper.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export type TripData = {
  origin: string;
  destination: string;
  startVoltage: number;
  endVoltage?: number;
  tripInsights: {
    elevationGain: number;
    elevationLoss: number;
    distance: number;
  };
  date?: string; // Optional date field
};

export type TripDataDictionary = {
  [key: string]: TripData;
};

const TRIP_DATA_KEY = "@tripData";

/**
 * Appends a trip to the stored trip data dictionary.
 */
export const saveTripData = async (tripData: TripData): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(TRIP_DATA_KEY);
    const tripDict: TripDataDictionary = existingData
      ? JSON.parse(existingData)
      : {};

    const id = uuidv4();
    const date = new Date().toISOString();
    tripData.date = date;

    tripDict[id] = tripData; // Save the trip using the ID as the key

    await AsyncStorage.setItem(TRIP_DATA_KEY, JSON.stringify(tripDict));
  } catch (e) {
    console.error("Failed to save trip data:", e);
  }
};

/**
 * Returns the dictionary of saved trip data.
 */
export const getTripData = async (): Promise<TripDataDictionary | null> => {
  try {
    const storedData = await AsyncStorage.getItem(TRIP_DATA_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (e) {
    console.error("Failed to load trip data:", e);
    return null;
  }
};

/**
 * Updates a specific trip in the stored trip data dictionary.
 */
export const updateTripData = async (
  id: string,
  updatedTripData: Partial<TripData>
): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(TRIP_DATA_KEY);
    const tripDict: TripDataDictionary = existingData
      ? JSON.parse(existingData)
      : {};

    if (tripDict[id]) {
      tripDict[id] = { ...tripDict[id], ...updatedTripData }; // Merge updates
      await AsyncStorage.setItem(TRIP_DATA_KEY, JSON.stringify(tripDict));
    } else {
      console.error(`Trip with ID ${id} not found.`);
    }
  } catch (e) {
    console.error("Failed to update trip data:", e);
  }
};

/**
 * Clears all saved trip data.
 */
export const clearAllTripData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TRIP_DATA_KEY);
  } catch (e) {
    console.error("Failed to clear all trip data:", e);
  }
};
