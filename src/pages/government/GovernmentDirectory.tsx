import { useLocation, useSearchParams } from 'react-router';
import { ExternalLink, Mail, MapPin, Phone, Users } from 'lucide-react';
import SEO from '../../components/SEO';
import BarangayDirectory from '../../components/government/BarangayDirectory';
import {
  PageBody,
  PageHeader,
  Panel,
  PanelHeading,
  SideNav,
  type SideNavItem,
} from '../../components/layout/PageLayout';
import { cn } from '../../lib/utils';
import {
  BRANCHES,
  OFFICIALS_AS_OF,
  OFFICIALS_SOURCES,
  OFFICIALS_TERM,
  TBC,
  countOfficials,
  type Office,
  type Official,
  type OfficialGroup,
} from '../../data/officials';

const displayName = (p: Official) =>
  p.name === TBC ? TBC : [p.honorific, p.name].filter(Boolean).join(' ');

// Head of an office: initial in a circle beside the role, name and nickname.
function LeadCard({ person }: { person: Official }) {
  const tbc = person.name === TBC;
  const initial = tbc
    ? '?'
    : person.name.replace(/^(Atty\.|Dr\.|Engr\.|Arch\.)\s*/, '')[0];
  return (
    <div className="flex items-center gap-5 rounded-lg border border-gray-200 bg-gray-50 p-5">
      <span
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-700 text-2xl font-bold text-white"
        aria-hidden="true"
      >
        {initial}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-700">
          {person.role}
        </p>
        <h3
          className={cn(
            'mt-1 text-xl font-bold',
            tbc ? 'italic text-gray-700' : 'text-gray-900'
          )}
        >
          {displayName(person)}
        </h3>
        {person.knownAs && (
          <p className="text-base text-gray-700">
            &ldquo;{person.knownAs}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

function PersonRow({ person }: { person: Official }) {
  const tbc = person.name === TBC;
  return (
    <li className="border-b border-gray-200 py-3">
      <div
        className={cn(
          'font-bold',
          tbc ? 'text-gray-700 italic' : 'text-gray-900'
        )}
      >
        {displayName(person)}
        {person.knownAs && (
          <span className="ml-1 text-gray-700">
            &ldquo;{person.knownAs}&rdquo;
          </span>
        )}
      </div>
      <div className="text-base text-gray-700">{person.role}</div>
      {person.phone && (
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-700">
          <Phone className="h-3 w-3" aria-hidden="true" />
          {person.phone}
        </div>
      )}
    </li>
  );
}

// Groups with many people (e.g. the 8 councilors) span two columns and
// list their people in two columns.
function GroupCard({ group }: { group: OfficialGroup }) {
  const wide = group.people.length > 4;
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-5',
        wide && 'md:col-span-2'
      )}
    >
      <h3 className="mb-2 border-b border-gray-200 pb-3 text-lg font-bold text-gray-900">
        {group.title}
      </h3>
      <ul className={cn(wide && 'grid gap-x-8 sm:grid-cols-2')}>
        {group.people.map(p => (
          <PersonRow key={`${p.role}-${p.name}`} person={p} />
        ))}
      </ul>
    </div>
  );
}

export default function GovernmentDirectory() {
  const branchSlug = useLocation().pathname.split('/')[2];
  const [params, setParams] = useSearchParams();

  const pageBranches = BRANCHES.filter(b => !b.href);
  const branch =
    pageBranches.find(b => b.slug === branchSlug) ?? pageBranches[0];
  // Barangays has no offices: it shows the barangay list instead.
  const office: Office | undefined =
    branch.offices.find(o => o.slug === params.get('office')) ??
    branch.offices[0];

  const lead = office?.lead;
  const groups = office?.groups ?? [];

  // Branches as the main menu items; the current branch's offices are
  // listed under it.
  const branchItems: SideNavItem[] = BRANCHES.map(b => {
    const active = !b.href && b.slug === branch.slug;
    return {
      key: b.slug,
      label: b.name,
      icon: b.icon,
      href: b.href ?? `/government/${b.slug}`,
      active,
      children: active
        ? b.offices.map(o => ({
            key: o.slug,
            label: o.name,
            active: o.slug === office?.slug,
            onClick: () => setParams({ office: o.slug }),
          }))
        : undefined,
    };
  });

  return (
    <main className="flex-grow">
      <SEO
        title={office ? `${office.name} - ${branch.name}` : branch.name}
        description="Directory of the officials of the Municipality of Taal, Batangas."
      />
      <PageHeader
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Government', href: '/government' },
          { label: branch.name },
        ]}
        title="Taal Government Directory"
        subtitle={`Explore the officials and offices of the Municipality of Taal, term ${OFFICIALS_TERM}`}
      />
      <PageBody sidebar={<SideNav title="Government" items={branchItems} />}>
        {office ? (
          <>
            <Panel>
              <PanelHeading
                eyebrow={branch.name}
                title={office.name}
                text={office.description ?? branch.description}
              />
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-gray-800">
                <li className="flex items-center gap-2">
                  <Users
                    className="h-4 w-4 shrink-0 text-gray-700"
                    aria-hidden="true"
                  />
                  {countOfficials(office)}{' '}
                  {countOfficials(office) === 1 ? 'official' : 'officials'}
                </li>
                {office.contact && (
                  <>
                    {office.contact.address && (
                      <li className="flex items-center gap-2">
                        <MapPin
                          className="h-4 w-4 shrink-0 text-gray-700"
                          aria-hidden="true"
                        />
                        {office.contact.address}
                      </li>
                    )}
                    {office.contact.phone && (
                      <li className="flex items-center gap-2">
                        <Phone
                          className="h-4 w-4 shrink-0 text-gray-700"
                          aria-hidden="true"
                        />
                        {office.contact.phone}
                      </li>
                    )}
                    {office.contact.email && (
                      <li className="flex items-center gap-2">
                        <Mail
                          className="h-4 w-4 shrink-0 text-gray-700"
                          aria-hidden="true"
                        />
                        <a
                          href={`mailto:${office.contact.email}`}
                          className="break-all text-accent-700 underline underline-offset-2 hover:text-accent-800"
                        >
                          {office.contact.email}
                        </a>
                      </li>
                    )}
                    {office.contact.website && (
                      <li className="flex items-center gap-2">
                        <ExternalLink
                          className="h-4 w-4 shrink-0 text-gray-700"
                          aria-hidden="true"
                        />
                        <a
                          href={office.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-700 underline underline-offset-2 hover:text-accent-800"
                        >
                          {office.contact.website.replace(/^https?:\/\//, '')}
                        </a>
                      </li>
                    )}
                  </>
                )}
              </ul>

              {(lead || groups.length > 0) && (
                <div className="mt-6 space-y-5 border-t border-gray-200 pt-6">
                  {lead && <LeadCard person={lead} />}
                  {groups.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {groups.map(g => (
                        <GroupCard key={g.title} group={g} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Panel>

            <p className="text-sm text-gray-700">
              Officials as of {OFFICIALS_AS_OF}, based on the May 2025 election
              results. Sources:{' '}
              {OFFICIALS_SOURCES.map((s, i) => (
                <span key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-700 underline hover:text-accent-800"
                  >
                    {s.label}
                  </a>
                  {i < OFFICIALS_SOURCES.length - 1 ? '; ' : '.'}
                </span>
              ))}{' '}
              Spot an error? Let us know so we can correct it.
            </p>
          </>
        ) : (
          <BarangayDirectory />
        )}
      </PageBody>
    </main>
  );
}
