import { ReactNode } from "react";
import { Container } from "./container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-signal">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
