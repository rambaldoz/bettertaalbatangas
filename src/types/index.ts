export type LanguageType =
  | 'en' // English
  | 'fil'; // Filipino (Tagalog)

export interface NavigationItem {
  label: string; // English
  labelKey?: string; // translation key; `label` is the fallback
  href: string;
  children?: NavigationItem[];
}
