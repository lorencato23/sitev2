export function HeroGraphic() {
  return (
    <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-paper-soft p-8">
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full text-signal"
        aria-hidden="true"
      >
        <g opacity="0.5">
          <ellipse cx="200" cy="150" rx="150" ry="150" stroke="currentColor" strokeWidth="0.75" fill="none" />
          <ellipse cx="200" cy="150" rx="150" ry="55" stroke="currentColor" strokeWidth="0.75" fill="none" />
          <ellipse cx="200" cy="150" rx="55" ry="150" stroke="currentColor" strokeWidth="0.75" fill="none" />
        </g>
        <g stroke="currentColor" strokeWidth="0.75" opacity="0.6">
          <line x1="90" y1="90" x2="150" y2="140" />
          <line x1="150" y1="140" x2="230" y2="110" />
          <line x1="150" y1="140" x2="170" y2="210" />
          <line x1="230" y1="110" x2="300" y2="150" />
          <line x1="170" y1="210" x2="250" y2="240" />
          <line x1="230" y1="110" x2="200" y2="60" />
        </g>
        <g fill="currentColor">
          <circle cx="90" cy="90" r="4" />
          <circle cx="150" cy="140" r="5.5" />
          <circle cx="230" cy="110" r="4" />
          <circle cx="300" cy="150" r="3" />
          <circle cx="170" cy="210" r="4" />
          <circle cx="250" cy="240" r="3.5" />
          <circle cx="200" cy="60" r="3" />
        </g>
        <circle cx="200" cy="150" r="150" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      </svg>

      <div className="relative rounded-2xl border border-line bg-surface/90 p-6 backdrop-blur">
        <strong className="mb-2 block font-display text-lg text-ink">
          Ciência aplicada à fronteira humana.
        </strong>
        <p className="text-sm leading-relaxed text-ink-soft">
          Fisiologia espacial, neurociência, cirurgia e educação médica em uma
          presença digital integrada.
        </p>
      </div>
    </div>
  );
}
