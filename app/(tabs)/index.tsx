import ThemedPicker from "@/components/ThemedPicker";
import { Image } from "expo-image";
import { Button, StyleSheet, TextInput } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { usesMetricSystem } from "react-native-localize";

export default function HomeScreen() {
  const [brand, setBrand] = useState("");
  const [bikeWeight, setBikeWeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [batteryDisplay, setBatteryDisplay] = useState("");
  const usesMetric = usesMetricSystem();
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
        <ThemedText type="defaultSemiBold">
          Please provide some info about your bike, for accurate efficiency
          calculations.
        </ThemedText>

        <ThemedText>What brand is your ebike?</ThemedText>
        <ThemedView style={styles.pickerWrapper}>
          <ThemedPicker
            selectedValue={brand}
            onValueChange={setBrand}
            items={[
              { label: "Select brand", value: "" },
              { label: "Rad Power", value: "radPower" },
              { label: "Specialized", value: "specialized" },
              { label: "Trek", value: "trek" },
              { label: "Lectric", value: "lectric" },
              { label: "Other", value: "other" },
            ]}
          />
        </ThemedView>

        <ThemedText>
          How much does your bike weigh? ({usesMetric ? "kg" : "lbs"})
        </ThemedText>
        <TextInput
          keyboardType="numeric"
          value={bikeWeight}
          onChangeText={setBikeWeight}
          style={styles.inputStyle}
        />

        <ThemedText>
          How much do you weigh? ({usesMetric ? "kg" : "lbs"})
        </ThemedText>
        <TextInput
          keyboardType="numeric"
          value={userWeight}
          onChangeText={setUserWeight}
          style={styles.inputStyle}
        />

        <ThemedText>Bike battery display</ThemedText>
        <ThemedView style={styles.pickerWrapper}>
          <ThemedPicker
            selectedValue={batteryDisplay}
            onValueChange={setBatteryDisplay}
            items={[
              { label: "Select type", value: "" },
              { label: "Multimeter", value: "multimeter" },
              { label: "Voltmeter", value: "voltmeter" },
            ]}
          />
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
