import type { MetadataRoute } from "next";

const base = "https://drlorencato.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/sobre", "/projetos", "/publicacoes", "/contato"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
