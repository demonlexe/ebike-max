// utils/storageHelper.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import { v4 as uuidv4 } from "uuid";

export type NewTripData = {
  origin: string;
  destination: string;
  startVoltage: number;
  elevationGain: number;
  elevationLoss: number;
  distance: number;
};

export type TripData = NewTripData & {
  date: string; // ISO date string
  id: string;
  endVoltage?: number;
};

export type TripDataDictionary = {
  [key: string]: TripData;
};

const TRIP_DATA_KEY = "@tripData";

/**
 * Appends a trip to the stored trip data dictionary.
 */
export const saveTripData = async (tripData: NewTripData): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(TRIP_DATA_KEY);
    const tripDict: TripDataDictionary = existingData
      ? JSON.parse(existingData)
      : {};

    const id = uuidv4();
    const date = new Date().toISOString();
    const {
      origin,
      destination,
      startVoltage,
      elevationGain,
      elevationLoss,
      distance,
    } = tripData;

    const dataToSave: TripData = {
      id,
      origin,
      destination,
      startVoltage,
      elevationGain,
      elevationLoss,
      distance,
      endVoltage: undefined, // Initially undefined
      date: date,
    };

    tripDict[id] = dataToSave; // Save the trip using the ID as the key

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
  } catch (error) {
    console.error("Error fetching trip data:", error);
    if (Platform.OS === "android") {
      ToastAndroid.show("Failed to fetch trip data.", ToastAndroid.LONG); // Show error toast only on Android
    }
  }
  return null;
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
