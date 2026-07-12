import Link from "next/link";
import { Tag } from "./tag";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos#${project.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-signal"
    >
      <div className="mb-6 flex items-center justify-between">
        <Tag>{project.tag}</Tag>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <h3 className="mb-3 font-display text-xl leading-snug text-ink">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-soft">
        {project.summary}
      </p>
      <span className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-signal opacity-0 transition-opacity group-hover:opacity-100">
        Ler mais →
      </span>
    </Link>
  );
}
