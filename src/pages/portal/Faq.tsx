import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import InfoPage, { Ext, In } from '../../components/layout/InfoPage';
import { CHARTER } from '../../data/offices';
import { REPO_URL, REPORT_PAGE } from '../../data/portal';

function Faqs({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map(item => (
        <details key={item.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-bold text-gray-900 hover:text-accent-700 [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-gray-700 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="space-y-3 pb-4">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

export default function Faq() {
  return (
    <InfoPage
      title="Frequently Asked Questions"
      subtitle="Answers about who runs this site, where the information comes from and how to use it."
      sections={[
        {
          id: 'project',
          title: 'About the Project',
          content: (
            <Faqs
              items={[
                {
                  q: 'Is this the official website of the Municipality of Taal?',
                  a: (
                    <p>
                      No. BetterTaalBatangas.org is an independent,
                      volunteer-run portal. It is not operated or endorsed by
                      the Municipality of Taal or any government agency.
                    </p>
                  ),
                },
                {
                  q: 'Who built and maintains this website?',
                  a: (
                    <p>
                      Volunteers from Taal and its friends, as part of the
                      BetterGov.ph movement. Anyone can help; see the{' '}
                      <In to="/about">About</In> page.
                    </p>
                  ),
                },
                {
                  q: 'How is the website funded?',
                  a: (
                    <p>
                      Volunteers cover the small costs, such as the domain. The
                      site costs the people and the government of Taal nothing.
                      We do not run ads or accept political funding.
                    </p>
                  ),
                },
                {
                  q: 'Does this website support any politician or party?',
                  a: (
                    <p>
                      No. The portal is non-partisan. Officials are listed
                      because they hold office, not as an endorsement.
                    </p>
                  ),
                },
              ]}
            />
          ),
        },
        {
          id: 'information',
          title: 'Information and Accuracy',
          content: (
            <Faqs
              items={[
                {
                  q: 'Where does the information come from?',
                  a: (
                    <p>
                      Services, fees and offices come from the{' '}
                      <Ext href={CHARTER.url}>{CHARTER.title}</Ext>. Officials
                      come from the May 2025 election results. Weather comes
                      from Open-Meteo, and exchange rates from the Bangko
                      Sentral ng Pilipinas.
                    </p>
                  ),
                },
                {
                  q: 'Is the information always up to date?',
                  a: (
                    <p>
                      We update it whenever we learn of changes, but fees,
                      requirements and office hours can change without notice.
                      Before you go, confirm with the office concerned.
                    </p>
                  ),
                },
                {
                  q: 'I found an error. What should I do?',
                  a: (
                    <p>
                      Please <In to={REPORT_PAGE}>report an issue</In> with the
                      page, what is wrong and the correct information if you
                      know it. We fix reports as soon as we can.
                    </p>
                  ),
                },
                {
                  q: 'Can I apply for a permit or pay fees here?',
                  a: (
                    <p>
                      No. This site explains how each service works, but all
                      applications and payments are made at the municipal hall
                      or through official channels.
                    </p>
                  ),
                },
                {
                  q: 'Can I reuse the content of this website?',
                  a: (
                    <p>
                      Yes. Our own content is public domain unless otherwise
                      stated. Content from other sources, such as photos,
                      belongs to their owners and is credited on each page.
                    </p>
                  ),
                },
              ]}
            />
          ),
        },
        {
          id: 'using',
          title: 'Using the Website',
          content: (
            <Faqs
              items={[
                {
                  q: 'Do I need an account?',
                  a: (
                    <p>
                      No. There are no accounts or sign-ups. Everything is free
                      to read.
                    </p>
                  ),
                },
                {
                  q: 'Does this website collect my personal information?',
                  a: (
                    <p>
                      No. We do not use analytics, ads or tracking cookies. See
                      our <In to="/privacy">Privacy Policy</In> for the details.
                    </p>
                  ),
                },
                {
                  q: 'Is the website available in Filipino?',
                  a: (
                    <p>
                      Partly. Menus and many labels can be switched to Filipino
                      with the language selector in the footer. We are
                      translating the rest.
                    </p>
                  ),
                },
                {
                  q: 'Can I use this website on my phone?',
                  a: (
                    <p>
                      Yes. Every page works on phones, tablets and computers.
                    </p>
                  ),
                },
                {
                  q: 'How can I help?',
                  a: (
                    <p>
                      Report errors, share updated information or contribute on{' '}
                      <Ext href={REPO_URL}>GitHub</Ext>. Non-developers are
                      welcome too.
                    </p>
                  ),
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
