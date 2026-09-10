import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2, X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

type Researcher = {
  id: string;
  initials: string;
  name: string;
  title: string;
  division: string;
  bio: string;
  tags: string[];
};

const emptyForm = {
  initials: '',
  name: '',
  title: '',
  division: '',
  bio: '',
  tags: '',
};

export default function ManageResearchers() {
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [items, setItems] = useState<Researcher[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    setCheckingAuth(false);
    loadResearchers();
  };

  const loadResearchers = async () => {
    const { data, error } = await supabase
      .from('researchers')
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

  const startEdit = (item: Researcher) => {
    setEditingId(item.id);

    setForm({
      initials: item.initials,
      name: item.name,
      title: item.title,
      division: item.division,
      bio: item.bio,
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
      initials: form.initials,
      name: form.name,
      title: form.title,
      division: form.division,
      bio: form.bio,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (editingId) {
      const { error } = await supabase
        .from('researchers')
        .update(payload)
        .eq('id', editingId);

      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('researchers')
        .insert(payload);

      if (error) alert(error.message);
    }

    cancelForm();
    await loadResearchers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this researcher?')) return;

    const { error } = await supabase
      .from('researchers')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadResearchers();
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-black text-white">
        Checking access...
      </div>
    );
  }

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
            Add Researcher
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-3xl font-bold">Researchers</h1>

        <p className="mt-2 text-ink-secondary">
          Manage laboratory researchers and their profiles.
        </p>

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-base-border bg-base-dark/60 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Researcher' : 'Add Researcher'}
              </h2>

              <button type="button" onClick={cancelForm}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                className="input-dark"
                placeholder="Initials e.g. AR"
                value={form.initials}
                onChange={(e) =>
                  setForm({ ...form, initials: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <input
                className="input-dark"
                placeholder="Division"
                value={form.division}
                onChange={(e) =>
                  setForm({ ...form, division: e.target.value })
                }
                required
              />

              <textarea
                className="input-dark min-h-40 md:col-span-2"
                placeholder="Biography"
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
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
                Save Researcher
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
                <div className="flex justify-between gap-5">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-base-border text-sm font-bold text-accent-cyan">
                      {item.initials}
                    </div>

                    <div>
                      <h2 className="font-bold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-accent-cyan">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-ink-muted">
                        {item.division}
                      </p>
                    </div>

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

                <p className="mt-5 text-sm leading-relaxed text-ink-secondary">
                  {item.bio}
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

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}