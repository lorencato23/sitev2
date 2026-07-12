export const profile = {
  name: "Gabriel Lorencato",
  initials: "GL",
  eyebrow: "Medicina — Neurociência — Medicina Aeroespacial",
  role: "Acadêmico de Medicina",
  tagline:
    "Estudo a fronteira entre o cérebro humano, a cirurgia e o espaço — e escrevo sobre o que encontro pelo caminho.",
  shortBio:
    "Acadêmico de Medicina com foco em neurocirurgia, neurociência e medicina aeroespacial. Atuação em pesquisa científica, divulgação médica e desenvolvimento de projetos educacionais voltados à interface entre ciência, tecnologia, espaço e ciências biológicas.",
  email: "contato@drlorencato.com",
  instagram: "https://instagram.com/dr.lorencato",
  instagramHandle: "@dr.lorencato",
  linkedin: "https://linkedin.com/in/gabriel-lorencato",
  linkedinHandle: "/in/gabriel-lorencato",
  location: "Brasil",
};

export type Area = {
  key: string;
  title: string;
  description: string;
  points: string[];
};

export const areas: Area[] = [
  {
    key: "neurocirurgia",
    title: "Neurocirurgia",
    description:
      "Estudo aplicado da anatomia e da fisiopatologia cerebrovascular, com foco em condutas de urgência.",
    points: [
      "Neuroanatomia aplicada",
      "Doenças cerebrovasculares",
      "Trombectomia mecânica",
      "Neurointensivismo",
    ],
  },
  {
    key: "aeroespacial",
    title: "Medicina Aeroespacial",
    description:
      "Fisiologia humana sob condições extremas — da decolagem à microgravidade — e seus limites operacionais.",
    points: [
      "Fisiologia em microgravidade",
      "Medicina operacional",
      "Cirurgia espacial",
      "Exploração e saúde humana",
    ],
  },
  {
    key: "divulgacao",
    title: "Divulgação Científica",
    description:
      "Tradução de ciência complexa em conteúdo acessível, preciso e útil para colegas e para o público geral.",
    points: [
      "Educação médica",
      "Conteúdo científico",
      "Comunicação em saúde",
      "Inspiração e conexão",
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
};

export const projects: Project[] = [
  {
    slug: "alteracoes-cardiovasculares-microgravidade",
    title: "Alterações Cardiovasculares em Microgravidade",
    summary:
      "Revisão fisiológica sobre remodelamento cardíaco, redistribuição de fluidos e adaptação hemodinâmica em voos espaciais.",
    description:
      "Revisão sistemática dos mecanismos de adaptação cardiovascular durante voos espaciais de longa duração, incluindo remodelamento do ventrículo esquerdo, redistribuição cefálica de fluidos e implicações para a saúde de tripulações em missões interplanetárias.",
    tag: "Medicina Aeroespacial",
    year: "2026",
  },
  {
    slug: "disbiose-em-astronautas",
    title: "Disbiose em Astronautas",
    summary:
      "Análise dos impactos imunológicos e microbiológicos durante missões espaciais prolongadas.",
    description:
      "Investigação das alterações no microbioma intestinal de astronautas durante missões prolongadas e sua relação com disfunção imunológica, com discussão de estratégias de mitigação para futuras missões lunares e marcianas.",
    tag: "Medicina Aeroespacial",
    year: "2025",
  },
  {
    slug: "neuroanatomia-para-residentes",
    title: "Neuroanatomia para Residentes",
    summary:
      "Material técnico e prático voltado para residentes de neurocirurgia e estudantes de medicina.",
    description:
      "Material de apoio didático estruturado por vias e abordagens cirúrgicas, pensado para uso rápido durante a formação prática de residentes de neurocirurgia e acadêmicos em estágio na área.",
    tag: "Neurocirurgia",
    year: "2025",
  },
  {
    slug: "trombectomia-mecanica-protocolo",
    title: "Protocolo de Trombectomia Mecânica",
    summary:
      "Fluxo de decisão clínica para tratamento endovascular do AVC isquêmico agudo.",
    description:
      "Proposta de fluxo simplificado de decisão clínica para indicação e execução de trombectomia mecânica no AVC isquêmico agudo, com base em evidências atuais e janelas terapêuticas estendidas.",
    tag: "Neurocirurgia",
    year: "2025",
  },
];

export const publicationStats = [
  { value: "07", label: "Artigos publicados" },
  { value: "12", label: "Trabalhos em congressos" },
  { value: "05", label: "Apresentações orais" },
  { value: "08", label: "Posters apresentados" },
  { value: "03", label: "Projetos de pesquisa" },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  type: string;
};

export const publications: Publication[] = [
  {
    title: "Remodelamento cardíaco em tripulações de longa duração: uma revisão sistemática",
    venue: "Revista Brasileira de Medicina Aeroespacial",
    year: "2026",
    type: "Artigo",
  },
  {
    title: "Disbiose intestinal e resposta imune em ambiente de microgravidade simulada",
    venue: "Congresso Brasileiro de Neurociência",
    year: "2025",
    type: "Trabalho em congresso",
  },
  {
    title: "Trombectomia mecânica em janela estendida: série de casos",
    venue: "Jornada Acadêmica de Neurocirurgia",
    year: "2025",
    type: "Apresentação oral",
  },
  {
    title: "Adaptações neurovestibulares em voo parabólico",
    venue: "Simpósio de Fisiologia Espacial",
    year: "2025",
    type: "Poster",
  },
  {
    title: "Neuroanatomia cirúrgica da fossa posterior: guia prático",
    venue: "Liga Acadêmica de Neurocirurgia",
    year: "2024",
    type: "Projeto de pesquisa",
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

export const timeline = [
  {
    year: "2026",
    title: "Pesquisa em fisiologia aeroespacial",
    place: "Projeto independente",
    description:
      "Desenvolvimento de revisões e materiais sobre adaptação humana à microgravidade e medicina operacional espacial.",
  },
  {
    year: "2025",
    title: "Liga Acadêmica de Neurocirurgia",
    place: "Membro ativo",
    description:
      "Participação em atividades práticas, discussões de caso e produção de material técnico para residentes e acadêmicos.",
  },
  {
    year: "2024",
    title: "Iniciação científica",
    place: "Neurociência clínica",
    description:
      "Início de projetos de pesquisa voltados a doenças cerebrovasculares e neurointensivismo.",
  },
  {
    year: "2022",
    title: "Início da graduação em Medicina",
    place: "Brasil",
    description:
      "Ingresso no curso de Medicina, com envolvimento progressivo em ligas acadêmicas e projetos de divulgação científica.",
  },
];
