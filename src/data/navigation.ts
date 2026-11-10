import type { NavigationItem } from '../types';
import { activeServiceCategories } from './yamlLoader';
import { TAAL_PAGES } from './taal';
import { BRANCHES } from './officials';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Taal',
    href: '/taal/about',
    // Hotlines has its own top-level menu item, so it is left out here.
    children: TAAL_PAGES.filter(page => page.href !== '/taal/hotlines').map(
      page => ({ label: page.label, href: page.href })
    ),
  },
  {
    label: 'Services',
    href: '/services',
    children: (activeServiceCategories as Category[]).map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government',
    children: BRANCHES.map(b => ({
      label: b.name,
      href: b.href ?? `/government/${b.slug}`,
    })),
  },
  {
    label: 'Hotlines',
    href: '/taal/hotlines',
  },
];

// Footer labels are translated from common.json (footer.sections.<key>
// and footer.links.<key>); `title` / `label` are the English fallback.
export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      key: 'about',
      links: [
        { key: 'aboutPortal', label: 'About the Portal', href: '/about' },
        { key: 'faq', label: 'FAQs', href: '/faq' },
        { key: 'contactUs', label: 'Contact Us', href: '/contact' },
        { key: 'terms', label: 'Terms of Use', href: '/terms' },
        { key: 'privacy', label: 'Privacy Policy', href: '/privacy' },
        {
          key: 'accessibility',
          label: 'Accessibility',
          href: '/accessibility',
        },
      ],
    },
    {
      title: 'Services',
      key: 'services',
      links: [
        { key: 'allServices', label: 'All Services', href: '/services' },
        ...(activeServiceCategories as Category[])
          .slice(0, 6)
          .map(category => ({
            // English comes from services.yaml; other languages can
            // translate it under footer.links.<slug> in common.json.
            key: category.slug,
            label: category.category,
            href: `/services/${category.slug}`,
          })),
        { key: 'hotlines', label: 'Hotlines', href: '/taal/hotlines' },
        { key: 'holidays', label: 'Holidays', href: '/taal/holidays' },
        { key: 'forex', label: 'Forex', href: '/forex' },
        { key: 'weather', label: 'Weather', href: '/weather' },
      ],
    },
    {
      title: 'Government',
      key: 'government',
      links: [
        {
          key: 'officialGovPh',
          label: 'Official Gov.ph',
          href: 'https://www.gov.ph',
        },
        { key: 'openData', label: 'Open Data', href: 'https://data.gov.ph' },
        {
          key: 'foi',
          label: 'Freedom of Information',
          href: 'https://www.foi.gov.ph',
        },
        {
          key: 'contactCenter',
          label: 'Contact Center',
          href: 'https://contactcenterngbayan.gov.ph',
        },
        {
          key: 'officialGazette',
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
      ],
    },
  ],
};
