import { Link } from 'react-router';
import {
  ArrowRight,
  Landmark,
  LayoutGrid,
  Map,
  Phone,
  Home as HomeIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { PageBody, PageHeader, Panel } from '../components/layout/PageLayout';

// Labels and text: notFound.links.<key>.label / .text
const LINKS = [
  { key: 'home', href: '/', icon: HomeIcon },
  { key: 'services', href: '/services', icon: LayoutGrid },
  { key: 'government', href: '/government', icon: Landmark },
  { key: 'hotlines', href: '/taal/hotlines', icon: Phone },
  { key: 'sitemap', href: '/sitemap', icon: Map },
];

// Shown for any address that does not match a page.
export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <main className="flex-grow">
      <SEO
        title={t('notFound.title')}
        description={t('notFound.seoDescription')}
      />
      <PageHeader
        crumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('notFound.title') },
        ]}
        title={t('notFound.title')}
        subtitle={t('notFound.subtitle')}
      />
      <PageBody>
        <Panel>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LINKS.map(({ key, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group flex h-full items-start gap-4 rounded-lg border border-gray-200 p-5 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-lg font-bold text-gray-900 group-hover:text-primary-700">
                      {t(`notFound.links.${key}.label`)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-base text-gray-700">
                      {t(`notFound.links.${key}.text`)}
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
