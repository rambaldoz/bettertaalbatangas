import type { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Search from './pages/Search';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import PortalAbout from './pages/portal/About';
import PortalContact from './pages/portal/Contact';
import PortalFaq from './pages/portal/Faq';
import PortalTerms from './pages/portal/Terms';
import PortalPrivacy from './pages/portal/Privacy';
import PortalAccessibility from './pages/portal/Accessibility';
import TaalAbout from './pages/taal/About';
import TaalHistory from './pages/taal/History';
import TaalCulture from './pages/taal/Culture';
import TaalHotlines from './pages/taal/Hotlines';
import TaalHolidays from './pages/taal/Holidays';
import Forex from './pages/taal/Forex';
import Weather from './pages/taal/Weather';
import GovernmentDirectory from './pages/government/GovernmentDirectory';
import { isMeilisearchEnabled } from './lib/meilisearch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router';
import ErrorBoundary from './components/ui/ErrorBoundary';

const PageError = () => (
  <main className="container mx-auto flex-1 px-4 py-24 text-center">
    <h1 className="text-2xl font-bold text-gray-900">
      Something went wrong on this page
    </h1>
    <p className="mt-2 text-gray-700">
      Please reload the page or try again later.
    </p>
  </main>
);

// Resets the boundary when the URL changes, so one broken page
// doesn't stay broken after navigating away.
function PageBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary key={pathname} fallback={<PageError />}>
      {children}
    </ErrorBoundary>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <PageBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/taal" element={<TaalAbout />} />
                <Route path="/taal/about" element={<TaalAbout />} />
                <Route path="/taal/history" element={<TaalHistory />} />
                <Route path="/taal/culture" element={<TaalCulture />} />
                <Route
                  path="/taal/barangays"
                  element={<Navigate to="/government/barangays" replace />}
                />
                <Route path="/taal/hotlines" element={<TaalHotlines />} />
                <Route path="/taal/holidays" element={<TaalHolidays />} />
                <Route path="/forex" element={<Forex />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/about" element={<PortalAbout />} />
                <Route path="/contact" element={<PortalContact />} />
                <Route path="/faq" element={<PortalFaq />} />
                <Route path="/terms" element={<PortalTerms />} />
                <Route path="/privacy" element={<PortalPrivacy />} />
                <Route
                  path="/accessibility"
                  element={<PortalAccessibility />}
                />
                <Route path="/weather" element={<Weather />} />
                <Route path="/services/:category" element={<Services />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/:category/:service"
                  element={<ServiceDetail />}
                />
                {/* Officials directory: branches as subpages */}
                <Route path="/government" element={<GovernmentDirectory />} />
                {['executive', 'legislative', 'offices', 'barangays'].map(
                  branch => (
                    <Route
                      key={branch}
                      path={`/government/${branch}`}
                      element={<GovernmentDirectory />}
                    />
                  )
                )}
                {isMeilisearchEnabled && (
                  <Route path="/search" element={<Search />} />
                )}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageBoundary>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
