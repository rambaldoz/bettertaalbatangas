import { useMemo, useState } from 'react';
import { Building2, MapPin, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BARANGAYS, POBLACION_COUNT, TAAL_SOURCES } from '../../data/taal';
import { Card, InfoList, Prose, Sources } from '../taal/TaalUI';
import { Panel, PanelHeading } from '../layout/PageLayout';

// The 42 barangays of Taal, shown in the Government directory
// (/government/barangays). Barangay officials will be added per barangay.
export default function BarangayDirectory() {
  const { t } = useTranslation('common');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? BARANGAYS.filter(b => b.name.toLowerCase().includes(q))
      : BARANGAYS;
  }, [query]);

  return (
    <>
      <Panel>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <PanelHeading
            eyebrow={t('barangaysPage.eyebrow')}
            title={t('barangaysPage.title')}
            text={t('barangaysPage.count', {
              total: BARANGAYS.length,
              poblacion: POBLACION_COUNT,
            })}
          />
          <label className="relative block md:w-72">
            <span className="sr-only">{t('barangaysPage.searchLabel')}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-700"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('barangaysPage.searchPlaceholder')}
              className="w-full rounded-md border border-gray-400 bg-white py-2.5 pl-10 pr-3 text-base text-gray-900 placeholder:text-gray-600 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700"
            />
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(b => (
            <Card key={b.name} className="flex gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{b.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-700">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {b.type === 'Poblacion'
                    ? t('barangaysPage.poblacion')
                    : t('barangaysPage.barangay')}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  {t('barangaysPage.comingSoon')}
                </p>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-base text-gray-800">
              {t('barangaysPage.noResults', { query })}
            </p>
          )}
        </div>
      </Panel>

      <Panel>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('barangaysPage.overview')}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Prose
              paragraphs={
                t('taal.barangays.paragraphs', {
                  returnObjects: true,
                }) as string[]
              }
            />
          </div>
          <InfoList
            items={[
              {
                label: t('barangaysPage.total'),
                value: `${BARANGAYS.length}`,
              },
              {
                label: t('barangaysPage.poblacionLabel'),
                value: t('barangaysPage.nBarangays', {
                  count: POBLACION_COUNT,
                }),
              },
              {
                label: t('barangaysPage.outside'),
                value: t('barangaysPage.nBarangays', {
                  count: BARANGAYS.length - POBLACION_COUNT,
                }),
              },
              { label: t('barangaysPage.population'), value: '61,460' },
            ]}
          />
        </div>
        <Sources items={[TAAL_SOURCES.philatlas, TAAL_SOURCES.wikipedia]} />
      </Panel>
    </>
  );
}
