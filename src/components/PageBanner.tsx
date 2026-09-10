interface PageBannerProps {
  microLabel?: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function PageBanner({ microLabel, title, subtitle }: PageBannerProps) {
  return (
    <div className="relative overflow-hidden border-b border-base-border">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-accent-cyan/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {microLabel && (
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent-cyan/80">
            {microLabel}
          </p>
        )}
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-accent-cyan to-accent-coral" />
      </div>
    </div>
  );
}
