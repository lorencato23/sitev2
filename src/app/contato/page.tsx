import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Gabriel Lorencato.",
};

const channels = [
  {
    label: "Instagram",
    value: profile.instagramHandle,
    note: "Divulgação científica e bastidores.",
    href: profile.instagram,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    note: "Trajetória acadêmica e profissional.",
    href: profile.linkedin,
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conectar ciência, tecnologia e"
        titleAccent="propósito."
        description="Entre em contato ou acompanhe meu trabalho nas redes sociais."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {channels.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 100} className="flex">
                <Link
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener" : undefined}
                  className="group flex w-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
                    {channel.label}
                  </p>
                  <p className="mt-3 font-display text-xl text-ink">
                    {channel.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {channel.note}
                  </p>
                  <span className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-signal">
                    Abrir
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
