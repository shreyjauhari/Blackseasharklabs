import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2, X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

type Project = {
  id: string;
  name: string;
  division: string;
  status: 'Active' | 'In-review';
  overview: string;
  tags: string[];
  repo: string;
};

const emptyForm = {
  name: '',
  division: '',
  status: 'Active' as Project['status'],
  overview: '',
  tags: '',
  repo: '',
};

export default function ManageProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setItems(data ?? []);
    }

    setLoading(false);
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (item: Project) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      division: item.division,
      status: item.status,
      overview: item.overview,
      tags: item.tags?.join(', ') ?? '',
      repo: item.repo ?? '',
    });

    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      division: form.division,
      status: form.status,
      overview: form.overview,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      repo: form.repo,
    };

    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', editingId);

      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('projects')
        .insert(payload);

      if (error) alert(error.message);
    }

    cancelForm();
    await loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProjects();
  };

  return (
    <div className="min-h-screen bg-base-black text-white">

      <header className="border-b border-base-border bg-base-dark/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            to="/admin"
            className="flex items-center gap-2 text-sm text-ink-secondary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <button
            onClick={startAdd}
            className="btn-primary flex items-center gap-2 px-4 py-2"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-3xl font-bold">Projects</h1>

        <p className="mt-2 text-ink-secondary">
          Manage laboratory research projects.
        </p>

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-base-border bg-base-dark/60 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Project' : 'Add Project'}
              </h2>

              <button type="button" onClick={cancelForm}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                className="input-dark"
                placeholder="Project name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Division e.g. AI"
                value={form.division}
                onChange={(e) =>
                  setForm({ ...form, division: e.target.value })
                }
                required
              />

              <select
                className="input-dark"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Project['status'],
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="In-review">In-review</option>
              </select>

              <input
                className="input-dark"
                placeholder="Repository URL"
                value={form.repo}
                onChange={(e) =>
                  setForm({ ...form, repo: e.target.value })
                }
              />

              <textarea
                className="input-dark min-h-32 md:col-span-2"
                placeholder="Project overview"
                value={form.overview}
                onChange={(e) =>
                  setForm({ ...form, overview: e.target.value })
                }
                required
              />

              <input
                className="input-dark md:col-span-2"
                placeholder="Tags separated by commas"
                value={form.tags}
                onChange={(e) =>
                  setForm({ ...form, tags: e.target.value })
                }
              />

            </div>

            <div className="mt-6 flex gap-3">
              <button type="submit" className="btn-primary px-6 py-3">
                Save Project
              </button>

              <button
                type="button"
                onClick={cancelForm}
                className="rounded-lg border border-base-border px-6 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="mt-10 text-ink-secondary">Loading...</p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">

            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-base-border bg-base-dark/60 p-6"
              >
                <div className="flex justify-between gap-4">

                  <div>
                    <span className="text-xs text-accent-cyan">
                      {item.division}
                    </span>

                    <h2 className="mt-2 text-xl font-bold">
                      {item.name}
                    </h2>
                  </div>

                  <span className="text-xs text-ink-muted">
                    {item.status}
                  </span>

                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                  {item.overview}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="flex items-center gap-2 rounded-lg border border-base-border px-4 py-2 text-sm"
                  >
                    <Edit className="h-4 w-4 text-accent-cyan" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2 rounded-lg border border-base-border px-4 py-2 text-sm"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                    Delete
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}