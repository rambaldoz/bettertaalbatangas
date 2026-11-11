import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import {
  KEY_INFORMATION,
  QUICK_FACTS,
  TAAL_SOURCES,
  HERO_PHOTOS,
} from '../../data/taal';
import {
  Card,
  IconBadge,
  InfoList,
  PageHero,
  Prose,
  RelatedLinks,
  SectionTitle,
  SidebarCard,
  Sources,
  TwoColumn,
} from '../../components/taal/TaalUI';

// Text: taal.about in public/locales/<lang>/common.json
export default function TaalAbout() {
  const { t } = useTranslation('common');
  return (
    <main>
      <SEO
        title={t('taal.about.seoTitle')}
        description={t('taal.about.seoDescription')}
      />
      <PageHero
        image={HERO_PHOTOS.about.src}
        credit={HERO_PHOTOS.about.credit}
        title={t('taal.about.title')}
        subtitle={t('taal.about.subtitle')}
        photoNote={t('taal.about.photoNote')}
      />
      <TwoColumn
        main={
          <>
            <SectionTitle>{t('taal.about.quickFacts')}</SectionTitle>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {QUICK_FACTS.map(fact => (
                <Card key={fact.key} className="flex gap-4 p-6">
                  <IconBadge name={fact.icon} />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {t(`taal.about.facts.${fact.key}.title`)}
                    </h3>
                    <p className="mt-2 leading-relaxed text-gray-800">
                      {t(`taal.about.facts.${fact.key}.text`)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <SectionTitle>{t('taal.about.overview')}</SectionTitle>
              <Prose
                paragraphs={
                  t('taal.about.paragraphs', {
                    returnObjects: true,
                  }) as string[]
                }
              />
              <Sources
                items={[
                  TAAL_SOURCES.philatlas,
                  TAAL_SOURCES.wikipedia,
                  TAAL_SOURCES.gmaElPasubat,
                ]}
              />
            </div>
          </>
        }
        sidebar={
          <>
            <SidebarCard title={t('taal.about.keyInformation')}>
              <InfoList
                items={KEY_INFORMATION.map(key => ({
                  label: t(`taal.about.info.${key}.label`),
                  value: t(`taal.about.info.${key}.value`),
                }))}
              />
            </SidebarCard>
            <RelatedLinks />
          </>
        }
      />
    </main>
  );
}
