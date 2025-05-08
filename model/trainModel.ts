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

    inputs.push([point.distanceMiles, point.elevationGainFeet]);
    outputs.push([percentDrop]);
  }

  return new MLR(inputs, outputs);
}
