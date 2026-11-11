import { useState } from 'react';
import { Trans } from 'react-i18next';
import SEO from '../../components/SEO';
import { useContent } from '../../lib/useContent';
import WeatherIcon from '../../components/ui/WeatherIcon';
import { OPEN_METEO_CREDIT, useWeather } from '../../lib/weather';
import { Card } from '../../components/taal/TaalUI';
import { cn } from '../../lib/utils';

const ext = (href: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-accent-700 underline hover:text-accent-800"
  />
);

// Text: weatherPage in public/locales/<lang>/common.json
export default function Weather() {
  const c = useContent();
  const { t } = c;
  const dayLabel = (iso: string, index: number): string => {
    if (index === 0) return t('home.today');
    const [y, m, d] = iso.split('-').map(Number);
    return c.date(new Date(y, m - 1, d), { weekday: 'short' });
  };
  const { data, loading, error } = useWeather();
  const [selected, setSelected] = useState<string | null>(null);
  const places = data ?? [];
  const place = places.find(p => p.key === selected) ?? places[0];

  return (
    <main className="bg-gray-50">
      <SEO
        title={t('weatherPage.seoTitle')}
        description={t('weatherPage.seoDescription')}
      />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('weatherPage.title')}
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            {t('weatherPage.subtitle')}
          </p>
        </div>
        {loading && <p className="text-gray-700">{t('weatherPage.loading')}</p>}
        {(error || (!loading && !place)) && (
          <p className="text-error-600">{t('weatherPage.unavailable')}</p>
        )}

        {place && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="p-5">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                {t('weatherPage.locations')}
              </h2>
              <ul className="space-y-1">
                {places.map(p => (
                  <li key={p.key}>
                    <button
                      type="button"
                      onClick={() => setSelected(p.key)}
                      aria-pressed={p.key === place.key}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md px-4 py-3 text-left uppercase transition-colors',
                        p.key === place.key
                          ? 'bg-primary-100'
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <WeatherIcon code={p.code} className="h-5 w-5" />
                      <span className="flex-1 font-bold text-gray-900">
                        {p.name}
                      </span>
                      <span className="font-bold text-gray-900">
                        {Math.round(p.temperature)}°C
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-3xl font-bold uppercase text-gray-900">
                      {place.name}
                    </div>
                    <div className="text-lg text-gray-800">
                      {c.weather(place.code)}
                    </div>
                    {place.feelsLike !== null && (
                      <div className="mt-1 text-sm text-gray-700">
                        {t('home.feelsLike')} {Math.round(place.feelsLike)}°C
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-5xl font-bold text-gray-900 md:text-6xl">
                    <WeatherIcon code={place.code} className="h-12 w-12" />
                    {Math.round(place.temperature)}°C
                  </div>
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    {
                      label: t('home.humidity'),
                      value:
                        place.humidity !== null ? `${place.humidity}%` : '--',
                    },
                    {
                      label: t('home.wind'),
                      value:
                        place.windSpeed !== null
                          ? `${Math.round(place.windSpeed)} km/h`
                          : '--',
                    },
                    {
                      label: t('weatherPage.pressure'),
                      value:
                        place.pressure !== null
                          ? `${Math.round(place.pressure)} hPa`
                          : '--',
                    },
                    {
                      label: t('weatherPage.visibility'),
                      value:
                        place.visibility !== null
                          ? `${Math.round(place.visibility / 1000)} km`
                          : '--',
                    },
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-white/50 p-4 text-center"
                    >
                      <dt className="text-gray-800">{stat.label}</dt>
                      <dd className="mt-1 text-xl font-bold text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {place.daily.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    {t('home.forecastTitle', { count: place.daily.length })}
                  </h2>
                  <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {place.daily.map((day, i) => (
                      <li
                        key={day.date}
                        className="rounded-lg border border-gray-200 p-3 text-center"
                      >
                        <div className="text-sm font-bold text-gray-900">
                          {dayLabel(day.date, i)}
                        </div>
                        <WeatherIcon
                          code={day.code}
                          className="mx-auto my-2 h-6 w-6 text-accent-500"
                        />
                        <div className="text-sm text-gray-700">
                          {c.weather(day.code)}
                        </div>
                        <div className="mt-1 text-sm text-gray-900">
                          <span className="font-bold">
                            {Math.round(day.max)}°
                          </span>{' '}
                          <span className="text-gray-700">
                            {Math.round(day.min)}°
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        <Card className="mt-10 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('weatherPage.aboutTitle')}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-800">
            <Trans
              i18nKey="weatherPage.aboutText"
              values={{ source: OPEN_METEO_CREDIT.label }}
              components={{ link: ext(OPEN_METEO_CREDIT.url) }}
            />
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-bold text-gray-900">
                {t('weatherPage.understandingTitle')}
              </h3>
              <p className="mt-2 text-gray-800">
                {t('weatherPage.understandingText')}
              </p>
            </div>
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-bold text-gray-900">
                {t('weatherPage.advisoriesTitle')}
              </h3>
              <p className="mt-2 text-gray-800">
                <Trans
                  i18nKey="weatherPage.advisoriesText"
                  components={{
                    pagasa: ext('https://www.pagasa.dost.gov.ph'),
                    phivolcs: ext('https://www.phivolcs.dost.gov.ph'),
                  }}
                />
              </p>
            </div>
          </div>
          <p className="mt-6 text-right text-sm text-gray-700">
            <Trans
              i18nKey="weatherPage.credit"
              values={{ source: OPEN_METEO_CREDIT.label }}
              components={{ link: ext(OPEN_METEO_CREDIT.url) }}
            />
          </p>
        </Card>
      </div>
    </main>
  );
}
