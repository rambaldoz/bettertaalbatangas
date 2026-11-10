import * as yaml from 'js-yaml';

// Type definitions for the services data
export interface Subcategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
  subcategories?: Subcategory[]; // Keep for backward compatibility
}

// ---------------------------------------------------------------------------
// Services, from the Taal Citizen's Charter 2026.
// Categories, life events and home page picks: src/data/services.yaml
// One file per service: content/services/<category>/<service>.yaml
// Field guide: content/services/README.md
// ---------------------------------------------------------------------------

export interface ServiceCategory extends Category {
  services: string[]; // empty = "Coming soon"
}

export interface LifeEvent {
  title: string;
  icon: string;
  href: string;
}

export interface ServicesData {
  description: string;
  categories: ServiceCategory[];
  lifeEvents: LifeEvent[];
  popular: string[]; // "<category>/<service>"
}

export interface RequirementItem {
  item: string;
  where?: string;
}

export interface RequirementGroup {
  group: string;
  items: RequirementItem[];
}

export interface ServiceStep {
  client: string; // what the resident does
  agency?: string[]; // what the office does
  fee?: string | string[];
  time?: string;
  responsible?: string;
  link?: string; // guides: link to the related service
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/** Fields that can differ between the sub-types (variants) of a service. */
export interface ServiceDetails {
  source?: { page: number };
  classification?: string;
  transactionType?: string;
  whoMayAvail?: string | string[];
  requirements?: RequirementGroup[];
  steps?: ServiceStep[];
  totalFee?: string;
  totalTime?: string;
  notes?: string[];
}

export interface ServiceVariant extends ServiceDetails {
  name: string;
}

export interface Service extends ServiceDetails {
  slug: string;
  categorySlug: string;
  categoryName: string;
  href: string;
  type?: 'service' | 'guide';
  title: string;
  fullTitle?: string;
  summary: string;
  description: string;
  icon: string;
  office?: string; // key in src/data/offices.ts
  variants?: ServiceVariant[];
  faqs?: ServiceFaq[];
}

/** A service's details with one variant's fields applied on top. */
export function resolveService(
  service: Service,
  variant?: ServiceVariant
): ServiceDetails {
  if (!variant) return service;
  const merged: ServiceDetails = { ...service };
  for (const [key, value] of Object.entries(variant)) {
    if (key !== 'name' && value !== undefined) {
      (merged as Record<string, unknown>)[key] = value;
    }
  }
  return merged;
}

/** Normalizes a requirement item written as plain text. */
function toItem(item: RequirementItem | string): RequirementItem {
  return typeof item === 'string' ? { item } : item;
}

function normalizeDetails<T extends ServiceDetails>(d: T): T {
  return {
    ...d,
    requirements: d.requirements?.map(g => ({
      ...g,
      items: (g.items ?? []).map(toItem),
    })),
  };
}

// Import the YAML file as raw text
import servicesYamlContent from './services.yaml?raw';

const serviceFiles = import.meta.glob('../../content/services/*/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Parse the YAML content
const parsedServices = yaml.load(servicesYamlContent) as ServicesData;
export const serviceCategories: ServicesData = {
  ...parsedServices,
  categories: parsedServices.categories.map(c => ({
    ...c,
    services: c.services ?? [],
  })),
  lifeEvents: parsedServices.lifeEvents ?? [],
  popular: parsedServices.popular ?? [],
};

// Every service, keyed by "<category>/<service>"
const servicesByKey = new Map<string, Service>();
for (const category of serviceCategories.categories) {
  for (const slug of category.services) {
    const path = `../../content/services/${category.slug}/${slug}.yaml`;
    const raw = serviceFiles[path];
    if (!raw) {
      console.warn(
        `Missing service file: content/services/${category.slug}/${slug}.yaml`
      );
      continue;
    }
    try {
      const data = yaml.load(raw) as Omit<
        Service,
        'slug' | 'categorySlug' | 'categoryName' | 'href'
      >;
      servicesByKey.set(`${category.slug}/${slug}`, {
        ...normalizeDetails(data),
        variants: data.variants?.map(normalizeDetails),
        slug,
        categorySlug: category.slug,
        categoryName: category.category,
        href: `/services/${category.slug}/${slug}`,
      });
    } catch (error) {
      console.warn(`Failed to parse ${path}:`, error);
    }
  }
}

/** Categories that have at least one service (for menus). */
export const activeServiceCategories = serviceCategories.categories.filter(
  c => c.services.length > 0
);

export function getServiceCategory(
  slug: string | undefined
): ServiceCategory | undefined {
  return serviceCategories.categories.find(c => c.slug === slug);
}

/** Services in a category, in the order listed in services.yaml. */
export function getCategoryServices(categorySlug: string): Service[] {
  const category = getServiceCategory(categorySlug);
  return (category?.services ?? [])
    .map(slug => servicesByKey.get(`${categorySlug}/${slug}`))
    .filter((s): s is Service => s !== undefined);
}

export function getService(
  categorySlug: string | undefined,
  slug: string | undefined
): Service | undefined {
  return servicesByKey.get(`${categorySlug}/${slug}`);
}

export function getAllServices(): Service[] {
  return serviceCategories.categories.flatMap(c => getCategoryServices(c.slug));
}

/** Services picked for the home page in services.yaml. */
export function getPopularServices(): Service[] {
  return serviceCategories.popular
    .map(key => servicesByKey.get(key))
    .filter((s): s is Service => s !== undefined);
}

/** Services in a category, as simple page links. */
export function getCategoryPages(categorySlug: string): Subcategory[] {
  return getCategoryServices(categorySlug).map(s => ({
    name: s.title,
    slug: s.slug,
    description: s.summary,
  }));
}

export interface ServicePageLink {
  name: string;
  slug: string;
  categoryName: string;
  href: string;
}

/** Every service page across all categories, for the site search. */
export function getAllServicePages(): ServicePageLink[] {
  return getAllServices().map(s => ({
    name: s.title,
    slug: s.slug,
    categoryName: s.categoryName,
    href: s.href,
  }));
}
