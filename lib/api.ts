// Data fetching layer with caching for BMRS API
// Note: BMRS API may have CORS restrictions. We use a proxy-friendly approach
// and fall back to generated sample data for demonstration.

export interface ActualGenerationRecord {
  startTime: string;
  generation: number;
  fuelType: string;
}

export interface ForecastRecord {
  startTime: string;
  publishTime: string;
  generation: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

const ACTUAL_API = process.env.NEXT_PUBLIC_ACTUAL_API_URL || "https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH/stream";
const FORECAST_API = process.env.NEXT_PUBLIC_FORECAST_API_URL || "https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR/stream";

export async function fetchActualGeneration(): Promise<ActualGenerationRecord[]> {
  const cacheKey = "actual-jan-2024";
  const cached = getCached<ActualGenerationRecord[]>(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({
      publishDateTimeFrom: "2024-01-01T00:00:00Z",
      publishDateTimeTo: "2024-01-31T23:59:59Z",
      fuelType: "WIND",
    });

    const response = await fetch(`${ACTUAL_API}?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data: ActualGenerationRecord[] = await response.json();
    const filtered = data
      .filter((r) => r.fuelType === "WIND")
      .map((r) => ({
        startTime: r.startTime,
        generation: r.generation,
        fuelType: r.fuelType,
      }));

    setCache(cacheKey, filtered);
    return filtered;
  } catch (error) {
    console.warn("BMRS actual API unavailable, using sample data:", error);
    const sample = generateSampleActualData();
    setCache(cacheKey, sample);
    return sample;
  }
}

export async function fetchForecastGeneration(): Promise<ForecastRecord[]> {
  const cacheKey = "forecast-jan-2024";
  const cached = getCached<ForecastRecord[]>(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({
      publishDateTimeFrom: "2023-12-30T00:00:00Z",
      publishDateTimeTo: "2024-01-31T23:59:59Z",
    });

    const response = await fetch(`${FORECAST_API}?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data: ForecastRecord[] = await response.json();
    const filtered = data.map((r) => ({
      startTime: r.startTime,
      publishTime: r.publishTime,
      generation: r.generation,
    }));

    setCache(cacheKey, filtered);
    return filtered;
  } catch (error) {
    console.warn("BMRS forecast API unavailable, using sample data:", error);
    const sample = generateSampleForecastData();
    setCache(cacheKey, sample);
    return sample;
  }
}

// Realistic sample data generators for when API is unavailable (CORS/network)
function generateSampleActualData(): ActualGenerationRecord[] {
  const records: ActualGenerationRecord[] = [];
  const baseDate = new Date("2024-01-01T00:00:00Z");

  for (let day = 0; day < 31; day++) {
    for (let halfHour = 0; halfHour < 48; halfHour++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + day);
      d.setMinutes(d.getMinutes() + halfHour * 30);

      // Simulate wind pattern: higher at night, variable during day
      const hourOfDay = d.getUTCHours();
      const baseGen = 4000 + Math.sin((day / 31) * Math.PI * 4) * 2000;
      const diurnal = Math.cos(((hourOfDay - 3) / 24) * Math.PI * 2) * 1500;
      const noise = (Math.random() - 0.5) * 1200;
      const generation = Math.max(500, Math.round(baseGen + diurnal + noise));

      records.push({
        startTime: d.toISOString(),
        generation,
        fuelType: "WIND",
      });
    }
  }
  return records;
}

function generateSampleForecastData(): ForecastRecord[] {
  const records: ForecastRecord[] = [];
  const baseDate = new Date("2024-01-01T00:00:00Z");

  for (let day = 0; day < 31; day++) {
    for (let halfHour = 0; halfHour < 48; halfHour++) {
      const targetTime = new Date(baseDate);
      targetTime.setDate(targetTime.getDate() + day);
      targetTime.setMinutes(targetTime.getMinutes() + halfHour * 30);

      // Multiple forecasts per target time at different horizons
      const horizons = [2, 6, 12, 24, 36, 48];
      for (const h of horizons) {
        const publishTime = new Date(targetTime);
        publishTime.setHours(publishTime.getHours() - h);

        // Forecast error increases with horizon
        const errorScale = 200 + h * 40;
        const hourOfDay = targetTime.getUTCHours();
        const baseGen = 4000 + Math.sin((day / 31) * Math.PI * 4) * 2000;
        const diurnal = Math.cos(((hourOfDay - 3) / 24) * Math.PI * 2) * 1500;
        const forecastError = (Math.random() - 0.5) * errorScale;
        const generation = Math.max(300, Math.round(baseGen + diurnal + forecastError));

        records.push({
          startTime: targetTime.toISOString(),
          publishTime: publishTime.toISOString(),
          generation,
        });
      }
    }
  }
  return records;
}
