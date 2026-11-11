import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import {
  CULTURAL_HERITAGE,
  FESTIVALS,
  TAAL_SOURCES,
  TRADITIONAL_ARTS,
  HERO_PHOTOS,
} from '../../data/taal';
import {
  Card,
  IconBadge,
  TaalImage,
  NameList,
  PageHero,
  Prose,
  RelatedLinks,
  SectionTitle,
  SidebarCard,
  Sources,
  TwoColumn,
} from '../../components/taal/TaalUI';

// Text: taal.culture in public/locales/<lang>/common.json
export default function TaalCulture() {
  const { t } = useTranslation('common');
  return (
    <main>
      <SEO
        title={t('taal.culture.seoTitle')}
        description={t('taal.culture.seoDescription')}
      />
      <PageHero
        image={HERO_PHOTOS.culture.src}
        credit={HERO_PHOTOS.culture.credit}
        title={t('taal.culture.title')}
        subtitle={t('taal.culture.subtitle')}
        photoNote={t('taal.culture.photoNote')}
      />
      <TwoColumn
        main={
          <>
            <SectionTitle>{t('taal.culture.heritageTitle')}</SectionTitle>
            <div className="space-y-5">
              {CULTURAL_HERITAGE.map(item => (
                <Card key={item.key} className="flex gap-4 p-6">
                  <IconBadge name={item.icon} />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      {t(`taal.culture.heritage.${item.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-800">
                      {t(`taal.culture.heritage.${item.key}.text`)}
                    </p>
                    <TaalImage
                      src={item.photo}
                      label={t(`taal.culture.heritage.${item.key}.image`)}
                      className="mt-4 h-56 md:h-72"
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <SectionTitle>{t('taal.culture.identityTitle')}</SectionTitle>
              <Prose
                paragraphs={
                  t('taal.culture.paragraphs', {
                    returnObjects: true,
                  }) as string[]
                }
              />
              <Sources
                items={[
                  TAAL_SOURCES.wikipedia,
                  TAAL_SOURCES.gmaElPasubat,
                  TAAL_SOURCES.pnaBurda,
                ]}
              />
            </div>
          </>
        }
        sidebar={
          <>
            <SidebarCard title={t('taal.culture.festivalsTitle')}>
              <NameList
                items={FESTIVALS.map(key => ({
                  name: t(`taal.culture.festivals.${key}.name`),
                  detail: t(`taal.culture.festivals.${key}.when`),
                }))}
              />
            </SidebarCard>
            <SidebarCard title={t('taal.culture.artsTitle')}>
              <NameList
                items={TRADITIONAL_ARTS.map(key => ({
                  name: t(`taal.culture.arts.${key}.name`),
                  detail: t(`taal.culture.arts.${key}.detail`),
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
