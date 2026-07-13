import type { Metadata } from "next";

const siteName = "Gabriel Lorencato";

/**
 * Metadata por rota com canonical e og:url alinhados (F-05).
 *
 * O Next.js substitui o objeto `openGraph` inteiro quando uma página o
 * declara (não faz merge com o do layout), então este helper reemite os
 * campos compartilhados junto do `url`/`title` específicos da rota. O
 * `<title>` continua usando o template do layout ("%s | Gabriel Lorencato").
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: path,
      siteName,
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
