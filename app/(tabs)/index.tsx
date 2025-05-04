import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { Button, StyleSheet, TextInput } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";

export default function HomeScreen() {
  const [brand, setBrand] = useState("");
  const [bikeWeight, setBikeWeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [batteryDisplay, setBatteryDisplay] = useState("");

  const handleSubmit = () => {
    // submission logic here
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{"We're excited you're here!"}</ThemedText>
        <ThemedText type="subtitle">
          Please provide this info about your bike, for accurate efficiency
          calculations.
        </ThemedText>

        <ThemedText>What brand is your ebike?</ThemedText>
        <ThemedView style={styles.pickerWrapper}>
          <Picker
            selectedValue={brand}
            onValueChange={(itemValue) => setBrand(itemValue)}
          >
            <Picker.Item label="Select brand" value="" />
            <Picker.Item label="Rad Power" value="radPower" />
            <Picker.Item label="Specialized" value="specialized" />
            <Picker.Item label="Trek" value="trek" />
            <Picker.Item label="Lectric" value="lectric" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </ThemedView>

        <ThemedText>How much does your bike weigh? (lbs)</ThemedText>
        <TextInput
          keyboardType="numeric"
          value={bikeWeight}
          onChangeText={setBikeWeight}
          style={styles.inputStyle}
        />

        <ThemedText>How much do you weigh? (lbs)</ThemedText>
        <TextInput
          keyboardType="numeric"
          value={userWeight}
          onChangeText={setUserWeight}
          style={styles.inputStyle}
        />

        <ThemedText>Bike battery display</ThemedText>
        <ThemedView style={styles.pickerWrapper}>
          <Picker
            selectedValue={batteryDisplay}
            onValueChange={(itemValue) => setBatteryDisplay(itemValue)}
          >
            <Picker.Item label="Select type" value="" />
            <Picker.Item label="Multimeter" value="multimeter" />
            <Picker.Item label="Voltmeter" value="voltmeter" />
          </Picker>
        </ThemedView>

        <Button title="Submit" onPress={handleSubmit} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});
