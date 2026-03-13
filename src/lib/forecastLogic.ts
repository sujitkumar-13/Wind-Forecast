import type { ForecastRecord } from "./api";

export interface SelectedForecast {
  startTime: string;
  forecastGeneration: number;
  publishTime: string;
}

/**
 * For each unique startTime, select the most recent forecast
 * published at least `forecastHorizonHours` before the target time.
 *
 * cutoffTime = startTime - forecastHorizonHours
 * Select MAX(publishTime) where publishTime <= cutoffTime
 */
export function selectForecasts(
  forecasts: ForecastRecord[],
  forecastHorizonHours: number
): Map<string, SelectedForecast> {
  // Group forecasts by startTime
  const grouped = new Map<string, ForecastRecord[]>();
  for (const f of forecasts) {
    const key = f.startTime;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(f);
  }

  const result = new Map<string, SelectedForecast>();

  for (const [startTime, group] of grouped) {
    const startTs = new Date(startTime).getTime();
    const cutoffTs = startTs - forecastHorizonHours * 3600 * 1000;

    let best: ForecastRecord | null = null;
    let bestPublishTs = -Infinity;

    for (const f of group) {
      const pubTs = new Date(f.publishTime).getTime();
      if (pubTs <= cutoffTs && pubTs > bestPublishTs) {
        best = f;
        bestPublishTs = pubTs;
      }
    }

    if (best) {
      result.set(startTime, {
        startTime,
        forecastGeneration: best.generation,
        publishTime: best.publishTime,
      });
    }
  }

  return result;
}
