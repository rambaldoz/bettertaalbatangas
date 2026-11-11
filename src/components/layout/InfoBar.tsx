import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { formatPeso, useForex } from '../../lib/bettergovApi';
import { useWeather } from '../../lib/weather';
import { useTranslation } from 'react-i18next';

// "JPY" -> "¥", "USD" -> "$". Falls back to the code if unknown.
function currencySymbol(code: string): string {
  try {
    return (
      new Intl.NumberFormat('en', {
        style: 'currency',
        currency: code,
        currencyDisplay: 'narrowSymbol',
      })
        .formatToParts(0)
        .find(part => part.type === 'currency')?.value ?? code
    );
  } catch {
    return code;
  }
}

// Navy bar under the main header, as on bettergov.ph: one exchange rate
// at a time (sliding in every few seconds), then current temperatures.
// Sources: BetterGov.ph forex API and Open-Meteo.
export default function InfoBar() {
  const { t } = useTranslation('common');
  const { data: forex } = useForex();
  const { data: weather } = useWeather();
  const [index, setIndex] = useState(0);

  const rates = forex?.rates ?? [];
  useEffect(() => {
    if (rates.length < 2) return;
    const id = window.setInterval(
      () => setIndex(i => (i + 1) % rates.length),
      4000
    );
    return () => window.clearInterval(id);
  }, [rates.length]);

  const rate = rates[index % Math.max(rates.length, 1)];
  const places = weather ?? [];

  if (!rate && places.length === 0) return null;

  return (
    <div className="bg-primary-900 text-xs font-bold text-white">
      <div className="container mx-auto flex h-8 items-center justify-center gap-4 overflow-hidden whitespace-nowrap px-4">
        {rate && (
          <Link
            to="/forex"
            className="flex min-w-[7.5rem] items-center justify-end overflow-hidden hover:underline"
            aria-label={`${t('common.exchangeRate')}: 1 ${rate.symbol} = ${formatPeso(rate.phpEquivalent)}`}
          >
            {/* key forces a remount so each new rate animates in */}
            <span
              key={rate.symbol}
              className="flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-3 duration-500 motion-reduce:animate-none"
            >
              <span className="text-white/90" aria-hidden="true">
                {currencySymbol(rate.symbol)}
              </span>
              <span>{rate.symbol}</span>
              <span className="text-accent-300">
                {formatPeso(rate.phpEquivalent)}
              </span>
            </span>
          </Link>
        )}
        {rate && places.length > 0 && (
          <span className="h-4 w-px shrink-0 bg-white/40" aria-hidden="true" />
        )}
        <div className="flex items-center gap-4 overflow-x-auto [scrollbar-width:none]">
          {places.map(p => (
            <Link
              key={p.key}
              to="/weather"
              className="shrink-0 uppercase hover:underline"
            >
              {p.name}{' '}
              <span className="font-normal text-accent-300">
                {Math.round(p.temperature)}°C
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
