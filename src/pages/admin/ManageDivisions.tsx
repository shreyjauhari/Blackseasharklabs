import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2, X } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';

type Division = {
  id: string;
  name: string;
  short_name: string;
  icon: string;
  subtitle: string;
  description: string;
  tags: string[];
  lead: string;
  members: number;
  member_ids: string[];
  link: string | null;
};

type ResearcherOption = {
  id: string;
  name: string;
};

const iconOptions = ['Brain', 'Atom', 'HeartPulse', 'CircuitBoard', 'Bot', 'Cpu'];

const emptyForm = {
  name: '',
  short_name: '',
  icon: 'Brain',
  subtitle: '',
  description: '',
  tags: '',
  lead: '',
  memberIds: [] as string[],
  link: '',
};

export default function ManageDivisions() {
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [items, setItems] = useState<Division[]>([]);
  const [researcherOptions, setResearcherOptions] = useState<ResearcherOption[]>([]);
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
    loadDivisions();
    loadResearcherOptions();
  };

  const loadDivisions = async () => {
    const { data, error } = await supabase
      .from('divisions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setItems(data ?? []);
    }

    setLoading(false);
  };

  const loadResearcherOptions = async () => {
    const { data, error } = await supabase
      .from('researchers')
      .select('id, name')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error loading researchers:', error);
    } else {
      setResearcherOptions(data ?? []);
    }
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (item: Division) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      short_name: item.short_name,
      icon: item.icon,
      subtitle: item.subtitle,
      description: item.description,
      tags: item.tags?.join(', ') ?? '',
      lead: item.lead,
      memberIds: item.member_ids ?? [],
      link: item.link ?? '',
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
      short_name: form.short_name,
      icon: form.icon,
      subtitle: form.subtitle,
      description: form.description,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      lead: form.lead,
      member_ids: form.memberIds,
      members: form.memberIds.length,
      link: form.link || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('divisions')
        .update(payload)
        .eq('id', editingId);

      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('divisions')
        .insert(payload);

      if (error) alert(error.message);
    }

    cancelForm();
    await loadDivisions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this division?')) return;

    const { error } = await supabase
      .from('divisions')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadDivisions();
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
            Add Division
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-3xl font-bold">Divisions</h1>

        <p className="mt-2 text-ink-secondary">
          Manage research divisions.
        </p>

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-base-border bg-base-dark/60 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Division' : 'Add Division'}
              </h2>

              <button type="button" onClick={cancelForm}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                className="input-dark"
                placeholder="Full name e.g. BlackSeaShark5 AI"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                className="input-dark"
                placeholder="Short name e.g. AI"
                value={form.short_name}
                onChange={(e) => setForm({ ...form, short_name: e.target.value })}
                required
              />

              <select
                className="input-dark"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              >
                {iconOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-base-dark">
                    {opt}
                  </option>
                ))}
              </select>

              <input
                className="input-dark"
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                required
              />

              <textarea
                className="input-dark min-h-32 md:col-span-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />

              <input
                className="input-dark md:col-span-2"
                placeholder="Tags separated by commas"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />

              {/* Division lead dropdown, populated from researchers table */}
              <select
                className="input-dark"
                value={form.lead}
                onChange={(e) => setForm({ ...form, lead: e.target.value })}
                required
              >
                <option value="" className="bg-base-dark">
                  Select division lead
                </option>
                {researcherOptions.map((r) => (
                  <option key={r.id} value={r.name} className="bg-base-dark">
                    {r.name}
                  </option>
                ))}
              </select>

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold tracking-wider text-ink-muted">
                  MEMBERS INVOLVED (hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  multiple
                  className="input-dark h-40"
                  value={form.memberIds}
                  onChange={(e) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (opt) => opt.value
                    );
                    setForm({ ...form, memberIds: selected });
                  }}
                >
                  {researcherOptions.map((r) => (
                    <option key={r.id} value={r.id} className="bg-base-dark">
                      {r.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-ink-muted">
                  {form.memberIds.length} selected
                </p>
              </div>

              {/* External link field */}
              <input
                className="input-dark md:col-span-2"
                type="url"
                placeholder="Division website link (e.g. https://...)"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />

            </div>

            <div className="mt-6 flex gap-3">
              <button type="submit" className="btn-primary px-6 py-3">
                Save Division
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

                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="mt-1 text-sm text-accent-cyan">{item.subtitle}</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      Lead: {item.lead} · {item.members} members
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-accent-cyan hover:underline"
                      >
                        {item.link}
                      </a>
                    )}
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
                  {item.description}
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