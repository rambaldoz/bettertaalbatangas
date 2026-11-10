import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  FOREX_API_URL,
  flagEmoji,
  formatPeso,
  titleCase,
  useForex,
} from '../../lib/bettergovApi';
import { Card } from '../../components/taal/TaalUI';
import { cn } from '../../lib/utils';

export default function Forex() {
  const { data, loading, error } = useForex();
  const [selected, setSelected] = useState('USD');
  const [query, setQuery] = useState('');
  const [php, setPhp] = useState('1000');

  const rates = useMemo(() => data?.rates ?? [], [data]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? rates.filter(
          r =>
            r.symbol.toLowerCase().includes(q) ||
            r.country.toLowerCase().includes(q)
        )
      : rates;
  }, [rates, query]);

  const rate = rates.find(r => r.symbol === selected) ?? rates[0];
  const converted =
    rate && Number(php) > 0
      ? (Number(php) / rate.phpEquivalent).toFixed(2)
      : '';
  const published = rate?.publishedDate
    ? new Date(rate.publishedDate).toLocaleDateString('en-PH', {
        dateStyle: 'long',
      })
    : null;

  return (
    <main className="bg-gray-50">
      <SEO
        title="Foreign Exchange Rates"
        description="Peso exchange rates from the Bangko Sentral ng Pilipinas."
      />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Foreign Exchange Rates
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Value of foreign currencies in Philippine pesos, from the Bangko
            Sentral ng Pilipinas.
          </p>
        </div>
        {loading && <p className="text-gray-700">Loading exchange rates...</p>}
        {error && (
          <p className="text-error-600">
            Exchange rates are unavailable right now. Please try again later.
          </p>
        )}

        {rate && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:max-h-[36rem] flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <h2 className="text-lg font-bold text-gray-900">Currencies</h2>
              </div>
              <label className="relative mx-5 mt-4 block">
                <span className="sr-only">Search currencies</span>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </label>
              <ul className="flex-1 overflow-y-auto p-3">
                {filtered.map(r => (
                  <li key={r.symbol}>
                    <button
                      type="button"
                      onClick={() => setSelected(r.symbol)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors',
                        r.symbol === rate.symbol
                          ? 'bg-primary-100'
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {flagEmoji(r.countryCode)}
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-gray-900">
                          {r.symbol}
                        </span>
                        <span className="block text-xs text-gray-700">
                          {titleCase(r.country)}
                        </span>
                      </span>
                      <span className="font-bold text-gray-900">
                        {formatPeso(r.phpEquivalent)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-6 lg:col-span-2">
              <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-3xl">
                    {flagEmoji(rate.countryCode)}
                  </span>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {rate.symbol}
                    </div>
                    <div className="text-gray-800">
                      {titleCase(rate.country)} {titleCase(rate.currency)}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-gray-100 px-5 py-4">
                  <div className="text-sm text-gray-700">Current Rate</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPeso(rate.phpEquivalent, 4)}
                  </div>
                  <div className="text-xs text-gray-700">Philippine Peso</div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Currency Converter
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-gray-800">
                      Philippine Peso (PHP)
                    </span>
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={php}
                      onChange={e => setPhp(e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                  </label>
                  <div>
                    <span className="text-sm text-gray-800">
                      {rate.symbol} ({titleCase(rate.country)})
                    </span>
                    <output className="mt-1 block rounded-md bg-gray-100 px-3 py-2 text-gray-900">
                      {converted || '0.00'}
                    </output>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700">
                  Exchange rates are provided by Bangko Sentral ng Pilipinas
                  (BSP) through the{' '}
                  <a
                    href={FOREX_API_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-700 underline hover:text-accent-800"
                  >
                    BetterGov.ph API
                  </a>
                  .{published && ` Published: ${published}.`}
                </p>
              </Card>
            </div>
          </div>
        )}

        <Card className="mt-10 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            About Foreign Exchange Rates
          </h2>
          <p className="mt-3 leading-relaxed text-gray-800">
            The rates on this page come from the Bangko Sentral ng Pilipinas
            (BSP), the central bank of the Philippines. They are official
            reference rates for the Philippine Peso against major world
            currencies.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-bold text-gray-900">
                Understanding Exchange Rates
              </h3>
              <p className="mt-2 text-gray-800">
                Each rate shows how many Philippine Pesos buy one unit of the
                foreign currency. Banks and money changers in Taal may charge a
                different rate.
              </p>
            </div>
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-bold text-gray-900">Official BSP Rates</h3>
              <p className="mt-2 text-gray-800">
                For official reference rates and more detail, visit the{' '}
                <a
                  href="https://www.bsp.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 underline hover:text-accent-800"
                >
                  Bangko Sentral ng Pilipinas website
                </a>
                .
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
