import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import type { Service, ServiceCategory, LifeEvent } from '../data/yamlLoader';
import type { MunicipalOffice } from '../data/offices';
import type { Branch, Office, Official } from '../data/officials';
import type { Hotline } from '../data/taal';
import { describeWeatherCode } from './weather';

// Translations for content kept in data files (services.yaml, the service
// YAML files, offices.ts, officials.ts, taal.ts). The English stays in the
// data files and is the fallback; other languages add the text under
// "content" in public/locales/<lang>/common.json. Keys:
//   content.categories.<slug>.name / .description
//   content.services.<category>.<slug>.title / .summary
//   content.lifeEvents.<href slug>
//   content.offices.<key>.name / .headTitle / .note
//   content.branches.<slug>.name / .description / .categoryLabel
//   content.branchOffices.<slug>
//   content.roles.<English role>, content.groups.<English title>
//   content.hotlines.<id>.name / .description / .featured
//   content.weather.<id>

// Common Citizen's Charter wording for fees and processing times, so cards
// read "20 minuto" and "Wala" in Tagalog. Anything not matched stays as
// printed in the Charter.
const CHARTER_WORDS_FIL: [RegExp, string][] = [
  [/^None$/, 'Wala'],
  [/^As assessed$/, 'Ayon sa assessment'],
  [/^As computed$/, 'Ayon sa kuwenta'],
  [
    /^Depends on the document \(see fees above\)$/,
    'Depende sa dokumento (tingnan ang bayarin sa itaas)',
  ],
  [
    /^Depends on the tests \(see fees above\)$/,
    'Depende sa pagsusuri (tingnan ang bayarin sa itaas)',
  ],
  [
    /^Based on the National Building Code fee schedule and the Local Revenue Code$/,
    'Batay sa fee schedule ng National Building Code at sa Local Revenue Code',
  ],
  [/^Based on the Revenue Code of Taal$/, 'Batay sa Revenue Code ng Taal'],
  [/^Based on the /, 'Batay sa '],
  [/\(up to two years only\)/, '(hanggang dalawang taon lamang)'],
  [/\(under normal conditions\)/g, '(sa karaniwang kalagayan)'],
  [/plus the (\d+)-day posting period/g, 'dagdag ang $1 araw na pagpapaskil'],
  [/, but not more than /g, ', pero hindi lalampas sa '],
  [/working days?/g, 'araw ng trabaho'],
  [/\bminutes?\b/g, 'minuto'],
  [/\bhours?\b/g, 'oras'],
  [/\bdays?\b/g, 'araw'],
  [/\bmonths?\b/g, 'buwan'],
  [/\bor more\b/g, 'o higit pa'],
  [/(\d) to (\d)/g, '$1 hanggang $2'],
  [/\bper person\b/g, 'bawat tao'],
  [/\bper year\b/g, 'bawat taon'],
  [/\bwithin Taal\b/g, 'sa loob ng Taal'],
  [/\boutside Taal\b/g, 'sa labas ng Taal'],
  [/\band\b/g, 'at'],
];

// Words a fully translated value may contain. If anything else is left
// (a sentence the rules only partly cover), the value stays in English
// rather than coming out half English, half Tagalog.
const CHARTER_OK = new Set(
  (
    'at o hanggang minuto oras araw buwan ng trabaho bawat tao taon sa loob ' +
    'labas Taal Wala Ayon assessment kuwenta karaniwang kalagayan dagdag ang ' +
    'na pagpapaskil higit pa pero hindi lalampas Depende dokumento tingnan ' +
    'bayarin itaas pagsusuri Batay Revenue Code fee schedule National ' +
    'Building Local dalawang lamang'
  ).split(' ')
);

function translateCharter(v: string): string {
  const out = CHARTER_WORDS_FIL.reduce(
    (acc, [re, to]) => acc.replace(re, to),
    v
  );
  const words = out.match(/[A-Za-z]{2,}/g) ?? [];
  return words.every(w => CHARTER_OK.has(w)) ? out : v;
}

const tx = (t: TFunction, key: string, fallback: string) =>
  t(key, { defaultValue: fallback });

// i18next treats "." and ":" in keys as separators.
const safe = (s: string) => s.replace(/[.:]/g, '');

/** Locale for dates and numbers: "fil-PH" or "en-PH". */
export function dateLocale(lang: string | undefined): string {
  return lang?.startsWith('fil') ? 'fil-PH' : 'en-PH';
}

export function useContent() {
  const { t, i18n } = useTranslation('common');
  const lang = i18n.resolvedLanguage ?? i18n.language ?? 'en';
  const locale = dateLocale(lang);

  return {
    t,
    lang,
    locale,
    isFil: lang.startsWith('fil'),

    categoryName: (c: Pick<ServiceCategory, 'slug' | 'category'>) =>
      tx(t, `content.categories.${c.slug}.name`, c.category),
    categoryDescription: (c: Pick<ServiceCategory, 'slug' | 'description'>) =>
      tx(t, `content.categories.${c.slug}.description`, c.description),
    categoryNameBySlug: (slug: string, fallback: string) =>
      tx(t, `content.categories.${slug}.name`, fallback),

    serviceTitle: (s: Pick<Service, 'categorySlug' | 'slug' | 'title'>) =>
      tx(t, `content.services.${s.categorySlug}.${s.slug}.title`, s.title),
    serviceSummary: (s: Pick<Service, 'categorySlug' | 'slug' | 'summary'>) =>
      tx(t, `content.services.${s.categorySlug}.${s.slug}.summary`, s.summary),

    lifeEvent: (e: LifeEvent) =>
      tx(t, `content.lifeEvents.${safe(e.title)}`, e.title),

    officeName: (o: Pick<MunicipalOffice, 'key' | 'name'>) =>
      tx(t, `content.offices.${o.key}.name`, o.name),
    officeHeadTitle: (o: Pick<MunicipalOffice, 'key' | 'headTitle'>) =>
      tx(t, `content.offices.${o.key}.headTitle`, o.headTitle),
    officeNote: (key: string, note: string) =>
      tx(t, `content.offices.${key}.note`, note),

    branchName: (b: Pick<Branch, 'slug' | 'name'>) =>
      tx(t, `content.branches.${b.slug}.name`, b.name),
    branchDescription: (b: Pick<Branch, 'slug' | 'description'>) =>
      tx(t, `content.branches.${b.slug}.description`, b.description),
    branchCategoryLabel: (b: Pick<Branch, 'slug' | 'categoryLabel'>) =>
      tx(t, `content.branches.${b.slug}.categoryLabel`, b.categoryLabel),
    // Offices in the Government directory: department offices use their
    // office key as slug; the Mayor's, Vice Mayor's and SB offices have
    // their own names.
    directoryOfficeName: (o: Pick<Office, 'slug' | 'name'>) =>
      t(`content.offices.${o.slug}.name`, {
        defaultValue: tx(t, `content.branchOffices.${o.slug}`, o.name),
      }),
    directoryOfficeNote: (o: Pick<Office, 'slug' | 'description'>) =>
      o.description
        ? tx(t, `content.offices.${o.slug}.note`, o.description)
        : undefined,
    role: (official: Pick<Official, 'role'>, officeKey?: string) =>
      officeKey
        ? t(`content.offices.${officeKey}.headTitle`, {
            defaultValue: tx(
              t,
              `content.roles.${safe(official.role)}`,
              official.role
            ),
          })
        : tx(t, `content.roles.${safe(official.role)}`, official.role),
    group: (title: string) => tx(t, `content.groups.${safe(title)}`, title),

    hotlineName: (h: Pick<Hotline, 'id' | 'name'>) =>
      tx(t, `content.hotlines.${h.id}.name`, h.name),
    hotlineDescription: (h: Pick<Hotline, 'id' | 'description'>) =>
      tx(t, `content.hotlines.${h.id}.description`, h.description),
    hotlineFeatured: (h: Hotline) =>
      h.featured
        ? tx(t, `content.hotlines.${h.id}.featured`, h.featured.label)
        : '',

    weather: (code: number) => {
      const w = describeWeatherCode(code);
      return tx(t, `content.weather.${w.id}`, w.label);
    },

    /** Phone number with its note translated, e.g. "(Ambulance)". */
    phone: (n: string) =>
      lang.startsWith('fil')
        ? n
            .replace(
              /^Text (\S+) to (\d+) \(All networks\)$/,
              'I-text ang $1 sa $2 (lahat ng network)'
            )
            .replace(/(\d) to (\d)/g, '$1 hanggang $2')
            .replace('(Ambulance)', '(Ambulansya)')
            .replace('(National Blood Center)', '(Pambansang Blood Center)')
            .replace(
              '(Disaster Response Unit)',
              '(Yunit sa Pagtugon sa Sakuna)'
            )
        : n,

    /** Fee or processing time from the Charter, with common words translated. */
    charterValue: (v: string) =>
      lang.startsWith('fil') ? translateCharter(v) : v,

    /** Address with "Taal Municipal Hall" translated. */
    address: (a: string) =>
      a.replace('Taal Municipal Hall', t('common.municipalHall')),

    /** "To be confirmed" placeholders in data files. */
    tbc: (value: string) =>
      value === 'To be confirmed' ? t('common.tbc') : value,

    /** Country name for a two-letter code, in the current language. */
    country: (code: string, fallback: string) => {
      try {
        return (
          new Intl.DisplayNames([locale], { type: 'region' }).of(code) ??
          fallback
        );
      } catch {
        return fallback;
      }
    },

    /** Currency name for a three-letter code, e.g. "US Dollar". */
    currencyName: (code: string, fallback: string) => {
      try {
        return (
          new Intl.DisplayNames([locale], { type: 'currency' }).of(code) ??
          fallback
        );
      } catch {
        return fallback;
      }
    },

    /** Long date, e.g. "November 11, 2026" or "Nobyembre 11, 2026". */
    date: (d: Date, opts: Intl.DateTimeFormatOptions = { dateStyle: 'long' }) =>
      d.toLocaleDateString(locale, opts),
  };
}

export type Content = ReturnType<typeof useContent>;
