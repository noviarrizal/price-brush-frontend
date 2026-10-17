import { Link } from "react-router";

// Public-page header (screens.md "Public SEO pages"). Nav links to the other tools are added
// as those pages go live, so the header never links to a 404.

export function LogoTile({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className="shrink-0">
      <rect width="32" height="32" rx="8" fill="var(--pb-brand)" />
      <rect x="3" y="3" width="26" height="26" rx="6" fill="none" stroke="var(--pb-coachline)" strokeWidth="1" />
      <path d="M20.5 10.2a4.2 4.2 0 0 0-7.6 2.4V21" fill="none" stroke="var(--pb-on-brand)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M10 16.3h7.5" stroke="var(--pb-on-brand)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8.6 22.4c3.5-1.1 9.6-1.5 14.8-.4l.2 1.9c-5.1-.7-10.6-.5-15.3.6z" fill="var(--pb-on-brand)" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
        <Link to="/" className="flex min-h-12 items-center gap-2.5 rounded-md" aria-label="PriceBrush home">
          <LogoTile />
          <span className="font-display text-[22px] font-extrabold tracking-[-0.015em] [font-stretch:87.5%]">
            PriceBrush
          </span>
        </Link>
      </div>
    </header>
  );
}
