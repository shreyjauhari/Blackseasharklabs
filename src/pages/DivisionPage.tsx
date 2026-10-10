import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Users } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import PaperCard, { type Paper } from '@/components/PaperCard';
import { supabase } from '@/lib/supabaseClient';
import { divisionSlug, statusLabels, type PublicationStatus } from '@/lib/divisionSlug';

interface Division {
  id: string;
  name: string;
  short_name: string;
  subtitle: string;
  description: string;
  tags: string[] | null;
  lead: string;
  members: number;
}

export default function DivisionPage() {
  const { slug = '' } = useParams();
  const [division, setDivision] = useState<Division | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | PublicationStatus>('all');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      const [divRes, pubRes] = await Promise.all([
        supabase.from('divisions').select('*'),
        // Only papers explicitly approved for public release are ever requested.
        supabase.from('publications').select('*').eq('is_public', true),
      ]);
      if (cancelled) return;
      if (divRes.error || pubRes.error) {
        setError((divRes.error ?? pubRes.error)!.message);
      } else {
        const match = ((divRes.data ?? []) as Division[]).find(
          (d) => divisionSlug(d.short_name) === slug
        );
        setDivision(match ?? null);
        setPapers(
          ((pubRes.data ?? []) as Paper[]).filter(
            (p) => p.area && divisionSlug(p.area) === slug
          )
        );
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return papers.filter(
      (p) =>
        (status === 'all' || p.status === status) &&
        (!q || p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q))
    );
  }, [papers, search, status]);

  const back = (
    <Link to="/research" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-white">
      <ArrowLeft className="h-4 w-4" />
      All divisions
    </Link>
  );

  if (loading) {
    return <p className="py-32 text-center text-ink-secondary">Loading division...</p>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-red-400">Failed to load this division.</p>
        <p className="mt-2 text-sm text-ink-muted">{error}</p>
        <div className="mt-6">{back}</div>
      </div>
    );
  }

  if (!division) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-white">Division not found.</p>
        <div className="mt-6">{back}</div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner
        microLabel="RESEARCH DIVISION"
        title={<span className="gradient-cyan">{division.name}</span>}
        subtitle={division.description}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {back}
          <p className="flex items-center gap-4 text-xs text-ink-muted">
            {division.lead && (
              <span>Division lead: <span className="text-ink-secondary">{division.lead}</span></span>
            )}
            {division.members > 0 && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {division.members} researchers
              </span>
            )}
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white">Research papers</h2>

        <div className="mb-8 mt-5 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author..."
              aria-label="Search papers by title or author"
              className="input-dark pl-10"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'all' | PublicationStatus)}
            aria-label="Filter by publication status"
            className="input-dark sm:w-56"
          >
            <option value="all" className="bg-base-dark">All statuses</option>
            {(Object.keys(statusLabels) as PublicationStatus[]).map((s) => (
              <option key={s} value={s} className="bg-base-dark">{statusLabels[s]}</option>
            ))}
          </select>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {visible.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-ink-secondary">
              {papers.length === 0
                ? 'No public papers are available for this division yet.'
                : 'No papers match your search or filter.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
