export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 divide-y divide-line overflow-hidden rounded-2xl border border-line sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
      {stats.map((stat) => (
        <div key={stat.label} className="px-4 py-8 text-center">
          <strong className="block font-display text-4xl text-signal">
            {stat.value}
          </strong>
          <span className="mt-2 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
