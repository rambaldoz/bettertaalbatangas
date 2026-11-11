import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import {
  HISTORICAL_FIGURES,
  IMPORTANT_DATES,
  TAAL_SOURCES,
  TIMELINE,
  HERO_PHOTOS,
} from '../../data/taal';
import {
  TaalImage,
  NameList,
  PageHero,
  Prose,
  RelatedLinks,
  SectionTitle,
  SidebarCard,
  Sources,
  TaalIcon,
  TwoColumn,
} from '../../components/taal/TaalUI';

// Text: taal.history in public/locales/<lang>/common.json
export default function TaalHistory() {
  const { t } = useTranslation('common');
  return (
    <main>
      <SEO
        title={t('taal.history.seoTitle')}
        description={t('taal.history.seoDescription')}
      />
      <PageHero
        image={HERO_PHOTOS.history.src}
        credit={HERO_PHOTOS.history.credit}
        title={t('taal.history.title')}
        subtitle={t('taal.history.subtitle')}
        photoNote={t('taal.history.photoNote')}
      />
      <TwoColumn
        main={
          <>
            <SectionTitle>{t('taal.history.timelineTitle')}</SectionTitle>
            <ol className="relative space-y-10 border-l-2 border-gray-200 pl-10 md:pl-14 ml-6">
              {TIMELINE.map(item => (
                <li key={item.period} className="relative">
                  <span className="absolute -left-[3.95rem] md:-left-[4.95rem] top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-600 bg-white text-primary-600">
                    <TaalIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="bg-primary-50 px-6 py-3 text-sm font-bold text-primary-700">
                      {item.period}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {t(`taal.history.timeline.${item.period}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-800">
                        {t(`taal.history.timeline.${item.period}.description`)}
                      </p>
                      <TaalImage
                        src={item.photo}
                        label={t(`taal.history.timeline.${item.period}.image`)}
                        className="mt-4 h-56 md:h-72"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <SectionTitle>{t('taal.history.overview')}</SectionTitle>
              <Prose
                paragraphs={
                  t('taal.history.paragraphs', {
                    returnObjects: true,
                  }) as string[]
                }
              />
              <Sources
                items={[
                  TAAL_SOURCES.wikipedia,
                  TAAL_SOURCES.inquirer1754,
                  TAAL_SOURCES.wikivoyage,
                ]}
              />
            </div>
          </>
        }
        sidebar={
          <>
            <SidebarCard title={t('taal.history.figuresTitle')}>
              <NameList
                items={HISTORICAL_FIGURES.map(f => ({
                  name: f.name,
                  detail: t(`taal.history.figures.${f.key}`),
                }))}
              />
            </SidebarCard>
            <SidebarCard title={t('taal.history.datesTitle')}>
              <ul className="space-y-4">
                {IMPORTANT_DATES.map(key => (
                  <li key={key}>
                    <div className="text-sm text-gray-700">
                      {t(`taal.history.dates.${key}.date`)}
                    </div>
                    <div className="text-gray-900">
                      {t(`taal.history.dates.${key}.event`)}
                    </div>
                  </li>
                ))}
              </ul>
            </SidebarCard>
            <RelatedLinks />
          </>
        }
      />
    </main>
  );
}
