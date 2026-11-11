import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../../lib/useContent';
import { getPopularServices } from '../../data/yamlLoader';
import { DynamicIcon } from '../services/ServiceUI';

// Popular services in two columns, in the style of betterbinangonan.org.
// Mark a service with "popular: true" in its YAML file to list it here.
export default function ServicesGrid() {
  const c = useContent();
  const { t } = c;
  const services = getPopularServices();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('services.governmentServices')}
            </h2>
            <p className="mt-2 text-gray-700">{t('services.description')}</p>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1 text-base font-bold text-accent-700 underline underline-offset-2 hover:text-accent-800"
          >
            {t('services.viewAll')}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <li key={service.href}>
              <Link
                to={service.href}
                className="flex h-full items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <DynamicIcon name={service.icon} />
                </span>
                <span>
                  <span className="block font-bold text-gray-900">
                    {c.serviceTitle(service)}
                  </span>
                  <span className="mt-1 block text-sm text-gray-700">
                    {c.serviceSummary(service)}
                  </span>
                  <span className="mt-2 block text-sm text-gray-900">
                    <span className="font-bold">
                      {t('servicesPage.category')}:
                    </span>{' '}
                    {c.categoryNameBySlug(
                      service.categorySlug,
                      service.categoryName
                    )}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
