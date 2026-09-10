import { useEffect, useState } from 'react';
import PageBanner from '@/components/PageBanner';
import { supabase } from '@/lib/supabaseClient';

interface Researcher {
  id: string;
  initials: string;
  name: string;
  title: string;
  division: string;
  bio: string;
  tags: string[];
}

const avatarColors = [
  'from-accent-cyan/30 to-accent-cyan/5 border-accent-cyan/30',
  'from-accent-coral/30 to-accent-coral/5 border-accent-coral/30',
  'from-accent-cyan/25 to-accent-cyan/5 border-accent-cyan/25',
  'from-accent-coral/25 to-accent-coral/5 border-accent-coral/25',
  'from-accent-cyan/20 to-accent-cyan/5 border-accent-cyan/20',
  'from-accent-coral/20 to-accent-coral/5 border-accent-coral/20',
];

export default function Researchers() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchResearchers() {
      setLoading(true);
      const { data, error } = await supabase
        .from('researchers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching researchers:', error);
        setError(error.message);
      } else {
        setResearchers((data ?? []) as Researcher[]);
      }
      setLoading(false);
    }

    fetchResearchers();
  }, []);

  return (
    <div>
      <PageBanner
        microLabel="OUR PEOPLE"
        title={<>The people behind the <span className="gradient-cyan">research</span></>}
        subtitle="129 researchers, engineers and clinicians working across six divisions."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">Loading researchers...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {researchers.map((researcher, idx) => {
              const colorClass = avatarColors[idx % avatarColors.length];
              return (
                <div key={researcher.id} className="glass-card group p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-gradient-to-br ${colorClass}`}
                    >
                      <span className="text-lg font-bold text-white">{researcher.initials}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{researcher.name}</h3>
                      <p className="text-sm text-accent-cyan">{researcher.title}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                    {researcher.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-base-border pt-4">
                    {researcher.tags?.map((tag) => (
                      <span key={tag} className="pill pill-cyan">{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && researchers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">No researchers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}