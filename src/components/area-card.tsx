import type { Area } from "@/lib/data";

export function AreaCard({ area, index }: { area: Area; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-signal">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-6 font-display text-8xl text-line/60 transition-colors duration-300 group-hover:text-signal-soft"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="relative mb-3 font-display text-lg uppercase tracking-wide text-ink">
        {area.title}
      </h3>
      <p className="relative mb-5 text-sm leading-relaxed text-ink-soft">
        {area.description}
      </p>
      <ul className="relative space-y-2 text-sm text-ink-soft">
        {area.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
