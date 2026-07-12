import Link from "next/link";
import { Container } from "./container";
import { Mark } from "./mark";
import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Mark className="h-7 w-7 text-signal" />
          <span className="font-display text-sm uppercase tracking-[0.24em] text-ink">
            {profile.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em] text-muted">
          <Link href={profile.instagram} target="_blank" rel="noopener" className="hover:text-signal">
            Instagram
          </Link>
          <Link href={profile.linkedin} target="_blank" rel="noopener" className="hover:text-signal">
            LinkedIn
          </Link>
          <Link href={`mailto:${profile.email}`} className="hover:text-signal">
            E-mail
          </Link>
        </div>

        <p className="text-xs uppercase tracking-[0.12em] text-muted">
          © 2026 {profile.name}. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
