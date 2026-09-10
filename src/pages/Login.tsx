import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Lock, FlaskConical, Mail, ArrowRight } from 'lucide-react';

import ParticleCanvas from '@/components/ParticleCanvas';

import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    console.log('Login successful:', data);

    // Redirect after successful login
    window.location.href = '/admin';
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-black px-4">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <ParticleCanvas className="absolute inset-0 h-full w-full" />

      <div className="absolute top-1/2 left-1/2 h-80 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/8 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-base-border bg-base-dark/60 backdrop-blur-sm">
            <FlaskConical className="h-7 w-7 text-accent-cyan" />
          </div>

          <span className="mt-3 text-lg font-bold text-white">
            BlackSeaShark5
            <span className="text-accent-cyan">_Labs</span>
          </span>
        </div>

        {/* Card */}
        <div className="glass-card p-8">

          <div className="flex justify-center">
            <span className="pill pill-cyan flex items-center gap-1.5">
              <Lock className="h-3 w-3" />
              Staff access only
            </span>
          </div>

          <h1 className="mt-6 text-center text-2xl font-bold text-white">
            Administrator sign in
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-ink-secondary">
            There is no public sign-up. Administrator accounts are provisioned
            directly by the laboratory.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-ink-muted">
                EMAIL
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@blackseashark5.labs"
                  className="input-dark pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-ink-muted">
                PASSWORD
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-dark"
                required
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            {/* Sign in */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}

              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

          </form>

          <div className="mt-6 border-t border-base-border pt-5 text-center">
            <p className="text-xs leading-relaxed text-ink-muted">
              Visitors can read, search and download everything without an
              account.{' '}

              <Link
                to="/publications"
                className="text-accent-cyan transition-colors hover:text-white"
              >
                Browse research
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}