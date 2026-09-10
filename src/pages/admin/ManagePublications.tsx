import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2, X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  area: string;
  abstract: string;
  tags: string[];
};

const emptyForm = {
  title: '',
  authors: '',
  venue: '',
  date: '',
  area: '',
  abstract: '',
  tags: '',
};

export default function ManagePublications() {
  const [items, setItems] = useState<Publication[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    const { data, error } = await supabase
      .from('publications')
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

  const startEdit = (item: Publication) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      authors: item.authors,
      venue: item.venue,
      date: item.date,
      area: item.area,
      abstract: item.abstract,
      tags: item.tags?.join(', ') ?? '',
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
      title: form.title,
      authors: form.authors,
      venue: form.venue,
      date: form.date,
      area: form.area,
      abstract: form.abstract,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (editingId) {
      const { error } = await supabase
        .from('publications')
        .update(payload)
        .eq('id', editingId);

      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('publications')
        .insert(payload);

      if (error) alert(error.message);
    }

    cancelForm();
    await loadPublications();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this publication?')) return;

    const { error } = await supabase
      .from('publications')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadPublications();
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
            Add Publication
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-3xl font-bold">Publications</h1>

        <p className="mt-2 text-ink-secondary">
          Manage research publications.
        </p>

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-base-border bg-base-dark/60 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Publication' : 'Add Publication'}
              </h2>

              <button type="button" onClick={cancelForm}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                className="input-dark md:col-span-2"
                placeholder="Publication title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <input
                className="input-dark md:col-span-2"
                placeholder="Authors"
                value={form.authors}
                onChange={(e) =>
                  setForm({ ...form, authors: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Venue e.g. NATURE PHYSICS"
                value={form.venue}
                onChange={(e) =>
                  setForm({ ...form, venue: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Date e.g. JUL 28, 2026"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Research area e.g. AI"
                value={form.area}
                onChange={(e) =>
                  setForm({ ...form, area: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Tags separated by commas"
                value={form.tags}
                onChange={(e) =>
                  setForm({ ...form, tags: e.target.value })
                }
              />

              <textarea
                className="input-dark min-h-40 md:col-span-2"
                placeholder="Abstract"
                value={form.abstract}
                onChange={(e) =>
                  setForm({ ...form, abstract: e.target.value })
                }
                required
              />

            </div>

            <div className="mt-6 flex gap-3">
              <button type="submit" className="btn-primary px-6 py-3">
                Save Publication
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
          <div className="mt-8 space-y-4">

            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-base-border bg-base-dark/60 p-6"
              >
                <div className="flex justify-between gap-5">

                  <div>
                    <span className="text-xs text-accent-cyan">
                      {item.area}
                    </span>

                    <h2 className="mt-2 text-lg font-bold">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm text-ink-secondary">
                      {item.authors}
                    </p>

                    <p className="mt-1 text-xs text-ink-muted">
                      {item.venue} • {item.date}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-base-border p-2"
                    >
                      <Edit className="h-4 w-4 text-accent-cyan" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-base-border p-2"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                  {item.abstract}
                </p>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}