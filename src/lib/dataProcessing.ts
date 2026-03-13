import type { ActualGenerationRecord } from "./api";
import type { SelectedForecast } from "./forecastLogic";

export interface MergedDataPoint {
  startTime: string;
  timestamp: number;
  actualGeneration: number | null;
  forecastGeneration: number | null;
  error: number | null;
}

export interface ErrorStats {
  meanError: number;
  medianError: number;
  maeError: number;
  rmseError: number;
  p90Error: number;
  p99Error: number;
  count: number;
}

export interface ReliabilityStats {
  p10: number;
  p25: number;
  p50: number;
  mean: number;
  max: number;
  min: number;
}

export function mergeData(
  actuals: ActualGenerationRecord[],
  forecasts: Map<string, SelectedForecast>,
  startDate: Date,
  endDate: Date
): MergedDataPoint[] {
  const startTs = startDate.getTime();
  const endTs = endDate.getTime();

  const actualMap = new Map<string, number>();
  for (const a of actuals) {
    actualMap.set(a.startTime, a.generation);
  }

  // Combine all unique startTimes
  const allTimes = new Set<string>();
  for (const a of actuals) allTimes.add(a.startTime);
  for (const key of forecasts.keys()) allTimes.add(key);

  const merged: MergedDataPoint[] = [];

  for (const startTime of allTimes) {
    const ts = new Date(startTime).getTime();
    if (ts < startTs || ts > endTs) continue;

    const actual = actualMap.get(startTime) ?? null;
    const forecast = forecasts.get(startTime)?.forecastGeneration ?? null;
    const error = actual !== null && forecast !== null ? forecast - actual : null;

    merged.push({
      startTime,
      timestamp: ts,
      actualGeneration: actual,
      forecastGeneration: forecast,
      error,
    });
  }

  return merged.sort((a, b) => a.timestamp - b.timestamp);
}

export function computeErrorStats(data: MergedDataPoint[]): ErrorStats {
  const errors = data
    .filter((d) => d.error !== null)
    .map((d) => d.error!);

  if (errors.length === 0) {
    return { meanError: 0, medianError: 0, maeError: 0, rmseError: 0, p90Error: 0, p99Error: 0, count: 0 };
  }

  const sorted = [...errors].sort((a, b) => a - b);
  const absErrors = errors.map(Math.abs);

  const mean = errors.reduce((s, e) => s + e, 0) / errors.length;
  const mae = absErrors.reduce((s, e) => s + e, 0) / absErrors.length;
  const rmse = Math.sqrt(errors.reduce((s, e) => s + e * e, 0) / errors.length);
  const median = percentile(sorted, 50);
  const p90 = percentile(sorted.map(Math.abs).sort((a, b) => a - b), 90);
  const p99 = percentile(sorted.map(Math.abs).sort((a, b) => a - b), 99);

  return {
    meanError: Math.round(mean),
    medianError: Math.round(median),
    maeError: Math.round(mae),
    rmseError: Math.round(rmse),
    p90Error: Math.round(p90),
    p99Error: Math.round(p99),
    count: errors.length,
  };
}

export function computeReliability(actuals: ActualGenerationRecord[]): ReliabilityStats {
  const gens = actuals.map((a) => a.generation).sort((a, b) => a - b);
  if (gens.length === 0) {
    return { p10: 0, p25: 0, p50: 0, mean: 0, max: 0, min: 0 };
  }

  return {
    p10: Math.round(percentile(gens, 10)),
    p25: Math.round(percentile(gens, 25)),
    p50: Math.round(percentile(gens, 50)),
    mean: Math.round(gens.reduce((s, v) => s + v, 0) / gens.length),
    max: Math.max(...gens),
    min: Math.min(...gens),
  };
}

function percentile(sorted: number[], p: number): number {
  const idx = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
}
