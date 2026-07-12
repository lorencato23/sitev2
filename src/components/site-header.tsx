"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./container";
import { Mark } from "./mark";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-3"
          aria-label="Página inicial"
          onClick={() => setOpen(false)}
        >
          <Mark className="h-9 w-9 shrink-0 text-signal" />
          <span className="hidden truncate font-display text-sm uppercase tracking-[0.28em] text-ink sm:inline">
            {profile.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.14em] text-ink-soft md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-signal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-soft md:hidden"
          aria-expanded={open}
          aria-label="Abrir menu"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.1em] text-ink-soft transition-colors hover:bg-paper-soft hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
