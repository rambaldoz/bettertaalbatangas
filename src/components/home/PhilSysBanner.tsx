import { ArrowUpRight, BadgeCheck, IdCard, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// PhilSys National ID: a contained card instead of a full-width color band.
export default function PhilSysBanner() {
  const { t } = useTranslation('common');
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="p-6 md:p-10">
            <p className="text-sm font-bold uppercase tracking-wider text-primary-700">
              {t('philsys.eyebrow')}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {t('philsys.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-gray-800">
              {t('philsys.text')}
            </p>
            <ul className="mt-6 space-y-3 text-base text-gray-900">
              <li className="flex items-start gap-3">
                <BadgeCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                {t('philsys.free')}
              </li>
              <li className="flex items-start gap-3">
                <Users
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                {t('philsys.open')}
              </li>
            </ul>
            <a
              href="https://philsys.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary-600 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-secondary-700"
            >
              {t('philsys.button')}
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <div
            className="relative hidden items-center justify-center bg-[linear-gradient(135deg,#0032a0_0%,#001f63_100%)] p-10 lg:flex"
            aria-hidden="true"
          >
            {/* Simple ID card illustration */}
            <div className="w-64 rotate-[-4deg] rounded-xl bg-white p-5 shadow-2xl">
              <div className="flex items-center gap-2">
                <IdCard className="h-6 w-6 text-primary-700" />
                <span className="text-sm font-bold tracking-wide text-gray-900">
                  REPUBLIKA NG PILIPINAS
                </span>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="h-20 w-16 rounded-md bg-gray-200" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-2.5 w-full rounded bg-gray-200" />
                  <div className="h-2.5 w-4/5 rounded bg-gray-200" />
                  <div className="h-2.5 w-3/5 rounded bg-gray-200" />
                  <div className="h-2.5 w-2/3 rounded bg-accent-300" />
                </div>
              </div>
              <div className="mt-4 h-2.5 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
