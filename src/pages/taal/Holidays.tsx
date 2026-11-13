import { Calendar, TriangleAlert } from 'lucide-react';
import { Trans } from 'react-i18next';
import SEO from '../../components/SEO';
import { useContent } from '../../lib/useContent';
import {
  HOLIDAY_YEAR,
  LOCAL_OBSERVANCES,
  REGULAR_HOLIDAYS,
  SPECIAL_HOLIDAYS,
  TAAL_SOURCES,
} from '../../data/taal';

interface Holiday {
  key: string; // holidaysPage.events.<key>
  event: string;
  date: string;
}

// Parse YYYY-MM-DD as a local date so the weekday doesn't shift by timezone.
function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function HolidayTable({ title, items }: { title: string; items: Holiday[] }) {
  const { t, locale } = useContent();
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <Calendar className="h-5 w-5 text-primary-600" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 bg-primary-50 px-5 py-4 font-bold text-primary-700">
          {title} ({items.length})
        </div>
        <div className="overflow-x-auto p-5">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-700">
              <tr>
                <th className="px-5 py-3 font-bold">
                  {t('holidaysPage.event')}
                </th>
                <th className="px-5 py-3 font-bold">
                  {t('holidaysPage.date')}
                </th>
                <th className="px-5 py-3 font-bold">{t('holidaysPage.day')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(h => {
                const d = parseDate(h.date);
                return (
                  <tr key={`${h.key}-${h.date}`}>
                    <td className="px-5 py-4 text-gray-900">
                      {t(`holidaysPage.events.${h.key}`, {
                        defaultValue: h.event,
                      })}
                    </td>
                    <td className="px-5 py-4 text-gray-900">
                      {d.toLocaleDateString(locale, {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-700">
                        {d.toLocaleDateString(locale, { weekday: 'long' })}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function TaalHolidays() {
  const { t } = useContent();
  const link = (href: string) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-700 underline hover:text-primary-800"
    />
  );
  return (
    <main className="bg-white">
      <SEO
        title={t('holidaysPage.seoTitle', { year: HOLIDAY_YEAR })}
        description={t('holidaysPage.seoDescription')}
      />
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            {t('holidaysPage.title', { year: HOLIDAY_YEAR })}
          </h1>
          <p className="mt-3 text-lg text-gray-800">
            {t('holidaysPage.subtitle')}
          </p>
        </div>

        <div className="mt-8 flex gap-3 border-l-4 border-warning-500 bg-warning-50 p-4 text-sm text-warning-800">
          <TriangleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{t('holidaysPage.notice', { year: HOLIDAY_YEAR })}</p>
        </div>

        <HolidayTable
          title={t('holidaysPage.regular')}
          items={REGULAR_HOLIDAYS}
        />
        <HolidayTable
          title={t('holidaysPage.special')}
          items={SPECIAL_HOLIDAYS}
        />
        <HolidayTable
          title={t('holidaysPage.local')}
          items={LOCAL_OBSERVANCES}
        />

        <p className="mt-8 text-sm text-gray-700">
          <Trans
            i18nKey="holidaysPage.sourcesNote"
            components={{
              bettergov: link(TAAL_SOURCES.bettergovHolidays.url),
              wikipedia: link(TAAL_SOURCES.wikipedia.url),
            }}
          />
        </p>
      </div>
    </main>
  );
}
