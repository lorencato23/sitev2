# Identidade visual — drlorencato.com

Referência para manter a consistência ao evoluir o site. Antes de mudar
qualquer cor, tipografia ou movimento, confira este documento.

## Conceito

Portfólio editorial-científico de um acadêmico de Medicina. A estética
combina **rigor de periódico** (tipografia serifada, listas indexadas,
tabelas de dados) com um **motivo orbital** discreto que evoca a
interface entre neurociência e medicina aeroespacial. Nada de fotos de
banco de imagens genéricas; formas geométricas próprias.

Palavras-guia: preciso, editorial, sóbrio, credível.

## Tokens de cor

Fonte única da verdade: `src/app/globals.css` (CSS custom properties).
Nunca usar valores de cor "soltos" no JSX — sempre via tokens Tailwind
(`text-ink`, `bg-surface`, `border-line`, etc.).

| Token            | Claro     | Escuro    | Uso                                    |
| ---------------- | --------- | --------- | -------------------------------------- |
| `paper`          | `#f6f3ea` | `#0c1014` | Fundo da página                        |
| `paper-soft`     | `#efeadd` | `#11161c` | Blocos sutis, rodapé                   |
| `surface`        | `#fdfcf8` | `#151b22` | Cards, botões secundários              |
| `ink`            | `#131619` | `#f2f0e9` | Texto principal / botão primário (bg)  |
| `ink-soft`       | `#3f4750` | `#c3cad3` | Texto de corpo                         |
| `muted`          | `#5b6570` | `#9aa4b1` | Metadados, legendas                    |
| `line`           | `#e0dac9` | `#262e37` | Divisórias                             |
| `line-strong`    | `#c6bda5` | `#38424d` | Bordas de destaque                     |
| `signal`         | `#1c3ecf` | `#8aa5ff` | Acento único (links, ênfase, números)  |
| `signal-soft`    | `#e9edfc` | `#18213a` | Fundo de estado ativo                  |
| `amber`          | `#8a4109` | `#efac6b` | Etiquetas de categoria (uso pontual)   |
| `amber-soft`     | `#f8ecdc` | `#2a1f11` | Fundo das etiquetas                    |

**Regra de ouro:** o azul (`signal`) é o **único** acento. Não introduzir
uma segunda cor de destaque. O laranja (`amber`) existe só para as
etiquetas de categoria e deve permanecer contido.

### Acessibilidade (não regredir)

Todo texto deve passar em contraste WCAG AA (4.5:1 corpo, 3:1 para texto
grande). O projeto é auditado com `axe-core` e está em **0 violações**.
Ao ajustar `muted`, `amber` ou `signal`, rode a auditoria de novo antes
de commitar (ver seção Verificação).

## Tipografia

- **Display / títulos:** Fraunces (serifada, eixos opsz/SOFT/WONK) —
  `font-display`. Nomes, títulos de seção, números grandes. Usa itálico
  no acento (ex.: sobrenome, palavra-chave em azul).
- **Corpo / UI:** IBM Plex Sans — `font-sans`. Parágrafos, navegação,
  botões.
- **Mono:** IBM Plex Mono — `font-mono`. Anos, DOIs, metadados, handles.

Escala fluida de display: `--text-display-xl/lg/md` (clamp). Preferir
esses tokens a tamanhos fixos para títulos.

Rótulos de seção: `uppercase`, `tracking` largo (~0.14–0.28em), `text-xs`.

## Motivo orbital

A marca (`src/components/mark.tsx`) e o `HeroGraphic` usam anéis
elípticos + nós de constelação. Reaproveitados no favicon
(`src/app/icon.svg`) e na imagem OG (`src/app/opengraph-image.tsx`).
Manter traços finos (`stroke-width` ~0.75–2.5) e opacidades baixas.

## Movimento

- Entrada: `animate-fade-up` (hero) e `.reveal` on-scroll (IntersectionObserver).
- Ambiente: anéis do hero giram devagar (`orbit-spin`, 60s); nós pulsam.
- **Todo movimento respeita `prefers-reduced-motion: reduce`** — sem
  exceção. Ao adicionar animação, garantir o fallback estático.
- Transições de UI: 200–300ms, `ease` suave. Hover levanta 1–2px.

## Layout

- Container: `max-w-6xl`, padding lateral `px-6 sm:px-8`
  (`src/components/container.tsx`).
- Seções: `py-16 sm:py-24`, separadas por `border-line`.
- Cabeçalho de seção numerado (`01`, `02`…) via `SectionHeading`.
- Cards: `rounded-2xl border border-line bg-surface`, hover
  `border-signal` + leve elevação.

## Conteúdo — regra inegociável

**Nunca inventar dados.** Publicações, projetos, números, e-mail e
identificadores (Lattes/ORCID/Scholar) só entram no site quando reais e
confirmados. Campos ainda não fornecidos ficam `undefined` em
`profile` (`src/lib/data.ts`) e os blocos que dependem deles **não
renderizam** até serem preenchidos. Copy em primeira pessoa, específica
e sóbria — sem superlativos de marketing.

## Verificação antes de commitar

```bash
npx tsc --noEmit        # tipos
npm run lint            # eslint
npm run build           # build de produção
# + auditoria axe-core e screenshots via Playwright (ver histórico)
```
