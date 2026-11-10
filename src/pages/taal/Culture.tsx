import SEO from '../../components/SEO';
import {
  CULTURAL_HERITAGE,
  CULTURE_OVERVIEW,
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

export default function TaalCulture() {
  return (
    <main>
      <SEO
        title="Culture of Taal"
        description="Crafts, food, festivals and faith traditions of Taal, Batangas."
      />
      <PageHero
        image={HERO_PHOTOS.culture.src}
        credit={HERO_PHOTOS.culture.credit}
        title="Culture of Taal"
        subtitle="Experience the embroidery, balisong, food and fiestas that make Taal the heritage capital of Batangas."
        photoNote="Photo placeholder: El Pasubat Festival"
      />
      <TwoColumn
        main={
          <>
            <SectionTitle>Cultural Heritage</SectionTitle>
            <div className="space-y-5">
              {CULTURAL_HERITAGE.map(item => (
                <Card key={item.title} className="flex gap-4 p-6">
                  <IconBadge name={item.icon} />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-800">
                      {item.text}
                    </p>
                    <TaalImage
                      src={item.photo}
                      label={item.image}
                      className="mt-4 h-56 md:h-72"
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <SectionTitle>Cultural Identity</SectionTitle>
              <Prose paragraphs={CULTURE_OVERVIEW} />
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
            <SidebarCard title="Major Festivals">
              <NameList
                items={FESTIVALS.map(f => ({ name: f.name, detail: f.when }))}
              />
            </SidebarCard>
            <SidebarCard title="Traditional Arts">
              <NameList
                items={TRADITIONAL_ARTS.map(a => ({
                  name: a.name,
                  detail: a.detail,
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
