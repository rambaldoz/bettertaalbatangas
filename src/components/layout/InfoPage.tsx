import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { CHARTER, MAYOR_OFFICE_EMAIL } from '../../data/offices';
import {
  BETTERGOV_URL,
  CONTACT_EMAIL,
  REPO_URL,
  REPORT_PAGE,
} from '../../data/portal';
import { dateLocale } from '../../lib/useContent';
import SEO from '../SEO';
import { PageBody, PageHeader, SideNav } from './PageLayout';

export interface InfoSection {
  id: string;
  title: string;
  content: ReactNode;
}

// Text styles for the body of a section: paragraphs, lists and links.
export const proseClass =
  'space-y-4 text-base leading-relaxed text-gray-800 [&_a]:text-accent-700 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent-800 [&_strong]:font-bold [&_strong]:text-gray-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6';

/** External link that opens in a new tab. */
export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Internal link, styled by the surrounding prose. */
export function In({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to}>{children}</Link>;
}

/**
 * Page for portal information (About, FAQ, Contact, Terms, Privacy,
 * Accessibility): green header, "On this page" menu and one panel per
 * section.
 */
export default function InfoPage({
  title,
  subtitle,
  description,
  sections,
  updated,
  intro,
}: {
  title: string;
  subtitle: string;
  description?: string;
  sections: InfoSection[];
  updated?: string; // YYYY-MM-DD
  intro?: ReactNode;
}) {
  const { t, i18n } = useTranslation('common');
  return (
    <main className="flex-grow">
      <SEO title={title} description={description ?? subtitle} />
      <PageHeader
        crumbs={[{ label: t('common.home'), href: '/' }, { label: title }]}
        title={title}
        subtitle={subtitle}
      />
      <PageBody
        stickySidebar
        sidebar={
          <SideNav
            title={t('common.onThisPage')}
            items={sections.map(s => ({
              key: s.id,
              label: s.title,
              href: `#${s.id}`,
            }))}
          />
        }
      >
        {intro}
        {sections.map(s => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="scroll-mt-44 rounded-lg border border-gray-200 bg-white p-6 md:p-8"
          >
            <h2
              id={`${s.id}-title`}
              className="text-2xl font-bold text-gray-900"
            >
              {s.title}
            </h2>
            <div className={`mt-4 ${proseClass}`}>{s.content}</div>
          </section>
        ))}
        {updated && (
          <p className="text-sm text-gray-700">
            {t('common.lastUpdated', {
              date: new Date(`${updated}T12:00:00`).toLocaleDateString(
                dateLocale(i18n.resolvedLanguage),
                { dateStyle: 'long' }
              ),
            })}
          </p>
        )}
      </PageBody>
    </main>
  );
}

// ---------- Pages written in the locale files ----------
//
// The portal pages keep their text in public/locales/<lang>/common.json
// under portal.<page>: title, subtitle, description and a list of sections.
// Each section has an id, a title and a body; each body item is one of:
//   "text"                    a paragraph
//   ["item", "item"]          a bulleted list
//   { "box": "text" }         a paragraph in a gray box
//   { "slot": "name" }        a React element passed in `slots`
//   { "faq": [{ "q", "a" }] } questions that open on click
// A section with "if": "name" is shown only when flags[name] is true.
// Text can use <strong> and the link tags in LINKS below, plus
// {{charterTitle}}, {{mayorEmail}} and {{contactEmail}}.

type Block =
  | string
  | string[]
  | { box: string }
  | { slot: string }
  | { faq: { q: string; a: string }[] };

interface LocalSection {
  id: string;
  title: string;
  if?: string;
  body: Block[];
}

function useLinks(): Record<string, ReactElement> {
  return {
    strong: <strong />,
    gov: <In to="/government">{null}</In>,
    offices: <In to="/government/offices">{null}</In>,
    hotlines: <In to="/taal/hotlines">{null}</In>,
    report: <In to={REPORT_PAGE}>{null}</In>,
    about: <In to="/about">{null}</In>,
    privacy: <In to="/privacy">{null}</In>,
    contact: <In to="/contact">{null}</In>,
    charter: <Ext href={CHARTER.url}>{null}</Ext>,
    repo: <Ext href={REPO_URL}>{null}</Ext>,
    bettergov: <Ext href={BETTERGOV_URL}>{null}</Ext>,
    meteo: <Ext href="https://open-meteo.com">{null}</Ext>,
    npc: <Ext href="https://privacy.gov.ph">{null}</Ext>,
    mayorEmail: <a href={`mailto:${MAYOR_OFFICE_EMAIL}`} />,
    contactEmail: <a href={`mailto:${CONTACT_EMAIL}`} />,
  };
}

function FaqList({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => (
        <details key={i} className="group py-1">
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

export function LocalizedInfoPage({
  page,
  updated,
  slots = {},
  flags = {},
}: {
  page: string; // key under "portal"
  updated?: string;
  slots?: Record<string, ReactNode>;
  flags?: Record<string, boolean>;
}) {
  const { t } = useTranslation('common');
  const links = useLinks();
  const base = `portal.${page}`;
  const values = {
    charterTitle: CHARTER.title,
    mayorEmail: MAYOR_OFFICE_EMAIL,
    contactEmail: CONTACT_EMAIL,
  };
  const rich = (key: string) => (
    <Trans i18nKey={key} components={links} values={values} />
  );

  // Keep each section's position in the full list for its text keys.
  const sections = (
    t(`${base}.sections`, { returnObjects: true }) as LocalSection[]
  )
    .map((s, i) => ({ ...s, i }))
    .filter(s => !s.if || flags[s.if]);

  const block = (b: Block, key: string) => {
    if (typeof b === 'string') return <p key={key}>{rich(key)}</p>;
    if (Array.isArray(b))
      return (
        <ul key={key}>
          {b.map((_, k) => (
            <li key={k}>{rich(`${key}.${k}`)}</li>
          ))}
        </ul>
      );
    if ('box' in b)
      return (
        <p
          key={key}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          {rich(`${key}.box`)}
        </p>
      );
    if ('slot' in b) return <div key={key}>{slots[b.slot]}</div>;
    return (
      <FaqList
        key={key}
        items={b.faq.map((f, k) => ({
          q: f.q,
          a: <p>{rich(`${key}.faq.${k}.a`)}</p>,
        }))}
      />
    );
  };

  return (
    <InfoPage
      title={t(`${base}.title`)}
      subtitle={t(`${base}.subtitle`)}
      description={t(`${base}.description`, { defaultValue: '' }) || undefined}
      updated={updated}
      sections={sections.map(s => ({
        id: s.id,
        title: s.title,
        content: (
          <>
            {s.body.map((b, j) =>
              block(b, `${base}.sections.${s.i}.body.${j}`)
            )}
          </>
        ),
      }))}
    />
  );
}
