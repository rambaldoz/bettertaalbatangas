import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import {
  AlertTriangle,
  Building2,
  Church,
  Clock,
  Crown,
  Flag,
  Globe,
  ImageIcon,
  Landmark,
  MapPin,
  Mountain,
  PartyPopper,
  Shirt,
  Swords,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { PHOTO_CREDITS, TAAL_PAGES, type PhotoCredit } from '../../data/taal';

const ICONS: Record<string, LucideIcon> = {
  AlertTriangle,
  Building2,
  Church,
  Clock,
  Crown,
  Flag,
  Globe,
  Landmark,
  MapPin,
  Mountain,
  PartyPopper,
  Shirt,
  Swords,
  Users,
  UtensilsCrossed,
};

export function TaalIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Building2;
  return <Icon className={className} aria-hidden="true" />;
}

// Rounded light-blue square holding an icon, as used on bettergov.ph cards.
export function IconBadge({ name }: { name: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
      <TaalIcon name={name} className="h-5 w-5" />
    </div>
  );
}

// Full-width hero. Shows the photo at `image` (under /public) when the
// file exists; until then, a dark gradient with a small placeholder note.
// Recommended photo size: 2400 x 1000 px (12:5), subject near the center.
export function PageHero({
  title,
  subtitle,
  image,
  credit,
  photoNote,
}: {
  title: string;
  subtitle: string;
  image?: string;
  credit?: PhotoCredit;
  photoNote?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hasPhoto = !!image && !failed;
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 text-white">
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
            ? 'bg-black/55'
            : 'bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700'
        )}
      />
      <div className="container mx-auto px-4 py-24 md:py-40">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white md:text-xl">
          {subtitle}
        </p>
        {photoNote && !hasPhoto && (
          <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/90">
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            {photoNote}
          </p>
        )}
      </div>
      {hasPhoto && credit && (
        <PhotoCreditLine
          credit={credit}
          className="absolute bottom-2 right-3 max-w-[90%] text-right text-white/90"
          linkClassName="underline decoration-white/60 hover:text-white"
        />
      )}
    </section>
  );
}

// "Photo: Title by Author, CC BY-SA 4.0, via Wikimedia Commons (cropped)",
// with links to the source, the author and the license.
export function PhotoCreditLine({
  credit,
  className,
  linkClassName,
}: {
  credit: PhotoCredit;
  className?: string;
  linkClassName?: string;
}) {
  const link =
    linkClassName ?? 'text-accent-700 underline hover:text-accent-800';
  const viaCommons = credit.sourceUrl.includes('wikimedia.org');
  return (
    <p className={cn('text-[12px] leading-snug', className)}>
      Photo:{' '}
      <a
        href={credit.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        {credit.title}
      </a>{' '}
      by{' '}
      {credit.authorUrl ? (
        <a
          href={credit.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          {credit.author}
        </a>
      ) : (
        credit.author
      )}
      ,{' '}
      <a
        href={credit.licenseUrl}
        target="_blank"
        rel="noopener noreferrer license"
        className={link}
      >
        {credit.license}
      </a>
      {viaCommons && ', via Wikimedia Commons'}
      {credit.changes && ` (${credit.changes})`}
    </p>
  );
}

// A photo in a card. Shows `src` when the file exists; otherwise a gray
// box labelled with what should go there. Size the box with className.
export function TaalImage({
  src,
  label,
  className,
}: {
  src?: string;
  label: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    const credit = PHOTO_CREDITS[src];
    return (
      <figure>
        <img
          src={src}
          alt={label.replace(/^Photo:\s*/, '')}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn('w-full rounded-lg object-cover', className)}
        />
        {credit && (
          <figcaption>
            <PhotoCreditLine
              credit={credit}
              className="mt-1.5 text-right text-gray-700"
            />
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-700',
        className
      )}
    >
      <ImageIcon className="h-6 w-6" aria-hidden="true" />
      <span>{label}</span>
      {src && <span className="text-sm text-gray-700">public{src}</span>}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('rounded-lg border border-gray-200 bg-white', className)}
    >
      {children}
    </div>
  );
}

export function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">{title}</h2>
      {children}
    </Card>
  );
}

// Label above value, e.g. "Province" / "Batangas".
export function InfoList({
  items,
}: {
  items: readonly { label: string; value: string }[];
}) {
  return (
    <dl className="space-y-4">
      {items.map(item => (
        <div key={item.label}>
          <dt className="text-sm font-bold text-gray-700">{item.label}</dt>
          <dd className="text-gray-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// Name above a smaller detail line, e.g. a person and their role.
export function NameList({
  items,
}: {
  items: readonly { name: string; detail: string }[];
}) {
  return (
    <ul className="space-y-4">
      {items.map(item => (
        <li key={item.name}>
          <div className="font-bold text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-700">{item.detail}</div>
        </li>
      ))}
    </ul>
  );
}

// Links to the other Taal pages, leaving out the current one.
export function RelatedLinks() {
  const { pathname } = useLocation();
  const links = TAAL_PAGES.filter(
    page => page.href !== pathname && page.href.startsWith('/taal')
  ).slice(0, 4);
  return (
    <SidebarCard title="Related Links">
      <ul className="space-y-1">
        {links.map(link => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="block rounded-md px-3 py-2 text-base text-gray-800 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
}

export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-4 leading-relaxed text-gray-800">
      {paragraphs.map(p => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

export function Sources({
  items,
}: {
  items: readonly { label: string; url: string }[];
}) {
  return (
    <p className="mt-8 text-sm text-gray-700">
      Sources:{' '}
      {items.map((item, i) => (
        <span key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 underline hover:text-accent-800"
          >
            {item.label}
          </a>
          {i < items.length - 1 ? '; ' : '.'}
        </span>
      ))}
    </p>
  );
}

// Main column (2/3) plus sidebar (1/3) on a light gray page.
export function TwoColumn({
  main,
  sidebar,
}: {
  main: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-3">
        <div className="lg:col-span-2">{main}</div>
        <aside className="space-y-6">{sidebar}</aside>
      </div>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
      {children}
    </h2>
  );
}
