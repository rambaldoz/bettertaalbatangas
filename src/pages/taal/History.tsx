import SEO from '../../components/SEO';
import {
  HISTORICAL_FIGURES,
  HISTORY_OVERVIEW,
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

export default function TaalHistory() {
  return (
    <main>
      <SEO
        title="History of Taal"
        description="A timeline of Taal, Batangas from its founding in 1572 to today."
      />
      <PageHero
        image={HERO_PHOTOS.history.src}
        credit={HERO_PHOTOS.history.credit}
        title="History of Taal"
        subtitle="Journey through more than 450 years of the town that was once the capital of Batangas and gave the nation its first flag."
        photoNote="Photo placeholder: Basilica de San Martin de Tours"
      />
      <TwoColumn
        main={
          <>
            <SectionTitle>Historical Timeline</SectionTitle>
            <ol className="relative space-y-10 border-l-2 border-gray-200 pl-10 md:pl-14 ml-6">
              {TIMELINE.map(item => (
                <li key={item.period} className="relative">
                  <span className="absolute -left-[3.95rem] md:-left-[4.95rem] top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-600 bg-white text-primary-600">
                    <TaalIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="bg-primary-50 px-6 py-3 text-sm font-bold text-primary-700">
                      {item.period}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-800">
                        {item.description}
                      </p>
                      <TaalImage
                        src={item.photo}
                        label={item.image}
                        className="mt-4 h-56 md:h-72"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <SectionTitle>Historical Overview</SectionTitle>
              <Prose paragraphs={HISTORY_OVERVIEW} />
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
            <SidebarCard title="Key Historical Figures">
              <NameList
                items={HISTORICAL_FIGURES.map(f => ({
                  name: f.name,
                  detail: f.role,
                }))}
              />
            </SidebarCard>
            <SidebarCard title="Important Dates">
              <ul className="space-y-4">
                {IMPORTANT_DATES.map(d => (
                  <li key={d.date}>
                    <div className="text-xs text-gray-700">{d.date}</div>
                    <div className="text-gray-900">{d.event}</div>
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
