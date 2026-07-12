"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./container";
import { Mark } from "./mark";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/contato", label: "Contato" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-line shadow-[0_1px_24px_rgba(0,0,0,0.06)]" : "border-transparent"
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-paper"
      >
        Pular para o conteúdo
      </a>

      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-3"
          aria-label="Página inicial"
          onClick={() => setOpen(false)}
        >
          <Mark className="h-9 w-9 shrink-0 text-signal transition-transform duration-500 group-hover:rotate-[30deg]" />
          <span className="hidden truncate font-display text-sm uppercase tracking-[0.28em] text-ink sm:inline">
            {profile.name}
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.14em] md:flex"
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-signal after:transition-transform after:duration-300 ${
                  active
                    ? "text-signal after:scale-x-100"
                    : "text-ink-soft after:scale-x-0 hover:text-signal hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-signal hover:text-signal md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? "bg-signal-soft text-signal"
                      : "text-ink-soft hover:bg-paper-soft hover:text-signal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
