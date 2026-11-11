import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { ArrowRight, ChevronRight, Search, X } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { useContent } from '../lib/useContent';
import {
  getAllServices,
  getCategoryServices,
  getPopularServices,
  getServiceCategory,
  serviceCategories,
  type Service,
} from '../data/yamlLoader';
import { OFFICES, getOffice } from '../data/offices';
import { cardValue } from '../lib/services';
import { Value } from '../components/services/ServiceUI';
import {
  LucideIcon,
  PageBody,
  PageHeader,
  Panel,
  PanelHeading,
  SideNav,
} from '../components/layout/PageLayout';

// /services             Services directory
// /services?office=mcr  Services of one office
// /services/:category   Services under one category
export default function Services() {
  const { category } = useParams();
  return category ? <CategoryPage slug={category} /> : <Directory />;
}

/** Left sidebar: every category, with counts; empty ones are "Coming soon". */
function CategoryNav({ active }: { active?: string }) {
  const content = useContent();
  const { t } = content;
  return (
    <SideNav
      title={t('servicesPage.categoriesTitle')}
      items={[
        {
          key: 'all',
          label: t('servicesPage.allServices'),
          href: '/services',
          icon: 'LayoutGrid',
          active: !active,
        },
        ...serviceCategories.categories.map(c => ({
          key: c.slug,
          label: content.categoryName(c),
          href: `/services/${c.slug}`,
          icon: c.icon,
          active: c.slug === active,
          disabled: c.services.length === 0,
          badge:
            c.services.length === 0
              ? t('servicesPage.soon')
              : c.services.length,
        })),
      ]}
    />
  );
}

function CardValue({ value }: { value: string | null | undefined }) {
  const { t } = useTranslation();
  if (value === null) return <>{t('servicesPage.varies')}</>;
  // Long fee notes (e.g. the Building Code fee schedule) stay on the page.
  if (value && value.length > 40) return <>{t('servicesPage.seeDetails')}</>;
  return <Value value={value} short />;
}

function ServiceCard({
  service,
  showCategory = false,
}: {
  service: Service;
  showCategory?: boolean;
}) {
  const c = useContent();
  const { t } = c;
  return (
    <Link
      to={service.href}
      className="group flex h-full items-start gap-4 rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <LucideIcon name={service.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold text-gray-900">
          {c.serviceTitle(service)}
        </span>
        <span className="mt-1 block text-base text-gray-700">
          {c.serviceSummary(service)}
        </span>
        {service.type !== 'guide' && (
          <span className="mt-3 block space-y-1 text-base text-gray-900">
            <span className="block">
              <span className="font-bold">{t('servicesPage.fee')}:</span>{' '}
              <CardValue value={cardValue(service, 'totalFee')} />
            </span>
            <span className="block">
              <span className="font-bold">{t('servicesPage.time')}:</span>{' '}
              <CardValue value={cardValue(service, 'totalTime')} />
            </span>
          </span>
        )}
        {showCategory && (
          <span className="mt-1 block text-base text-gray-900">
            <span className="font-bold">{t('servicesPage.category')}:</span>{' '}
            {c.categoryNameBySlug(service.categorySlug, service.categoryName)}
          </span>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 group-hover:text-accent-800">
          {t('servicesPage.learnMore')}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

function ServiceGrid({
  services,
  showCategory,
}: {
  services: Service[];
  showCategory?: boolean;
}) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
      {services.map(s => (
        <li key={s.href}>
          <ServiceCard service={s} showCategory={showCategory} />
        </li>
      ))}
    </ul>
  );
}

function Directory() {
  const c = useContent();
  const { t } = c;
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const office = getOffice(searchParams.get('office') ?? undefined);

  const all = getAllServices();
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results =
    words.length === 0
      ? []
      : all.filter(s => {
          const office = getOffice(s.office);
          // English and translated text, so either language finds a service.
          const text = [
            s.title,
            s.fullTitle,
            s.summary,
            s.categoryName,
            office?.name,
            c.serviceTitle(s),
            c.serviceSummary(s),
            c.categoryNameBySlug(s.categorySlug, s.categoryName),
            office ? c.officeName(office) : '',
          ]
            .join(' ')
            .toLowerCase();
          return words.every(w => text.includes(w));
        });

  const officesWithServices = OFFICES.map(o => ({
    office: o,
    count: all.filter(s => s.office === o.key).length,
  })).filter(o => o.count > 0);

  let body;
  if (words.length > 0) {
    body = (
      <Panel>
        <PanelHeading
          title={t('servicesPage.resultsTitle', { query: query.trim() })}
          text={t('servicesPage.resultsCount', { count: results.length })}
        />
        {results.length === 0 ? (
          <p className="mt-4 text-base text-gray-800">
            {t('servicesPage.noResults')}
          </p>
        ) : (
          <ServiceGrid services={results} showCategory />
        )}
      </Panel>
    );
  } else if (office) {
    body = (
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <PanelHeading
            eyebrow={t('servicesPage.byOffice')}
            title={c.officeName(office)}
          />
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:bg-accent-50"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            {t('servicesPage.showAll')}
          </button>
        </div>
        <ServiceGrid
          services={all.filter(s => s.office === office.key)}
          showCategory
        />
      </Panel>
    );
  } else {
    body = (
      <>
        <Panel>
          <PanelHeading
            eyebrow={t('servicesPage.services')}
            title={t('servicesPage.popularTitle')}
            text={t('servicesPage.popularText')}
          />
          <ServiceGrid services={getPopularServices()} showCategory />
        </Panel>

        <Panel>
          <PanelHeading
            eyebrow={t('servicesPage.quickGuide')}
            title={t('servicesPage.byLifeEvent')}
            text={t('servicesPage.byLifeEventText')}
          />
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {serviceCategories.lifeEvents.map(e => (
              <li key={e.href}>
                <Link
                  to={e.href}
                  className="flex h-full flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-5 text-center text-base font-bold text-gray-900 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <LucideIcon name={e.icon} className="h-6 w-6" />
                  </span>
                  {c.lifeEvent(e)}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeading
            eyebrow={t('servicesPage.offices')}
            title={t('servicesPage.byOffice')}
            text={t('servicesPage.byOfficeText')}
          />
          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {officesWithServices.map(({ office: o, count }) => (
              <li key={o.key}>
                <Link
                  to={`/services?office=${o.key}`}
                  className="flex h-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                    <LucideIcon name={o.icon} />
                  </span>
                  <span className="flex-1 text-base font-bold text-gray-900">
                    {c.officeName(o)}
                  </span>
                  <span className="text-sm text-gray-700">
                    {t('servicesPage.serviceCount', { count })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </>
    );
  }

  return (
    <main className="flex-grow">
      <SEO
        title={t('servicesPage.directoryTitle')}
        description={t('servicesPage.directorySubtitle')}
        keywords={t('servicesPage.keywords')}
      />
      <PageHeader
        crumbs={[
          { label: t('servicesPage.home'), href: '/' },
          { label: t('servicesPage.services') },
        ]}
        title={t('servicesPage.directoryTitle')}
        subtitle={t('servicesPage.directorySubtitle')}
      >
        <form
          role="search"
          onSubmit={e => e.preventDefault()}
          className="mx-auto mt-8 max-w-xl"
        >
          <label htmlFor="service-search" className="sr-only">
            {t('servicesPage.searchPlaceholder')}
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-700"
              aria-hidden="true"
            />
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('servicesPage.searchPlaceholder')}
              className="w-full rounded-full border border-white bg-white py-3 pl-12 pr-4 text-base text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
          </div>
        </form>
      </PageHeader>
      <PageBody sidebar={<CategoryNav />}>{body}</PageBody>
    </main>
  );
}

function CategoryPage({ slug }: { slug: string }) {
  const c = useContent();
  const { t } = c;
  const category = getServiceCategory(slug);

  if (!category) {
    return (
      <main className="flex-grow">
        <PageHeader
          crumbs={[
            { label: t('servicesPage.home'), href: '/' },
            { label: t('servicesPage.services'), href: '/services' },
          ]}
          title={t('servicesPage.notFound')}
        />
        <PageBody sidebar={<CategoryNav />}>
          <Panel>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
            >
              {t('servicesPage.backToServices')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Panel>
        </PageBody>
      </main>
    );
  }

  const services = getCategoryServices(category.slug);
  const offices = [
    ...new Set(
      services
        .map(s => getOffice(s.office))
        .filter(o => o !== undefined)
        .map(o => c.officeName(o))
    ),
  ];
  const categoryName = c.categoryName(category);

  return (
    <main className="flex-grow">
      <SEO title={categoryName} description={c.categoryDescription(category)} />
      <PageHeader
        crumbs={[
          { label: t('servicesPage.home'), href: '/' },
          { label: t('servicesPage.services'), href: '/services' },
          { label: categoryName },
        ]}
        title={categoryName}
        subtitle={c.categoryDescription(category)}
      />
      <PageBody sidebar={<CategoryNav active={category.slug} />}>
        <Panel>
          <PanelHeading
            title={t('servicesPage.available')}
            text={t('servicesPage.availableText', {
              category: categoryName,
            })}
          />
          <dl className="mt-4 space-y-1 text-base text-gray-900">
            <div className="flex gap-1.5">
              <dt className="font-bold">{t('servicesPage.servicesLabel')}:</dt>
              <dd>{services.length}</dd>
            </div>
            {offices.length > 0 && (
              <div className="flex gap-1.5">
                <dt className="font-bold">{t('servicesPage.handledBy')}:</dt>
                <dd>{offices.join('; ')}</dd>
              </div>
            )}
          </dl>
          {services.length === 0 ? (
            <p className="mt-4 text-base text-gray-800">
              {t('servicesPage.comingSoonText')}
            </p>
          ) : (
            <ServiceGrid services={services} />
          )}
        </Panel>
      </PageBody>
    </main>
  );
}
