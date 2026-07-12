export const profile = {
  name: "Gabriel Lorencato",
  initials: "GL",
  eyebrow: "Medicina — Neurocirurgia — Medicina Aeroespacial",
  role: "Acadêmico de Medicina",
  institution: "FCMSJC-Humanitas",
  tagline:
    "Da neurointervenção à fisiologia espacial — pesquiso os limites do corpo humano sob estresse extremo.",
  shortBio:
    "Acadêmico de Medicina na FCMSJC-Humanitas, com produção científica em neurocirurgia e neurorradiologia intervencionista e pesquisa em medicina aeroespacial. Primeiro autor em trabalhos sobre embolização pré-operatória, doença cerebrovascular e fisiologia humana em microgravidade, além de atuação em liderança acadêmica e divulgação científica.",
  email: "contato@drlorencato.com",
  instagram: "https://instagram.com/dr.lorencato",
  instagramHandle: "@dr.lorencato",
  linkedin: "https://linkedin.com/in/gabriel-lorencato",
  linkedinHandle: "/in/gabriel-lorencato",
  location: "São José dos Campos, SP",
};

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

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tag: string;
  year: string;
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "embolizacao-arteria-coroideia-anterior",
    title: "Embolização pré-operatória via artéria coroideia anterior",
    summary:
      "Relato de caso e revisão sistemática sobre embolização superseletiva de carcinoma gigante de plexo coroide em lactente.",
    description:
      "Como primeiro autor, descrevi o planejamento e a execução da embolização pré-operatória superseletiva da artéria coroideia anterior em um lactente com carcinoma gigante de plexo coroide, acompanhada de revisão sistemática da literatura. Publicado na revista Neuroradiology (Springer).",
    tag: "Neurorradiologia Intervencionista",
    year: "2025",
    link: "https://doi.org/10.1007/s00234-025-03826-4",
    linkLabel: "Ver na Neuroradiology",
  },
  {
    slug: "fistula-arteriovenosa-couro-cabeludo",
    title: "Tratamento endovascular de fístula AV do couro cabeludo",
    summary:
      "Relato de caso e revisão sistemática sobre o manejo endovascular de fístula arteriovenosa do couro cabeludo.",
    description:
      "Coautoria em relato de caso com revisão sistemática sobre o tratamento endovascular de fístula arteriovenosa do couro cabeludo, aceito no Brazilian Journal of Neurosurgery (JBNC).",
    tag: "Neurocirurgia Endovascular",
    year: "2025",
  },
  {
    slug: "abordagem-robotica-neurocirurgia-pediatrica",
    title: "Abordagem robótica em neurocirurgia pediátrica",
    summary:
      "Correção de malformações arteriovenosas com apoio de robótica em neurocirurgia pediátrica.",
    description:
      "Como primeiro autor, discuti o papel da abordagem robótica na correção de malformações arteriovenosas em neurocirurgia pediátrica. Publicado no Brazilian Journal of Implantology and Health Sciences.",
    tag: "Neurocirurgia",
    year: "2024",
  },
  {
    slug: "alteracoes-nefrologicas-microgravidade",
    title: "Alterações nefrológicas em microgravidade",
    summary:
      "Iniciação científica sobre o impacto do ambiente de microgravidade na função renal e na saúde de astronautas.",
    description:
      "Projeto de iniciação científica investigando as alterações nefrológicas no ambiente de microgravidade e seu impacto na saúde de astronautas em missões de longa duração.",
    tag: "Medicina Aeroespacial",
    year: "2025",
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
  },
  {
    title:
      "Abordagem robótica em neurocirurgia pediátrica para correção de malformações arteriovenosas",
    venue: "Brazilian Journal of Implantology and Health Sciences",
    year: "2024",
    role: "1º autor",
    category: "periodico",
  },
  {
    title: "Hospital admissions for viral encephalitis: a critical analysis",
    venue: "Trabalho publicado em anais de congresso",
    year: "2024",
    role: "Coautor",
    category: "periodico",
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

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "como-a-microgravidade-altera-o-corpo-humano",
    title: "Como a microgravidade altera o corpo humano?",
    excerpt:
      "Principais mudanças fisiológicas que ocorrem durante missões espaciais.",
    tag: "Medicina Aeroespacial",
    date: "2026-05-12",
    readTime: "6 min leitura",
    content: [
      "A ausência de peso altera praticamente todos os sistemas do corpo humano, do cardiovascular ao musculoesquelético. Sem a força da gravidade puxando os fluidos corporais para baixo, o organismo passa por uma redistribuição significativa de líquidos em direção à cabeça, o que explica o inchaço facial característico dos astronautas nos primeiros dias em órbita.",
      "O sistema cardiovascular também se adapta: o coração, que não precisa mais trabalhar contra a gravidade para bombear sangue para as pernas, tende a perder massa e eficiência ao longo de missões prolongadas. Estudos recentes indicam remodelamento estrutural do ventrículo esquerdo em tripulações de longa duração.",
      "Ossos e músculos, por sua vez, sofrem perda acelerada de densidade e massa — um processo comparável, em ritmo, ao envelhecimento fisiológico normal, porém muito mais rápido. Protocolos de exercício resistido a bordo tentam mitigar esse efeito, mas não o eliminam por completo.",
      "Compreender essas alterações é essencial não apenas para a exploração espacial, mas também para a medicina terrestre: muitos dos mecanismos observados em microgravidade têm paralelos com o que ocorre em pacientes acamados por longos períodos.",
    ],
  },
  {
    slug: "trombectomia-mecanica-quando-e-como-realizar",
    title: "Trombectomia mecânica: quando e como realizar",
    excerpt:
      "Indicações, técnica e evidências atuais sobre o tratamento endovascular do AVC isquêmico.",
    tag: "Neurocirurgia",
    date: "2026-05-02",
    readTime: "8 min leitura",
    content: [
      "A trombectomia mecânica se consolidou como o tratamento de escolha para o AVC isquêmico agudo por oclusão de grandes vasos, especialmente após os ensaios clínicos que ampliaram a janela terapêutica para até 24 horas em pacientes selecionados por imagem.",
      "A seleção criteriosa do paciente é o fator mais determinante para o sucesso do procedimento: escala NIHSS, ASPECTS na tomografia e, em casos de janela estendida, a presença de tecido salvável identificado por perfusão são critérios centrais.",
      "Do ponto de vista técnico, a combinação de aspiração direta com stent retriever (técnica combinada) tem mostrado taxas de recanalização superiores às técnicas isoladas, reduzindo o tempo até a reperfusão — variável com forte correlação a desfechos funcionais.",
      "Apesar dos avanços, o maior desafio permanece sendo logístico: garantir que o paciente certo chegue ao centro certo dentro da janela certa, o que reforça a importância de protocolos regionais bem desenhados de atendimento ao AVC.",
    ],
  },
  {
    slug: "o-futuro-da-cirurgia-espacial",
    title: "O futuro da cirurgia espacial",
    excerpt:
      "Desafios, tecnologias e o papel da medicina nas próximas missões interplanetárias.",
    tag: "Divulgação Científica",
    date: "2026-04-25",
    readTime: "7 min leitura",
    content: [
      "Realizar uma cirurgia em microgravidade impõe desafios que vão muito além da técnica cirúrgica em si: sangue e fluidos corporais não se comportam da mesma forma sem gravidade, formando esferas em vez de escorrer, o que exige sistemas de contenção especialmente projetados.",
      "Missões para a Lua e, eventualmente, Marte, vão exigir autonomia médica sem precedentes — sem possibilidade de evacuação rápida para a Terra, tripulações precisarão contar com protocolos robustos de telemedicina, inteligência artificial de apoio à decisão e, possivelmente, robótica cirúrgica remota ou semiautônoma.",
      "Pesquisas atuais em voos parabólicos e em estações análogas na Terra já testam protótipos de instrumentais adaptados, câmaras de contenção de fluidos e fluxos de trabalho cirúrgico pensados especificamente para o ambiente espacial.",
      "O desenvolvimento dessa área não beneficia apenas astronautas: técnicas de cirurgia remota e sistemas de suporte à decisão têm potencial direto de aplicação em regiões remotas e de difícil acesso aqui na Terra.",
    ],
  },
];
