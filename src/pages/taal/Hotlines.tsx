import { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bus,
  CloudSun,
  Heart,
  MapPin,
  Phone,
  Search,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import SEO from '../../components/SEO';
import {
  HOTLINES,
  TAAL_SOURCES,
  isPlaceholderNumber,
  type HotlineCategory,
} from '../../data/taal';
import {
  PageBody,
  PageHeader,
  Panel,
  PanelHeading,
  SideNav,
} from '../../components/layout/PageLayout';

const FILTERS: {
  label: string;
  value: HotlineCategory | 'All';
  icon: LucideIcon;
}[] = [
  { label: 'All Hotlines', value: 'All', icon: Phone },
  { label: 'Taal', value: 'Taal', icon: MapPin },
  { label: 'Emergency', value: 'Emergency', icon: AlertCircle },
  { label: 'Disaster', value: 'Disaster', icon: AlertTriangle },
  { label: 'Security', value: 'Security', icon: Shield },
  { label: 'Transport', value: 'Transport', icon: Bus },
  { label: 'Weather', value: 'Weather', icon: CloudSun },
  { label: 'Social Services', value: 'Social Services', icon: Heart },
];

// "(02) 8911-1406" -> "tel:0289111406". Text-only entries get no link.
function telHref(number: string): string | null {
  if (isPlaceholderNumber(number)) return null;
  // Drop a trailing note like "(Ambulance)", but keep area codes like "(043)".
  const main = number
    .replace(/\s*\([^()]*[a-z][^()]*\)\s*$/i, '')
    .split(' to ')[0];
  if (/text/i.test(number)) return null;
  const digits = main.replace(/[^\d]/g, '');
  return digits.length >= 3 ? `tel:${digits}` : null;
}

export default function TaalHotlines() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<HotlineCategory | 'All'>('All');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HOTLINES.filter(
      h => filter === 'All' || h.category === filter
    ).filter(
      h =>
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
    );
  }, [query, filter]);

  const active = FILTERS.find(f => f.value === filter) ?? FILTERS[0];

  return (
    <main className="flex-grow">
      <SEO
        title="Taal Emergency Hotlines"
        description="Emergency and public service hotlines for Taal, Batangas."
      />
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Hotlines' }]}
        title="Taal Emergency Hotlines"
        subtitle="Important contact numbers for emergencies and public services"
      >
        <form
          role="search"
          onSubmit={e => e.preventDefault()}
          className="mx-auto mt-8 max-w-xl"
        >
          <label htmlFor="hotline-search" className="sr-only">
            Search hotlines
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-700"
              aria-hidden="true"
            />
            <input
              id="hotline-search"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for hotlines..."
              className="w-full rounded-full border border-white bg-white py-3 pl-12 pr-4 text-base text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
          </div>
        </form>
      </PageHeader>
      <PageBody
        sidebar={
          <SideNav
            title="Hotline Categories"
            items={FILTERS.map(f => ({
              key: f.value,
              label: f.label,
              iconNode: (
                <f.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              ),
              active: filter === f.value,
              onClick: () => setFilter(f.value),
              badge:
                f.value === 'All'
                  ? HOTLINES.length
                  : HOTLINES.filter(h => h.category === f.value).length,
            }))}
          />
        }
      >
        <Panel>
          <PanelHeading
            title={active.label}
            text={
              query.trim()
                ? `${results.length} ${results.length === 1 ? 'hotline matches' : 'hotlines match'} "${query.trim()}"`
                : `${results.length} ${results.length === 1 ? 'hotline' : 'hotlines'}`
            }
          />
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map(h => (
              <li
                key={h.name}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <h3 className="text-lg font-bold text-gray-900">{h.name}</h3>
                <p className="mt-1 text-base text-gray-800">{h.description}</p>
                <ul className="mt-3 space-y-2">
                  {h.numbers.length === 0 && (
                    <li className="text-base italic text-gray-700">
                      Number to be confirmed
                    </li>
                  )}
                  {h.numbers.map(n => {
                    const href = telHref(n);
                    return (
                      <li key={n} className="flex items-start gap-2 text-base">
                        <Phone
                          className="mt-1 h-4 w-4 shrink-0 text-accent-700"
                          aria-hidden="true"
                        />
                        {href ? (
                          <a
                            href={href}
                            className="font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
                          >
                            {n}
                          </a>
                        ) : isPlaceholderNumber(n) ? (
                          <span className="text-gray-700">
                            {n}{' '}
                            <span className="italic">(to be confirmed)</span>
                          </span>
                        ) : (
                          <span className="text-gray-900">{n}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="mt-4 text-base text-gray-800">
              No hotlines match your search.
            </p>
          )}
          <p className="mt-8 text-sm text-gray-700">
            National hotlines are from{' '}
            <a
              href={TAAL_SOURCES.bettergovHotlines.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-700 underline hover:text-accent-800"
            >
              BetterGov.ph
            </a>
            . Taal numbers were gathered from public sources in November 2026,
            including the Batangas provincial MDRRMO list, the PNP telephone
            directory and the Taal LGU directory, and some may have changed. If
            a number does not connect in an emergency, call 911.
          </p>
        </Panel>
      </PageBody>
    </main>
  );
}
