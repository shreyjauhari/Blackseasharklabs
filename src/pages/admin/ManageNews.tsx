import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2, X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

type NewsItem = {
  id: string;
  date: string;
  category: 'Breakthrough' | 'Announcement' | 'Award' | 'Event' | 'Conference';
  headline: string;
  summary: string;
};

const emptyForm = {
  date: '',
  category: 'Announcement' as NewsItem['category'],
  headline: '',
  summary: '',
};

export default function ManageNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
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

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);

    setForm({
      date: item.date,
      category: item.category,
      headline: item.headline,
      summary: item.summary,
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
    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from('news')
        .update(form)
        .eq('id', editingId);

      if (error) {
        alert(error.message);
      }
    } else {
      const { error } = await supabase
        .from('news')
        .insert(form);

      if (error) {
        alert(error.message);
      }
    }

    setSaving(false);
    cancelForm();
    await loadNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this news item?')) {
      return;
    }

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadNews();
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
            Add News
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-3xl font-bold">News</h1>

        <p className="mt-2 text-ink-secondary">
          Create and manage laboratory news.
        </p>

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-base-border bg-base-dark/60 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit News' : 'Add News'}
              </h2>

              <button type="button" onClick={cancelForm}>
                <X className="h-5 w-5 text-ink-secondary hover:text-white" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                className="input-dark"
                placeholder="Date e.g. JUL 28, 2026"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                required
              />

              <select
                className="input-dark"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as NewsItem['category'],
                  })
                }
              >
                <option value="Breakthrough">Breakthrough</option>
                <option value="Announcement">Announcement</option>
                <option value="Award">Award</option>
                <option value="Event">Event</option>
                <option value="Conference">Conference</option>
              </select>

              <input
                className="input-dark md:col-span-2"
                placeholder="Headline"
                value={form.headline}
                onChange={(e) =>
                  setForm({ ...form, headline: e.target.value })
                }
                required
              />

              <textarea
                className="input-dark min-h-32 md:col-span-2"
                placeholder="Summary"
                value={form.summary}
                onChange={(e) =>
                  setForm({ ...form, summary: e.target.value })
                }
                required
              />

            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary px-6 py-3"
              >
                {saving ? 'Saving...' : 'Save News'}
              </button>

              <button
                type="button"
                onClick={cancelForm}
                className="rounded-lg border border-base-border px-6 py-3 text-sm"
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
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div>
                    <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold">
                      {item.headline}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-base-border p-2 hover:border-accent-cyan/50"
                    >
                      <Edit className="h-4 w-4 text-accent-cyan" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-base-border p-2 hover:border-red-500/50"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>

                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="rounded-2xl border border-base-border p-10 text-center text-ink-secondary">
                No news items yet.
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}