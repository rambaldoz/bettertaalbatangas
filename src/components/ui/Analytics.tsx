import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Google Analytics 4. Set VITE_GOOGLE_ANALYTICS_ID (e.g. "G-XXXXXXXXXX") in
// .env.local and in Vercel. Without it, or in local development, nothing
// loads. The Privacy Policy (portal.privacy in the locale files) describes
// this tracking; keep the two in step.
const GA_ID = (
  import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string | undefined
)?.trim();
// Only the live site reports. Vercel preview deployments are production
// builds too, so check the hostname as well; otherwise previews and the
// screenshot bots that load them show up as visitors.
const LIVE_HOSTS = ['bettertaalbatangas.org', 'www.bettertaalbatangas.org'];
const ENABLED =
  !!GA_ID &&
  /^G-[A-Z0-9]+$/i.test(GA_ID) &&
  import.meta.env.PROD &&
  typeof window !== 'undefined' &&
  LIVE_HOSTS.includes(window.location.hostname);

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

function load(id: string) {
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are sent on each route change below, since this is a
  // single-page app.
  window.gtag('config', id, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/** Sends a GA4 page view on every route change. Renders nothing. */
export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!ENABLED || !GA_ID) return;
    load(GA_ID);
    // Wait a moment so the page has set its own <title> (react-helmet).
    const timer = window.setTimeout(() => {
      window.gtag('event', 'page_view', {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
}
