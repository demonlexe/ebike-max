import MLR from "ml-regression-multivariate-linear";
import { TrainingDataPoint } from "../types/TrainingDataPoint";
import { voltageToPercent } from "../utils/voltageToPercent";

export function trainModel(trainingData: TrainingDataPoint[]): MLR {
  const inputs: number[][] = [];
  const outputs: number[][] = [];

  for (const point of trainingData) {
    const startPct = voltageToPercent(point.startVoltage);
    const endPct = voltageToPercent(point.endVoltage);
    const percentDrop = startPct - endPct;
    const netElev = point.elevationGainFeet - point.elevationLossFeet;

    inputs.push([point.distanceMiles, netElev]);
    outputs.push([percentDrop]);
  }

  return new MLR(inputs, outputs);
}
