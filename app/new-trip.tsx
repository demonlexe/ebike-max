import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function NewTripScreen() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = () => {
    // submission logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter origin"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
});
