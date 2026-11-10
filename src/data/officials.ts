// Officials of the Municipality of Taal, Batangas, for the Government
// directory (/government). Term: June 30, 2025 to June 30, 2028.
//
// Elected officials are from the May 12, 2025 election results (Rappler,
// from the Comelec media server) with full names from Wikipedia. Councilors
// are listed in order of votes received. Update this file if an official
// changes mid-term (resignation, succession, etc.).

import { CHARTER, MAYOR_OFFICE_EMAIL, OFFICES } from './offices';

export const OFFICIALS_TERM = '2025–2028';
export const OFFICIALS_AS_OF = 'November 2026';

export const OFFICIALS_SOURCES = [
  {
    label: 'Rappler: Taal, Batangas 2025 election results',
    url: 'https://ph.rappler.com/elections/2025/local-race/batangas/taal',
  },
  {
    label: 'Wikipedia: Taal, Batangas',
    url: 'https://en.wikipedia.org/wiki/Taal,_Batangas',
  },
  {
    label: `${CHARTER.title}: List of Offices (department heads)`,
    url: CHARTER.url,
  },
] as const;

export const TBC = 'To be confirmed';

export interface Official {
  name: string; // full name; shown in capitals
  role: string;
  knownAs?: string; // name used on the ballot, e.g. "Nene"
  phone?: string;
  honorific?: string; // e.g. "Hon."
}

export interface OfficialGroup {
  title: string;
  people: Official[];
}

export interface Office {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name for the sidebar
  description?: string;
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  lead?: Official;
  groups: OfficialGroup[];
}

export interface Branch {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  description: string;
  categoryLabel: string; // sidebar heading
  offices: Office[];
  href?: string; // set for cards that link elsewhere instead
}

const MUNICIPAL_HALL = 'Taal Municipal Hall, Taal, Batangas';

const MAYOR: Official = {
  honorific: 'Hon.',
  name: 'Atty. Naereeza Grace M. Bainto',
  knownAs: 'Nene',
  role: 'Municipal Mayor',
};

const VICE_MAYOR: Official = {
  honorific: 'Hon.',
  name: 'Michael Rey A. Villano',
  role: 'Municipal Vice Mayor',
};

const councilor = (name: string, knownAs: string): Official => ({
  honorific: 'Hon.',
  name,
  knownAs,
  role: 'Sangguniang Bayan Member',
});

// Department heads and office emails come from the Citizen's Charter 2026
// (src/data/offices.ts). Each office is its own entry in the directory.
const DEPARTMENT_OFFICES: Office[] = OFFICES.filter(
  // The Mayor's office is already listed under the Executive Branch.
  o => o.key !== 'heritage' && o.key !== 'mayor'
).map(o => ({
  slug: o.key,
  name: o.name,
  icon: o.icon,
  description: o.note,
  contact: {
    ...(o.address ? { address: o.address } : {}),
    ...(o.email ? { email: o.email } : {}),
  },
  lead: { name: o.head ?? TBC, role: o.headTitle },
  groups: [],
}));

export const BRANCHES: Branch[] = [
  {
    slug: 'executive',
    name: 'Executive Branch',
    icon: 'Landmark',
    description:
      'The Mayor and the offices that carry out programs and deliver services.',
    categoryLabel: 'Executive Categories',
    offices: [
      {
        slug: 'office-of-the-mayor',
        name: 'Office of the Mayor',
        icon: 'Building2',
        contact: { address: MUNICIPAL_HALL, email: MAYOR_OFFICE_EMAIL },
        lead: MAYOR,
        groups: [],
      },
      {
        slug: 'office-of-the-vice-mayor',
        name: 'Office of the Vice Mayor',
        icon: 'UserRound',
        contact: { address: MUNICIPAL_HALL },
        lead: VICE_MAYOR,
        groups: [],
      },
    ],
  },
  {
    slug: 'legislative',
    name: 'Legislative Branch',
    icon: 'Scale',
    description:
      'The Sangguniang Bayan, which passes ordinances and resolutions for the town.',
    categoryLabel: 'Legislative Categories',
    offices: [
      {
        slug: 'sangguniang-bayan',
        name: 'Sangguniang Bayan ng Taal',
        icon: 'Users',
        contact: { address: MUNICIPAL_HALL },
        lead: { ...VICE_MAYOR, role: 'Presiding Officer' },
        groups: [
          {
            title: 'Municipal Councilors',
            people: [
              councilor('Arnulfo C. Garces', 'Arnel'),
              councilor('Regie S. Aseron', 'Regie'),
              councilor('Andres Basilio A. Diokno', 'Abe'),
              councilor('Thomas Gabriel C. Albufera', 'Tom'),
              councilor('Rolando B. Correa Jr.', 'Jun'),
              councilor('Edenly V. Navarro', 'Lhen-Len'),
              councilor('Erwin M. Lascano', 'Erwin'),
              councilor('Randy V. Baleros', 'Randy'),
            ],
          },
          {
            title: 'Ex Officio Members',
            people: [
              { name: TBC, role: 'Liga ng mga Barangay President' },
              { name: TBC, role: 'SK Federation President' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'offices',
    name: 'Municipal Offices',
    icon: 'Building',
    description:
      'Departments of the municipal government and the officers who head them.',
    categoryLabel: 'Office Categories',
    offices: DEPARTMENT_OFFICES,
  },
  {
    slug: 'barangays',
    name: 'Barangays',
    icon: 'MapPin',
    description: 'The 42 barangays of Taal and their local officials.',
    categoryLabel: '',
    offices: [],
  },
];

// Number of named people in an office (lead plus groups), for the
// "N officials" line.
export function countOfficials(office: Office): number {
  return (office.lead ? 1 : 0) + office.groups.flatMap(g => g.people).length;
}
