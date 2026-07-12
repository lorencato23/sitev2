export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong/60 bg-amber-soft px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-amber">
      {children}
    </span>
  );
}
