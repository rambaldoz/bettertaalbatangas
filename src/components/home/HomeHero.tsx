import { Link } from 'react-router';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Landmark,
  Siren,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// "Where to next?" shortcuts in the hero card. Text lives in common.json
// under hero.links.<key>.
const SHORTCUTS: { key: string; href: string; icon: LucideIcon }[] = [
  { key: 'services', href: '/services', icon: BookOpenText },
  { key: 'about', href: '/taal/about', icon: Landmark },
  { key: 'leadership', href: '/government', icon: UsersRound },
  { key: 'hotlines', href: '/taal/hotlines', icon: Siren },
];

// Hero in the style of betteraparri.org: greeting, site name and a
// "Browse Services" button on the left, a "Where to next?" card on the right.
export default function HomeHero() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* A soft yellow sun in the corner over the flag-blue gradient */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,rgba(254,209,65,0.22),transparent_35%),radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent),linear-gradient(135deg,#0032a0_0%,#002a86_55%,#001f63_100%)]"
        aria-hidden="true"
      />
      <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-lg font-bold text-accent-400">
            {t('hero.greeting')}
          </p>
          <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[2.5rem] xl:text-5xl 2xl:text-[3.5rem]">
            {t('hero.brand')}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
            {t('hero.subtitle')}
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary-600 px-5 py-3 font-bold text-white shadow-md transition-colors hover:bg-secondary-700"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            {t('hero.browseServices')}
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl bg-white text-gray-900 shadow-xl">
          <div className="px-6 pt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-600">
              {t('hero.started')}
            </p>
            <h2 className="mt-1 text-2xl font-bold">{t('hero.whereNext')}</h2>
          </div>
          <ul className="mt-3 px-3">
            {SHORTCUTS.map(({ key, href, icon: Icon }) => (
              <li
                key={key}
                className="border-b border-gray-100 last:border-b-0"
              >
                <Link
                  to={href}
                  className="group flex items-center gap-4 rounded-lg px-3 py-3.5 transition-colors hover:bg-gray-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold">
                      {t(`hero.links.${key}.title`)}
                    </span>
                    <span className="block text-sm text-gray-700">
                      {t(`hero.links.${key}.text`)}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-gray-600 transition-colors group-hover:text-primary-600"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/services"
            className="mt-2 flex items-center justify-between bg-gray-50 px-6 py-4 text-sm font-bold text-primary-700 underline underline-offset-2 transition-colors hover:bg-primary-50"
          >
            {t('hero.helpFind')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
