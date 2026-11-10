import type { ReactNode } from 'react';
import { Link } from 'react-router';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, TriangleAlert } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { isTbc } from '../../lib/services';

// Shared pieces for the Services directory, category and detail pages.

/** Shows a value, or a muted "To be confirmed" when it is a placeholder. */
export function Value({
  value,
  short = false,
}: {
  value: string | undefined;
  short?: boolean;
}) {
  const { t } = useTranslation();
  if (isTbc(value)) {
    return (
      <span className="italic text-gray-700">
        {t(short ? 'servicesPage.tbcShort' : 'servicesPage.tbc')}
      </span>
    );
  }
  return <>{value}</>;
}

export function DynamicIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: string;
  className?: string;
}) {
  const Icon = (LucideIcons[name as keyof typeof LucideIcons] ??
    LucideIcons.FileText) as React.ComponentType<{ className?: string }>;
  return <Icon className={className} aria-hidden="true" />;
}

export interface Crumb {
  label: string;
  href?: string;
}

/** Blue hero with breadcrumbs, used by every Services page. */
export function ServicesHero({
  crumbs,
  title,
  subtitle,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(254,250,224,0.14),transparent),linear-gradient(135deg,#606c38_0%,#4d572c_55%,#283618_100%)]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 py-12 text-center md:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-1 text-sm text-white/90">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-bold text-white" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/90 md:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Small uppercase label, heading and helper text for a page section. */
export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : undefined}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
        {title}
      </h2>
      {text && <p className="mt-2 text-gray-700">{text}</p>}
    </div>
  );
}

/** Amber notice shown while a page still has placeholder details. */
export function PlaceholderNotice({ text }: { text: string }) {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-xl border border-accent-300 bg-accent-50 p-4 text-sm text-accent-900"
    >
      <TriangleAlert
        className="mt-0.5 h-4 w-4 shrink-0 text-accent-700"
        aria-hidden="true"
      />
      <p>{text}</p>
    </div>
  );
}
