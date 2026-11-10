import { Link } from 'react-router';
import {
  ArrowRight,
  Landmark,
  LayoutGrid,
  Map,
  Phone,
  Home as HomeIcon,
} from 'lucide-react';
import SEO from '../components/SEO';
import { PageBody, PageHeader, Panel } from '../components/layout/PageLayout';

const LINKS = [
  {
    label: 'Home',
    href: '/',
    text: 'Start from the main page',
    icon: HomeIcon,
  },
  {
    label: 'Services',
    href: '/services',
    text: 'Guides to all 90 municipal services',
    icon: LayoutGrid,
  },
  {
    label: 'Government',
    href: '/government',
    text: 'Officials, offices and barangays',
    icon: Landmark,
  },
  {
    label: 'Hotlines',
    href: '/taal/hotlines',
    text: 'Emergency and public service numbers',
    icon: Phone,
  },
  {
    label: 'Sitemap',
    href: '/sitemap',
    text: 'Every page on this site',
    icon: Map,
  },
];

// Shown for any address that does not match a page.
export default function NotFound() {
  return (
    <main className="flex-grow">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on BetterTaalBatangas.org."
      />
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Page not found' }]}
        title="Page not found"
        subtitle="The page you are looking for may have moved or no longer exists. Try one of these instead."
      />
      <PageBody>
        <Panel>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LINKS.map(({ label, href, text, icon: Icon }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group flex h-full items-start gap-4 rounded-lg border border-gray-200 p-5 transition-colors hover:border-accent-400 hover:bg-accent-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-lg font-bold text-gray-900 group-hover:text-accent-700">
                      {label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-base text-gray-700">
                      {text}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </PageBody>
    </main>
  );
}
