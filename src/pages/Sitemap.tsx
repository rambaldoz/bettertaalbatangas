import type { ReactNode } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  ChevronRight,
  Globe,
  Home,
  Info,
  Landmark,
  LayoutGrid,
  Mountain,
  Radio,
  type LucideIcon as LucideIconType,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useContent } from '../lib/useContent';
import {
  LucideIcon,
  PageBody,
  PageHeader,
  SideNav,
} from '../components/layout/PageLayout';
import {
  activeServiceCategories,
  getCategoryServices,
} from '../data/yamlLoader';
import { BRANCHES } from '../data/officials';
import { footerNavigation } from '../data/navigation';

interface PageLink {
  label: string;
  href: string;
  description: string;
}

// Labels and descriptions: sitemap.pages.<key>.label / .description
const MAIN_PAGES = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'government', href: '/government' },
  { key: 'hotlines', href: '/taal/hotlines' },
];
const TAAL_PAGES = [
  { key: 'aboutTaal', href: '/taal/about' },
  { key: 'history', href: '/taal/history' },
  { key: 'culture', href: '/taal/culture' },
  { key: 'holidays', href: '/taal/holidays' },
];
const DATA_PAGES = [
  { key: 'weather', href: '/weather' },
  { key: 'forex', href: '/forex' },
];
const PORTAL_PAGES = [
  { key: 'aboutPortal', href: '/about' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
  { key: 'terms', href: '/terms' },
  { key: 'privacy', href: '/privacy' },
  { key: 'accessibility', href: '/accessibility' },
];

// Titles: sitemap.sections.<id>
const SECTIONS = [
  { id: 'main', icon: Home },
  { id: 'taal', icon: Mountain },
  { id: 'services', icon: LayoutGrid },
  { id: 'government', icon: Landmark },
  { id: 'data', icon: Radio },
  { id: 'national', icon: Globe },
  { id: 'portal', icon: Info },
];

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: LucideIconType;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-44 rounded-lg border border-gray-200 bg-white p-6 md:p-8"
    >
      <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function LinkCards({ links }: { links: PageLink[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {links.map(link => {
        const external = link.href.startsWith('http');
        const body = (
          <>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold text-gray-900 group-hover:text-primary-700">
                {link.label}
              </span>
              <span className="mt-1 block text-base text-gray-700">
                {link.description}
              </span>
            </span>
            {external ? (
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-primary-700"
                aria-hidden="true"
              />
            ) : (
              <ChevronRight
                className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-primary-700"
                aria-hidden="true"
              />
            )}
          </>
        );
        const cls =
          'group flex h-full items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50';
        return (
          <li key={link.href}>
            {external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {body}
              </a>
            ) : (
              <Link to={link.href} className={cls}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// A guide to every page on the site, in the style of bettergov.ph/sitemap.
export default function Sitemap() {
  const c = useContent();
  const { t } = c;
  const pages = (list: { key: string; href: string }[]): PageLink[] =>
    list.map(p => ({
      label: t(`sitemap.pages.${p.key}.label`),
      href: p.href,
      description: t(`sitemap.pages.${p.key}.description`),
    }));
  const section = (id: string) => t(`sitemap.sections.${id}`);

  const nationalLinks: PageLink[] = (
    footerNavigation.mainSections.find(s => s.key === 'government')?.links ?? []
  ).map(link => ({
    label: t(`footer.links.${link.key}`, { defaultValue: link.label }),
    href: link.href,
    description: t(`sitemap.national.${link.key}`),
  }));

  const governmentLinks: PageLink[] = [
    {
      label: t('sitemap.pages.directory.label'),
      href: '/government',
      description: t('sitemap.pages.directory.description'),
    },
    ...BRANCHES.map(branch => ({
      label: c.branchName(branch),
      href: `/government/${branch.slug}`,
      description: c.branchDescription(branch),
    })),
  ];

  const serviceCount = activeServiceCategories.reduce(
    (n, c) => n + getCategoryServices(c.slug).length,
    0
  );

  return (
    <>
      <SEO title={t('footer.sitemap')} description={t('sitemap.subtitle')} />
      <PageHeader
        crumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('footer.sitemap') },
        ]}
        title={t('footer.sitemap')}
        subtitle={t('sitemap.subtitle')}
      />
      <PageBody
        stickySidebar
        sidebar={
          <SideNav
            title={t('common.onThisPage')}
            items={SECTIONS.map(({ id, icon: Icon }) => ({
              key: id,
              label: section(id),
              href: `#${id}`,
              iconNode: <Icon className="h-5 w-5" aria-hidden="true" />,
            }))}
          />
        }
      >
        <Section id="main" title={section('main')} icon={Home}>
          <LinkCards links={pages(MAIN_PAGES)} />
        </Section>

        <Section id="taal" title={section('taal')} icon={Mountain}>
          <LinkCards links={pages(TAAL_PAGES)} />
        </Section>

        <Section id="services" title={section('services')} icon={LayoutGrid}>
          <p className="-mt-2 mb-6 text-base text-gray-700">
            {t('sitemap.serviceCount', {
              services: serviceCount,
              categories: activeServiceCategories.length,
            })}{' '}
            <Link
              to="/services"
              className="font-bold text-primary-700 underline underline-offset-2 hover:text-primary-800"
            >
              {t('sitemap.browseAll')}
            </Link>
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
            {activeServiceCategories.map(category => (
              <div key={category.slug}>
                <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-lg font-bold text-gray-900">
                  <LucideIcon
                    name={category.icon}
                    className="h-5 w-5 text-primary-700"
                  />
                  <Link
                    to={`/services/${category.slug}`}
                    className="hover:text-primary-700 hover:underline"
                  >
                    {c.categoryName(category)}
                  </Link>
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {getCategoryServices(category.slug).map(service => (
                    <li key={service.href}>
                      <Link
                        to={service.href}
                        className="text-base text-primary-700 underline-offset-2 hover:text-primary-800 hover:underline"
                      >
                        {c.serviceTitle(service)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="government" title={section('government')} icon={Landmark}>
          <LinkCards links={governmentLinks} />
        </Section>

        <Section id="data" title={section('data')} icon={Radio}>
          <LinkCards links={pages(DATA_PAGES)} />
        </Section>

        <Section id="national" title={section('national')} icon={Globe}>
          <LinkCards links={nationalLinks} />
        </Section>

        <Section id="portal" title={section('portal')} icon={Info}>
          <LinkCards links={pages(PORTAL_PAGES)} />
        </Section>
      </PageBody>
    </>
  );
}
