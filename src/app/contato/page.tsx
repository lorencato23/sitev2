import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";
import { pageMeta } from "@/lib/metadata";
import { academicLinks, contactIntents, profile } from "@/lib/data";

export const metadata = pageMeta({
  title: "Contato",
  description:
    "Entre em contato para pesquisa, colaboração, convites e divulgação científica.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conectar ciência, tecnologia e"
        titleAccent="propósito."
        description="Escolha o canal certo pela sua intenção — respondo mais rápido quando sei do que se trata."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            {/* Canal direto */}
            <Reveal>
              <div className="rounded-3xl border border-line bg-surface p-8">
                <h2 className="font-display text-2xl text-ink">Fale comigo</h2>

                {profile.email ? (
                  <>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      A forma mais direta é por e-mail. Costumo responder em
                      alguns dias úteis.
                    </p>
                    <p className="mt-6 font-mono text-lg text-ink">
                      {profile.email}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-signal"
                      >
                        Enviar e-mail
                      </Link>
                      <CopyEmail email={profile.email} />
                    </div>
                  </>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    Para pesquisa, convites e colaborações, me chame pelas redes
                    abaixo — respondo por lá e combinamos o melhor canal.
                  </p>
                )}

                <div className="mt-8 border-t border-line pt-6">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                    Perfis e redes
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {academicLinks.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener"
                          className="group flex items-baseline justify-between gap-4 text-sm"
                        >
                          <span className="text-ink-soft transition-colors group-hover:text-signal">
                            {item.label}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {item.handle} ↗
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Orientação por intenção */}
            <Reveal delay={100}>
              <div>
                <h2 className="font-display text-2xl text-ink">
                  Como posso ajudar
                </h2>
                <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
                  {contactIntents.map((intent) => (
                    <li key={intent.title} className="py-5">
                      <h3 className="font-display text-lg text-ink">
                        {intent.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {intent.description}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  {profile.name} — {profile.role}, {profile.institution}.{" "}
                  {profile.location}.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
