// Shared facts about the portal itself, used by the About, FAQ, Contact
// and policy pages.
export const SITE_NAME = 'BetterTaalBatangas.org';
export const REPO_URL = 'https://github.com/rambaldoz/bettertaalbatangas';
// Google Form for reporting errors. Set VITE_REPORT_ISSUE_URL in .env.local;
// until then the Contact page says the form is coming soon.
export const REPORT_FORM_URL = (import.meta.env.VITE_REPORT_ISSUE_URL ||
  '') as string;
// Every "report an issue" link points here.
export const REPORT_PAGE = '/contact#report';
export const BETTERGOV_URL = 'https://bettergov.ph';
// Portal email, if any. Set VITE_CONTACT_EMAIL in .env.local.
export const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL ||
  '') as string;
// Date the policy pages were last reviewed.
export const POLICIES_UPDATED = 'November 10, 2026';
