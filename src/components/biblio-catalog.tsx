"use client";

import { useMemo, useState } from "react";

type LibraryItem = {
  title: string;
  description: string;
  type: string;
  area: string;
  href: string;
  external?: boolean;
  status: string;
};

const items: LibraryItem[] = [
  {
    title: "Handbook Premium",
    description:
      "Biblioteca privada de Handbooks Premium, com catálogo navegável e leitura dos materiais disponíveis na Tailnet.",
    type: "Coleção",
    area: "Medicina",
    href: "https://atlas.tailc69edf.ts.net:8443/",
    external: true,
    status: "Tailnet",
  },
  {
    title: "Saúde Mental",
    description:
      "Materiais do seminário sobre psicoterapias e clínica ampliada, organizados para consulta e apresentação.",
    type: "Coleção",
    area: "Saúde mental",
    href: "/biblio/saude-mental",
    status: "1 material",
  },
];

const filters = ["Todos", "Coleções", "Apresentações", "Guias"];

export function BiblioCatalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return items.filter((item) => {
      const matchesFilter =
        filter === "Todos" ||
        (filter === "Coleções" && item.type === "Coleção") ||
        (filter === "Apresentações" && item.type === "Apresentação") ||
        (filter === "Guias" && item.type === "Guia");
      const matchesQuery =
        !normalizedQuery ||
        `${item.title} ${item.description} ${item.area}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <>
      <div className="mb-8 grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
        <label className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-muted focus-within:border-signal">
          <span aria-hidden="true" className="text-signal">⌕</span>
          <span className="sr-only">Buscar na biblioteca</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar materiais..."
            className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
          />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Filtrar por tipo">
          {filters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={`rounded-full border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                filter === option
                  ? "border-signal bg-signal text-paper"
                  : "border-line-strong text-ink-soft hover:border-signal hover:text-signal"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        {visibleItems.length} {visibleItems.length === 1 ? "item" : "itens"} encontrado{visibleItems.length === 1 ? "" : "s"}
      </p>

      {visibleItems.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {visibleItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="group rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[0_16px_40px_rgba(19,22,25,0.08)]"
            >
              <div className="mb-10 flex items-start justify-between gap-4">
                <span className="rounded-full bg-signal-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">
                  {item.type}
                </span>
                <span className="font-mono text-xs text-muted">{item.status}</span>
              </div>
              <h2 className="font-display text-3xl leading-tight text-ink transition-colors group-hover:text-signal">
                {item.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
                {item.description}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                <span>{item.area}</span>
                <span className="text-signal transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-display text-2xl text-ink">Nada encontrado ainda.</p>
          <p className="mt-2 text-sm text-muted">Tente outro termo ou remova o filtro.</p>
        </div>
      )}
    </>
  );
}
