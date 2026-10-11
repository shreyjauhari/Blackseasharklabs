import { Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';

const researchLinks = ['AI', 'Quantum', 'Medical', 'Neuro / BCI', 'Robotics', 'Chip'];
const resourceLinks = [
  { label: 'Publications', to: '/publications' },
  { label: 'Datasets', to: '/datasets' },
  { label: 'Projects', to: '/projects' },
  { label: 'News', to: '/news' },
];
const instituteLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Researchers', to: '/researchers' },
  { label: 'Careers', to: '/about' },
  { label: 'Contact', to: '/about' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-base-border bg-base-black/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-base-border bg-base-dark">
                <FlaskConical className="h-5 w-5 text-accent-cyan" />
              </div>
              <span className="text-sm font-bold text-white">
                BlackSeaShark5<span className="text-accent-cyan">_Labs</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-secondary">
              An independent research laboratory advancing intelligence, science and human potential through open, reproducible science.
            </p>
          </div>

          {/* Research */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-ink-muted">RESEARCH</h4>
            <ul className="space-y-2.5">
              {researchLinks.map((label) => (
                <li key={label}>
                  <Link to="/research" className="text-sm text-ink-secondary transition-colors hover:text-accent-cyan">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-ink-muted">RESOURCES</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-ink-secondary transition-colors hover:text-accent-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institute */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-ink-muted">INSTITUTE</h4>
            <ul className="space-y-2.5">
              {instituteLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-ink-secondary transition-colors hover:text-accent-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-base-border pt-6 sm:flex-row">
          <p className="text-xs text-ink-muted">©2026 BlackSeaShark5_Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-xs text-ink-muted transition-colors hover:text-accent-cyan">Open science</Link>
            <Link to="/about" className="text-xs text-ink-muted transition-colors hover:text-accent-cyan">Reproducible results</Link>
            <Link to="/about" className="text-xs text-ink-muted transition-colors hover:text-accent-cyan">Responsible release</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
