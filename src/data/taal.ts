// Taal, Batangas reference data used by the /taal pages.
// Every fact here has a source in TAAL_SOURCES. Values marked
// "To be confirmed" are placeholders until the LGU verifies them.

export const TAAL_SOURCES = {
  philatlas: {
    label: 'PhilAtlas: Taal, Province of Batangas',
    url: 'https://www.philatlas.com/luzon/r04a/batangas/taal.html',
  },
  wikipedia: {
    label: 'Wikipedia: Taal, Batangas',
    url: 'https://en.wikipedia.org/wiki/Taal,_Batangas',
  },
  inquirer1754: {
    label: 'Inquirer Lifestyle: the 1754 eruption and the transfer of towns',
    url: 'https://lifestyle.inquirer.net/?p=355697',
  },
  wikivoyage: {
    label: 'Wikivoyage: Taal',
    url: 'https://en.wikivoyage.org/wiki/Taal',
  },
  gmaElPasubat: {
    label: 'GMA Regional TV: El Pasubat Festival',
    url: 'https://gmanetwork.com/regionaltv/community/100986/el-pasubat-festival-celebrates-taals-culture-anew/story',
  },
  pnaBurda: {
    label: 'PNA: Batangas promotes habing Ibaan and burdang Taal',
    url: 'https://alpha.pna.gov.ph/articles/1225411',
  },
  bettergovHotlines: {
    label: 'BetterGov.ph: Philippines Emergency Hotlines',
    url: 'https://bettergov.ph/philippines/hotlines',
  },
  bettergovHolidays: {
    label: 'BetterGov.ph: Philippine Public Holidays 2026',
    url: 'https://bettergov.ph/philippines/holidays',
  },
} as const;

export const TBC = 'To be confirmed';

// ---------- About ----------

// Text for the Taal pages is in public/locales/<lang>/common.json under
// "taal"; these lists hold the icons, photos and translation keys.

export const QUICK_FACTS = [
  { icon: 'Globe', key: 'geography' },
  { icon: 'Users', key: 'population' },
  { icon: 'Landmark', key: 'heritage' },
  { icon: 'Mountain', key: 'landscape' },
  { icon: 'MapPin', key: 'barangays' },
] as const;

// taal.about.info.<key>.label / .value
export const KEY_INFORMATION = [
  'province',
  'region',
  'founded',
  'language',
  'landArea',
  'zip',
  'incomeClass',
] as const;

// ---------- Photos ----------
// Drop photos into public/images/taal/ with the file names used below and
// they appear automatically; until then the pages show labelled placeholders.
// Recommended sizes (2x for sharp screens, JPG or WebP):
//   Page heroes        2400 x 1000 px  (hero-*.jpg)
//   History timeline   1800 x 750 px   (history-*.jpg, 12:5)
//   Culture cards      1800 x 750 px   (culture-*.jpg, 12:5)
export interface PhotoCredit {
  title: string; // what the photo shows
  author: string;
  authorUrl?: string;
  sourceUrl: string; // page where the photo was found
  license: string; // e.g. 'CC BY-SA 4.0'
  licenseUrl: string;
  changes?: string; // e.g. 'cropped' (required by CC licenses)
}

export interface Photo {
  src: string;
  credit?: PhotoCredit;
}

export const HERO_PHOTOS: Record<
  'about' | 'history' | 'culture' | 'barangays',
  Photo
> = {
  about: {
    src: '/images/taal/hero-about.webp',
    credit: {
      title: 'Taal Municipal Building',
      author: 'Patrick Roque (patrickroque01)',
      authorUrl: 'https://commons.wikimedia.org/wiki/User:Patrickroque01',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Taal_Municipal_Building_(side_view)_(Taal,_Batangas)(2018-07-30).jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      changes: 'cropped',
    },
  },
  history: {
    src: '/images/taal/hero-history.webp',
    credit: {
      title: 'Old houses in Taal',
      // Attribution wording requested on the Commons file page.
      author: 'Patrickroque01 at English Wikipedia',
      authorUrl: 'https://en.wikipedia.org/wiki/User:Patrickroque01',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Taal_town_proper_-_old_houses_side_(Taal,_Batangas)(2018-07-30).jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      changes: 'cropped',
    },
  },
  culture: { src: '/images/taal/hero-culture.jpg' },
  barangays: { src: '/images/taal/hero-barangays.jpg' },
};

// Credits for photos used inside cards (timeline, culture), by file path.
// Cards show the credit under the photo automatically.
export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  '/images/taal/history-1572.webp': {
    title: 'Taal Basilica',
    author: 'ImaheNiNiño1989',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:ImaheNiNi%C3%B1o1989',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Minor_Basilica_of_Saint_Martin_of_Tours_or_Taal_Basilica_85M7766.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    changes: 'cropped',
  },
};

// ---------- History ----------

// taal.history.timeline.<period>.title / .description / .image
export const TIMELINE = [
  {
    period: '2020',
    icon: 'AlertTriangle',
    photo: '/images/taal/history-2020.jpg',
  },
  { period: '1898', icon: 'Flag', photo: '/images/taal/history-1898.jpg' },
  { period: '1754', icon: 'Mountain', photo: '/images/taal/history-1754.jpg' },
  { period: '1732', icon: 'Crown', photo: '/images/taal/history-1732.jpg' },
  { period: '1572', icon: 'Clock', photo: '/images/taal/history-1572.webp' },
] as const;

// Names stay as written; roles are in taal.history.figures.<key>.
export const HISTORICAL_FIGURES = [
  { key: 'marcela', name: 'Marcela Agoncillo' },
  { key: 'felipe', name: 'Felipe Agoncillo' },
  { key: 'galicano', name: 'Galicano Apacible' },
  { key: 'gliceria', name: 'Gliceria de Villavicencio' },
] as const;

// taal.history.dates.<key>.date / .event
export const IMPORTANT_DATES = [
  'founding',
  'capital',
  'eruption',
  'flag',
] as const;

// ---------- Culture ----------

// taal.culture.heritage.<key>.title / .text / .image
export const CULTURAL_HERITAGE = [
  {
    key: 'barong',
    icon: 'Shirt',
    photo: '/images/taal/culture-barong-burda.jpg',
  },
  {
    key: 'balisong',
    icon: 'Swords',
    photo: '/images/taal/culture-balisong.jpg',
  },
  {
    key: 'cuisine',
    icon: 'UtensilsCrossed',
    photo: '/images/taal/culture-cuisine.jpg',
  },
  {
    key: 'festivals',
    icon: 'PartyPopper',
    photo: '/images/taal/culture-festivals.jpg',
  },
  {
    key: 'churches',
    icon: 'Church',
    photo: '/images/taal/culture-heritage-houses.jpg',
  },
] as const;

// taal.culture.festivals.<key>.name / .when
export const FESTIVALS = [
  'founding',
  'elPasubat',
  'stMartin',
  'caysasay',
] as const;

// taal.culture.arts.<key>.name / .detail
export const TRADITIONAL_ARTS = [
  'embroidery',
  'knives',
  'garments',
  'food',
] as const;

// ---------- Barangays ----------

export const POBLACION_COUNT = 14;

export const BARANGAYS: { name: string; type: 'Poblacion' | 'Barangay' }[] = [
  ...Array.from({ length: POBLACION_COUNT }, (_, i) => ({
    name: `Poblacion ${i + 1}`,
    type: 'Poblacion' as const,
  })),
  ...[
    'Apacay',
    'Balisong',
    'Bihis',
    'Bolbok',
    'Buli',
    'Butong',
    'Carasuche',
    'Cawit',
    'Caysasay',
    'Cubamba',
    'Cultihan',
    'Gahol',
    'Halang',
    'Iba',
    'Ilog',
    'Imamawo',
    'Ipil',
    'Laguile',
    'Latag',
    'Luntal',
    'Mahabang Lodlod',
    'Niogan',
    'Pansol',
    'Pook',
    'Seiran',
    'Tatlong Maria',
    'Tierra Alta',
    'Tulo',
  ].map(name => ({ name, type: 'Barangay' as const })),
];

// Barangay overview text: taal.barangays.paragraphs

// ---------- Hotlines ----------

export type HotlineCategory =
  | 'Taal'
  | 'Emergency'
  | 'Disaster'
  | 'Security'
  | 'Transport'
  | 'Weather'
  | 'Social Services';

export interface Hotline {
  id: string; // translation key: content.hotlines.<id>
  name: string;
  description: string;
  category: HotlineCategory;
  numbers: string[];
  // Set to show this hotline in the Emergency Hotlines section on the home page.
  // `icon` is a lucide-react icon name used by EmergencyHotlines.tsx.
  featured?: { label: string; icon: string };
}

// Placeholder for local numbers until each office confirms its number.
// Placeholders are shown greyed out and are not clickable.
export const PLACEHOLDER_NUMBER = '09XX XXX XXXX';
// Two or more X's, so words like "Text" are not mistaken for placeholders.
export const isPlaceholderNumber = (n: string) => /XX/.test(n);

export const HOTLINES: Hotline[] = [
  // Taal numbers were gathered from public sources in November 2026:
  // Batangas provincial MDRRMO hotline list (Oct 2024), PNP Telephone
  // Directory (June 2022), the Taal LGU directory (news.taal.gov.ph),
  // the Philippine Coast Guard website and hospital listings.
  // Confirm with each office and update when numbers change.
  {
    id: 'taal-mdrrmo',
    name: 'Taal MDRRMO',
    description:
      'Municipal disaster response, rescue, evacuation and ambulance.',
    category: 'Taal',
    numbers: ['0908 930 4167', '(043) 706-3504', '(043) 706-4492 (Ambulance)'],
    featured: { label: 'Rescue (MDRRMO)', icon: 'Siren' },
  },
  {
    id: 'taal-police',
    name: 'PNP Taal Municipal Police Station',
    description: 'Local police assistance and crime reports.',
    category: 'Taal',
    numbers: ['(043) 740-0010'],
    featured: { label: 'Police', icon: 'Shield' },
  },
  {
    id: 'taal-fire',
    name: 'BFP Taal Fire Station',
    description: 'Local fire emergencies and rescue.',
    category: 'Taal',
    numbers: ['0921 726 2470 (Hotline)', '(043) 408-1806'],
    featured: { label: 'Fire', icon: 'Flame' },
  },
  {
    id: 'pcg-batangas',
    name: 'Philippine Coast Guard Station Batangas',
    description:
      'Sea rescue and maritime emergencies along Balayan Bay. Taal has no Coast Guard sub-station of its own.',
    category: 'Taal',
    numbers: ['0956 904 6652'],
    featured: { label: 'Coast Guard', icon: 'Ship' },
  },
  {
    id: 'taal-polymedic',
    name: 'Taal Polymedic Hospital and Medical Center',
    description:
      'Hospital in Barangay Carsuche, Diversion Road, Taal, with an emergency room.',
    category: 'Taal',
    numbers: ['(043) 740-6283', '(043) 706-5117 (Emergency Room)'],
    featured: { label: 'Hospital', icon: 'Hospital' },
  },
  {
    id: 'taal-rhu',
    name: 'Taal Rural Health Unit',
    description: 'Municipal Health Office in Barangay Carsuche.',
    category: 'Taal',
    numbers: ['(043) 706-3391'],
  },
  {
    id: 'taal-mswdo',
    name: 'Taal MSWDO',
    description: 'Social welfare assistance for residents.',
    category: 'Taal',
    numbers: ['(043) 706-3390'],
  },
  {
    id: 'taal-municipal-hall',
    name: 'Taal Municipal Hall',
    description: 'Office of the Mayor and general municipal concerns.',
    category: 'Taal',
    numbers: ['(043) 740-6183', '(043) 706-3366'],
  },
  {
    id: 'national-emergency',
    name: 'National Emergency Hotline',
    description:
      'Nationwide emergency hotline for police, fire, and medical assistance.',
    category: 'Emergency',
    numbers: ['911'],
  },
  {
    id: 'red-cross',
    name: 'Red Cross',
    description:
      'Emergency response, disaster relief, and blood donation services.',
    category: 'Emergency',
    numbers: [
      '143 (Hotline)',
      '(02) 8527-8385 to 95 (National Blood Center)',
      '(02) 8527-0000',
      '(02) 8790-2300',
    ],
  },
  {
    id: 'ndrrmc',
    name: 'National Disaster Risk Reduction and Management Council (NDRRMC)',
    description:
      'Coordinates national disaster preparedness, response, and recovery.',
    category: 'Disaster',
    numbers: [
      '(02) 8911-5061 to 65 local 100',
      '(02) 8911-1406',
      '(02) 8912-2665',
      '(02) 8912-5668',
      '(02) 8911-1873',
    ],
  },
  {
    id: 'phivolcs',
    name: 'Philippine Institute of Volcanology and Seismology (PHIVOLCS)',
    description:
      'Warnings for earthquakes, tsunamis, and eruptions, including Taal Volcano.',
    category: 'Disaster',
    numbers: ['(02) 8426-1468 to 79'],
  },
  {
    id: 'pnp',
    name: 'Philippine National Police (PNP)',
    description: 'Law enforcement hotline for crimes and public safety.',
    category: 'Security',
    numbers: [
      '117 (Emergency Hotline)',
      '(02) 8722-0650',
      '0917-847-5757 (Text Hotline)',
    ],
  },
  {
    id: 'bfp',
    name: 'Bureau of Fire Protection (BFP)',
    description: 'Fire prevention, rescue, and related emergencies.',
    category: 'Emergency',
    numbers: ['(02) 8426-0219', '(02) 8426-0246'],
  },
  {
    id: 'pcg',
    name: 'Philippine Coast Guard',
    description: 'Maritime safety, rescue, and law enforcement at sea.',
    category: 'Security',
    numbers: [
      '(02) 8527-8481 to 89',
      '(02) 8527-3877',
      '(02) 8527-3880 to 85',
      '0917-724-3682 (Text Hotline)',
      '0918-967-4697 (Text Hotline)',
    ],
  },
  {
    id: 'dotr',
    name: 'Department of Transportation (DOTr)',
    description: 'Public transportation services and passenger complaints.',
    category: 'Transport',
    numbers: [
      '7890 (Action Center Hotline)',
      '(02) 8790-8300',
      '(02) 8726-4925',
    ],
  },
  {
    id: 'lto',
    name: 'Land Transportation Office (LTO)',
    description: 'Vehicle registration, licensing, and road safety.',
    category: 'Transport',
    numbers: ['Text LTOHELP to 2600 (All networks)', '(02) 8922-9061 to 63'],
  },
  {
    id: 'ltfrb',
    name: 'Land Transportation Franchising and Regulatory Board (LTFRB)',
    description: 'Public utility vehicles and transport complaints.',
    category: 'Transport',
    numbers: [
      '1342 (24/7 Hotline)',
      '(02) 8426-2515',
      '(02) 8426-2534',
      '0921-448-7777 (Text Hotline)',
    ],
  },
  {
    id: 'pagasa',
    name: 'PAGASA',
    description: 'Weather forecasts, flood warnings, and typhoon advisories.',
    category: 'Weather',
    numbers: ['(02) 8284-0800'],
  },
  {
    id: 'dswd',
    name: 'Department of Social Welfare and Development (DSWD)',
    description: 'Social services and disaster relief for affected families.',
    category: 'Social Services',
    numbers: [
      '0918-912-2813 (Text Hotline)',
      '(02) 8931-8101 to 07',
      '(02) 8856-3665 (Disaster Response Unit)',
      '(02) 8852-8081 (Disaster Response Unit)',
    ],
  },
  {
    id: 'vawc',
    name: 'Violence Against Women and Children (VAWC)',
    description:
      'Report and seek help for violence against women and children.',
    category: 'Social Services',
    numbers: [
      '(02) 8931-8101 to 07 (DSWD)',
      '(02) 8723-0401 to 20 (PNP)',
      '(02) 3410-3213 (PNP-WCPC)',
    ],
  },
  {
    id: 'ncmh',
    name: 'National Center for Mental Health (NCMH)',
    description: '24/7 crisis hotline and mental health support.',
    category: 'Social Services',
    numbers: [
      '0917-899-8727 (USAP)',
      '989-8727 (USAP)',
      '(02) 8531-9001 to 10 local 201',
    ],
  },
];

// ---------- Holidays ----------

export const HOLIDAY_YEAR = 2026;

export const REGULAR_HOLIDAYS = [
  { key: 'newYear', event: "New Year's Day", date: '2026-01-01' },
  { key: 'maundyThursday', event: 'Maundy Thursday', date: '2026-04-02' },
  { key: 'goodFriday', event: 'Good Friday', date: '2026-04-03' },
  { key: 'kagitingan', event: 'Araw ng Kagitingan', date: '2026-04-09' },
  { key: 'labor', event: 'Labor Day', date: '2026-05-01' },
  { key: 'independence', event: 'Independence Day', date: '2026-06-12' },
  { key: 'heroes', event: 'National Heroes Day', date: '2026-08-31' },
  { key: 'bonifacio', event: 'Bonifacio Day', date: '2026-11-30' },
  { key: 'christmas', event: 'Christmas Day', date: '2026-12-25' },
  { key: 'rizal', event: 'Rizal Day', date: '2026-12-30' },
];

export const SPECIAL_HOLIDAYS = [
  { key: 'chineseNewYear', event: 'Chinese New Year', date: '2026-02-17' },
  { key: 'blackSaturday', event: 'Black Saturday', date: '2026-04-04' },
  { key: 'ninoy', event: 'Ninoy Aquino Day', date: '2026-08-21' },
  { key: 'allSaints', event: "All Saints' Day", date: '2026-11-01' },
  { key: 'allSouls', event: "All Souls' Day", date: '2026-11-02' },
  {
    key: 'immaculate',
    event: 'Feast of the Immaculate Conception of Mary',
    date: '2026-12-08',
  },
  { key: 'christmasEve', event: 'Christmas Eve', date: '2026-12-24' },
  { key: 'lastDay', event: 'Last Day of the Year', date: '2026-12-31' },
];

// Local observances. Whether each is a non-working day depends on
// a proclamation or municipal ordinance for that year.
export const LOCAL_OBSERVANCES = [
  {
    key: 'founding',
    event: 'Founding Anniversary of Taal',
    date: '2026-04-26',
  },
  {
    key: 'stMartin',
    event: 'Feast of St. Martin of Tours',
    date: '2026-11-11',
  },
  {
    key: 'caysasay',
    event: 'Feast of Our Lady of Caysasay',
    date: '2026-12-08',
  },
];

// ---------- Shared ----------

// Labels are translated under taal.pages.<key>.
export const TAAL_PAGES = [
  { key: 'about', label: 'About', href: '/taal/about' },
  { key: 'history', label: 'History', href: '/taal/history' },
  { key: 'culture', label: 'Culture', href: '/taal/culture' },
  { key: 'hotlines', label: 'Hotlines', href: '/taal/hotlines' },
  { key: 'holidays', label: 'Holidays', href: '/taal/holidays' },
  { key: 'forex', label: 'Forex', href: '/forex' },
  { key: 'weather', label: 'Weather', href: '/weather' },
] as const;
