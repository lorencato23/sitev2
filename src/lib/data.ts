export const profile = {
  name: "Gabriel Lorencato",
  initials: "GL",
  eyebrow: "Medicina — Neurocirurgia — Medicina Aeroespacial",
  role: "Acadêmico de Medicina",
  institution: "FCMSJC-Humanitas",
  tagline:
    "Da neurointervenção à fisiologia espacial — pesquiso os limites do corpo humano sob estresse extremo.",
  // Abertura do hero: curta, específica, prova antes de explicação (F-02).
  heroLead:
    "Pesquiso o que acontece com o corpo humano nos extremos — do interior do crânio à microgravidade.",
  heroSub: "Acadêmico de Medicina na FCMSJC-Humanitas, São José dos Campos.",
  shortBio:
    "Acadêmico de Medicina na FCMSJC-Humanitas, com produção científica em neurocirurgia e neurorradiologia intervencionista e pesquisa em medicina aeroespacial. Primeiro autor em trabalhos sobre embolização pré-operatória, doença cerebrovascular e fisiologia humana em microgravidade, além de atuação em liderança acadêmica e divulgação científica.",
  instagram: "https://instagram.com/dr.lorencato",
  instagramHandle: "@dr.lorencato",
  linkedin: "https://linkedin.com/in/gabriel-lorencato",
  linkedinHandle: "/in/gabriel-lorencato",
  location: "São José dos Campos, SP",
  // Preencher quando disponíveis — os blocos que dependem deles só
  // aparecem no site depois de preenchidos (nunca inventar valores):
  email: "contato@drlorencato.com" as string | undefined,
  // Preencher quando o Gabriel enviar o link — o slot só renderiza com valor:
  lattes: undefined as string | undefined,
  // Verificado via API pública do ORCID: registro de Gabriel Felipe
  // Lorençato lista o artigo da Neuroradiology (Springer) como trabalho.
  orcid: "https://orcid.org/0009-0005-0203-7039" as string | undefined,
  googleScholar: undefined as string | undefined,
  researchGate:
    "https://www.researchgate.net/scientific-contributions/Gabriel-Felipe-Lorencato-2300485870" as
      | string
      | undefined,
};

// Sinais de autoridade exibidos na primeira dobra do hero (F-02).
export const heroSignals: {
  value: string;
  label: string;
  href: string;
  external?: boolean;
}[] = [
  {
    value: "1º autor",
    label: "na Neuroradiology (Springer), 2025",
    href: "https://doi.org/10.1007/s00234-025-03826-4",
    external: true,
  },
  { value: "04", label: "artigos em periódicos", href: "/publicacoes" },
  { value: "08", label: "trabalhos como 1º autor", href: "/publicacoes" },
];

export type Area = {
  key: string;
  title: string;
  description: string;
  points: string[];
};

export const areas: Area[] = [
  {
    key: "neurointervencao",
    title: "Neurocirurgia & Neurointervenção",
    description:
      "Produção científica em neurorradiologia intervencionista e neurocirurgia, com foco em doença cerebrovascular.",
    points: [
      "Embolização pré-operatória de tumores",
      "Tratamento endovascular do AVC isquêmico",
      "Malformações arteriovenosas e fístulas",
      "Cavernomas e neurocirurgia aberta",
    ],
  },
  {
    key: "aeroespacial",
    title: "Medicina Aeroespacial",
    description:
      "Pesquisa sobre a adaptação do corpo humano à microgravidade e à fronteira da exploração espacial.",
    points: [
      "Alterações nefrológicas em microgravidade",
      "Microbioma e saúde de astronautas",
      "Cirurgia em gravidade zero",
      "Fisiologia em missões de longa duração",
    ],
  },
  {
    key: "lideranca",
    title: "Educação & Liderança Acadêmica",
    description:
      "Atuação na representação estudantil, em ligas acadêmicas e na organização de eventos científicos.",
    points: [
      "Presidência do Diretório Acadêmico",
      "Ligas acadêmicas e monitorias",
      "Organização de simpósios",
      "Divulgação científica",
    ],
  },
];

// Mini-case: cinco campos fixos por projeto (F-04).
export type Project = {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  year: string;
  contexto: string;
  contribuicao: string;
  metodo: string;
  resultado: string;
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "embolizacao-arteria-coroideia-anterior",
    title: "Embolização pré-operatória via artéria coroideia anterior",
    summary:
      "Relato de caso e revisão sistemática sobre embolização superseletiva de carcinoma gigante de plexo coroide em lactente.",
    tag: "Neurorradiologia Intervencionista",
    year: "2025",
    contexto:
      "Carcinoma gigante de plexo coroide em um lactente — tumor altamente vascularizado cuja ressecção exige controle prévio do sangramento.",
    contribuicao:
      "Primeiro autor: conduzi a redação do relato e a revisão sistemática da literatura sobre a técnica.",
    metodo:
      "Relato de caso da embolização superseletiva da artéria coroideia anterior somado a revisão sistemática.",
    resultado:
      "Publicado na Neuroradiology (Springer), out/2025 — indexado com DOI e PMID.",
    link: "https://doi.org/10.1007/s00234-025-03826-4",
    linkLabel: "Ver na Neuroradiology",
  },
  {
    slug: "fistula-arteriovenosa-couro-cabeludo",
    title: "Tratamento endovascular de fístula AV do couro cabeludo",
    summary:
      "Relato de caso e revisão sistemática sobre o manejo endovascular de fístula arteriovenosa do couro cabeludo.",
    tag: "Neurocirurgia Endovascular",
    year: "2025",
    contexto:
      "Fístulas arteriovenosas do couro cabeludo são lesões raras, com literatura esparsa sobre a melhor via de tratamento.",
    contribuicao:
      "Coautor: participei da análise do caso e da sistematização da literatura.",
    metodo: "Relato de caso com revisão sistemática da literatura.",
    resultado:
      "Publicado no Brazilian Journal of Neurosurgery (JBNC), 2025.",
    link: "https://www.jbnc.org.br/artigo/endovascular-treatment-of-scalp-arteriovenous-fistula-a-case-report-and-systematic-review-of-the-literature/1740",
    linkLabel: "Ver no JBNC",
  },
  {
    slug: "abordagem-robotica-neurocirurgia-pediatrica",
    title: "Abordagem robótica em neurocirurgia pediátrica",
    summary:
      "Correção de malformações arteriovenosas com apoio de robótica em neurocirurgia pediátrica.",
    tag: "Neurocirurgia",
    year: "2024",
    contexto:
      "A robótica cirúrgica avança rápido, mas seu papel na correção de malformações arteriovenosas pediátricas ainda é pouco consolidado.",
    contribuicao:
      "Primeiro autor: conduzi a análise do tema e a redação do artigo.",
    metodo:
      "Revisão da literatura sobre abordagem robótica aplicada a malformações arteriovenosas em pediatria.",
    resultado:
      "Publicado no Brazilian Journal of Implantology and Health Sciences, dez/2024.",
    link: "https://bjihs.emnuvens.com.br/bjihs/article/view/4723",
    linkLabel: "Ver no BJIHS",
  },
  {
    slug: "alteracoes-nefrologicas-microgravidade",
    title: "Alterações nefrológicas em microgravidade",
    summary:
      "Iniciação científica sobre o impacto do ambiente de microgravidade na função renal e na saúde de astronautas.",
    tag: "Medicina Aeroespacial",
    year: "2025–2026",
    contexto:
      "Missões espaciais de longa duração alteram a fisiologia renal, com implicações diretas para a saúde de astronautas.",
    contribuicao: "Bolsista de iniciação científica responsável pelo projeto.",
    metodo:
      "Investigação das alterações nefrológicas induzidas pelo ambiente de microgravidade e de seu impacto na saúde.",
    resultado:
      "Iniciação científica em andamento (2025–2026), voltada a subsidiar estratégias de proteção renal em voo espacial.",
  },
];

export const publicationStats = [
  { value: "04", label: "Artigos em periódicos" },
  { value: "09", label: "Trabalhos em congressos" },
  { value: "08", label: "Como primeiro autor" },
  { value: "01", label: "Menção honrosa" },
  { value: "05", label: "Bolsas e monitorias" },
];

export type PublicationCategory = "periodico" | "congresso" | "palestra";

export type Publication = {
  title: string;
  venue?: string;
  year: string;
  role?: string;
  category: PublicationCategory;
  link?: string;
  note?: string;
};

export const publications: Publication[] = [
  // Artigos em periódicos
  {
    title:
      "Superselective Anterior Choroidal Artery Preoperative Embolization of a Giant Choroid Plexus Carcinoma in an Infant: Case Report and Systematic Review",
    venue: "Neuroradiology (Springer)",
    year: "2025",
    role: "1º autor",
    category: "periodico",
    link: "https://doi.org/10.1007/s00234-025-03826-4",
    note: "DOI 10.1007/s00234-025-03826-4 · PMID 41143930",
  },
  {
    title:
      "Endovascular Treatment of Scalp Arteriovenous Fistula: A Case Report and Systematic Review of the Literature",
    venue: "Brazilian Journal of Neurosurgery (JBNC)",
    year: "2025",
    role: "Coautor",
    category: "periodico",
    link: "https://www.jbnc.org.br/artigo/endovascular-treatment-of-scalp-arteriovenous-fistula-a-case-report-and-systematic-review-of-the-literature/1740",
  },
  {
    title:
      "Abordagem robótica em neurocirurgia pediátrica para correção de malformações arteriovenosas",
    venue: "Brazilian Journal of Implantology and Health Sciences",
    year: "2024",
    role: "1º autor",
    category: "periodico",
    link: "https://bjihs.emnuvens.com.br/bjihs/article/view/4723",
  },
  {
    title: "Hospital admissions for viral encephalitis: a critical analysis",
    venue: "Trabalho publicado em anais de congresso",
    year: "2024",
    role: "Coautor",
    category: "periodico",
    link: "https://doi.org/10.5327/CBN240884",
    note: "DOI 10.5327/CBN240884",
  },
  // Trabalhos em congressos
  {
    title:
      "Embolização pré-operatória de tumor primário do plexo coroide via artéria coroideia anterior: relato de caso",
    year: "2025",
    role: "1º autor",
    category: "congresso",
  },
  {
    title:
      "Preoperative Embolization of Choroid Plexus Tumors via the Anterior Choroidal Artery: Technical Considerations and Systematic Review",
    venue: "VII Simpósio Internacional de Neurorradiologia (ISN 2025) — pôster",
    year: "2025",
    role: "Coautor",
    category: "congresso",
  },
  {
    title:
      "Revolução no Tratamento do Acidente Vascular Cerebral Isquêmico: Uma Revisão Integrativa",
    venue: "IV Encontro Científico FCMSJC-Humanitas",
    year: "2024",
    role: "1º autor",
    category: "congresso",
  },
  {
    title:
      "A Importância do Uso de Probióticos na Promoção de Saúde dos Astronautas",
    venue: "IV Encontro Científico FCMSJC-Humanitas — Menção Honrosa",
    year: "2024",
    role: "1º autor",
    category: "congresso",
  },
  {
    title: "Abordagem de Cavernomas de Tronco Encefálico",
    venue: "XV NEURÃO",
    year: "2025",
    role: "1º autor",
    category: "congresso",
  },
  {
    title:
      "Complicações da neurocirurgia aberta: prevenção, diagnóstico e tratamento",
    venue: "XV NEURÃO",
    year: "2025",
    role: "1º autor",
    category: "congresso",
  },
  {
    title:
      "Manejo Neurocirúrgico das Malformações Arteriovenosas em Fase Aguda",
    venue: "XV NEURÃO",
    year: "2025",
    role: "1º autor",
    category: "congresso",
  },
  {
    title: "Dissecção Espontânea da Artéria Cerebral Média: Relato de Caso",
    venue: "XV NEURÃO",
    year: "2025",
    role: "1º autor",
    category: "congresso",
  },
  {
    title:
      "Manejo endovascular de lesões em tandem no AVC isquêmico agudo: Ordem e Estratégia",
    venue: "XV NEURÃO",
    year: "2025",
    role: "Coautor",
    category: "congresso",
  },
  // Palestras
  {
    title:
      "Desafios Médicos em Missões Espaciais: Procedimentos Cirúrgicos em Gravidade Zero",
    venue: "IV Encontro Científico FCMSJC-Humanitas — palestrante convidado",
    year: "2024",
    category: "palestra",
  },
];

export type Credential = {
  title: string;
  detail?: string;
  period: string;
};

export const leadership: Credential[] = [
  {
    title: "Presidente — Diretório Acadêmico José Elias Matieli (DAJEM)",
    detail: "FCMSJC-Humanitas",
    period: "2025–2026",
  },
  {
    title: "Representante Discente — Turma 9",
    detail: "FCMSJC-Humanitas",
    period: "2021–2024",
  },
  {
    title: "Diretor de Ensino, Pesquisa e Extensão — LANNCI",
    detail: "FCMSJC-Humanitas",
    period: "2023–2024",
  },
  {
    title: "Ligante — LACliM",
    detail: "FCMSJC-Humanitas",
    period: "2022–2023",
  },
];

export const scholarships: Credential[] = [
  {
    title: "Iniciação Científica — Alterações nefrológicas em microgravidade",
    period: "2025–2026",
  },
  { title: "Monitoria de Neuroanatomia", period: "2025–2027" },
  { title: "Monitoria de Microbiologia", period: "2024" },
  { title: "Programa de Bolsa Mérito — 5º lugar", period: "2024.1" },
  { title: "Programa de Bolsa Mérito — 3º lugar", period: "2023.2" },
];

export const events: Credential[] = [
  { title: "1º Simpósio de AVC", detail: "Organizador", period: "2024" },
  {
    title: "1º Simpósio de Saúde Mental",
    detail: "Organizador",
    period: "2024",
  },
  {
    title: "Semana da Hipertensão Arterial Sistêmica (LACliM)",
    detail: "Organizador",
    period: "2023",
  },
  {
    title: "Corrida Duathlon do Vale (LACliM)",
    detail: "Extensão",
    period: "2023",
  },
];

export const timeline = [
  {
    year: "2025",
    title: "Publicação internacional e presidência do DAJEM",
    place: "FCMSJC-Humanitas",
    description:
      "Primeiro autor em artigo na Neuroradiology (Springer) sobre embolização pré-operatória; eleito presidente do Diretório Acadêmico; início da iniciação científica em medicina aeroespacial.",
  },
  {
    year: "2024",
    title: "Primeiras publicações e reconhecimento",
    place: "FCMSJC-Humanitas",
    description:
      "Publicações em neurocirurgia; menção honrosa e palestra sobre cirurgia espacial no IV Encontro Científico; organização dos 1º Simpósios de AVC e de Saúde Mental.",
  },
  {
    year: "2023",
    title: "Ligas acadêmicas e monitorias",
    place: "FCMSJC-Humanitas",
    description:
      "Direção de Ensino, Pesquisa e Extensão na LANNCI, primeiras bolsas de mérito e organização da Semana de Hipertensão Arterial Sistêmica.",
  },
  {
    year: "2022",
    title: "Envolvimento acadêmico",
    place: "FCMSJC-Humanitas",
    description:
      "Ingresso em ligas acadêmicas, com foco inicial em clínica médica na LACliM.",
  },
  {
    year: "2021",
    title: "Início da graduação em Medicina",
    place: "FCMSJC-Humanitas",
    description:
      "Ingresso no curso de Medicina e primeira representação discente da turma.",
  },
];

// Orientação de contato por intenção (F-01).
export const contactIntents = [
  {
    title: "Pesquisa e colaboração",
    description:
      "Coautoria, projetos e trocas com pesquisadores e orientadores em neurociência e medicina aeroespacial.",
  },
  {
    title: "Convites e palestras",
    description:
      "Ligas acadêmicas, simpósios e eventos científicos que queiram me convidar para falar.",
  },
  {
    title: "Divulgação e imprensa",
    description:
      "Conteúdo, entrevistas e parcerias de comunicação em ciência e saúde.",
  },
];

// Perfis acadêmicos/profissionais. Só entram no site os que estiverem
// preenchidos em `profile` — nunca inventar um identificador (F-06).
export type AcademicLink = { label: string; href: string; handle: string };

export const academicLinks: AcademicLink[] = [
  profile.lattes && {
    label: "Currículo Lattes",
    href: profile.lattes,
    handle: "CNPq",
  },
  profile.orcid && {
    label: "ORCID",
    href: profile.orcid,
    handle: profile.orcid.replace(/^https?:\/\/orcid\.org\//, ""),
  },
  profile.googleScholar && {
    label: "Google Scholar",
    href: profile.googleScholar,
    handle: "Perfil",
  },
  profile.researchGate && {
    label: "ResearchGate",
    href: profile.researchGate,
    handle: "Perfil",
  },
  { label: "LinkedIn", href: profile.linkedin, handle: profile.linkedinHandle },
  {
    label: "Instagram",
    href: profile.instagram,
    handle: profile.instagramHandle,
  },
].filter(Boolean) as AcademicLink[];

// Blog removido por enquanto — os textos anteriores eram apenas exemplos.
// Para reativar, recrie o tipo Post, a lista de posts e as rotas /blog.
