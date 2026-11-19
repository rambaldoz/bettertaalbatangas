// Writes public/robots.txt and public/sitemap.xml before each build, so
// search engines can find every page. Runs from `npm run build`.
// The site address comes from VITE_WEBSITE_URL (.env.local or Vercel).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';
import { loadEnv } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const site = (env.VITE_WEBSITE_URL || 'https://bettertaalbatangas.org').replace(
  /\/+$/,
  ''
);

// Pages that exist outside the services list (see src/App.tsx).
const pages = [
  '/',
  '/services',
  '/government',
  '/government/executive',
  '/government/legislative',
  '/government/offices',
  '/government/barangays',
  '/taal/about',
  '/taal/history',
  '/taal/culture',
  '/taal/hotlines',
  '/taal/holidays',
  '/weather',
  '/forex',
  '/about',
  '/faq',
  '/contact',
  '/terms',
  '/privacy',
  '/accessibility',
  '/sitemap',
];

// Service categories and service pages from src/data/services.yaml.
const { categories = [] } = load(
  readFileSync(join(root, 'src/data/services.yaml'), 'utf8')
);
for (const c of categories) {
  pages.push(`/services/${c.slug}`);
  for (const s of c.services ?? []) {
    if (existsSync(join(root, 'content/services', c.slug, `${s}.yaml`)))
      pages.push(`/services/${c.slug}/${s}`);
  }
}

const today = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    p =>
      `  <url><loc>${site}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`
  ),
  '</urlset>',
  '',
].join('\n');

const robots = `# BetterTaalBatangas.org
User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
writeFileSync(join(root, 'public/robots.txt'), robots);
console.log(
  `robots.txt and sitemap.xml written (${pages.length} pages, ${site})`
);
