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

const MAIN_PAGES: PageLink[] = [
  { label: 'Home', href: '/', description: 'Main landing page' },
  {
    label: 'Services',
    href: '/services',
    description: 'Step-by-step guides for municipal services',
  },
  {
    label: 'Government',
    href: '/government',
    description: 'Elected officials, offices and barangays',
  },
  {
    label: 'Hotlines',
    href: '/taal/hotlines',
    description: 'Emergency and public service numbers',
  },
];

const TAAL_PAGES: PageLink[] = [
  {
    label: 'About Taal',
    href: '/taal/about',
    description: 'Overview of the Heritage Town',
  },
  {
    label: 'History',
    href: '/taal/history',
    description: 'Timeline of Taal since 1572',
  },
  {
    label: 'Culture',
    href: '/taal/culture',
    description: 'Crafts, food, churches and festivals',
  },
  {
    label: 'Holidays',
    href: '/taal/holidays',
    description: 'National holidays and local feast days',
  },
];

const DATA_PAGES: PageLink[] = [
  {
    label: 'Weather',
    href: '/weather',
    description: 'Current conditions and 5-day forecast',
  },
  {
    label: 'Forex',
    href: '/forex',
    description: 'Peso exchange rates from the BSP',
  },
];

const PORTAL_PAGES: PageLink[] = [
  {
    label: 'About the Portal',
    href: '/about',
    description: 'Who we are and why we built this site',
  },
  {
    label: 'FAQs',
    href: '/faq',
    description: 'Common questions about the portal',
  },
  {
    label: 'Contact Us',
    href: '/contact',
    description: 'Report an issue or reach the volunteers',
  },
  {
    label: 'Terms of Use',
    href: '/terms',
    description: 'Rules for using this site',
  },
  {
    label: 'Privacy Policy',
    href: '/privacy',
    description: 'What data is and is not collected',
  },
  {
    label: 'Accessibility',
    href: '/accessibility',
    description: 'Our accessibility commitment and known limits',
  },
];

const SECTIONS = [
  { id: 'main', label: 'Main Pages', icon: Home },
  { id: 'taal', label: 'About Taal', icon: Mountain },
  { id: 'services', label: 'Services', icon: LayoutGrid },
  { id: 'government', label: 'Government', icon: Landmark },
  { id: 'data', label: 'Live Data', icon: Radio },
  { id: 'national', label: 'National Government', icon: Globe },
  { id: 'portal', label: 'About This Portal', icon: Info },
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
              <span className="block text-lg font-bold text-gray-900 group-hover:text-accent-700">
                {link.label}
              </span>
              <span className="mt-1 block text-base text-gray-700">
                {link.description}
              </span>
            </span>
            {external ? (
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-accent-700"
                aria-hidden="true"
              />
            ) : (
              <ChevronRight
                className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-accent-700"
                aria-hidden="true"
              />
            )}
          </>
        );
        const cls =
          'group flex h-full items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent-400 hover:bg-accent-50';
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

const NATIONAL_DESCRIPTIONS: Record<string, string> = {
  officialGovPh: 'Official portal of the Republic of the Philippines',
  openData: 'Open datasets from national agencies',
  foi: 'Request information from government agencies',
  contactCenter: 'Contact Center ng Bayan hotline and feedback',
  officialGazette: 'Laws, orders and official issuances',
};

// A guide to every page on the site, in the style of bettergov.ph/sitemap.
export default function Sitemap() {
  const nationalLinks: PageLink[] = (
    footerNavigation.mainSections.find(s => s.key === 'government')?.links ?? []
  ).map(link => ({
    label: link.label,
    href: link.href,
    description: NATIONAL_DESCRIPTIONS[link.key] ?? '',
  }));

  const governmentLinks: PageLink[] = [
    {
      label: 'Government Directory',
      href: '/government',
      description: 'All branches, offices and officials',
    },
    ...BRANCHES.map(branch => ({
      label: branch.name,
      href: `/government/${branch.slug}`,
      description: branch.description ?? '',
    })),
  ];

  const serviceCount = activeServiceCategories.reduce(
    (n, c) => n + getCategoryServices(c.slug).length,
    0
  );

  return (
    <>
      <SEO
        title="Sitemap"
        description="A complete guide to all pages and services on BetterTaalBatangas.org."
      />
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]}
        title="Sitemap"
        subtitle="A complete guide to all pages and services on BetterTaalBatangas.org."
      />
      <PageBody
        stickySidebar
        sidebar={
          <SideNav
            title="On this page"
            items={SECTIONS.map(({ id, label, icon: Icon }) => ({
              key: id,
              label,
              href: `#${id}`,
              iconNode: <Icon className="h-5 w-5" aria-hidden="true" />,
            }))}
          />
        }
      >
        <Section id="main" title="Main Pages" icon={Home}>
          <LinkCards links={MAIN_PAGES} />
        </Section>

        <Section id="taal" title="About Taal" icon={Mountain}>
          <LinkCards links={TAAL_PAGES} />
        </Section>

        <Section id="services" title="Services" icon={LayoutGrid}>
          <p className="-mt-2 mb-6 text-base text-gray-700">
            {serviceCount} services in {activeServiceCategories.length}{' '}
            categories.{' '}
            <Link
              to="/services"
              className="font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
            >
              Browse all services
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
                    className="hover:text-accent-700 hover:underline"
                  >
                    {category.category}
                  </Link>
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {getCategoryServices(category.slug).map(service => (
                    <li key={service.href}>
                      <Link
                        to={service.href}
                        className="text-base text-accent-700 underline-offset-2 hover:text-accent-800 hover:underline"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="government" title="Government" icon={Landmark}>
          <LinkCards links={governmentLinks} />
        </Section>

        <Section id="data" title="Live Data" icon={Radio}>
          <LinkCards links={DATA_PAGES} />
        </Section>

        <Section id="national" title="National Government" icon={Globe}>
          <LinkCards links={nationalLinks} />
        </Section>

        <Section id="portal" title="About This Portal" icon={Info}>
          <LinkCards links={PORTAL_PAGES} />
        </Section>
      </PageBody>
    </>
  );
}
