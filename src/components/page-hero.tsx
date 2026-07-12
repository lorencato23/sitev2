import { ReactNode } from "react";
import { Container } from "./container";

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line py-16 sm:py-22">
      <Container>
        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-signal animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1
          className="max-w-3xl font-display leading-[1.02] tracking-tight text-ink animate-fade-up"
          style={{ fontSize: "var(--text-display-lg)", animationDelay: "80ms" }}
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <em className="text-signal">{titleAccent}</em>
            </>
          )}
        </h1>
        {description && (
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
