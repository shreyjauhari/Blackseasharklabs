import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Globe, BookOpen, Cpu, Users, Heart } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

const values = [
  {
    icon: BookOpen,
    title: 'Open Science',
    description: 'Every paper, dataset, model, and chip we produce is released under permissive open licenses. No paywalls, no gated APIs.',
  },
  {
    icon: FlaskConical,
    title: 'Reproducible Results',
    description: 'We publish full training checkpoints, evaluation code, and hardware designs so any researcher can verify and build on our work.',
  },
  {
    icon: Heart,
    title: 'Responsible Release',
    description: 'We evaluate potential impacts before publication and commit to transparency about limitations and risks of our systems.',
  },
  {
    icon: Globe,
    title: 'Global Collaboration',
    description: 'We partner with universities, hospitals, and institutions worldwide to translate open research into real-world outcomes.',
  },
];

const milestones = [
  { year: '2026', event: 'Founded as an independent research laboratory' },
  { year: '2026', event: 'Six divisions established across AI, Quantum, Medical, Neuro/BCI, Robotics, and Chip' },
  { year: '2026', event: 'First open publications released at NEURIPS, Nature, and ICRA' },
  { year: '2026', event: '129 researchers, engineers, and clinicians onboarded' },
];

export default function About() {
  return (
    <div>
      <PageBanner
        microLabel="ABOUT US"
        title={<>An independent laboratory for <span className="gradient-cyan">open science</span></>}
        subtitle="BlackSeaShark5_Labs was founded in 2026 as an independent research laboratory advancing intelligence, science, and human potential through open, reproducible science."
      />

      {/* Mission */}
      <section className="border-b border-base-border py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan/80">OUR MISSION</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Advance the frontiers of science — and make sure everyone can build on the results.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
            We believe scientific progress accelerates when knowledge is shared freely. Our laboratory
            pursues ambitious research across six frontiers — from artificial intelligence and quantum
            computing to medicine, neurotechnology, robotics, and open silicon — and releases everything
            openly: papers, models, datasets, chip designs, and code.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
            We are not a company building products behind closed doors. We are a research institution
            building public goods for the global scientific community.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-base-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-cyan/80">OUR VALUES</p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-base-border bg-base-dark/60">
                  <value.icon className="h-6 w-6 text-accent-cyan" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-base-border py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-cyan/80">TIMELINE</p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our journey so far
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10">
                    <span className="text-xs font-bold text-accent-cyan">{milestone.year.slice(2)}</span>
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="mt-2 h-full w-px flex-1 bg-base-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-medium text-ink-muted">{milestone.year}</p>
                  <p className="mt-1 text-base text-white">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/research" className="btn-primary">
              Explore Research
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/researchers" className="btn-secondary">
              <Users className="h-4 w-4" />
              Meet our researchers
            </Link>
            <Link to="/projects" className="btn-secondary">
              <Cpu className="h-4 w-4" />
              Browse projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
