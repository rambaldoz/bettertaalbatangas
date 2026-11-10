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

export const QUICK_FACTS = [
  {
    icon: 'Globe',
    title: 'Geography',
    text: 'A coastal municipality in Batangas, facing Balayan Bay and about 79 km south of Metro Manila.',
  },
  {
    icon: 'Users',
    title: 'Population',
    text: 'Home to 61,460 people as of the 2020 Census of Population and Housing.',
  },
  {
    icon: 'Landmark',
    title: 'Heritage Town',
    text: 'Its poblacion is a National Historical Landmark, with hundreds of Spanish-era structures.',
  },
  {
    icon: 'Mountain',
    title: 'Landscape',
    text: 'Set between Taal Lake and Balayan Bay, linked by the Pansipit River.',
  },
  {
    icon: 'MapPin',
    title: 'Barangays',
    text: '42 barangays, including 14 poblacion barangays in the town center.',
  },
] as const;

export const KEY_INFORMATION = [
  { label: 'Province', value: 'Batangas' },
  { label: 'Region', value: 'Region IV-A (CALABARZON)' },
  { label: 'Founded', value: 'April 26, 1572' },
  { label: 'Language', value: 'Tagalog (Batangueño), English' },
  { label: 'Land Area', value: '29.76 km²' },
  { label: 'ZIP Code', value: '4208' },
  { label: 'Income Class', value: TBC },
] as const;

export const ABOUT_OVERVIEW = [
  'Taal is a coastal municipality in the province of Batangas, in the CALABARZON region. Founded by Augustinian friars in 1572, it is one of the oldest towns in Batangas and once served as the provincial capital.',
  'The town moved to its present site overlooking Balayan Bay after the great eruption of Taal Volcano in 1754. Today its town center keeps a Spanish-era grid of narrow streets, ancestral houses and the Basilica de San Martin de Tours.',
  'Taal is known as the balisong and Barong Tagalog capital of the Philippines. Its embroidery, crafts and food, from tapang Taal to sinaing na tulingan, are celebrated every April at the El Pasubat Festival.',
];

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

export const TIMELINE = [
  {
    period: '2020',
    icon: 'AlertTriangle',
    title: 'Taal Volcano Eruption',
    description:
      'The town was evacuated for several weeks in early 2020. Ashfall and volcanic tremors damaged several heritage structures.',
    image: 'Photo: Taal Volcano and Taal Lake',
    photo: '/images/taal/history-2020.jpg',
  },
  {
    period: '1898',
    icon: 'Flag',
    title: 'The Philippine Flag',
    description:
      'Taal-born Marcela Agoncillo sewed the first Philippine flag, unfurled at the declaration of independence in Kawit on June 12, 1898.',
    image: 'Photo: Marcela Agoncillo Museum',
    photo: '/images/taal/history-1898.jpg',
  },
  {
    period: '1754',
    icon: 'Mountain',
    title: 'The Great Eruption',
    description:
      'A months-long eruption of Taal Volcano destroyed the lakeshore town. Residents moved to Caysasay and later to the present site above Balayan Bay.',
    image: 'Photo: Ruins of the old Taal church, San Nicolas',
    photo: '/images/taal/history-1754.jpg',
  },
  {
    period: '1732',
    icon: 'Crown',
    title: 'Capital of Batangas',
    description:
      'Taal became the provincial capital and a busy lake and river port linking Taal Lake to Balayan Bay.',
    image: 'Photo: Pansipit River',
    photo: '/images/taal/history-1732.jpg',
  },
  {
    period: '1572',
    icon: 'Clock',
    title: 'Founding of Taal',
    description:
      'Augustinian friars founded Taal on April 26, 1572 as the first Christian mission in Batangas. In 1575 it moved to the edge of the lake.',
    image: 'Photo: Basilica de San Martin de Tours',
    photo: '/images/taal/history-1572.webp',
  },
] as const;

export const HISTORICAL_FIGURES = [
  { name: 'Marcela Agoncillo', role: 'Maker of the first Philippine flag' },
  {
    name: 'Felipe Agoncillo',
    role: 'Diplomat at the Treaty of Paris talks (1898)',
  },
  {
    name: 'Galicano Apacible',
    role: 'Co-founder of La Solidaridad, Governor of Batangas',
  },
  {
    name: 'Gliceria de Villavicencio',
    role: 'Supporter of the revolutionary forces',
  },
] as const;

export const IMPORTANT_DATES = [
  { date: 'April 26, 1572', event: 'Founding of Taal' },
  { date: '1732', event: 'Taal becomes capital of Batangas' },
  { date: 'May to December 1754', event: 'Great eruption of Taal Volcano' },
  { date: 'June 12, 1898', event: 'Agoncillo flag unfurled in Kawit' },
] as const;

export const HISTORY_OVERVIEW = [
  'Taal was founded in 1572 by Augustinian missionaries at Balangon, near the Pansipit River, and grew into a lake and river port. Its early parish counted Balayan and Bauan as mission stations.',
  'In 1732 Taal became the capital of Batangas. The great eruption of 1754 devastated the lakeshore towns, forcing Taal to move toward Balayan Bay and the provincial capital to move to what is now Batangas City.',
  'In the 19th and 20th centuries several towns, including Lemery, San Luis, San Nicolas and Santa Teresita, were formed from parts of Taal. Its sons and daughters, from the Agoncillos to Galicano Apacible, played a large part in the revolution and the early republic.',
];

// ---------- Culture ----------

export const CULTURAL_HERITAGE = [
  {
    icon: 'Shirt',
    title: 'Barong Tagalog and Burdang Taal',
    text: 'Hand embroidery on piña and jusi fabric for barong and camisa, a home industry passed down for generations.',
    image: 'Photo: Burdang Taal embroidery',
    photo: '/images/taal/culture-barong-burda.jpg',
  },
  {
    icon: 'Swords',
    title: 'Balisong',
    text: 'The Filipino fan knife, crafted by hand in Taal, especially in Barangay Balisong.',
    image: 'Photo: Balisong makers at work',
    photo: '/images/taal/culture-balisong.jpg',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Cuisine',
    text: 'Tapang Taal, longganisang Taal, empanada, sinaing na tulingan, adobo sa dilaw, suman and panutsa.',
    image: 'Photo: Tapang Taal and longganisa',
    photo: '/images/taal/culture-cuisine.jpg',
  },
  {
    icon: 'PartyPopper',
    title: 'Festivals',
    text: 'The El Pasubat Festival every April and the town fiesta honoring St. Martin of Tours and Our Lady of Caysasay.',
    image: 'Photo: El Pasubat Festival parade',
    photo: '/images/taal/culture-festivals.jpg',
  },
  {
    icon: 'Church',
    title: 'Churches and Ancestral Houses',
    text: 'The Basilica de San Martin de Tours, the Caysasay shrine and ancestral houses like the Marcela Agoncillo house, now a museum.',
    image: 'Photo: Taal ancestral houses',
    photo: '/images/taal/culture-heritage-houses.jpg',
  },
] as const;

export const FESTIVALS = [
  { name: 'Founding Anniversary', when: 'April 26' },
  { name: 'El Pasubat Festival', when: 'April' },
  { name: 'Feast of St. Martin of Tours', when: 'November 11' },
  { name: 'Feast of Our Lady of Caysasay', when: 'December 8' },
] as const;

export const TRADITIONAL_ARTS = [
  { name: 'Embroidery', detail: 'Burdang Taal on piña and jusi' },
  { name: 'Knife Making', detail: 'Balisong' },
  { name: 'Garments', detail: 'Barong Tagalog, camisa' },
  { name: 'Food Crafts', detail: 'Panutsa, suman, tapa, longganisa' },
] as const;

export const CULTURE_OVERVIEW = [
  'Taal is called the balisong and Barong Tagalog capital of the Philippines. Its embroiderers and knife makers keep crafts alive that started as home industries in the town.',
  'The name El Pasubat comes from the things Taal is known for: empanada, longganisa, panutsa, suman, balisong, barong and tapa. Tamales, tawilis and tulingan were added later.',
  'Faith is central to town life. The feasts of St. Martin of Tours and Our Lady of Caysasay bring processions and old traditions back to the streets each year.',
];

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

export const BARANGAY_OVERVIEW = [
  'Taal is divided into 42 barangays. Fourteen poblacion barangays make up the heritage town center, while the rest spread toward Taal Lake, the Pansipit River and Balayan Bay.',
  'Each barangay is made up of puroks, and some have sitios. Barangay officials, contact details and health stations will be added to each barangay page.',
];

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
export const isPlaceholderNumber = (n: string) => /X/i.test(n);

export const HOTLINES: Hotline[] = [
  // Taal numbers were gathered from public sources in November 2026:
  // Batangas provincial MDRRMO hotline list (Oct 2024), PNP Telephone
  // Directory (June 2022), the Taal LGU directory (news.taal.gov.ph),
  // the Philippine Coast Guard website and hospital listings.
  // Confirm with each office and update when numbers change.
  {
    name: 'Taal MDRRMO',
    description:
      'Municipal disaster response, rescue, evacuation and ambulance.',
    category: 'Taal',
    numbers: ['0908 930 4167', '(043) 706-3504', '(043) 706-4492 (Ambulance)'],
    featured: { label: 'Rescue (MDRRMO)', icon: 'Siren' },
  },
  {
    name: 'PNP Taal Municipal Police Station',
    description: 'Local police assistance and crime reports.',
    category: 'Taal',
    numbers: ['(043) 740-0010'],
    featured: { label: 'Police', icon: 'Shield' },
  },
  {
    name: 'BFP Taal Fire Station',
    description: 'Local fire emergencies and rescue.',
    category: 'Taal',
    numbers: ['0921 726 2470 (Hotline)', '(043) 408-1806'],
    featured: { label: 'Fire', icon: 'Flame' },
  },
  {
    name: 'Philippine Coast Guard Station Batangas',
    description:
      'Sea rescue and maritime emergencies along Balayan Bay. Taal has no Coast Guard sub-station of its own.',
    category: 'Taal',
    numbers: ['0956 904 6652'],
    featured: { label: 'Coast Guard', icon: 'Ship' },
  },
  {
    name: 'Taal Polymedic Hospital and Medical Center',
    description:
      'Hospital in Barangay Carsuche, Diversion Road, Taal, with an emergency room.',
    category: 'Taal',
    numbers: ['(043) 740-6283', '(043) 706-5117 (Emergency Room)'],
    featured: { label: 'Hospital', icon: 'Hospital' },
  },
  {
    name: 'Taal Rural Health Unit',
    description: 'Municipal Health Office in Barangay Carsuche.',
    category: 'Taal',
    numbers: ['(043) 706-3391'],
  },
  {
    name: 'Taal MSWDO',
    description: 'Social welfare assistance for residents.',
    category: 'Taal',
    numbers: ['(043) 706-3390'],
  },
  {
    name: 'Taal Municipal Hall',
    description: 'Office of the Mayor and general municipal concerns.',
    category: 'Taal',
    numbers: ['(043) 740-6183', '(043) 706-3366'],
  },
  {
    name: 'National Emergency Hotline',
    description:
      'Nationwide emergency hotline for police, fire, and medical assistance.',
    category: 'Emergency',
    numbers: ['911'],
  },
  {
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
    name: 'Philippine Institute of Volcanology and Seismology (PHIVOLCS)',
    description:
      'Warnings for earthquakes, tsunamis, and eruptions, including Taal Volcano.',
    category: 'Disaster',
    numbers: ['(02) 8426-1468 to 79'],
  },
  {
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
    name: 'Bureau of Fire Protection (BFP)',
    description: 'Fire prevention, rescue, and related emergencies.',
    category: 'Emergency',
    numbers: ['(02) 8426-0219', '(02) 8426-0246'],
  },
  {
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
    name: 'Land Transportation Office (LTO)',
    description: 'Vehicle registration, licensing, and road safety.',
    category: 'Transport',
    numbers: ['Text LTOHELP to 2600 (All networks)', '(02) 8922-9061 to 63'],
  },
  {
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
    name: 'PAGASA',
    description: 'Weather forecasts, flood warnings, and typhoon advisories.',
    category: 'Weather',
    numbers: ['(02) 8284-0800'],
  },
  {
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
  { event: "New Year's Day", date: '2026-01-01' },
  { event: 'Maundy Thursday', date: '2026-04-02' },
  { event: 'Good Friday', date: '2026-04-03' },
  { event: 'Araw ng Kagitingan', date: '2026-04-09' },
  { event: 'Labor Day', date: '2026-05-01' },
  { event: 'Independence Day', date: '2026-06-12' },
  { event: 'National Heroes Day', date: '2026-08-31' },
  { event: 'Bonifacio Day', date: '2026-11-30' },
  { event: 'Christmas Day', date: '2026-12-25' },
  { event: 'Rizal Day', date: '2026-12-30' },
];

export const SPECIAL_HOLIDAYS = [
  { event: 'Chinese New Year', date: '2026-02-17' },
  { event: 'Black Saturday', date: '2026-04-04' },
  { event: 'Ninoy Aquino Day', date: '2026-08-21' },
  { event: "All Saints' Day", date: '2026-11-01' },
  { event: "All Souls' Day", date: '2026-11-02' },
  { event: 'Feast of the Immaculate Conception of Mary', date: '2026-12-08' },
  { event: 'Christmas Eve', date: '2026-12-24' },
  { event: 'Last Day of the Year', date: '2026-12-31' },
];

// Local observances. Whether each is a non-working day depends on
// a proclamation or municipal ordinance for that year.
export const LOCAL_OBSERVANCES = [
  { event: 'Founding Anniversary of Taal', date: '2026-04-26' },
  { event: 'Feast of St. Martin of Tours', date: '2026-11-11' },
  { event: 'Feast of Our Lady of Caysasay', date: '2026-12-08' },
];

// ---------- Shared ----------

export const TAAL_PAGES = [
  { label: 'About', href: '/taal/about' },
  { label: 'History', href: '/taal/history' },
  { label: 'Culture', href: '/taal/culture' },
  { label: 'Hotlines', href: '/taal/hotlines' },
  { label: 'Holidays', href: '/taal/holidays' },
  { label: 'Forex', href: '/forex' },
  { label: 'Weather', href: '/weather' },
] as const;
