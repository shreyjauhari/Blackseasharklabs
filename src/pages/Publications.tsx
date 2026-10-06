import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  FileText,
  Share2,
  Quote,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import PageBanner from '@/components/PageBanner';
import { supabase } from '@/lib/supabase';

type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;

  // Optional fields in case you add them to Supabase later
  abstract?: string | null;
  area?: string | null;
  tags?: string[] | null;
};

const areas = [
  'All research areas',
  'AI',
  'Quantum',
  'Medical',
  'Neuro / BCI',
  'Robotics',
  'Chip',
];

const sortOptions = ['Newest first', 'Oldest first'];
const PER_PAGE = 4;

/*
 * Your current Supabase table has:
 * id, title, authors, venue, date
 *
 * So if "area" does not exist, we infer it from the title.
 * If you later add an "area" column, that value will be used instead.
 */
function getArea(pub: Publication): string {
  if (pub.area) return pub.area;

  const title = pub.title.toLowerCase();

  if (
    title.includes('quantum') ||
    title.includes('graph convolution') ||
    title.includes('qubit')
  ) {
    return 'Quantum';
  }

  if (
    title.includes('pneumonia') ||
    title.includes('medical') ||
    title.includes('chest x-ray') ||
    title.includes('disease')
  ) {
    return 'Medical';
  }

  if (
    title.includes('robot') ||
    title.includes('robotics')
  ) {
    return 'Robotics';
  }

  if (
    title.includes('chip') ||
    title.includes('semiconductor')
  ) {
    return 'Chip';
  }

  if (
    title.includes('neuro') ||
    title.includes('bci') ||
    title.includes('brain')
  ) {
    return 'Neuro / BCI';
  }

  return 'AI';
}

function getTags(pub: Publication): string[] {
  if (pub.tags && pub.tags.length > 0) {
    return pub.tags;
  }

  return [getArea(pub)];
}

function parseDate(date: string): number {
  const timestamp = Date.parse(date);

  if (!Number.isNaN(timestamp)) {
    return timestamp;
  }

  return 0;
}

export default function Publications() {
  const [searchParams] = useSearchParams();

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState(
    searchParams.get('q') || ''
  );

  const [area, setArea] = useState('All research areas');
  const [sort, setSort] = useState('Newest first');
  const [page, setPage] = useState(1);

  /*
   * Fetch publications directly from Supabase
   */
  useEffect(() => {
    async function fetchPublications() {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('publications')
        .select('*');

      if (error) {
        console.error('Supabase publications error:', error);
        setError(error.message);
        setPublications([]);
      } else {
        console.log('Publications loaded from Supabase:', data);
        setPublications(data || []);
      }

      setLoading(false);
    }

    fetchPublications();
  }, []);

  /*
   * Search + area + sorting
   */
  const filtered = useMemo(() => {
    let result = [...publications];

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter((p) => {
        const title = p.title?.toLowerCase() || '';
        const authors = p.authors?.toLowerCase() || '';
        const abstract = p.abstract?.toLowerCase() || '';
        const venue = p.venue?.toLowerCase() || '';

        return (
          title.includes(q) ||
          authors.includes(q) ||
          abstract.includes(q) ||
          venue.includes(q)
        );
      });
    }

    if (area !== 'All research areas') {
      result = result.filter(
        (p) => getArea(p) === area
      );
    }

    result.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      if (sort === 'Newest first') {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return result;
  }, [publications, search, area, sort]);

  const totalPages = Math.ceil(
    filtered.length / PER_PAGE
  );

  const currentItems = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  /*
   * Reset page if filtering leaves us beyond the available pages
   */
  useEffect(() => {
    if (page > Math.max(totalPages, 1)) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <div>
      <PageBanner
        microLabel="PUBLICATIONS"
        title={
          <>
            Research{' '}
            <span className="gradient-cyan">
              published openly
            </span>
          </>
        }
        subtitle="Every paper, every dataset, every model — released under permissive open licenses for the global research community."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Filter bar */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search publications..."
              className="input-dark pl-10"
            />
          </div>

          {/* Area */}
          <select
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setPage(1);
            }}
            className="input-dark sm:w-52"
          >
            {areas.map((a) => (
              <option
                key={a}
                value={a}
                className="bg-base-dark"
              >
                {a}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="input-dark sm:w-44"
          >
            {sortOptions.map((s) => (
              <option
                key={s}
                value={s}
                className="bg-base-dark"
              >
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">
              Loading publications...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-20 text-center">
            <p className="text-red-400">
              Failed to load publications.
            </p>

            <p className="mt-2 text-sm text-ink-muted">
              {error}
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {currentItems.map((pub) => {
                const pubArea = getArea(pub);
                const tags = getTags(pub);

                return (
                  <article
                    key={pub.id}
                    className="glass-card group flex flex-col overflow-hidden"
                  >

                    {/* Thumbnail */}
                    <div className="relative h-40 overflow-hidden border-b border-base-border">

                      <div className="absolute inset-0 grid-bg opacity-30" />

                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          pubArea === 'AI' ||
                          pubArea === 'Medical' ||
                          pubArea === 'Robotics'
                            ? 'from-accent-cyan/15'
                            : 'from-accent-coral/15'
                        } to-transparent`}
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-ink-muted/40" />
                      </div>

                      <div className="absolute bottom-3 left-4">
                        <span className="pill pill-cyan">
                          {pub.venue} · {pub.date}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">

                      <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-accent-cyan">
                        {pub.title}
                      </h3>

                      <p className="mt-2 text-xs text-ink-muted">
                        {pub.authors}
                      </p>

                      {/* Abstract only if available */}
                      {pub.abstract && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                          {pub.abstract}
                        </p>
                      )}

                      {/* If no abstract exists */}
                      {!pub.abstract && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                          Published research in the field of{' '}
                          {pubArea}.
                        </p>
                      )}

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="pill"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-base-border pt-4">

                        <button className="flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-white">
                          View details
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <button className="flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-white">
                          <FileText className="h-3.5 w-3.5" />
                          PDF
                        </button>

                        <button className="flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-white">
                          <Quote className="h-3.5 w-3.5" />
                          Cite
                        </button>

                        <button className="flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-white">
                          <Share2 className="h-3.5 w-3.5" />
                          Share
                        </button>

                      </div>
                    </div>
                  </article>
                );
              })}

            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-ink-secondary">
                  No publications found matching your filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">

                <button
                  onClick={() =>
                    setPage(Math.max(1, page - 1))
                  }
                  disabled={page === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-base-border bg-base-dark/60 text-ink-secondary transition-colors hover:border-accent-cyan/40 hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-10 w-10 rounded-lg border text-sm font-medium transition-colors ${
                      p === page
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                        : 'border-base-border bg-base-dark/60 text-ink-secondary hover:border-accent-cyan/40 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPage(
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={page === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-base-border bg-base-dark/60 text-ink-secondary transition-colors hover:border-accent-cyan/40 hover:text-white disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
