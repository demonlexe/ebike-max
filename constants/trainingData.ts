import { TrainingDataPoint } from "@/types/TrainingDataPoint";

export const trainingData: TrainingDataPoint[] = [
  // madrona to burger
  {
    startVoltage: 50.9,
    endVoltage: 47.9,
    distanceMiles: 8.2,
    elevationGainFeet: 325,
    elevationLossFeet: 308,
    batteryType: "lithium-48v",
  },
  // burger to hyde
  {
    startVoltage: 47.9,
    endVoltage: 47.05,
    distanceMiles: 4.3,
    elevationGainFeet: 446,
    elevationLossFeet: 125,
    batteryType: "lithium-48v",
  },
  // home to atlassian
  {
    startVoltage: 48.1,
    endVoltage: 47.15,
    elevationGainFeet: 420,
    elevationLossFeet: 203,
    distanceMiles: 5.3,
    batteryType: "lithium-48v",
  },
  // atlassian to home
  {
    startVoltage: 47.45,
    endVoltage: 46,
    elevationGainFeet: 194,
    elevationLossFeet: 407,
    distanceMiles: 5.3,
    batteryType: "lithium-48v",
  },
];
