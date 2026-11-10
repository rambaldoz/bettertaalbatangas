import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import {
  ArrowRight,
  Banknote,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  ExternalLink,
  FileText,
  Info,
  LifeBuoy,
  ListTree,
  Mail,
  MapPin,
  ShieldCheck,
  UserCheck,
  UserRound,
  X,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';
import {
  getCategoryServices,
  getService,
  resolveService,
  type Service,
  type ServiceStep,
} from '../data/yamlLoader';
import { CHARTER, getOffice } from '../data/offices';
import { DynamicIcon, Value } from '../components/services/ServiceUI';
import {
  PageBody,
  PageHeader,
  Panel,
  PanelHeading,
} from '../components/layout/PageLayout';
import { variantSlug } from '../lib/services';

interface SectionDef {
  id: string;
  label: string;
}

// /services/:category/:service
// Service details from the Taal Citizen's Charter, laid out like
// betterbinangonan.org: summary, steps, requirements, office and source,
// with a "Jump to section" menu. Sub-types (e.g. on-time vs late
// registration) are tabs, selected with ?type=<name>.
export default function ServiceDetail() {
  const { category, service: slug } = useParams();
  const { t } = useTranslation();
  const service = getService(category, slug);

  if (!service) {
    return (
      <main className="flex-grow">
        <PageHeader
          crumbs={[
            { label: t('servicesPage.home'), href: '/' },
            { label: t('servicesPage.services'), href: '/services' },
          ]}
          title={t('servicesPage.notFound')}
        />
        <PageBody>
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

  return <ServicePage key={service.href} service={service} />;
}

function ServicePage({ service }: { service: Service }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isGuide = service.type === 'guide';
  const variants = service.variants ?? [];
  const variant =
    variants.find(v => variantSlug(v.name) === searchParams.get('type')) ??
    variants[0];
  const details = resolveService(service, variant);
  const office = getOffice(service.office);
  const steps = details.steps ?? [];
  const requirements = details.requirements ?? [];
  const faqs = service.faqs ?? [];
  const whoMayAvail = Array.isArray(details.whoMayAvail)
    ? details.whoMayAvail
    : details.whoMayAvail
      ? [details.whoMayAvail]
      : [];
  const pages = [
    ...new Set(
      [service.source?.page, ...variants.map(v => v.source?.page)].filter(
        (p): p is number => p !== undefined
      )
    ),
  ].sort((a, b) => a - b);

  const sections: SectionDef[] = [
    { id: 'overview', label: t('servicesPage.overview') },
    {
      id: 'process',
      label: isGuide ? t('servicesPage.guideSteps') : t('servicesPage.process'),
    },
    ...(requirements.length
      ? [{ id: 'requirements', label: t('servicesPage.requirements') }]
      : []),
    ...(faqs.length ? [{ id: 'faqs', label: t('servicesPage.faqs') }] : []),
    ...(office ? [{ id: 'office', label: t('servicesPage.office') }] : []),
    { id: 'more-info', label: t('servicesPage.moreInfo') },
  ];

  const related = getCategoryServices(service.categorySlug)
    .filter(s => s.slug !== service.slug)
    .slice(0, 4);

  return (
    <main className="flex-grow">
      <SEO
        title={`${service.title} | ${service.categoryName}`}
        description={service.description}
      />
      <PageHeader
        back={{
          label: t('servicesPage.backToServices'),
          href: `/services/${service.categorySlug}`,
        }}
        crumbs={[
          { label: t('servicesPage.home'), href: '/' },
          { label: t('servicesPage.services'), href: '/services' },
          {
            label: service.categoryName,
            href: `/services/${service.categorySlug}`,
          },
          { label: service.title },
        ]}
        title={service.fullTitle || service.title}
        subtitle={service.description}
      />

      <PageBody stickySidebar sidebar={<SectionNav sections={sections} />}>
        <div className="space-y-6 pb-16 lg:pb-0">
          <Section id="overview">
            <PanelHeading
              eyebrow={t('servicesPage.overview')}
              title={t('servicesPage.summaryTitle')}
              text={t('servicesPage.summaryText')}
            />

            {variants.length > 1 && (
              <div className="mt-6">
                <p className="text-base font-bold text-gray-900">
                  {t('servicesPage.chooseType')}
                </p>
                <div
                  role="tablist"
                  aria-label={t('servicesPage.chooseType')}
                  className="mt-2 flex flex-wrap gap-2"
                >
                  {variants.map(v => {
                    const selected = v === variant;
                    return (
                      <button
                        key={v.name}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() =>
                          setSearchParams(
                            { type: variantSlug(v.name) },
                            { replace: true, preventScrollReset: true }
                          )
                        }
                        className={`rounded-full border-2 px-4 py-2 text-base font-bold transition-colors ${
                          selected
                            ? 'border-accent-700 bg-accent-700 text-white'
                            : 'border-gray-300 bg-white text-gray-900 hover:border-accent-700 hover:bg-accent-50'
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {!isGuide && (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SummaryTile
                  icon={<Clock className="h-5 w-5" aria-hidden="true" />}
                  label={t('servicesPage.processing')}
                  value={<Value value={details.totalTime} />}
                />
                <SummaryTile
                  icon={<Banknote className="h-5 w-5" aria-hidden="true" />}
                  label={t('servicesPage.fee')}
                  value={<Value value={details.totalFee} />}
                />
                <SummaryTile
                  icon={<UserCheck className="h-5 w-5" aria-hidden="true" />}
                  label={t('servicesPage.whoCanApply')}
                  value={
                    whoMayAvail.length > 1 ? (
                      <ul className="space-y-1">
                        {whoMayAvail.map(w => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    ) : (
                      <Value value={whoMayAvail[0]} />
                    )
                  }
                />
                <SummaryTile
                  icon={<FileText className="h-5 w-5" aria-hidden="true" />}
                  label={t('servicesPage.classification')}
                  value={
                    <>
                      <Value value={details.classification} />
                      {details.transactionType && (
                        <span className="mt-0.5 block text-sm font-normal text-gray-700">
                          {details.transactionType}
                        </span>
                      )}
                    </>
                  }
                />
              </div>
            )}
            {isGuide && whoMayAvail[0] && (
              <p className="mt-6 rounded-lg border border-gray-200 p-4 text-gray-700">
                {whoMayAvail[0]}
              </p>
            )}
          </Section>

          <Section id="process">
            <PanelHeading
              eyebrow={
                isGuide ? t('servicesPage.guide') : t('servicesPage.process')
              }
              title={
                isGuide
                  ? t('servicesPage.guideTitle')
                  : t('servicesPage.processTitle')
              }
              text={
                isGuide
                  ? t('servicesPage.guideText')
                  : t('servicesPage.processText')
              }
            />
            <ol className="mt-6 space-y-3">
              {steps.map((step, i) => (
                <StepCard
                  key={`${variant?.name ?? ''}-${i}`}
                  step={step}
                  number={i + 1}
                  last={i === steps.length - 1 && steps.length > 1}
                />
              ))}
            </ol>
            {!isGuide && (details.totalFee || details.totalTime) && (
              <div className="mt-4 space-y-1 rounded-lg bg-gray-100 px-5 py-4 text-base text-gray-900">
                <p>
                  <span className="font-bold text-gray-900">
                    {t('servicesPage.totalFee')}:
                  </span>{' '}
                  <Value value={details.totalFee} />
                </p>
                <p>
                  <span className="font-bold text-gray-900">
                    {t('servicesPage.totalTime')}:
                  </span>{' '}
                  <Value value={details.totalTime} />
                </p>
              </div>
            )}
            {(details.notes?.length ?? 0) > 0 && (
              <div className="mt-4 rounded-lg border border-accent-300 bg-accent-50 p-4 text-base text-accent-900">
                <p className="flex items-center gap-2 font-bold">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  {t('servicesPage.notes')}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {details.notes!.map(n => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </Section>

          {requirements.length > 0 && (
            <Section id="requirements">
              <PanelHeading
                eyebrow={t('servicesPage.checklist')}
                title={t('servicesPage.requirements')}
                text={t('servicesPage.requirementsText')}
              />
              <div className="mt-6 space-y-4">
                {requirements.map(group => (
                  <div
                    key={group.group}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <div className="bg-gray-50 px-5 py-3">
                      <h3 className="font-bold text-gray-900">{group.group}</h3>
                      <p className="text-sm text-gray-700">
                        {t('servicesPage.itemsToPrepare', {
                          count: group.items.length,
                        })}
                      </p>
                    </div>
                    <ul className="divide-y divide-gray-100">
                      {group.items.map(item => (
                        <li
                          key={item.item}
                          className="flex items-start gap-3 px-5 py-3 text-base"
                        >
                          <CircleCheck
                            className="mt-1 h-4 w-4 shrink-0 text-primary-700"
                            aria-hidden="true"
                          />
                          <span className="flex-1 sm:flex sm:gap-6">
                            <span className="block text-gray-800 sm:flex-1">
                              {item.item}
                            </span>
                            {item.where && (
                              <span className="mt-1 flex items-start gap-1 text-sm text-gray-700 sm:mt-0 sm:w-60 sm:shrink-0">
                                <MapPin
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>
                                  <span className="sr-only">
                                    {t('servicesPage.whereToSecure')}:{' '}
                                  </span>
                                  {item.where}
                                </span>
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {faqs.length > 0 && (
            <Section id="faqs">
              <PanelHeading
                eyebrow={t('servicesPage.help')}
                title={t('servicesPage.faqTitle')}
                text={t('servicesPage.faqText')}
              />
              <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200">
                {faqs.map(faq => (
                  <details key={faq.question} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-gray-700 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-2 text-base text-gray-800">
                      <Value value={faq.answer} />
                    </p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          {office && (
            <Section id="office">
              <PanelHeading
                eyebrow={t('servicesPage.office')}
                title={t('servicesPage.officeTitle')}
                text={t('servicesPage.officeText')}
              />
              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <DynamicIcon name={office.icon} />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{office.name}</h3>
                    {office.short && (
                      <p className="text-sm text-gray-700">{office.short}</p>
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-base text-gray-800">
                  <li className="flex items-start gap-3">
                    <UserRound
                      className="mt-1 h-4 w-4 shrink-0 text-gray-700"
                      aria-hidden="true"
                    />
                    <span>
                      {office.head ? (
                        <>
                          <span className="font-bold text-gray-900">
                            {office.head}
                          </span>
                          <span className="block text-sm text-gray-700">
                            {office.headTitle}
                          </span>
                        </>
                      ) : (
                        <Value value="" />
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail
                      className="mt-1 h-4 w-4 shrink-0 text-gray-700"
                      aria-hidden="true"
                    />
                    {office.email ? (
                      <a
                        href={`mailto:${office.email}`}
                        className="break-all text-accent-700 underline underline-offset-2 hover:text-accent-800"
                      >
                        {office.email}
                      </a>
                    ) : (
                      <span className="italic text-gray-700">
                        {t('servicesPage.noEmail')}
                      </span>
                    )}
                  </li>
                  {office.address && (
                    <li className="flex items-start gap-3">
                      <MapPin
                        className="mt-1 h-4 w-4 shrink-0 text-gray-700"
                        aria-hidden="true"
                      />
                      {office.address}
                    </li>
                  )}
                </ul>
                <Link
                  to={`/services?office=${office.key}`}
                  className="mt-4 inline-flex items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
                >
                  {t('servicesPage.officeServices')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Section>
          )}

          <Section id="more-info">
            <PanelHeading
              eyebrow={t('servicesPage.support')}
              title={t('servicesPage.moreInfo')}
              text={t('servicesPage.moreInfoText')}
            />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-5">
                <ShieldCheck
                  className="h-6 w-6 text-primary-700"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-gray-900">
                  {t('servicesPage.verified')}
                </h3>
                <p className="mt-1 text-base text-gray-800">
                  {t('servicesPage.charterText', {
                    title: CHARTER.title,
                    pages: pages.join(', '),
                  })}
                </p>
                <ul className="mt-3 space-y-1 text-base">
                  <li>
                    <a
                      href={CHARTER.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
                    >
                      {t('servicesPage.charterPdf')}
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href={CHARTER.post}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
                    >
                      {t('servicesPage.charterPost')}
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <LifeBuoy
                  className="h-6 w-6 text-primary-600"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-gray-900">
                  {t('servicesPage.needHelp')}
                </h3>
                <p className="mt-1 text-base text-gray-800">
                  {t('servicesPage.needHelpText')}
                </p>
                <Link
                  to="/taal/hotlines"
                  className="mt-3 inline-flex items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
                >
                  {t('servicesPage.hotlines')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold text-gray-900">
                  {t('servicesPage.related', {
                    category: service.categoryName,
                  })}
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {related.map(s => (
                    <li key={s.slug}>
                      <Link
                        to={s.href}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-base font-bold text-gray-900 hover:border-primary-300 hover:bg-primary-50"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-600">
                          <DynamicIcon name={s.icon} className="h-4 w-4" />
                        </span>
                        <span className="flex-1">{s.title}</span>
                        <ChevronRight
                          className="h-4 w-4 text-gray-700"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        </div>
      </PageBody>
    </main>
  );
}

function StepCard({
  step,
  number,
  last,
}: {
  step: ServiceStep;
  number: number;
  last: boolean;
}) {
  const { t } = useTranslation();
  const fees = Array.isArray(step.fee) ? step.fee : step.fee ? [step.fee] : [];
  const hasFee = fees.length > 0 && !(fees.length === 1 && fees[0] === 'None');
  const hasMeta = step.fee !== undefined || step.time || step.responsible;

  return (
    <li
      className={`flex gap-4 rounded-xl border p-5 ${
        last ? 'border-primary-300 bg-primary-50' : 'border-gray-200 bg-white'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-bold ${
          last ? 'bg-primary-700 text-white' : 'bg-primary-50 text-primary-800'
        }`}
      >
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold text-gray-900">
          {step.client}
          {last && (
            <span className="rounded bg-primary-700 px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-white">
              {t('servicesPage.finalStep')}
            </span>
          )}
        </h3>
        {(step.agency?.length ?? 0) > 0 && (
          <div className="mt-2 text-base text-gray-800">
            {step.fee !== undefined && (
              <p className="text-sm font-bold uppercase tracking-wide text-gray-700">
                {t('servicesPage.officeAction')}
              </p>
            )}
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {step.agency!.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        )}
        {hasMeta && (
          <dl className="mt-3 space-y-2 border-t border-gray-200 pt-3 text-base text-gray-900">
            <div className="sm:flex sm:gap-2">
              <dt className="font-bold sm:w-48 sm:shrink-0">
                {t('servicesPage.fee')}:
              </dt>
              <dd>
                {hasFee ? (
                  fees.length > 1 ? (
                    <ul className="space-y-1">
                      {fees.map(f => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  ) : (
                    fees[0]
                  )
                ) : (
                  t('servicesPage.none')
                )}
              </dd>
            </div>
            <div className="sm:flex sm:gap-2">
              <dt className="font-bold sm:w-48 sm:shrink-0">
                {t('servicesPage.time')}:
              </dt>
              <dd>
                <Value value={step.time} />
              </dd>
            </div>
            <div className="sm:flex sm:gap-2">
              <dt className="font-bold sm:w-48 sm:shrink-0">
                {t('servicesPage.responsible')}:
              </dt>
              <dd>
                <Value value={step.responsible} />
              </dd>
            </div>
          </dl>
        )}
        {step.link && (
          <Link
            to={step.link}
            className="mt-3 inline-flex items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
          >
            {t('servicesPage.openService')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </li>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return <Panel id={id}>{children}</Panel>;
}

function SummaryTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold uppercase tracking-wide text-gray-700">
          {label}
        </p>
        <div className="mt-0.5 font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

/** Sticky "On this page" list on desktop; floating menu on mobile. */
function SectionNav({ sections }: { sections: SectionDef[] }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(sections[0]?.id);
  const [open, setOpen] = useState(false);
  const ids = sections.map(s => s.id).join(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-180px 0px -55% 0px' }
    );
    ids.split(' ').forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  const links = (
    <ul className="space-y-1">
      {sections.map(s => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={() => setOpen(false)}
            className={`block rounded-md px-3 py-2.5 text-base transition-colors ${
              active === s.id
                ? 'bg-primary-50 font-bold text-primary-700'
                : 'text-gray-800 hover:bg-gray-100 hover:text-primary-700'
            }`}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav
        aria-label={t('servicesPage.onThisPage')}
        className="hidden rounded-lg border border-gray-200 bg-white p-4 lg:block"
      >
        <h2 className="px-2 pb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
          {t('servicesPage.onThisPage')}
        </h2>
        {links}
      </nav>

      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden">
        <div className="w-full max-w-sm">
          {open && (
            <div
              id="jump-menu"
              className="mb-2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
            >
              {links}
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="jump-menu"
            className="flex w-full items-center justify-between rounded-full border border-gray-300 bg-white px-5 py-3 text-base font-bold text-gray-900 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <ListTree className="h-4 w-4" aria-hidden="true" />
              {t('servicesPage.jumpTo')}
            </span>
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
