import { Link } from 'react-router-dom';
import { ArrowRight, Play, Brain, Atom, HeartPulse, CircuitBoard, Bot, Cpu } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';
import { divisions } from '@/data/divisions';

const divisionIcons = [Brain, Atom, HeartPulse, CircuitBoard, Bot, Cpu];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <ParticleCanvas className="absolute inset-0 h-full w-full" />
        <div className="absolute -top-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-accent-cyan/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-60 w-[500px] rounded-full bg-accent-coral/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-accent-cyan/80 animate-fade-in">
            INDEPENDENT RESEARCH LABORATORY · EST. 2026
          </p>
          <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl animate-fade-in-up">
            Pushing the Frontiers of{' '}
            <span className="gradient-cyan">Intelligence</span>,{' '}
            <span className="text-white">Science</span> &{' '}
            <span className="gradient-coral">Human Potential</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-secondary animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
            We are an independent research laboratory advancing the foundations of machine intelligence,
            quantum science, medicine, neurotechnology, robotics, and open silicon — all published openly,
            all reproducible, all for the public good.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <Link to="/research" className="btn-primary">
              Explore Research
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="btn-secondary">
              <Play className="h-4 w-4" />
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Division preview grid */}
      <section className="relative border-t border-base-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-cyan/80">SIX DIVISIONS</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                One scientific agenda, six frontiers
              </h2>
            </div>
            <Link to="/research" className="text-sm font-medium text-accent-cyan transition-colors hover:text-white">
              View all divisions →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division, idx) => {
              const Icon = divisionIcons[idx];
              return (
                <Link
                  key={division.id}
                  to="/research"
                  className="glass-card group relative overflow-hidden p-6"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-cyan/5 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-base-border bg-base-dark/60">
                    <Icon className="h-6 w-6 text-accent-cyan" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{division.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{division.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary line-clamp-3">
                    {division.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {division.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="pill pill-cyan">{tag}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative border-t border-base-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: '129', label: 'Researchers & engineers' },
              { value: '6', label: 'Research divisions' },
              { value: '84', label: 'Open publications' },
              { value: '12', label: 'Open-source projects' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold gradient-cyan lg:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm text-ink-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-base-border py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Open science, reproducible results, responsible release
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
            Everything we publish — papers, models, datasets, chips, and code — is released openly.
            No paywalls, no gated APIs, no proprietary lock-in. Science moves forward when everyone can build on it.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/publications" className="btn-primary">
              Read Publications
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/projects" className="btn-secondary">
              Browse Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
