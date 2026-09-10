import { useEffect, useState } from 'react';
import { ArrowRight, Github, Brain, Atom, HeartPulse, CircuitBoard, Bot, Cpu } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { supabase } from '@/lib/supabaseClient';

interface Project {
  id: string;
  name: string;
  division: string;
  status: 'Active' | 'Completed' | string;
  overview: string;
  tags: string[];
}

const divisionIcons: Record<string, typeof Brain> = {
  'AI': Brain,
  'Quantum': Atom,
  'Medical': HeartPulse,
  'Neuro / BCI': CircuitBoard,
  'Robotics': Bot,
  'Chip': Cpu,
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } else {
        setProjects((data ?? []) as Project[]);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <PageBanner
        microLabel="PROJECTS"
        title={<>Research programmes, <span className="gradient-cyan">shipped in the open</span></>}
        subtitle="Open-source models, datasets, hardware designs, and software frameworks — all released under permissive licenses with full reproducibility."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((project) => {
              const Icon = divisionIcons[project.division] || Brain;
              return (
                <article key={project.id} className="glass-card group flex flex-col overflow-hidden">
                  {/* Image header */}
                  <div className="relative h-44 overflow-hidden border-b border-base-border">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.status === 'Active' ? 'from-accent-cyan/15' : 'from-accent-coral/15'} to-transparent`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-16 w-16 text-ink-muted/30" />
                    </div>
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className={`pill ${project.status === 'Active' ? 'pill-cyan' : 'pill-coral'}`}>
                        {project.status}
                      </span>
                      <span className="pill">{project.division}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                      {project.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                      {project.overview}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span key={tag} className="pill pill-cyan">{tag}</span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-base-border pt-5">
                      <button className="flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-white">
                        Open project
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-white">
                        <Github className="h-4 w-4" />
                        Repository
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}