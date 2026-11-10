import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Droplets, Thermometer, Wind } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import {
  FOREX_API_URL,
  flagEmoji,
  formatPeso,
  titleCase,
  useForex,
} from '../../lib/bettergovApi';
import {
  OPEN_METEO_CREDIT,
  describeWeatherCode,
  useWeather,
} from '../../lib/weather';
import WeatherIcon from '../ui/WeatherIcon';
import ErrorBoundary from '../ui/ErrorBoundary';

const FOREX_SHOWN = ['USD', 'EUR', 'JPY', 'GBP', 'SGD', 'AUD'];

// White card used for both columns.
function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      {children}
    </div>
  );
}

function CardHeader({ title, meta }: { title: string; meta?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-4">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {meta && <p className="text-sm text-gray-700">{meta}</p>}
    </div>
  );
}

function CardFooter({
  to,
  label,
  sourceLabel,
  sourceHref,
}: {
  to: string;
  label: string;
  sourceLabel: string;
  sourceHref: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <p className="text-sm text-gray-700">
        {t('home.source')}{' '}
        <a
          href={sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-700 underline hover:text-accent-800"
        >
          {sourceLabel}
        </a>
      </p>
    </div>
  );
}

function Unavailable() {
  const { t } = useTranslation();
  return (
    <p className="mt-4 text-base text-gray-800">{t('home.unavailable')}</p>
  );
}

function dayLabel(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-PH', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function WeatherCard() {
  const { t } = useTranslation();
  const { data, loading, error } = useWeather();
  const taal = data?.[0];
  const days = taal?.daily ?? [];
  // Range for the temperature bars across the week.
  const lo = Math.min(...days.map(d => d.min));
  const hi = Math.max(...days.map(d => d.max));
  const span = Math.max(hi - lo, 1);

  return (
    <Card>
      <CardHeader
        title={t('home.weatherPlace')}
        meta={
          taal?.time
            ? `${t('home.asOf')} ${new Date(taal.time).toLocaleString('en-PH', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}`
            : undefined
        }
      />
      {loading && <p className="mt-4 text-base text-gray-800">…</p>}
      {(error || (!loading && !taal)) && <Unavailable />}
      {taal && (
        <>
          <div className="mt-6 flex items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
              <WeatherIcon code={taal.code} className="h-12 w-12" />
            </span>
            <div>
              <p className="text-5xl font-bold leading-none text-gray-900">
                {Math.round(taal.temperature)}°C
              </p>
              <p className="mt-2 text-lg font-bold text-gray-900">
                {describeWeatherCode(taal.code).label}
              </p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {[
              {
                icon: Thermometer,
                label: t('home.feelsLike'),
                value:
                  taal.feelsLike !== null
                    ? `${Math.round(taal.feelsLike)}°C`
                    : '--',
              },
              {
                icon: Droplets,
                label: t('home.humidity'),
                value: taal.humidity !== null ? `${taal.humidity}%` : '--',
              },
              {
                icon: Wind,
                label: t('home.wind'),
                value:
                  taal.windSpeed !== null
                    ? `${Math.round(taal.windSpeed)} km/h`
                    : '--',
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg bg-gray-50 p-3">
                <dt className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1 text-lg font-bold text-gray-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {days.length > 0 && (
            <div className="mt-6 mb-6">
              <h4 className="text-base font-bold text-gray-900">
                {t('home.forecastTitle', { count: days.length })}
              </h4>
              <ul className="mt-2 divide-y divide-gray-200">
                {days.map((day, i) => (
                  <li
                    key={day.date}
                    className="grid grid-cols-[6.5rem_2rem_1fr] items-center gap-3 py-2.5 text-base sm:grid-cols-[7.5rem_2rem_1fr]"
                  >
                    <span className="font-bold text-gray-900">
                      {i === 0 ? t('home.today') : dayLabel(day.date)}
                    </span>
                    <span title={describeWeatherCode(day.code).label}>
                      <WeatherIcon
                        code={day.code}
                        className="h-6 w-6 text-accent-700"
                      />
                      <span className="sr-only">
                        {describeWeatherCode(day.code).label}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="w-10 text-right text-gray-700">
                        {Math.round(day.min)}°
                      </span>
                      <span
                        className="relative h-2 flex-1 rounded-full bg-gray-100"
                        aria-hidden="true"
                      >
                        <span
                          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent-300 to-accent-700"
                          style={{
                            left: `${((day.min - lo) / span) * 100}%`,
                            right: `${((hi - day.max) / span) * 100}%`,
                          }}
                        />
                      </span>
                      <span className="w-10 font-bold text-gray-900">
                        {Math.round(day.max)}°
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      <CardFooter
        to="/weather"
        label={t('home.detailedForecast')}
        sourceLabel={OPEN_METEO_CREDIT.label}
        sourceHref={OPEN_METEO_CREDIT.url}
      />
    </Card>
  );
}

function ForexCard() {
  const { t } = useTranslation();
  const { data, loading, error } = useForex();
  const rates = FOREX_SHOWN.map(code =>
    data?.rates.find(r => r.symbol === code)
  ).filter(r => r !== undefined);
  const [code, setCode] = useState('USD');
  const [amount, setAmount] = useState('100');
  const selected = rates.find(r => r.symbol === code) ?? rates[0];
  const value = Number(amount.replace(/,/g, ''));
  const converted =
    selected && Number.isFinite(value) ? value * selected.phpEquivalent : null;
  const published = rates[0]?.publishedDate;

  return (
    <Card>
      <CardHeader
        title={t('home.forexTitle')}
        meta={
          published
            ? `${t('home.asOf')} ${new Date(published).toLocaleDateString(
                'en-PH',
                { month: 'short', day: 'numeric', year: 'numeric' }
              )}`
            : undefined
        }
      />
      {loading && <p className="mt-4 text-base text-gray-800">…</p>}
      {(error || (!loading && rates.length === 0)) && <Unavailable />}
      {rates.length > 0 && (
        <>
          {/* Quick converter: foreign currency to pesos */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-base font-bold text-gray-900">
              {t('home.converterTitle')}
            </p>
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
              <label className="block">
                <span className="sr-only">{t('home.amount')}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full rounded-md border border-gray-400 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700"
                />
              </label>
              <label className="block">
                <span className="sr-only">{t('home.currency')}</span>
                <select
                  value={selected?.symbol}
                  onChange={e => setCode(e.target.value)}
                  className="h-full rounded-md border border-gray-400 bg-white px-3 py-2.5 text-base font-bold text-gray-900 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700"
                >
                  {rates.map(r => (
                    <option key={r.symbol} value={r.symbol}>
                      {r.symbol}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-3 text-base text-gray-800" aria-live="polite">
              {t('home.equals')}{' '}
              <span className="text-2xl font-bold text-gray-900">
                {converted !== null ? formatPeso(converted) : '--'}
              </span>
            </p>
          </div>

          <ul className="mt-6 mb-6 divide-y divide-gray-200">
            {rates.map(r => (
              <li
                key={r.symbol}
                className="flex items-center gap-3 py-2.5 text-base"
              >
                <span className="text-2xl" aria-hidden="true">
                  {flagEmoji(r.countryCode)}
                </span>
                <span className="flex-1">
                  <span className="font-bold text-gray-900">{r.symbol}</span>{' '}
                  <span className="text-gray-700">{titleCase(r.country)}</span>
                </span>
                <span className="font-bold text-gray-900">
                  {formatPeso(r.phpEquivalent, r.phpEquivalent < 1 ? 4 : 2)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      <CardFooter
        to="/forex"
        label={t('home.moreCurrencies')}
        sourceLabel={t('home.forexSource')}
        sourceHref={FOREX_API_URL}
      />
    </Card>
  );
}

// Two columns: Taal weather (Open-Meteo) and peso exchange rates (BSP).
export default function WeatherForex() {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {t('home.weatherForexTitle')}
        </h2>
        <p className="mt-2 text-lg text-gray-700">
          {t('home.weatherForexSubtitle')}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ErrorBoundary
            fallback={
              <Card>
                <Unavailable />
              </Card>
            }
          >
            <WeatherCard />
          </ErrorBoundary>
          <ErrorBoundary
            fallback={
              <Card>
                <Unavailable />
              </Card>
            }
          >
            <ForexCard />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}
