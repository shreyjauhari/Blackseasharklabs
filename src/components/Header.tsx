import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, LogIn, FlaskConical } from 'lucide-react';

const navLinks = [
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  { to: '/projects', label: 'Projects' },
  { to: '/news', label: 'News' },
  { to: '/researchers', label: 'Researchers' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/publications?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-border bg-base-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-base-border bg-base-dark group-hover:border-accent-cyan/40 transition-colors">
            <FlaskConical className="h-5 w-5 text-accent-cyan" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-white">
            BlackSeaShark5<span className="text-accent-cyan">_Labs</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: search + login */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research..."
                className="w-44 rounded-full border border-base-border bg-base-dark/60 py-2 pl-9 pr-4 text-sm text-white placeholder:text-ink-muted outline-none transition-all focus:w-56 focus:border-accent-cyan/50 focus:shadow-[0_0_12px_rgba(0,188,255,0.1)]"
              />
            </div>
          </form>
          <Link to="/login" className="btn-primary">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-base-border px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link whitespace-nowrap text-[13px] ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
