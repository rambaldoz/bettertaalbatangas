import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

interface Crumb {
  name: string;
  /** Site path, e.g. "/services/business". */
  path: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Full URL override. Defaults to the site address plus the current path. */
  url?: string;
  type?: string;
  siteName?: string;
  /** Keep the page out of search results (e.g. the 404 page). */
  noindex?: boolean;
  /** Breadcrumb trail for the BreadcrumbList structured data. */
  breadcrumbs?: Crumb[];
  /** Extra JSON-LD objects for this page (e.g. FAQPage). */
  jsonLd?: object[];
}

// The live address. Used for canonical links, share links and structured
// data, so every page points at itself and not at a preview deployment.
const SITE_URL = (
  (import.meta.env.VITE_WEBSITE_URL as string | undefined) ||
  'https://bettertaalbatangas.org'
).replace(/\/+$/, '');

/** Absolute URL for a site path, matching the format used in sitemap.xml. */
function absoluteUrl(path: string) {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '');
  return `${SITE_URL}${clean}`;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  // The portal's own name, not the municipality's, so pages are not mistaken
  // for the official government website.
  siteName = 'BetterTaalBatangas.org',
  noindex = false,
  breadcrumbs,
  jsonLd = [],
}: SEOProps) {
  const { t, i18n } = useTranslation('common');
  const { pathname } = useLocation();
  const isFil = (i18n.resolvedLanguage ?? 'en').startsWith('fil');

  // index.html carries fallback tags for crawlers that do not run JavaScript
  // (Facebook, Messenger). Once a page sets its own tags, drop the fallbacks
  // so there is only one description, title and share image per page.
  useEffect(() => {
    document.querySelectorAll('[data-static-seo]').forEach(el => el.remove());
  }, []);

  const defaultTitle = `${t('seo.defaultTitle')} | ${siteName}`;
  const defaultDescription = isFil
    ? t('seo.defaultDescription')
    : import.meta.env.VITE_SITE_DESCRIPTION || t('seo.defaultDescription');
  const defaultKeywords =
    import.meta.env.VITE_SITE_KEYWORDS || t('seo.homeKeywords');

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords || defaultKeywords;
  // Each page's own address (no query string), so Google indexes every page
  // instead of treating them all as copies of the homepage.
  const fullUrl = url || absoluteUrl(pathname);
  const fullImage =
    image || import.meta.env.VITE_OG_IMAGE_URL || `${SITE_URL}/og-image.jpg`;
  const twitterHandle = import.meta.env.VITE_TWITTER_HANDLE || '';

  const structuredData: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: `${SITE_URL}/`,
      inLanguage: ['en', 'fil'],
      description: t('seo.defaultDescription'),
      about: {
        '@type': 'Place',
        name: 'Taal, Batangas, Philippines',
      },
    },
    ...(breadcrumbs && breadcrumbs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.name,
              item: absoluteUrl(c.path),
            })),
          },
        ]
      : []),
    ...jsonLd,
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={siteName} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow'}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={isFil ? 'fil_PH' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      <meta name="theme-color" content="#0032a0" />

      {/* Canonical URL: this page's own address */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured data */}
      {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  );
}
