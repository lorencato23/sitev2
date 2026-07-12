export function HeroGraphic() {
  return (
    <div className="relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-paper-soft p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
        {/* slow-spinning orbital rings */}
        <svg
          viewBox="0 0 400 400"
          className="absolute h-[130%] w-[130%] animate-orbit-spin text-signal"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.75">
            <ellipse cx="200" cy="200" rx="150" ry="150" opacity="0.35" />
            <ellipse cx="200" cy="200" rx="150" ry="55" opacity="0.3" />
            <ellipse cx="200" cy="200" rx="55" ry="150" opacity="0.3" />
            <ellipse cx="200" cy="200" rx="115" ry="115" opacity="0.15" strokeDasharray="1 7" />
          </g>
          <circle cx="350" cy="200" r="3.5" fill="currentColor" />
          <circle cx="200" cy="50" r="2.5" fill="currentColor" opacity="0.7" />
        </svg>

        {/* static neural constellation */}
        <svg viewBox="0 0 400 400" className="absolute h-full w-full text-signal">
          <g stroke="currentColor" strokeWidth="0.75" opacity="0.55">
            <line x1="105" y1="105" x2="165" y2="155" />
            <line x1="165" y1="155" x2="245" y2="125" />
            <line x1="165" y1="155" x2="185" y2="225" />
            <line x1="245" y1="125" x2="305" y2="165" />
            <line x1="185" y1="225" x2="260" y2="250" />
            <line x1="245" y1="125" x2="215" y2="75" />
          </g>
          <g fill="currentColor">
            <circle cx="105" cy="105" r="4" />
            <circle cx="165" cy="155" r="5.5" className="animate-pulse-dot" />
            <circle cx="245" cy="125" r="4" />
            <circle cx="305" cy="165" r="3" className="animate-pulse-dot" style={{ animationDelay: "1.1s" }} />
            <circle cx="185" cy="225" r="4" />
            <circle cx="260" cy="250" r="3.5" className="animate-pulse-dot" style={{ animationDelay: "2s" }} />
            <circle cx="215" cy="75" r="3" />
          </g>
        </svg>
      </div>

      <figure className="relative rounded-2xl border border-line bg-surface/90 p-6 backdrop-blur">
        <blockquote className="font-display text-lg leading-snug text-ink">
          Ciência aplicada à fronteira humana.
        </blockquote>
        <figcaption className="mt-2 text-sm leading-relaxed text-ink-soft">
          Fisiologia espacial, neurociência, cirurgia e educação médica em uma
          presença digital integrada.
        </figcaption>
      </figure>
    </div>
  );
}
