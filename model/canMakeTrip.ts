import MLR from "ml-regression-multivariate-linear";
import { voltageToPercent } from "../utils/voltageToPercent";

export function canMakeTrip(
  model: MLR,
  startVoltage: number,
  distanceMiles: number,
  elevationGainFeet: number,
  elevationLossFeet: number,
  thresholdPercent: number = 10
): boolean {
  const startPercent = voltageToPercent(startVoltage);
  const predictedDrop = Math.max(
    model.predict([distanceMiles, elevationGainFeet, elevationLossFeet])[0],
    0
  );
  const endPercent = startPercent - predictedDrop;

  console.log("Start %:", startPercent);
  console.log("Predicted % drop:", predictedDrop);
  console.log("Remaining %:", startPercent - predictedDrop);

  return endPercent > thresholdPercent;
}
