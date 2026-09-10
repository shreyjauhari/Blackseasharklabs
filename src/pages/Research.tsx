import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Atom, HeartPulse, CircuitBoard, Bot, Cpu, Users, type LucideIcon } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { supabase } from '@/lib/supabaseClient';

interface Division {
  id: string;
  name: string;
  short_name: string;
  icon: string;
  subtitle: string;
  description: string;
  tags: string[];
  lead: string;
  members: number;
  link: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Brain, Atom, HeartPulse, CircuitBoard, Bot, Cpu,
};

const divisionGradients = [
  'from-accent-cyan/20 to-transparent',
  'from-accent-coral/15 to-transparent',
  'from-accent-cyan/15 to-transparent',
  'from-accent-coral/20 to-transparent',
  'from-accent-cyan/20 to-transparent',
  'from-accent-coral/15 to-transparent',
];

export default function Research() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDivisions() {
      setLoading(true);
      const { data, error } = await supabase
        .from('divisions')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching divisions:', error);
        setError(error.message);
      } else {
        setDivisions((data ?? []) as Division[]);
      }
      setLoading(false);
    }

    fetchDivisions();
  }, []);

  return (
    <div>
      <PageBanner
        microLabel="RESEARCH DIVISIONS"
        title={<>Six divisions, one <span className="gradient-cyan">scientific agenda</span></>}
        subtitle="From artificial intelligence to open silicon, our six research divisions share a single mission: advance the frontiers of science through open, reproducible research."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">Loading divisions...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {divisions.map((division, idx) => {
              const Icon = iconMap[division.icon] || Brain;
              const gradient = divisionGradients[idx % divisionGradients.length];
              return (
                <div
                  key={division.id}
                  className="glass-card group relative grid overflow-hidden md:grid-cols-[280px_1fr]"
                >
                  {/* Visual thumbnail */}
                  <div className={`relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} md:min-h-full`}>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-dark via-transparent to-transparent" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-base-border bg-base-dark/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-10 w-10 text-accent-cyan" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-white lg:text-2xl">{division.name}</h2>
                        <p className="mt-1 text-sm text-accent-cyan">{division.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-ink-muted">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {division.members} researchers
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                      {division.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {division.tags?.map((tag) => (
                        <span key={tag} className="pill">{tag}</span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-base-border pt-5">
                      <p className="text-xs text-ink-muted">
                        Division lead: <span className="text-ink-secondary">{division.lead}</span>
                      </p>
                      {division.link ? (
                        <a
                          href={division.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-white"
                        >
                          Explore division
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      ) : (
                        <Link to="/researchers" className="flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-white">
                          Explore division
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && divisions.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">No divisions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}