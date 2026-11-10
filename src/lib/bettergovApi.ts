import { useEffect, useState } from 'react';

// BetterGov.ph exchange rate API. Weather lives in ./weather.ts (Open-Meteo).
export const FOREX_API_URL = 'https://api.bettergov.ph/forex';

export interface ForexRate {
  country: string;
  currency: string;
  symbol: string;
  euroEquivalent: number;
  usdEquivalent: number;
  phpEquivalent: number;
  countryCode: string;
  publishedDate: string;
}

export interface ForexResponse {
  metadata?: { source?: string; fetchedAt?: string; url?: string };
  rates: ForexRate[];
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Simple in-memory cache so the info bar and pages share one request.
const cache = new Map<string, Promise<unknown>>();

function fetchJson<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    const request = fetch(url).then(res => {
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return res.json();
    });
    request.catch(() => cache.delete(url));
    cache.set(url, request);
  }
  return cache.get(url) as Promise<T>;
}

function useApi<T>(url: string, clean: (raw: unknown) => T): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    fetchJson<unknown>(url)
      .then(raw => {
        if (active) setState({ data: clean(raw), loading: false, error: null });
      })
      .catch((err: Error) => {
        if (active)
          setState({ data: null, loading: false, error: err.message });
      });
    return () => {
      active = false;
    };
  }, [url, clean]);

  return state;
}

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

// The API sometimes returns rates with a null peso value (e.g. a currency
// BSP didn't publish that day). Drop those so the UI never sees them.
function cleanForex(raw: unknown): ForexResponse {
  const data = (raw ?? {}) as Partial<ForexResponse>;
  const rates = Array.isArray(data.rates) ? data.rates : [];
  return {
    metadata: data.metadata,
    rates: rates.filter(
      (r): r is ForexRate =>
        !!r &&
        typeof r.symbol === 'string' &&
        isNumber(r.phpEquivalent) &&
        r.phpEquivalent > 0
    ),
  };
}

export const useForex = () => useApi(FOREX_API_URL, cleanForex);

// "US" -> 🇺🇸
export function flagEmoji(countryCode: string): string {
  if (!/^[A-Za-z]{2}$/.test(countryCode)) return '';
  return countryCode
    .toUpperCase()
    .replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export function titleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export const formatPeso = (value: number | null | undefined, digits = 2) =>
  isNumber(value)
    ? `₱${value.toLocaleString('en-PH', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })}`
    : '₱--';
