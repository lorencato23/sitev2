import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Gabriel Lorencato.",
};

const channels = [
  {
    label: "E-mail",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Instagram",
    value: profile.instagramHandle,
    href: profile.instagram,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conectar ciência, tecnologia e propósito."
        description="Entre em contato ou acompanhe meu trabalho nas redes sociais."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            {channels.map((channel) => (
              <Link
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener" : undefined}
                className="group rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-signal"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
                  {channel.label}
                </p>
                <p className="mt-3 font-display text-lg text-ink">
                  {channel.value}
                </p>
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-muted group-hover:text-signal">
                  Abrir →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
