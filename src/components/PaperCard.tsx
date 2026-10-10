import { useState } from 'react';
import { FileText, ExternalLink, ChevronDown } from 'lucide-react';
import { statusLabels, type PublicationStatus } from '@/lib/divisionSlug';

export interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string | null;
  date: string | null;
  area: string | null;
  abstract: string | null;
  tags: string[] | null;
  status: PublicationStatus | null;
  pdf_url: string | null;
  doi_url: string | null;
}

const isHttp = (url: string | null) => !!url && /^https?:\/\//i.test(url);

export default function PaperCard({ paper }: { paper: Paper }) {
  const [open, setOpen] = useState(false);
  const long = (paper.abstract?.length ?? 0) > 220;
  const abstract =
    paper.abstract && long && !open ? `${paper.abstract.slice(0, 220).trimEnd()}…` : paper.abstract;

  return (
    <article className="glass-card flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        {paper.status && (
          <span className={`pill ${paper.status === 'published' ? 'pill-cyan' : 'pill-coral'}`}>
            {statusLabels[paper.status]}
          </span>
        )}
        {(paper.venue || paper.date) && (
          <span className="text-xs text-ink-muted">
            {[paper.venue, paper.date].filter(Boolean).join(' · ')}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{paper.title}</h3>
      <p className="mt-2 text-xs text-ink-muted">{paper.authors}</p>

      {abstract && (
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{abstract}</p>
      )}
      {long && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-2 flex items-center gap-1 self-start text-xs font-medium text-accent-cyan hover:text-white"
        >
          {open ? 'Show less' : 'Read abstract'}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}

      {paper.tags && paper.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
            <span key={tag} className="pill">{tag}</span>
          ))}
        </div>
      )}

      {(isHttp(paper.pdf_url) || isHttp(paper.doi_url)) && (
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-base-border pt-4">
          {isHttp(paper.pdf_url) && (
            <a
              href={paper.pdf_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:text-white"
            >
              <FileText className="h-4 w-4" />
              Full text (PDF)
            </a>
          )}
          {isHttp(paper.doi_url) && (
            <a
              href={paper.doi_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              DOI / publisher
            </a>
          )}
        </div>
      )}
    </article>
  );
}
