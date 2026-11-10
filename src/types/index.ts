export type LanguageType =
  | 'en' // English
  | 'fil'; // Filipino (Tagalog)

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
