import { Alert, Platform, ToastAndroid } from "react-native";

/**
 * Displays a toast message for errors, compatible with both Android and iOS.
 * @param message The error message to display.
 */
export function showErrorToast(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert("Error", message);
  }
}
