import { Calendar, TriangleAlert } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  HOLIDAY_YEAR,
  LOCAL_OBSERVANCES,
  REGULAR_HOLIDAYS,
  SPECIAL_HOLIDAYS,
  TAAL_SOURCES,
} from '../../data/taal';

interface Holiday {
  event: string;
  date: string;
}

// Parse YYYY-MM-DD as a local date so the weekday doesn't shift by timezone.
function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function HolidayTable({ title, items }: { title: string; items: Holiday[] }) {
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
                <th className="px-5 py-3 font-bold">Event</th>
                <th className="px-5 py-3 font-bold">Date</th>
                <th className="px-5 py-3 font-bold">Day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(h => {
                const d = parseDate(h.date);
                return (
                  <tr key={`${h.event}-${h.date}`}>
                    <td className="px-5 py-4 text-gray-900">{h.event}</td>
                    <td className="px-5 py-4 text-gray-900">
                      {d.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-700">
                        {d.toLocaleDateString('en-US', { weekday: 'long' })}
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
  return (
    <main className="bg-white">
      <SEO
        title={`Holidays in Taal ${HOLIDAY_YEAR}`}
        description="National holidays and local Taal observances."
      />
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Public Holidays {HOLIDAY_YEAR}
          </h1>
          <p className="mt-3 text-lg text-gray-800">
            National non-working holidays and local observances in Taal
          </p>
        </div>

        <div className="mt-8 flex gap-3 border-l-4 border-warning-500 bg-warning-50 p-4 text-sm text-warning-800">
          <TriangleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            National holidays follow the list declared for {HOLIDAY_YEAR}. Local
            observances become non-working days only when declared by
            proclamation or municipal ordinance. Dates may change based on
            official announcements.
          </p>
        </div>

        <HolidayTable title="A. Regular Holidays" items={REGULAR_HOLIDAYS} />
        <HolidayTable
          title="B. Special (Non-Working) Holidays"
          items={SPECIAL_HOLIDAYS}
        />
        <HolidayTable
          title="C. Taal Local Observances"
          items={LOCAL_OBSERVANCES}
        />

        <p className="mt-8 text-sm text-gray-700">
          National list from{' '}
          <a
            href={TAAL_SOURCES.bettergovHolidays.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 underline hover:text-accent-800"
          >
            BetterGov.ph
          </a>
          ; local feast days from{' '}
          <a
            href={TAAL_SOURCES.wikipedia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 underline hover:text-accent-800"
          >
            Wikipedia
          </a>
          .
        </p>
      </div>
    </main>
  );
}
