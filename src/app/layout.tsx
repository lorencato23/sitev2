import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/lib/data";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Acadêmico de Medicina com foco em neurocirurgia, neurociência e medicina aeroespacial. Pesquisa científica, divulgação médica e projetos na interface entre ciência, tecnologia e espaço.";

export const metadata: Metadata = {
  metadataBase: new URL("https://drlorencato.com"),
  title: {
    default: "Gabriel Lorencato | Medicina, Neurociência e Medicina Aeroespacial",
    template: "%s | Gabriel Lorencato",
  },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://drlorencato.com",
    siteName: "Gabriel Lorencato",
    title: "Gabriel Lorencato | Medicina, Neurociência e Medicina Aeroespacial",
    description,
  },
  twitter: {
    card: "summary",
    title: "Gabriel Lorencato",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: "https://drlorencato.com",
  email: profile.email,
  jobTitle: profile.role,
  knowsAbout: [
    "Neurocirurgia",
    "Neurociência",
    "Medicina Aeroespacial",
    "Divulgação Científica",
  ],
  sameAs: [profile.instagram, profile.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
