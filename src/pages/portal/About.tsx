import InfoPage, { Ext, In } from '../../components/layout/InfoPage';
import { CHARTER } from '../../data/offices';
import { BETTERGOV_URL, REPO_URL, REPORT_PAGE } from '../../data/portal';

export default function About() {
  return (
    <InfoPage
      title="About the Portal"
      subtitle="A volunteer-built guide to the services, offices and people of the Municipality of Taal, Batangas."
      sections={[
        {
          id: 'what',
          title: 'What This Is',
          content: (
            <>
              <p>
                BetterTaalBatangas.org puts the information residents of Taal
                need most in one place: how to get a permit or certificate, what
                to bring, how much it costs, which office to go to, who our
                elected officials are and which numbers to call in an emergency.
              </p>
              <p>
                Everything is written in plain language and organized around
                what people are trying to do, not around how the government is
                organized.
              </p>
            </>
          ),
        },
        {
          id: 'why',
          title: 'Why We Built It',
          content: (
            <>
              <p>
                Government information is often scattered across Facebook posts,
                scanned documents and notices at the municipal hall. We believe
                that finding out how to register a birth or renew a business
                permit should take a minute, not a trip.
              </p>
              <p>
                This portal is an act of civic service. It is built by
                volunteers who care about Taal, in their own time, at no cost to
                the people or the government of Taal.
              </p>
            </>
          ),
        },
        {
          id: 'not-official',
          title: 'Not an Official Government Website',
          content: (
            <>
              <p>
                <strong>
                  BetterTaalBatangas.org is not run by the Municipality of Taal
                  or any government agency.
                </strong>{' '}
                We are independent volunteers. We cannot process applications,
                accept payments or answer for any office.
              </p>
              <p>
                For official transactions, please visit the Taal Municipal Hall
                or contact the office concerned. Office emails are listed in the{' '}
                <In to="/government">Government Directory</In>, and emergency
                numbers are on the <In to="/taal/hotlines">Hotlines</In> page.
              </p>
            </>
          ),
        },
        {
          id: 'sources',
          title: 'Where the Information Comes From',
          content: (
            <>
              <ul>
                <li>
                  <strong>Services, fees and offices:</strong> the{' '}
                  <Ext href={CHARTER.url}>{CHARTER.title}</Ext> published by the
                  Municipality of Taal.
                </li>
                <li>
                  <strong>Elected officials:</strong> the May 2025 election
                  results and public records.
                </li>
                <li>
                  <strong>Weather:</strong>{' '}
                  <Ext href="https://open-meteo.com">Open-Meteo.com</Ext>.
                </li>
                <li>
                  <strong>Exchange rates:</strong> the Bangko Sentral ng
                  Pilipinas, through the BetterGov.ph API.
                </li>
                <li>
                  <strong>History and culture:</strong> published sources,
                  credited on each page.
                </li>
              </ul>
              <p>
                We check our work, but details can change before we catch them.
                When in doubt, confirm with the office concerned.
              </p>
            </>
          ),
        },
        {
          id: 'bettergov',
          title: 'Part of BetterGov.ph',
          content: (
            <p>
              This site is built on the open-source template of{' '}
              <Ext href={BETTERGOV_URL}>BetterGov.ph</Ext>, a volunteer movement
              making Philippine government information easier to find and use.
              Many towns and cities now have their own Better LGU portal, each
              maintained by local volunteers.
            </p>
          ),
        },
        {
          id: 'help',
          title: 'How You Can Help',
          content: (
            <ul>
              <li>
                <strong>Report errors.</strong> Found something wrong or out of
                date? <In to={REPORT_PAGE}>Report an issue</In> and we will
                correct it.
              </li>
              <li>
                <strong>Share what you know.</strong> Barangay officials,
                updated fees and office hours are always welcome.
              </li>
              <li>
                <strong>Contribute.</strong> The code is open on{' '}
                <Ext href={REPO_URL}>GitHub</Ext>. Developers, designers,
                writers and translators can all help.
              </li>
              <li>
                <strong>Spread the word.</strong> Share the site with family and
                neighbors who need it.
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
