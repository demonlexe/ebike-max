const voltageTable48v = [
  { voltage: 54.6, percent: 100 },
  { voltage: 53.0, percent: 90 },
  { voltage: 51.5, percent: 80 },
  { voltage: 49.9, percent: 70 },
  { voltage: 48.4, percent: 60 },
  { voltage: 46.8, percent: 50 },
  { voltage: 45.2, percent: 40 },
  { voltage: 43.7, percent: 30 },
  { voltage: 42.1, percent: 20 },
  { voltage: 40.6, percent: 10 },
  { voltage: 39.0, percent: 0 },
];

export function voltageToPercent(voltage: number): number {
  for (let i = 0; i < voltageTable48v.length - 1; i++) {
    const a = voltageTable48v[i];
    const b = voltageTable48v[i + 1];
    if (voltage <= a.voltage && voltage >= b.voltage) {
      const t = (voltage - b.voltage) / (a.voltage - b.voltage);
      return b.percent + t * (a.percent - b.percent);
    }
  }
  return voltage >= 54.6 ? 100 : 0;
}
