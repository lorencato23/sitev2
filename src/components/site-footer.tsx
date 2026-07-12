import Link from "next/link";
import { Container } from "./container";
import { Mark } from "./mark";
import { profile } from "@/lib/data";

const nav = [
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/contato", label: "Contato" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-soft/60">
      <Container className="py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Mark className="h-8 w-8 text-signal" />
              <span className="font-display text-sm uppercase tracking-[0.24em] text-ink">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.eyebrow}. {profile.tagline}
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-soft transition-colors hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <Link href={profile.instagram} target="_blank" rel="noopener" className="text-ink-soft transition-colors hover:text-signal">
              Instagram — {profile.instagramHandle}
            </Link>
            <Link href={profile.linkedin} target="_blank" rel="noopener" className="text-ink-soft transition-colors hover:text-signal">
              LinkedIn — {profile.linkedinHandle}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.12em] text-muted sm:flex-row">
          <p>© 2026 {profile.name}. Todos os direitos reservados.</p>
          <p className="font-mono normal-case">drlorencato.com — v2</p>
        </div>
      </Container>
    </footer>
  );
}
