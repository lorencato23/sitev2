import Link from "next/link";
import { Tag } from "./tag";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos#${project.slug}`}
      className="group flex w-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <Tag>{project.tag}</Tag>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <h3 className="mb-3 font-display text-xl leading-snug text-ink transition-colors group-hover:text-signal">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-soft">{project.summary}</p>
      <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
        Ler mais
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
