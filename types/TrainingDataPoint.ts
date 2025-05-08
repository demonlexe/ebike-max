export type TrainingDataPoint = {
  startVoltage: number;
  endVoltage: number;
  elevationGainFeet: number;
  elevationLossFeet: number;
  distanceMiles: number;
  batteryType: "lithium-36v" | "lithium-48v" | "lithium-52v";
};
