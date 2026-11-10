import SEO from '../../components/SEO';
import {
  ABOUT_OVERVIEW,
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

export default function TaalAbout() {
  return (
    <main>
      <SEO
        title="About Taal"
        description="Quick facts and an overview of the Municipality of Taal, Batangas."
      />
      <PageHero
        image={HERO_PHOTOS.about.src}
        credit={HERO_PHOTOS.about.credit}
        title="About Taal"
        subtitle="Discover the Heritage Town of Batangas, home of the balisong and the Barong Tagalog, between Taal Lake and Balayan Bay."
        photoNote="Photo placeholder: Taal heritage town center"
      />
      <TwoColumn
        main={
          <>
            <SectionTitle>Quick Facts</SectionTitle>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {QUICK_FACTS.map(fact => (
                <Card key={fact.title} className="flex gap-4 p-6">
                  <IconBadge name={fact.icon} />
                  <div>
                    <h3 className="font-bold text-gray-900">{fact.title}</h3>
                    <p className="mt-2 leading-relaxed text-gray-800">
                      {fact.text}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <SectionTitle>Overview</SectionTitle>
              <Prose paragraphs={ABOUT_OVERVIEW} />
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
            <SidebarCard title="Key Information">
              <InfoList items={KEY_INFORMATION} />
            </SidebarCard>
            <RelatedLinks />
          </>
        }
      />
    </main>
  );
}
