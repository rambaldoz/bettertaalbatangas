import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
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

// A short list on the home page: currencies most Taal families receive.
// The full list is on /forex.
const FOREX_SHOWN = ['USD', 'SAR', 'JPY', 'EUR'];

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      {children}
    </div>
  );
}

function CardHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
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
    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
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

function Status({ loading }: { loading: boolean }) {
  const { t } = useTranslation();
  return (
    <p className="mt-6 text-base text-gray-800">
      {loading ? '…' : t('home.unavailable')}
    </p>
  );
}

const asOfTime = (iso: string) =>
  new Date(iso).toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

// "2026-11-11" -> "Wed" (or "Miy" in Tagalog), read as a calendar date.
const dayName = (date: string, lang: string) =>
  new Date(`${date}T12:00:00+08:00`).toLocaleDateString(
    lang === 'fil' ? 'fil-PH' : 'en-PH',
    { weekday: 'short', timeZone: 'Asia/Manila' }
  );

function WeatherCard() {
  const { t, i18n } = useTranslation();
  const { data, loading } = useWeather();
  const taal = data?.[0];
  const today = taal?.daily[0];
  const next = taal?.daily.slice(1, 4) ?? [];

  return (
    <Card>
      <CardHeader
        title={t('home.weatherPlace')}
        meta={
          taal?.time ? `${t('home.asOf')} ${asOfTime(taal.time)}` : undefined
        }
      />
      {taal ? (
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
              <WeatherIcon code={taal.code} className="h-12 w-12" />
            </span>
            <div>
              <p className="text-5xl font-bold leading-none text-gray-900">
                {Math.round(taal.temperature)}°C
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900">
                {describeWeatherCode(taal.code).label}
              </p>
              {today && (
                <p className="mt-1 text-base text-gray-800">
                  {t('home.high')} {Math.round(today.max)}° · {t('home.low')}{' '}
                  {Math.round(today.min)}°
                </p>
              )}
            </div>
          </div>
          {next.length > 0 && (
            <div className="sm:w-56 sm:shrink-0 sm:border-l sm:border-gray-200 sm:pl-6">
              <p className="text-sm font-bold uppercase tracking-wide text-gray-700">
                {t('home.nextDays')}
              </p>
              <ul className="mt-2 divide-y divide-gray-200">
                {next.map(d => (
                  <li key={d.date} className="flex items-center gap-3 py-2">
                    <span className="w-12 text-base font-bold text-gray-900">
                      {dayName(d.date, i18n.language)}
                    </span>
                    <WeatherIcon
                      code={d.code}
                      className="h-6 w-6 text-accent-700"
                    />
                    <span className="sr-only">
                      {describeWeatherCode(d.code).label}
                    </span>
                    <span className="ml-auto text-base tabular-nums text-gray-900">
                      <span className="font-bold">{Math.round(d.max)}°</span>{' '}
                      <span className="text-gray-700">
                        / {Math.round(d.min)}°
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Status loading={loading} />
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
  const { data, loading } = useForex();
  const rates = FOREX_SHOWN.map(code =>
    data?.rates.find(r => r.symbol === code)
  ).filter(r => r !== undefined);
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
      {rates.length > 0 ? (
        <ul className="mt-4 divide-y divide-gray-200">
          {rates.map(r => (
            <li key={r.symbol} className="flex items-center gap-3 py-3">
              <span className="text-2xl" aria-hidden="true">
                {flagEmoji(r.countryCode)}
              </span>
              <span className="flex-1 text-base">
                <span className="font-bold text-gray-900">1 {r.symbol}</span>{' '}
                <span className="text-gray-700">{titleCase(r.country)}</span>
              </span>
              <span className="text-xl font-bold tabular-nums text-gray-900">
                {formatPeso(r.phpEquivalent, r.phpEquivalent < 1 ? 4 : 2)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Status loading={loading} />
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

// Two simple cards: Taal weather (Open-Meteo) and peso exchange rates (BSP).
export default function WeatherForex() {
  const { t } = useTranslation();
  const fallback = (
    <Card>
      <Status loading={false} />
    </Card>
  );
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
          <ErrorBoundary fallback={fallback}>
            <WeatherCard />
          </ErrorBoundary>
          <ErrorBoundary fallback={fallback}>
            <ForexCard />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}
