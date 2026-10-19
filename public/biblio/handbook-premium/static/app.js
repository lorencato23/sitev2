/* hp-library-dist — frontend.
 *
 * O catálogo (114 linhas, ~24 KB) é carregado uma vez no boot e toda a busca e
 * filtragem acontecem no cliente. A biblioteca é pública: os cards mostram só o
 * que interessa ao leitor (tema, eixos, se já dá para ler). Prioridade, onda e
 * status editorial ficam no catalog.json para uso interno, fora da interface.
 */
"use strict";

const FACETS = [
  { key: "group", col: "group", mount: "#f-group", dot: true },
];

/* Cores por macroárea, na paleta dos próprios HPs. */
const AREA = {
  "Cardiovascular": "#a31b35", "Respiratório": "#1d4570", "Neurologia": "#5e2f78",
  "Gastro/Hepato": "#a8481a", "Endocrinologia": "#7a6014", "Nefro/Uro": "#0b5d4e",
  "Infecto/Imuno": "#3e6a2e", "Hemato/Onco": "#a31b25", "Reumato/Orto/Derm": "#5a4070",
  "Gineco/Obst": "#b4426e", "Pediatria": "#0d6373", "Cirurgia/Trauma": "#6a3a1a",
  "Psiquiatria/Geriatria": "#1d4ea3", "Oftalmo/ENT": "#545b69",
};
const areaColor = (g) => AREA[g] || "#545b69";

/* Um ícone por HP: uma pista visual rápida do tema, não um símbolo clínico. */
const ICON = {
  CV01: "📈", CV02: "🔋", CV03: "❤️‍🩹", CV04: "💔", CV05: "🩺", CV06: "🧈", CV07: "🚪", CV08: "🦵",
  RP01: "🌬️", RP02: "🫁", RP03: "🦠", RP04: "🫧", RP05: "🚬",
  GH01: "🍽️", GH02: "🌶️", GH03: "🚽", GH04: "🌾", GH05: "🌋", GH06: "🪢", GH07: "🧪", GH08: "🪨", GH09: "🟡", GH10: "🍺",
  EN01: "🍬", EN02: "🦶", EN03: "🧣", EN04: "🔺", EN05: "🎛️", EN06: "🦴", EN07: "⚖️",
  NU01: "🫘", NU02: "🍇", NU03: "🔁", NU04: "🧂", NU05: "💎", NU06: "♂️",
  HO01: "🩸", HO02: "🌙", HO03: "🩹", HO04: "🧫", HO05: "🔬", HO06: "⚠️",
  II01: "🎗️", II02: "🫀", II03: "🚨", II04: "🧠", II05: "🪱", II06: "🐀", II07: "🦟", II08: "🐝", II09: "🛡️",
  NE01: "🤕", NE02: "⚡", NE03: "⏱️", NE04: "🧩", NE05: "🔌", NE06: "🚶", NE07: "🧍", NE08: "💪",
  RD01: "🖐️", RD02: "🦋", RD03: "🌳", RD04: "🍖", RD05: "🩼", RD06: "🛹", RD07: "🍄", RD08: "🧴", RD09: "☀️",
  CT01: "🚑", CT02: "🏍️", CT03: "⛑️", CT04: "🔥", CT05: "🎈", CT06: "📋", CT07: "✂️", CT08: "🏥", CT09: "💧", CT10: "☠️",
  GO01: "📅", GO02: "💊", GO03: "🌺", GO04: "🌱", GO05: "🌡️", GO06: "🎀", GO07: "🥚", GO08: "🔎", GO09: "🚺",
  GO10: "🤰", GO11: "👶", GO12: "🚩", GO13: "👯", GO14: "💓",
  PD01: "🐣", PD02: "💡", PD03: "🍼", PD04: "📏", PD05: "💉", PD06: "🥤", PD07: "🤧", PD08: "🧷", PD09: "🧬",
  PC01: "💭", PC02: "🌧️", PC03: "🌀", PC04: "🎒", PC05: "🪞", PC06: "🆘", PC07: "🧓", PC08: "🕊️",
  OE01: "👓", OE02: "👁️", OE03: "👂", OE04: "👃", OE05: "🗣️",
};
const icon = (it) => ICON[it.id] || "📘";

const SEARCH_COLS = ["id", "title", "group", "main_axes"];

const state = {
  all: [],
  results: [],
  q: "",
  onlyLive: false,
  filters: Object.fromEntries(FACETS.map((f) => [f.key, new Set()])),
  openHp: null,
  reading: null,
  lastFocus: null,
};

const $ = (sel) => document.querySelector(sel);
const el = {
  q: $("#q"), cards: $("#cards"), count: $("#count"), empty: $("#empty"),
  banner: $("#banner"), live: $("#only-live"),
  detail: $("#detail"), detailBody: $("#detail-body"),
  reader: $("#reader"), frame: $("#reader-frame"), readerTitle: $("#reader-title"),
  readerId: $("#reader-hpid"), readerPos: $("#reader-pos"), readerTab: $("#reader-tab"),
  readerPrev: $("#reader-prev"), readerNext: $("#reader-next"),
};

/* ---------- utilidades ---------- */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} em ${url}`);
  return r.json();
}

function showBanner(msg) {
  el.banner.textContent = msg;
  el.banner.classList.remove("hidden");
}

function clearBanner() {
  el.banner.classList.add("hidden");
}

/* Busca sem acento: "sindrome" acha "Síndrome". */
const fold = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* ---------- filtragem ---------- */
function matchesSearch(it) {
  if (!state.q) return true;
  return it._hay.includes(fold(state.q));
}

/** `exceptKey` fica de fora para contar facetas do jeito certo. */
function matchesFilters(it, exceptKey) {
  if (state.onlyLive && !it.has_content) return false;
  return FACETS.every((f) => {
    if (f.key === exceptKey) return true;
    const set = state.filters[f.key];
    return !set.size || set.has(it[f.col]);
  });
}

/* Ordem do próprio catálogo: macroáreas na sequência curricular, HPs por ID. */
function compute() {
  state.results = state.all
    .filter((it) => matchesSearch(it) && matchesFilters(it))
    .sort((a, b) => a._order - b._order);
}

/* ---------- chips ---------- */
function buildChips() {
  for (const f of FACETS) {
    // Universo completo e na ordem do catálogo: uma chip nunca some, senão um
    // filtro ativo fica invisível e o usuário vê "0 de N" sem como desmarcá-lo.
    const values = [...new Set(state.all.map((it) => it[f.col]).filter(Boolean))];
    const mount = $(f.mount);
    mount.innerHTML = "";
    for (const val of values) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.dataset.key = f.key;
      btn.dataset.val = val;
      btn.setAttribute("aria-pressed", "false");
      const dot = f.dot ? `<span class="dot" style="--acc:${areaColor(val)}"></span>` : "";
      btn.innerHTML = `${dot}${esc(val)}<span class="n"></span>`;
      btn.addEventListener("click", () => toggleFilter(f.key, val));
      mount.appendChild(btn);
    }
  }
}

function syncChips() {
  for (const f of FACETS) {
    const pool = state.all.filter((it) => matchesSearch(it) && matchesFilters(it, f.key));
    const counts = new Map();
    for (const it of pool) {
      const v = it[f.col];
      if (v) counts.set(v, (counts.get(v) || 0) + 1);
    }
    for (const btn of $(f.mount).querySelectorAll(".chip")) {
      const n = counts.get(btn.dataset.val) || 0;
      const on = state.filters[f.key].has(btn.dataset.val);
      btn.querySelector(".n").textContent = n;
      btn.classList.toggle("on", on);
      btn.classList.toggle("zero", n === 0 && !on);
      btn.setAttribute("aria-pressed", String(on));
    }
  }
  el.live.setAttribute("aria-pressed", String(state.onlyLive));
  el.live.classList.toggle("on", state.onlyLive);
}

function toggleFilter(key, val) {
  const set = state.filters[key];
  if (set.has(val)) set.delete(val);
  else set.add(val);
  apply();
}

el.live.addEventListener("click", () => {
  state.onlyLive = !state.onlyLive;
  apply();
});

/* ---------- cards ---------- */
function card(it) {
  const div = document.createElement("article");
  div.className = "card" + (it.has_content ? " live" : "");
  div.style.setProperty("--acc", areaColor(it.group));
  div.tabIndex = 0;
  div.setAttribute("role", "button");
  div.setAttribute("aria-label", `${it.id}: ${it.title}${it.has_content ? " (disponível para leitura)" : " (em breve)"}`);
  div.dataset.id = it.id;
  div.innerHTML = `
    <div class="card-icon" aria-hidden="true">${icon(it)}</div>
    <div class="card-text">
      <span class="hpid">${esc(it.id)}</span>
      <h3>${esc(it.title)}</h3>
      <p class="axes">${esc(it.main_axes)}</p>
    </div>
    ${it.has_content ? '<span class="read">Ler →</span>' : '<span class="soon">em breve</span>'}`;
  const open = () => (it.has_content ? openReader(it.id) : openDetail(it.id));
  div.addEventListener("click", open);
  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
  return div;
}

function renderCards() {
  // Map preserva a ordem de inserção; como os resultados já vêm na ordem do
  // catálogo, as macroáreas saem na sequência curricular (CV, RP, GH, …).
  const groups = new Map();
  for (const it of state.results) {
    if (!groups.has(it.group)) groups.set(it.group, []);
    groups.get(it.group).push(it);
  }
  const frag = document.createDocumentFragment();
  for (const [g, list] of groups) {
    const sec = document.createElement("section");
    sec.className = "group";
    sec.style.setProperty("--acc", areaColor(g));
    const live = list.filter((i) => i.has_content).length;
    sec.innerHTML = `<div class="group-head"><h2>${esc(g)}</h2><span class="gcount">${list.length} HP${list.length > 1 ? "s" : ""}${live ? ` · ${live} para ler` : ""}</span></div>`;
    const grid = document.createElement("div");
    grid.className = "cards";
    list.forEach((it) => grid.appendChild(card(it)));
    sec.appendChild(grid);
    frag.appendChild(sec);
  }
  el.cards.replaceChildren(frag);
  const filtered = state.results.length !== state.all.length;
  el.count.textContent = filtered
    ? `${state.results.length} de ${state.all.length} handbooks com a busca e os filtros atuais`
    : `${state.all.length} handbooks em ${new Set(state.all.map((i) => i.group)).size} macroáreas`;
  el.empty.classList.toggle("hidden", state.results.length > 0);
}

function renderStatic() {
  const live = state.all.filter((i) => i.has_content);
  const areas = new Set(state.all.map((i) => i.group)).size;
  $("#stats").innerHTML = [
    [live.length, "para ler", "live"], [state.all.length, "no catálogo", ""], [areas, "macroáreas", ""],
  ].map(([n, l, c]) => `<div class="stat ${c}"><b>${n}</b><span>${l}</span></div>`).join("");
  $("#only-live-n").textContent = live.length;

  const grid = $("#pocket-grid");
  grid.replaceChildren(...live.map((it) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pocket-card";
    b.style.setProperty("--pacc", areaColor(it.group) === "#545b69" ? "#d4b94a" : lighten(areaColor(it.group)));
    b.innerHTML = `<span class="pc-icon" aria-hidden="true">${icon(it)}</span>
      <span class="pc-trig">${esc(it.id)} · ${esc(it.group)}</span>
      <span class="pc-title">${esc(it.title)}</span>
      <span class="pc-act">${esc(it.main_axes)}</span>
      <span class="pc-go">ler agora →</span>`;
    b.addEventListener("click", () => openReader(it.id));
    return b;
  }));
  $("#pocket").classList.toggle("hidden", live.length === 0);
}

/* As cores de área são escuras (feitas para fundo claro); no pocket escuro, clareia. */
function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(c + (255 - c) * 0.55);
  return `rgb(${mix(n >> 16)},${mix((n >> 8) & 255)},${mix(n & 255)})`;
}

/* ---------- detalhe (só para HPs ainda não publicados) ---------- */
async function openDetail(id, { push = true } = {}) {
  const hp = state.all.find((r) => r.id === id);
  if (!hp) return;
  if (hp.has_content) return openReader(id, { push });
  state.lastFocus = document.activeElement;
  state.openHp = id;

  el.detailBody.innerHTML = `
    <div class="m-head" style="--acc:${areaColor(hp.group)}">
      <div class="m-icon" aria-hidden="true">${icon(hp)}</div>
      <div class="m-eyebrow"><span class="hpid">${esc(hp.id)}</span> ${esc(hp.group)}</div>
      <h2 id="detail-title">${esc(hp.title)}</h2>
    </div>
    <div class="m-body">
      <dl class="kv">
        <dt>O que vai cobrir</dt><dd>${esc(hp.main_axes)}</dd>
      </dl>
      <div class="actions"><span class="btn disabled" role="note">Em breve</span></div>
      <p class="notice"><b>Em produção</b>Este handbook ainda está sendo escrito. Ele aparece aqui para leitura assim que ficar pronto.</p>
    </div>`;

  el.detail.classList.remove("hidden");
  $("#detail-close").focus();
  writeURL(push);
}

function closeDetail({ push = true } = {}) {
  if (!state.openHp) return;
  state.openHp = null;
  el.detail.classList.add("hidden");
  restoreFocus();
  writeURL(push);
}

/* ---------- leitor embutido ---------- */
function readable() {
  return state.results.filter((it) => it.has_content);
}

/* Navegação de iframe entra no histórico da página: trocar `src` empilharia uma
 * entrada por HP aberto/fechado e quebraria o botão Voltar. `replace` não. */
function frameLoad(url) {
  const w = el.frame.contentWindow;
  if (w) w.location.replace(url);
  else el.frame.src = url;
}

function openReader(id, { push = true } = {}) {
  const row = state.all.find((r) => r.id === id);
  if (!row || !row.has_content) return;
  if (!state.reading) state.lastFocus = state.lastFocus || document.activeElement;

  state.reading = id;
  state.openHp = null;
  el.detail.classList.add("hidden");

  el.readerId.textContent = `${icon(row)} ${row.id}`;
  el.readerTitle.textContent = row.title;
  const contentUrl = `/biblio/handbook-premium/content/${encodeURIComponent(row.id)}/${encodeURIComponent(row.id)}.html`;
  el.readerTab.href = contentUrl;
  frameLoad(contentUrl);

  const list = readable();
  const i = list.findIndex((r) => r.id === id);
  el.readerPos.textContent = list.length > 1 ? `${i + 1}/${list.length}` : "";
  el.readerPrev.disabled = i <= 0;
  el.readerNext.disabled = i < 0 || i >= list.length - 1;

  el.reader.classList.remove("hidden");
  document.body.classList.add("reading");
  $("#reader-close").focus();
  writeURL(push);
}

function stepReader(delta) {
  const list = readable();
  const i = list.findIndex((r) => r.id === state.reading);
  const next = list[i + delta];
  if (next) openReader(next.id);
}

function closeReader({ push = true } = {}) {
  if (!state.reading) return;
  const id = state.reading;
  state.reading = null;
  el.reader.classList.add("hidden");
  frameLoad("about:blank");
  document.body.classList.remove("reading");
  writeURL(push);
  const trigger = el.cards.querySelector(`.card[data-id="${CSS.escape(id)}"]`);
  (trigger || state.lastFocus)?.focus?.();
  state.lastFocus = null;
}

function restoreFocus() {
  const target = state.lastFocus;
  state.lastFocus = null;
  if (target && document.contains(target)) target.focus();
}

el.readerPrev.addEventListener("click", () => stepReader(-1));
el.readerNext.addEventListener("click", () => stepReader(1));
$("#reader-close").addEventListener("click", () => closeReader());
$("#detail-close").addEventListener("click", () => closeDetail());
el.detail.addEventListener("click", (e) => { if (e.target === el.detail) closeDetail(); });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (state.reading) closeReader();
    else if (state.openHp) closeDetail();
    return;
  }
  if (!state.reading) return;
  if (e.key === "ArrowLeft") stepReader(-1);
  if (e.key === "ArrowRight") stepReader(1);
});

/* ---------- estado na URL ---------- */

/* Durante um popstate a URL já é a verdade: deixar abrir/fechar reescrevê-la
 * faria replaceState em cima da entrada recém-navegada e quebraria o Voltar. */
let restoring = false;

function writeURL(push) {
  if (restoring) return;
  const p = new URLSearchParams();
  if (state.q) p.set("q", state.q);
  if (state.onlyLive) p.set("ler", "1");
  for (const f of FACETS) {
    const set = state.filters[f.key];
    if (set.size) p.set(f.key, [...set].join(","));
  }
  if (state.reading) p.set("read", state.reading);
  else if (state.openHp) p.set("hp", state.openHp);

  const url = `${location.pathname}${p.toString() ? "?" + p : ""}`;
  if (push) history.pushState(null, "", url);
  else history.replaceState(null, "", url);
}

function readURL() {
  const p = new URLSearchParams(location.search);
  state.q = p.get("q") || "";
  el.q.value = state.q;
  state.onlyLive = p.get("ler") === "1";
  for (const f of FACETS) {
    const set = state.filters[f.key];
    set.clear();
    (p.get(f.key) || "").split(",").filter(Boolean).forEach((v) => set.add(v));
  }
  return { hp: p.get("hp"), read: p.get("read") };
}

window.addEventListener("popstate", async () => {
  restoring = true;
  try {
    const { hp, read } = readURL();
    compute();
    renderCards();
    syncChips();
    if (state.reading && state.reading !== read) closeReader({ push: false });
    if (read) {
      openReader(read, { push: false });
    } else if (hp) {
      await openDetail(hp, { push: false });
    } else {
      closeDetail({ push: false });
    }
  } finally {
    restoring = false;
  }
});

/* ---------- ciclo principal ---------- */
function apply({ push = false } = {}) {
  compute();
  renderCards();
  syncChips();
  writeURL(push);
}

el.q.addEventListener("input", debounce(() => {
  state.q = el.q.value.trim();
  apply();
}, 150));

/* Ordem curricular das macroáreas = ordem em que aparecem no CSV; dentro de
 * cada uma, o ID (CV01, CV02, …). Não depende da ordem das linhas no arquivo. */
function orderItems(items) {
  const gpos = new Map();
  items.forEach((it) => { if (!gpos.has(it.group)) gpos.set(it.group, gpos.size); });
  const sorted = [...items].sort((a, b) =>
    gpos.get(a.group) - gpos.get(b.group) || a.id.localeCompare(b.id, "en", { numeric: true }));
  return sorted.map((it, i) => ({
    ...it, _order: i, _hay: fold(SEARCH_COLS.map((c) => it[c] || "").join(" ")),
  }));
}

(async function init() {
  try {
    const data = await fetchJSON("/biblio/handbook-premium/catalog.json");
    state.all = orderItems(data.items);
    renderStatic();
    const { hp, read } = readURL();
    buildChips();
    apply();
    if (read) openReader(read, { push: false });
    else if (hp) openDetail(hp, { push: false });
    clearBanner();
  } catch (e) {
    el.count.textContent = "";
    showBanner(`Não foi possível carregar o catálogo: ${e.message}. ` +
               `Tente recarregar a página.`);
  }
})();
