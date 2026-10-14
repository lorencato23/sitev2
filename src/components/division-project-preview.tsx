import { Tag } from "./tag";
import type { DivisionProject } from "@/lib/data";

const divisionLabels: Record<DivisionProject["division"], string> = {
  Health: "AZLO Health",
  Labs: "AZLO Labs",
  Education: "AZLO Education",
  Science: "AZLO Science",
};

export function DivisionProjectPreview({ project }: { project: DivisionProject }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Tag>{divisionLabels[project.division]}</Tag>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          {project.status}
        </span>
      </div>
      <h3 className="font-display text-xl leading-snug text-ink">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
      <p className="mt-auto border-t border-line pt-5 text-xs leading-relaxed text-muted">
        {project.note}
      </p>
    </article>
  );
}