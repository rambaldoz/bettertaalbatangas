import { useState } from 'react';
import SEO from '../../components/SEO';
import WeatherIcon from '../../components/ui/WeatherIcon';
import {
  OPEN_METEO_CREDIT,
  describeWeatherCode,
  useWeather,
} from '../../lib/weather';
import { Card } from '../../components/taal/TaalUI';
import { cn } from '../../lib/utils';

function dayLabel(iso: string, index: number): string {
  if (index === 0) return 'Today';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
  });
}

export default function Weather() {
  const { data, loading, error } = useWeather();
  const [selected, setSelected] = useState<string | null>(null);
  const places = data ?? [];
  const place = places.find(p => p.key === selected) ?? places[0];

  return (
    <main className="bg-gray-50">
      <SEO
        title="Weather Updates"
        description="Current weather and 5-day forecast for Taal and nearby cities."
      />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Weather in Taal and Nearby Cities
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Current conditions and a 5-day forecast from Open-Meteo.
          </p>
        </div>
        {loading && <p className="text-gray-700">Loading weather...</p>}
        {(error || (!loading && !place)) && (
          <p className="text-error-600">
            Weather data is unavailable right now. Please try again later.
          </p>
        )}

        {place && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="p-5">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Locations
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
                      {describeWeatherCode(place.code).label}
                    </div>
                    {place.feelsLike !== null && (
                      <div className="mt-1 text-sm text-gray-700">
                        Feels like {Math.round(place.feelsLike)}°C
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
                      label: 'Humidity',
                      value:
                        place.humidity !== null ? `${place.humidity}%` : '--',
                    },
                    {
                      label: 'Wind',
                      value:
                        place.windSpeed !== null
                          ? `${Math.round(place.windSpeed)} km/h`
                          : '--',
                    },
                    {
                      label: 'Pressure',
                      value:
                        place.pressure !== null
                          ? `${Math.round(place.pressure)} hPa`
                          : '--',
                    },
                    {
                      label: 'Visibility',
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
                    {place.daily.length}-Day Forecast
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
                        <div className="text-xs text-gray-700">
                          {describeWeatherCode(day.code).label}
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
            About Weather Data
          </h2>
          <p className="mt-3 leading-relaxed text-gray-800">
            Weather on this page comes from{' '}
            <a
              href={OPEN_METEO_CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-700 underline hover:text-accent-800"
            >
              {OPEN_METEO_CREDIT.label}
            </a>
            , an open-source weather API that combines forecasts from national
            weather services. Readings for Taal use the town proper&apos;s
            coordinates and update about every 15 minutes.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-bold text-gray-900">
                Understanding the Data
              </h3>
              <p className="mt-2 text-gray-800">
                Temperature is shown in Celsius (°C) and wind speed in
                kilometers per hour. These are model forecasts, not official
                warnings.
              </p>
            </div>
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-bold text-gray-900">Weather Advisories</h3>
              <p className="mt-2 text-gray-800">
                For official warnings and typhoon bulletins, visit the{' '}
                <a
                  href="https://www.pagasa.dost.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 underline hover:text-accent-800"
                >
                  PAGASA website
                </a>
                . For Taal Volcano bulletins, visit{' '}
                <a
                  href="https://www.phivolcs.dost.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 underline hover:text-accent-800"
                >
                  PHIVOLCS
                </a>
                .
              </p>
            </div>
          </div>
          <p className="mt-6 text-right text-xs text-gray-700">
            Weather data by{' '}
            <a
              href={OPEN_METEO_CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-700 underline hover:text-accent-800"
            >
              {OPEN_METEO_CREDIT.label}
            </a>{' '}
            (CC BY 4.0)
          </p>
        </Card>
      </div>
    </main>
  );
}
