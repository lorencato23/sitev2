import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Tag } from "@/components/tag";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de pesquisa e material técnico em neurocirurgia e medicina aeroespacial.",
};

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow="Trabalhos"
        title="Projetos"
        description="Pesquisa aplicada, revisões e material técnico produzidos na interface entre neurocirurgia, fisiologia espacial e educação médica."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 100} className="flex">
                <article
                  id={project.slug}
                  className="flex w-full scroll-mt-28 flex-col rounded-2xl border border-line bg-surface p-8 transition-colors duration-300 hover:border-signal"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Tag>{project.tag}</Tag>
                    <span className="font-mono text-xs text-muted">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="mb-4 font-display text-2xl leading-snug text-ink">
                    {project.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
