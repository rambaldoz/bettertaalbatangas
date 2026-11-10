import { useEffect, useState } from 'react';

// Weather from Open-Meteo (https://open-meteo.com). Free for
// non-commercial use, no API key. Data is licensed CC BY 4.0, so
// pages showing it must credit Open-Meteo (see OPEN_METEO_CREDIT).

export const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';
export const OPEN_METEO_CREDIT = {
  label: 'Open-Meteo.com',
  url: 'https://open-meteo.com',
};

// Taal first; the rest are nearby cities for comparison.
// Taal coordinates are from PhilAtlas; the others are approximate
// city centers, which is precise enough for a weather grid.
export const WEATHER_LOCATIONS = [
  { key: 'taal', name: 'Taal', lat: 13.8803, lon: 120.9238 },
  { key: 'batangas', name: 'Batangas City', lat: 13.7565, lon: 121.0583 },
  { key: 'lipa', name: 'Lipa', lat: 13.9411, lon: 121.1631 },
  { key: 'tagaytay', name: 'Tagaytay', lat: 14.1153, lon: 120.9621 },
] as const;

const CURRENT_VARS = [
  'temperature_2m',
  'apparent_temperature',
  'relative_humidity_2m',
  'weather_code',
  'wind_speed_10m',
  'surface_pressure',
];
// Visibility is read from the hourly series for the current hour.
const HOURLY_VARS = ['visibility'];
const DAILY_VARS = ['weather_code', 'temperature_2m_max', 'temperature_2m_min'];

export interface DailyForecast {
  date: string; // YYYY-MM-DD, Philippine time
  code: number;
  max: number;
  min: number;
}

export interface LocationWeather {
  key: string;
  name: string;
  temperature: number; // °C
  feelsLike: number | null; // °C
  humidity: number | null; // %
  windSpeed: number | null; // km/h
  pressure: number | null; // hPa
  visibility: number | null; // meters
  code: number; // WMO weather code
  time: string; // local ISO time of the reading
  daily: DailyForecast[];
}

// WMO weather interpretation codes, as documented by Open-Meteo.
export type WeatherKind =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'thunderstorm';

export function describeWeatherCode(code: number): {
  label: string;
  kind: WeatherKind;
} {
  if (code === 0) return { label: 'Clear sky', kind: 'clear' };
  if (code === 1) return { label: 'Mainly clear', kind: 'clear' };
  if (code === 2) return { label: 'Partly cloudy', kind: 'partly-cloudy' };
  if (code === 3) return { label: 'Overcast', kind: 'cloudy' };
  if (code === 45 || code === 48) return { label: 'Fog', kind: 'fog' };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', kind: 'drizzle' };
  if (code === 61) return { label: 'Light rain', kind: 'rain' };
  if (code === 63) return { label: 'Moderate rain', kind: 'rain' };
  if (code === 65 || code === 66 || code === 67)
    return { label: 'Heavy rain', kind: 'rain' };
  if (code >= 80 && code <= 82) return { label: 'Rain showers', kind: 'rain' };
  if (code >= 95) return { label: 'Thunderstorm', kind: 'thunderstorm' };
  return { label: 'Cloudy', kind: 'cloudy' };
}

const isNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v);
const numOrNull = (v: unknown) => (isNumber(v) ? v : null);

interface OpenMeteoResult {
  current?: Record<string, unknown>;
  hourly?: Record<string, unknown[]>;
  daily?: Record<string, unknown[]>;
}

// Visibility for the hour of the current reading ("2026-11-09T21:30"
// matches the hourly slot "2026-11-09T21:00").
function currentHourValue(
  hourly: Record<string, unknown[]> | undefined,
  key: string,
  time: unknown
): number | null {
  if (!hourly || typeof time !== 'string') return null;
  const slot = `${time.slice(0, 13)}:00`;
  const i = (hourly.time ?? []).indexOf(slot);
  return i >= 0 ? numOrNull(hourly[key]?.[i]) : null;
}

function toLocationWeather(
  loc: (typeof WEATHER_LOCATIONS)[number],
  result: OpenMeteoResult | undefined
): LocationWeather | null {
  const c = result?.current;
  if (!c || !isNumber(c.temperature_2m)) return null;

  const d = result?.daily ?? {};
  const dates = (d.time ?? []) as string[];
  const daily: DailyForecast[] = dates
    .map((date, i) => ({
      date,
      code: Number(d.weather_code?.[i]),
      max: Number(d.temperature_2m_max?.[i]),
      min: Number(d.temperature_2m_min?.[i]),
    }))
    .filter(day => isNumber(day.max) && isNumber(day.min));

  return {
    key: loc.key,
    name: loc.name,
    temperature: c.temperature_2m,
    feelsLike: numOrNull(c.apparent_temperature),
    humidity: numOrNull(c.relative_humidity_2m),
    windSpeed: numOrNull(c.wind_speed_10m),
    pressure: numOrNull(c.surface_pressure),
    visibility:
      numOrNull(c.visibility) ??
      currentHourValue(result?.hourly, 'visibility', c.time),
    code: isNumber(c.weather_code) ? c.weather_code : 3,
    time: typeof c.time === 'string' ? c.time : '',
    daily,
  };
}

function buildUrl(): string {
  const params = new URLSearchParams({
    latitude: WEATHER_LOCATIONS.map(l => l.lat).join(','),
    longitude: WEATHER_LOCATIONS.map(l => l.lon).join(','),
    current: CURRENT_VARS.join(','),
    hourly: HOURLY_VARS.join(','),
    daily: DAILY_VARS.join(','),
    timezone: 'Asia/Manila',
    forecast_days: '5',
  });
  return `${OPEN_METEO_URL}?${params}`;
}

// One shared request for the info bar, home page and weather page.
// Cached for 10 minutes; Open-Meteo updates current data every 15.
let cached: { at: number; request: Promise<LocationWeather[]> } | null = null;
const CACHE_MS = 10 * 60 * 1000;

function fetchWeather(): Promise<LocationWeather[]> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.request;
  const request = fetch(buildUrl())
    .then(res => {
      if (!res.ok) throw new Error(`Weather request failed (${res.status})`);
      return res.json();
    })
    .then((json: unknown) => {
      // A single location returns an object; several return an array.
      const results = (
        Array.isArray(json) ? json : [json]
      ) as OpenMeteoResult[];
      return WEATHER_LOCATIONS.map((loc, i) =>
        toLocationWeather(loc, results[i])
      ).filter((w): w is LocationWeather => w !== null);
    });
  request.catch(() => {
    cached = null;
  });
  cached = { at: Date.now(), request };
  return request;
}

export function useWeather() {
  const [state, setState] = useState<{
    data: LocationWeather[] | null;
    loading: boolean;
    error: string | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    fetchWeather()
      .then(data => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (active)
          setState({ data: null, loading: false, error: err.message });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
