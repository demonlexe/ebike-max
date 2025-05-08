import { trainingData } from "@/constants/trainingData";
import { canMakeTrip } from "@/model/canMakeTrip";
import { TrainingDataPoint } from "@/types/TrainingDataPoint";
import { trainModel } from "../trainModel";

const model = trainModel(trainingData);

describe("canMakeTrip", () => {
  it("returns true for a short trip with low elevation gain", () => {
    const newTrip: Omit<TrainingDataPoint, "endVoltage"> = {
      startVoltage: 50.9,
      distanceMiles: 3.0,
      elevationGainFeet: 100,
      elevationLossFeet: 50,
      batteryType: "lithium-48v",
    };

    const result = canMakeTrip(
      model,
      newTrip.startVoltage,
      newTrip.distanceMiles,
      newTrip.elevationGainFeet,
      newTrip.elevationLossFeet
    );
    expect(result).toBe(true);
  });

  it("returns false for a long trip with high elevation gain", () => {
    const newTrip: Omit<TrainingDataPoint, "endVoltage"> = {
      startVoltage: 47.0,
      distanceMiles: 20.0,
      elevationGainFeet: 2000,
      elevationLossFeet: 100,
      batteryType: "lithium-48v",
    };

    const result = canMakeTrip(
      model,
      newTrip.startVoltage,
      newTrip.distanceMiles,
      newTrip.elevationGainFeet,
      newTrip.elevationLossFeet
    );
    expect(result).toBe(false);
  });
});
