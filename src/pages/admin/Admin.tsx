import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Newspaper,
  FolderKanban,
  BookOpen,
  Users,
  LogOut,
  FlaskConical,
  ArrowRight,
  Atom,
} from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

export default function Admin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  const [counts, setCounts] = useState({
    news: 0,
    projects: 0,
    publications: 0,
    researchers: 0,
    divisions: 0,
  });

  useEffect(() => {
    checkUser();
    loadCounts();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    setEmail(user.email ?? '');
    setLoading(false);
  };

  const loadCounts = async () => {
    const [news, projects, publications, researchers, divisions] =
      await Promise.all([
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase
          .from('projects')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('publications')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('researchers')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('divisions')
          .select('*', { count: 'exact', head: true }),
      ]);

    setCounts({
      news: news.count ?? 0,
      projects: projects.count ?? 0,
      publications: publications.count ?? 0,
      researchers: researchers.count ?? 0,
      divisions: divisions.count ?? 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-black text-white">
        Loading admin dashboard...
      </div>
    );
  }

  const sections = [
    {
      name: 'News',
      description: 'Add, edit and remove news articles.',
      count: counts.news,
      icon: Newspaper,
      path: '/admin/news',
    },
    {
      name: 'Projects',
      description: 'Manage research projects and repositories.',
      count: counts.projects,
      icon: FolderKanban,
      path: '/admin/projects',
    },
    {
      name: 'Publications',
      description: 'Manage research papers and publications.',
      count: counts.publications,
      icon: BookOpen,
      path: '/admin/publications',
    },
    {
      name: 'Researchers',
      description: 'Manage laboratory researchers.',
      count: counts.researchers,
      icon: Users,
      path: '/admin/researchers',
    },
    {
      name: 'Divisions',
      description: 'Manage research divisions.',
      count: counts.divisions,
      icon: Atom,
      path: '/admin/divisions',
    },
  ];

  return (
    <div className="min-h-screen bg-base-black text-white">

      {/* Header */}
      <header className="border-b border-base-border bg-base-dark/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-border">
              <FlaskConical className="h-5 w-5 text-accent-cyan" />
            </div>

            <div>
              <div className="font-bold">
                BlackSeaShark5
                <span className="text-accent-cyan">_Labs</span>
              </div>

              <div className="text-xs text-ink-muted">
                Administrator
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-ink-secondary sm:block">
              {email}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-base-border px-4 py-2 text-sm text-ink-secondary transition hover:border-red-500/50 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Administrator Dashboard
          </h1>

          <p className="mt-2 text-ink-secondary">
            Manage the content displayed across BlackSeaShark5 Labs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2">

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.name}
                to={section.path}
                className="group rounded-2xl border border-base-border bg-base-dark/60 p-6 transition hover:border-accent-cyan/50"
              >
                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-base-border">
                    <Icon className="h-6 w-6 text-accent-cyan" />
                  </div>

                  <span className="text-3xl font-bold text-white">
                    {section.count}
                  </span>

                </div>

                <h2 className="mt-6 text-xl font-bold">
                  {section.name}
                </h2>

                <p className="mt-2 text-sm text-ink-secondary">
                  {section.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-accent-cyan">
                  Manage
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}

        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="text-sm text-ink-secondary transition hover:text-accent-cyan"
          >
            ← Return to public website
          </Link>
        </div>

      </main>
    </div>
  );
}