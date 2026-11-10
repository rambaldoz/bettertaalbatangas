// Municipal offices of Taal: heads and office emails.
// Source: Taal Citizen's Charter 2026 (1st Edition), List of Offices
// (pp. 207-208) and Committee on Anti-Red Tape (p. 209).
//
// Used by the Government directory (/government/offices) and by the office
// card on each service page (content/services/*/*.yaml, "office" field).
// Only office email addresses are shown. Mobile numbers from the Charter are
// left out on purpose, as are addresses that look personal.

export const CHARTER = {
  title: "Taal Citizen's Charter 2026 (1st Edition)",
  url: 'https://drive.google.com/file/d/1GntbqUid0Rmfjaz3FzeOJZjWIcfR2syg/view',
  post: 'https://www.facebook.com/MunicipalityOfTaal/posts/pfbid0bFJqxJBarhbkhpYRE2zvJyE2DhXQJUdG9Zbk2QSu3T7TFJErtUErFwRuFZ5UEc7Ql',
  asOf: '2026',
} as const;

export interface MunicipalOffice {
  key: string;
  name: string;
  short?: string; // common acronym, e.g. "MSWDO"
  icon: string; // lucide-react icon name
  head?: string; // undefined = to be confirmed
  headTitle: string;
  email?: string;
  address?: string; // only when the Charter gives one
  note?: string;
}

export const OFFICES: MunicipalOffice[] = [
  {
    key: 'mayor',
    name: 'Office of the Municipal Mayor',
    icon: 'Landmark',
    head: 'Atty. Naereeza Grace M. Bainto',
    headTitle: 'Municipal Mayor',
    email: 'municipalityoftaal.mayorbainto@gmail.com',
  },
  {
    key: 'administrator',
    name: 'Office of the Municipal Administrator',
    icon: 'Briefcase',
    head: 'Atty. Ar-Reb B. Aquino, CPA',
    headTitle: 'Municipal Administrator',
  },
  {
    key: 'bplo',
    name: 'Business Permits and Licensing Office',
    short: 'BPLO',
    icon: 'Store',
    head: 'Atty. Jecah Grace F. Nieva',
    headTitle: 'Business Permit and Licensing Officer',
    email: 'bplotaal@gmail.com',
    note: 'Head listed in the Committee on Anti-Red Tape (p. 209).',
  },
  {
    key: 'mcr',
    name: 'Office of the Municipal Civil Registrar',
    short: 'MCR',
    icon: 'FileText',
    head: 'Atty. Ar-Reb B. Aquino, CPA',
    headTitle: 'Municipal Civil Registrar (Officer-in-Charge)',
    email: 'lcrtaal@gmail.com',
  },
  {
    key: 'mto',
    name: "Municipal Treasurer's Office",
    short: 'MTO',
    icon: 'Wallet',
    head: 'Ma. Perpetua Maripel Q. Castillo',
    headTitle: 'Municipal Treasurer',
    email: 'mto_taal@yahoo.com',
  },
  {
    key: 'assessor',
    name: "Municipal Assessor's Office",
    short: 'MAO',
    icon: 'Map',
    head: 'Arch. Nelson M. Caibigan',
    headTitle: 'Municipal Assessor',
    email: 'assessortaal@gmail.com',
  },
  {
    key: 'meo',
    name: 'Municipal Engineering Office',
    short: 'MEO',
    icon: 'HardHat',
    head: 'Engr. Rocef Andro E. Mendoza',
    headTitle: 'Municipal Engineer',
    email: 'engrtaal@gmail.com',
  },
  {
    key: 'heritage',
    name: 'Taal Heritage Preservation Council',
    icon: 'Landmark',
    headTitle: 'Council',
  },
  {
    key: 'mho',
    name: 'Municipal Health Office (Rural Health Unit)',
    short: 'MHO',
    icon: 'Stethoscope',
    head: 'Dr. Jay Joseph H. Lascano',
    headTitle: 'Municipal Health Officer',
    email: 'rhu.patienttaal@gmail.com',
    address: 'Barangay Carsuche, Taal, Batangas',
  },
  {
    key: 'mswdo',
    name: 'Municipal Social Welfare and Development Office',
    short: 'MSWDO',
    icon: 'HandHeart',
    head: 'Raquel O. Ojano, RN',
    headTitle: 'Municipal Social Welfare and Development Officer',
  },
  {
    key: 'mpdc',
    name: "Municipal Planning and Development Coordinator's Office",
    short: 'MPDC',
    icon: 'DraftingCompass',
    head: 'Maria Rowena C. Almazan',
    headTitle: 'Municipal Planning and Development Coordinator',
    email: 'mpdctaal@gmail.com',
  },
  {
    key: 'budget',
    name: 'Municipal Budget Office',
    icon: 'Calculator',
    headTitle: 'Municipal Budget Officer',
    email: 'budgetaal@gmail.com',
    note: 'The Charter list puts Atty. Jecah Grace F. Nieva on this row, but names her as BPLO head elsewhere. To be confirmed.',
  },
  {
    key: 'accounting',
    name: 'Municipal Accounting Office',
    icon: 'BookOpenCheck',
    head: 'Angelyn M. Abrajano',
    headTitle: 'Municipal Accountant',
    email: 'anjlgutaal@gmail.com',
    address: 'J. W. Diokno St., Poblacion 7, Taal, Batangas',
  },
  {
    key: 'hr',
    name: 'Municipal Human Resource Management Office',
    short: 'HRMO',
    icon: 'Users',
    head: 'Maria Fatima B. Alcantara',
    headTitle: 'Human Resource Management Officer',
    email: 'hrtaal1572@gmail.com',
  },
  {
    key: 'gso',
    name: 'General Services Office',
    short: 'GSO',
    icon: 'Warehouse',
    head: 'Noribelle R. Gardiola',
    headTitle: 'General Services Officer',
    email: 'gsotaal1963@gmail.com',
  },
  {
    key: 'agriculture',
    name: "Municipal Agriculturist's Office",
    icon: 'Wheat',
    head: 'Maribel S. Bancoro',
    headTitle: 'Municipal Agriculturist',
    email: 'agritaalbatangas@gmail.com',
  },
  {
    key: 'menro',
    name: 'Municipal Environment and Natural Resources Office',
    short: 'MENRO',
    icon: 'Trees',
    head: 'Engr. Mhelda Grace L. Leyma',
    headTitle: 'Municipal Environment and Natural Resources Officer',
  },
  {
    key: 'tourism',
    name: 'Municipal Tourism Office',
    icon: 'Camera',
    head: 'Genciano Felipe M. Noble',
    headTitle: 'Municipal Tourism Officer',
    email: 'tourismtaal1572@gmail.com',
  },
  {
    key: 'peso',
    name: 'Public Employment Service Office',
    short: 'PESO',
    icon: 'BriefcaseBusiness',
    head: 'Regie M. Balasbas',
    headTitle: 'Head of Office',
    email: 'pesotaal@yahoo.com',
  },
  {
    key: 'sb-secretariat',
    name: 'Office of the Sangguniang Bayan',
    icon: 'ScrollText',
    head: 'Severiano C. Alcantara',
    headTitle: 'Head of Office',
    email: 'sangguniangbayanoftaal@yahoo.com',
  },
  {
    key: 'mdrrmo',
    name: 'Municipal Disaster Risk Reduction and Management Office',
    short: 'MDRRMO',
    icon: 'Siren',
    headTitle: 'MDRRM Officer',
    note: "Not listed in the Citizen's Charter.",
  },
];

export const MAYOR_OFFICE_EMAIL = 'municipalityoftaal.mayorbainto@gmail.com';

export function getOffice(
  key: string | undefined
): MunicipalOffice | undefined {
  return OFFICES.find(o => o.key === key);
}
