import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
          Erro 404
        </p>
        <h1
          className="mt-4 font-display leading-none tracking-tight text-ink"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          Perdido no <em className="text-signal">espaço.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ink-soft">
          A página que você procura não existe, foi movida ou ainda está em
          órbita. Vamos voltar para um território conhecido?
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-signal"
          >
            Ou explore o blog →
          </Link>
        </div>
      </Container>
    </section>
  );
}
