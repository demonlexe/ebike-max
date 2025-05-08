import MLR from "ml-regression-multivariate-linear";
import { voltageToPercent } from "../utils/voltageToPercent";

export function canMakeTripPrediction(
  model: MLR,
  startVoltage: number,
  distanceMiles: number,
  elevationGainFeet: number,
  elevationLossFeet: number,
  thresholdPercent: number = 10
): boolean {
  const startPercent = voltageToPercent(startVoltage);
  const netElev = elevationGainFeet - elevationLossFeet;
  const predictedDrop = model.predict([distanceMiles, netElev])[0];
  const endPercent = startPercent - predictedDrop;

  return endPercent > thresholdPercent;
}
