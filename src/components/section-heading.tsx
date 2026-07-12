import { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div className="flex items-baseline gap-5">
        {index && (
          <span className="font-mono text-sm text-line-strong" aria-hidden="true">
            {index}
          </span>
        )}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-signal">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{title}</h2>
        </div>
      </div>
      {action}
    </div>
  );
}
