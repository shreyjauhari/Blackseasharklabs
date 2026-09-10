import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { supabase } from '@/lib/supabaseClient';

interface NewsItem {
  id: string;
  date: string;
  category: 'Breakthrough' | 'Announcement' | 'Award' | 'Event' | 'Conference';
  headline: string;
  summary: string;
}

const categories: (NewsItem['category'] | 'All')[] = [
  'All', 'Breakthrough', 'Announcement', 'Award', 'Event', 'Conference',
];

const categoryColors: Record<string, string> = {
  Breakthrough: 'pill-cyan',
  Announcement: 'pill-cyan',
  Award: 'pill-coral',
  Event: 'pill-coral',
  Conference: 'pill-cyan',
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState<NewsItem['category'] | 'All'>('All');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        setError(error.message);
      } else {
        setNewsItems(data as NewsItem[]);
      }
      setLoading(false);
    }

    fetchNews();
  }, []);

  const filtered = activeCategory === 'All'
    ? newsItems
    : newsItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <PageBanner
        microLabel="NEWSROOM"
        title={<>Breakthroughs, awards & <span className="gradient-cyan">announcements</span></>}
        subtitle="The latest from across our six research divisions — breakthroughs, awards, events, and open releases."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pill transition-all ${
                activeCategory === cat
                  ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                  : 'hover:border-base-border-hover hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">Loading news...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Timeline list */}
        {!loading && !error && (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="glass-card group flex cursor-pointer items-center gap-6 p-6"
              >
                {/* Date */}
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-xs font-medium tracking-wider text-ink-muted">{item.date}</p>
                </div>

                {/* Tag */}
                <div className="shrink-0">
                  <span className={`pill ${categoryColors[item.category]}`}>
                    {item.category.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink-muted sm:hidden">{item.date}</p>
                  <h3 className="text-base font-semibold text-white group-hover:text-accent-cyan transition-colors">
                    {item.headline}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-secondary line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0">
                  <ArrowRight className="h-5 w-5 text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent-cyan" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-ink-secondary">No news items in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}