import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router';
import { Search, X } from 'lucide-react';
import { getAllServicePages, serviceCategories } from '../../data/yamlLoader';
import { TAAL_PAGES } from '../../data/taal';
import { isMeilisearchEnabled } from '../../lib/meilisearch';

interface Entry {
  title: string;
  section: string;
  href: string;
}

// Everything the header search can find without a search server:
// Taal pages, service categories and every service page.
function buildIndex(): Entry[] {
  return [
    ...TAAL_PAGES.map(p => ({ title: p.label, section: 'Taal', href: p.href })),
    ...serviceCategories.categories.map(c => ({
      title: c.category,
      section: 'Services',
      href: `/services/${c.slug}`,
    })),
    ...getAllServicePages().map(p => ({
      title: p.name,
      section: p.categoryName,
      href: p.href,
    })),
  ];
}

// "Search" button for the header. Opens a search panel over the page.
// Uses Meilisearch's results page when it is configured, otherwise
// searches the site's pages in the browser.
export default function SiteSearch({
  label,
  onOpen,
  className,
}: {
  label: string;
  onOpen?: () => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const index = useMemo(() => buildIndex(), []);
  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return index
      .filter(e => {
        const text = `${e.title} ${e.section}`.toLowerCase();
        return words.every(w => text.includes(w));
      })
      .slice(0, 8);
  }, [index, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const target = isMeilisearchEnabled
      ? `/search?q=${encodeURIComponent(q)}`
      : results[0]?.href;
    if (target) {
      close();
      navigate(target);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          onOpen?.();
        }}
        aria-expanded={open}
        className={className}
      >
        <Search className="mr-1.5 h-4 w-4" aria-hidden="true" />
        {label}
      </button>

      {open &&
        createPortal(
          // Rendered on <body> so it still shows when the mobile menu
          // that holds the button closes.
          <div className="fixed inset-0 z-[60] bg-gray-900/40" onClick={close}>
            <div
              className="border-b border-gray-200 bg-white shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="container mx-auto px-4 py-5">
                <form
                  onSubmit={onSubmit}
                  role="search"
                  className="flex items-center gap-3"
                >
                  <label htmlFor="site-search" className="sr-only">
                    Search the site
                  </label>
                  <div className="relative flex-1">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-700"
                      aria-hidden="true"
                    />
                    <input
                      ref={inputRef}
                      id="site-search"
                      type="search"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Search services, permits, hotlines..."
                      autoComplete="off"
                      className="w-full rounded-md border border-gray-300 py-3 pl-11 pr-4 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
                  >
                    <span className="sr-only">Close search</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </form>

                {query.trim() && (
                  <ul className="mt-3 divide-y divide-gray-100">
                    {results.map(r => (
                      <li key={r.href}>
                        <Link
                          to={r.href}
                          className="block rounded-md px-3 py-2.5 hover:bg-primary-50"
                        >
                          <span className="block text-sm font-bold text-gray-900">
                            {r.title}
                          </span>
                          <span className="block text-xs text-gray-700">
                            {r.section}
                          </span>
                        </Link>
                      </li>
                    ))}
                    {results.length === 0 && (
                      <li className="px-3 py-2.5 text-sm text-gray-700">
                        No pages match &ldquo;{query.trim()}&rdquo;.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
