import { Reveal } from "./reveal";

export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <ul className="grid grid-cols-2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
      {stats.map((stat, i) => (
        <li key={stat.label}>
          <Reveal delay={i * 90} className="px-4 py-9 text-center">
            <strong className="block font-display text-4xl font-normal text-signal sm:text-5xl">
              {stat.value}
            </strong>
            <span className="mt-3 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
              {stat.label}
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
