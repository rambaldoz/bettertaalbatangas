import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// Shared layout for the site's inner pages:
//   <PageHeader>  blue header with breadcrumbs (optionally over a photo)
//   <PageBody>    gray area with a sidebar card on the left and the page's
//                 white panels on the right, like the Government directory
//   <SideNav>     the sidebar's list of links or filters
//   <Panel>       a white content card
//
// Text is at least 14px (text-sm) and uses gray-700 or darker on white, so
// pages stay readable for older residents. Only photo credits are smaller.

export function LucideIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: string;
  className?: string;
}) {
  const Icon = (LucideIcons[name as keyof typeof LucideIcons] ??
    LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
  return <Icon className={className} aria-hidden="true" />;
}

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-base text-gray-800">
        {crumbs.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight
                className="h-4 w-4 text-gray-700"
                aria-hidden="true"
              />
            )}
            {crumb.href ? (
              <Link
                to={crumb.href}
                className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-bold text-gray-900" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface BackLink {
  label: string;
  href: string;
}

/**
 * White bar under the page header: breadcrumbs on the left and an optional
 * "Back to ..." button on the right.
 */
export function BreadcrumbBar({
  crumbs,
  back,
}: {
  crumbs: Crumb[];
  back?: BackLink;
}) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumbs crumbs={crumbs} />
        {back && (
          <Link
            to={back.href}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border-2 border-primary-700 bg-white px-4 py-2 text-base font-bold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {back.label}
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * Blue page header: title, subtitle and optional extras such as a search
 * box, followed by the breadcrumb bar. With `image`, the photo shows behind a dark blue tint.
 */
export function PageHeader({
  crumbs,
  title,
  subtitle,
  image,
  credit,
  back,
  children,
}: {
  crumbs?: Crumb[];
  title: string;
  subtitle?: string;
  image?: string;
  credit?: ReactNode; // shown in the bottom-right corner over the photo
  back?: BackLink; // "Back to ..." button next to the breadcrumbs
  children?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const hasPhoto = !!image && !failed;
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        {hasPhoto && (
          <img
            src={image}
            alt=""
            onError={() => setFailed(true)}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}
        <div
          className={cn(
            'absolute inset-0 -z-10',
            hasPhoto
              ? 'bg-gradient-to-b from-[#001f63]/80 via-[#001f63]/70 to-[#001f63]/85'
              : 'bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent),linear-gradient(135deg,#0032a0_0%,#002a86_55%,#001f63_100%)]'
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            'container mx-auto px-4 text-center',
            hasPhoto ? 'py-16 md:py-28' : 'py-12 md:py-16'
          )}
        >
          <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white md:text-lg">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {hasPhoto && credit && (
          <div className="absolute bottom-2 right-3 max-w-[90%] text-right text-white/90">
            {credit}
          </div>
        )}
      </section>
      {crumbs && crumbs.length > 0 && (
        <BreadcrumbBar crumbs={crumbs} back={back} />
      )}
    </>
  );
}

/**
 * Gray page body. `sidebar` sits in a left column (1/4 on large screens),
 * `children` in the main column. `top` spans the full width above both.
 */
export function PageBody({
  sidebar,
  top,
  children,
  stickySidebar = false,
}: {
  sidebar?: ReactNode;
  top?: ReactNode;
  children: ReactNode;
  stickySidebar?: boolean;
}) {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {top && <div className="mb-6">{top}</div>}
        {sidebar ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <aside
              className={cn(
                'space-y-6 self-start',
                stickySidebar && 'lg:sticky lg:top-44'
              )}
            >
              {sidebar}
            </aside>
            <div className="min-w-0 space-y-6 lg:col-span-3">{children}</div>
          </div>
        ) : (
          <div className="space-y-6">{children}</div>
        )}
      </div>
    </div>
  );
}

/** White content card. */
export function Panel({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-44 rounded-lg border border-gray-200 bg-white p-6 md:p-8',
        className
      )}
    >
      {children}
    </section>
  );
}

/** Heading block inside a panel: small label, title and helper text. */
export function PanelHeading({
  eyebrow,
  title,
  text,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div>
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">
          {eyebrow}
        </p>
      )}
      <Tag className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
        {title}
      </Tag>
      {text && <p className="mt-2 text-base text-gray-700">{text}</p>}
    </div>
  );
}

export interface SideNavItem {
  key: string;
  label: string;
  href?: string; // link
  onClick?: () => void; // filter button
  icon?: string; // lucide icon name
  iconNode?: ReactNode; // or a ready-made icon element
  active?: boolean;
  badge?: ReactNode; // e.g. a count
  disabled?: boolean; // shown muted, not clickable (e.g. "Coming soon")
  children?: SideNavItem[]; // nested items, shown under this one
}

/** Sidebar card with a list of links or filters, as on the Government page. */
export function SideNav({
  title,
  items,
  ariaLabel,
}: {
  title: string;
  items: SideNavItem[];
  ariaLabel?: string;
}) {
  return (
    <nav
      aria-label={ariaLabel ?? title}
      className="rounded-lg border border-gray-200 bg-white p-4"
    >
      <h2 className="px-2 pb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
        {title}
      </h2>
      <SideNavList items={items} />
    </nav>
  );
}

function SideNavList({
  items,
  nested = false,
}: {
  items: SideNavItem[];
  nested?: boolean;
}) {
  return (
    <ul
      className={cn(
        'space-y-1',
        nested && 'my-2 ml-5 space-y-0.5 border-l-2 border-gray-200 pl-3'
      )}
    >
      {items.map(item => {
        const cls = cn(
          'flex w-full items-center gap-3 rounded-md px-3 text-left text-base transition-colors',
          nested ? 'py-2' : 'py-2.5',
          item.active
            ? nested
              ? 'font-bold text-primary-700 underline decoration-2 underline-offset-4'
              : 'bg-primary-50 font-bold text-primary-700'
            : item.disabled
              ? 'cursor-default text-gray-700'
              : 'text-gray-800 hover:bg-gray-100 hover:text-primary-700'
        );
        const inner = (
          <>
            {item.iconNode ??
              (item.icon && (
                <LucideIcon name={item.icon} className="h-5 w-5 shrink-0" />
              ))}
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && (
              <span className="text-sm text-gray-700">{item.badge}</span>
            )}
          </>
        );
        return (
          <li key={item.key}>
            {item.disabled ? (
              <div className={cls}>{inner}</div>
            ) : item.href?.startsWith('#') ? (
              <a
                href={item.href}
                onClick={e => {
                  const target = document.getElementById(item.href!.slice(1));
                  if (!target) return;
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth' });
                  history.replaceState(null, '', item.href);
                }}
                className={cls}
              >
                {inner}
              </a>
            ) : item.href ? (
              <Link
                to={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cls}
              >
                {inner}
              </Link>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                aria-pressed={item.active}
                className={cls}
              >
                {inner}
              </button>
            )}
            {item.children && item.children.length > 0 && (
              <SideNavList items={item.children} nested />
            )}
          </li>
        );
      })}
    </ul>
  );
}
