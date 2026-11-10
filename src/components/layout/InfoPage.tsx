import type { ReactNode } from 'react';
import { Link } from 'react-router';
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
  updated?: string;
  intro?: ReactNode;
}) {
  return (
    <main className="flex-grow">
      <SEO title={title} description={description ?? subtitle} />
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: title }]}
        title={title}
        subtitle={subtitle}
      />
      <PageBody
        stickySidebar
        sidebar={
          <SideNav
            title="On this page"
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
          <p className="text-sm text-gray-700">Last updated: {updated}</p>
        )}
      </PageBody>
    </main>
  );
}
