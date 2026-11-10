import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon } from 'lucide-react';
import { searchClient, SEARCH_INDEX } from '../lib/meilisearch';
import type { SearchHit } from '../lib/meilisearch';

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // An empty query shows the intro text; nothing to fetch.
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const index = searchClient!.index(SEARCH_INDEX);
        const res = await index.search<SearchHit>(query, { limit: 20 });
        setResults(res.hits);
        setHasSearched(true);
      } catch {
        setError('Search is unavailable. Please try again later.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Results from an earlier query stay in state but are hidden once the box
  // is cleared, so the effect never has to reset them.
  const active = query.trim() !== '';
  const shownError = active ? error : null;
  const shownResults = active ? results : [];
  const searched = active && hasSearched;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search</h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value || null)}
          placeholder="Search services, departments, guides..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          autoFocus
        />
      </div>

      {shownError && (
        <div className="text-center py-12 text-red-500 text-sm">
          {shownError}
        </div>
      )}

      {!shownError && isLoading && (
        <div className="text-center py-12 text-gray-700 text-sm">
          Searching...
        </div>
      )}

      {!shownError && !isLoading && searched && shownResults.length === 0 && (
        <div className="text-center py-12 text-gray-700">
          No results for{' '}
          <span className="font-bold">&ldquo;{query}&rdquo;</span>
        </div>
      )}

      {!shownError && !isLoading && shownResults.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-700 mb-4">
            {shownResults.length} result{shownResults.length !== 1 ? 's' : ''}{' '}
            for &ldquo;
            {query}&rdquo;
          </p>
          {shownResults.map(hit => (
            <Link key={hit.id} to={hit.url} className="block group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      hit.type === 'service'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {hit.category}
                  </span>
                </div>
                <h2 className="text-base font-bold text-gray-900 group-hover:text-primary-700">
                  {hit.title}
                </h2>
                {hit.description && (
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {hit.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {!searched && !isLoading && !shownError && (
        <div className="text-center py-12 text-gray-700 text-sm">
          Start typing to search across services and government information
        </div>
      )}
    </main>
  );
}
