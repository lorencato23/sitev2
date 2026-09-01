import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { BiblioCatalog } from "@/components/biblio-catalog";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Biblioteca",
  description:
    "Apresentações, guias e materiais de estudo organizados por tema.",
  path: "/biblio",
});

export default function BiblioPage() {
  return (
    <>
      <PageHero
        eyebrow="Biblioteca"
        title="Materiais para consultar"
        description="Uma área em construção para reunir apresentações, guias e outros materiais em um só lugar."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <BiblioCatalog />
        </Container>
      </section>
    </>
  );
}
