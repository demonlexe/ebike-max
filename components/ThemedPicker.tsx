import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

interface ThemedPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  style?: object; // Allow extra styles if needed
}

const ThemedPicker: React.FC<ThemedPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  style = {},
}) => {
  const colorScheme = useColorScheme();

  // Determine default color for items based on theme
  const textColor = colorScheme === "dark" ? "#fff" : "#000";

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={[styles.picker, style]} // Combine custom styles
    >
      {items.map((item) => (
        <Picker.Item
          key={item.value}
          label={item.label}
          value={item.value}
          color={textColor}
        />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    height: 40, // Adjust height for better accessibility
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f8f8f8",
  },
});

export default ThemedPicker;
