import { Link } from 'react-router';
import {
  ArrowRight,
  Flame,
  Hospital,
  Phone,
  PhoneCall,
  Shield,
  Ship,
  Siren,
  type LucideIcon,
} from 'lucide-react';
import { useContent } from '../../lib/useContent';
import { HOTLINES, isPlaceholderNumber, type Hotline } from '../../data/taal';

const ICONS: Record<string, LucideIcon> = {
  Siren,
  Shield,
  Flame,
  Ship,
  Hospital,
};

// "(043) 740-0010" -> "tel:0437400010"
const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`;
// First number, without notes like "(Hotline)".
const mainNumber = (h: Hotline) => h.numbers[0]?.replace(/\s*\(\D+\)$/, '');

/**
 * Home page "Emergency Hotlines": 911 in a dark olive panel on the left, the
 * Taal hotlines marked `featured` in src/data/taal.ts as a call list on the
 * right. Calm palette colors, big numbers, whole rows tap-to-call.
 */
export default function EmergencyHotlines() {
  const c = useContent();
  const { t } = c;
  const featured = HOTLINES.filter(
    (h): h is Hotline & { featured: NonNullable<Hotline['featured']> } =>
      !!h.featured
  );

  return (
    <section aria-labelledby="hotlines-title" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="hotlines-title"
              className="text-3xl font-bold text-gray-900"
            >
              {t('home.hotlinesTitle')}
            </h2>
            <p className="mt-2 text-lg text-gray-800">
              {t('home.hotlinesText')}
            </p>
          </div>
          <Link
            to="/taal/hotlines"
            className="inline-flex shrink-0 items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
          >
            {t('home.allHotlines')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* 911 panel */}
          <a
            href="tel:911"
            aria-label={`${t('home.call')} ${t('home.national')}: 911`}
            className="group flex flex-col justify-between gap-6 rounded-2xl bg-primary-900 p-8 text-white transition-colors hover:bg-primary-800"
          >
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <PhoneCall className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-6 text-lg font-bold">{t('home.national')}</p>
              <p className="text-6xl font-bold tabular-nums leading-tight">
                911
              </p>
              <p className="mt-2 text-base text-white">
                {t('home.nationalText')}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-lg bg-white px-5 py-3 text-base font-bold text-primary-900 transition-colors group-hover:bg-primary-50">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {t('home.call')} 911
            </span>
          </a>

          {/* Taal hotlines as a call list */}
          <ul className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {featured.map(h => {
              const Icon = ICONS[h.featured.icon] ?? Phone;
              const number = mainNumber(h);
              const usable = number && !isPlaceholderNumber(number);
              const callLabel = usable && (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-700 px-3 py-1.5 text-sm font-bold text-accent-700 transition-colors group-hover:bg-accent-700 group-hover:text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t('home.call')}
                </span>
              );
              const row = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors group-hover:bg-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold text-gray-900">
                      {c.hotlineFeatured(h)}
                    </span>
                    <span className="block text-sm text-gray-700">
                      {c.hotlineName(h)}
                    </span>
                    {/* Phones: number under the name */}
                    <span className="mt-1 flex items-center justify-between gap-3 sm:hidden">
                      <span className="text-xl font-bold tabular-nums text-gray-900">
                        {number ?? '--'}
                      </span>
                      {callLabel}
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-4 sm:flex">
                    <span className="text-2xl font-bold tabular-nums text-gray-900">
                      {number ?? '--'}
                    </span>
                    {callLabel}
                  </span>
                </>
              );
              const cls =
                'group flex items-center gap-4 px-5 py-4 transition-colors sm:px-6';
              return (
                <li key={c.hotlineName(h)}>
                  {usable ? (
                    <a
                      href={telHref(number)}
                      aria-label={`${t('home.call')} ${c.hotlineFeatured(h)}: ${number}`}
                      className={`${cls} hover:bg-primary-50`}
                    >
                      {row}
                    </a>
                  ) : (
                    <div className={cls}>{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
