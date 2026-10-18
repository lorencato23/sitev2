/* hp-library-dist — frontend.
 *
 * O catálogo (114 linhas, ~24 KB) é carregado uma vez no boot e toda a busca e
 * filtragem acontecem no cliente. Os filtros de /api/catalog continuam existindo
 * para clientes de API (curl, scripts), mas a UI não faz round-trip por tecla.
 */
"use strict";

const FACETS = [
  { key: "group", col: "group", mount: "#f-group", dot: true },
  { key: "leitura", col: "leitura", mount: "#f-leitura" },
  { key: "priority", col: "priority", mount: "#f-priority" },
  { key: "onda", col: "onda", mount: "#f-onda", fmt: (v) => v.replace("O", "Onda ") },
  { key: "status", col: "status", mount: "#f-status", fmt: (v) => STATUS[v] || v },
  { key: "cobertura", col: "cobertura_atual", mount: "#f-cobertura", fmt: (v) => COBERTURA[v] || v },
];

/* Rótulos em português e cores por macroárea, na paleta dos próprios HPs. */
const STATUS = { auditing: "em auditoria", clinical_review: "revisão clínica", validated: "validado", completed: "concluído" };
const COBERTURA = { covered: "fontes completas", partial: "fontes parciais", absent: "sem fontes" };
const PRIO = { P0: ["ank-dgr", "P0 · núcleo"], P1: ["ank-dec", "P1"], P2: ["ank-hy", "P2"] };
const AREA = {
  "Cardiovascular": "#a31b35", "Respiratório": "#1d4570", "Neurologia": "#5e2f78",
  "Gastro/Hepato": "#a8481a", "Endocrinologia": "#7a6014", "Nefro/Uro": "#0b5d4e",
  "Infecto/Imuno": "#3e6a2e", "Hemato/Onco": "#a31b25", "Reumato/Orto/Derm": "#5a4070",
  "Gineco/Obst": "#b4426e", "Pediatria": "#0d6373", "Cirurgia/Trauma": "#6a3a1a",
  "Psiquiatria/Geriatria": "#1d4ea3", "Oftalmo/ENT": "#545b69",
};
const areaColor = (g) => AREA[g] || "#545b69";

const SEARCH_COLS = ["id", "title", "group", "main_axes", "apostila_primaria"];

const state = {
  all: [],
  results: [],
  q: "",
  filters: Object.fromEntries(FACETS.map((f) => [f.key, new Set()])),
  openHp: null,
  reading: null,
  lastFocus: null,
};

const $ = (sel) => document.querySelector(sel);
const el = {
  q: $("#q"), cards: $("#cards"), count: $("#count"), empty: $("#empty"),
  banner: $("#banner"),
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

/** Só os valores que o CSS conhece viram classe; o resto cai num neutro. */
function prioClass(p) {
  return /^P[012]$/.test(String(p ?? "")) ? String(p).toLowerCase() : "pn";
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

/* ---------- filtragem ---------- */
function matchesSearch(it) {
  if (!state.q) return true;
  const hay = SEARCH_COLS.map((c) => it[c] || "").join(" ").toLowerCase();
  return hay.includes(state.q.toLowerCase());
}

/** `exceptKey` fica de fora para contar facetas do jeito certo. */
function matchesFilters(it, exceptKey) {
  return FACETS.every((f) => {
    if (f.key === exceptKey) return true;
    const set = state.filters[f.key];
    return !set.size || set.has(it[f.col]);
  });
}

function compute() {
  const prio = { P0: 0, P1: 1, P2: 2 };
  state.results = state.all
    .filter((it) => matchesSearch(it) && matchesFilters(it))
    .sort((a, b) =>
      (prio[a.priority] ?? 9) - (prio[b.priority] ?? 9) ||
      a.group.localeCompare(b.group) || a.id.localeCompare(b.id));
}

/* ---------- chips ---------- */
function buildChips() {
  for (const f of FACETS) {
    // Universo completo: uma chip nunca some, senão um filtro ativo fica
    // invisível e o usuário vê "0 de N" sem ter como desmarcá-lo.
    const values = [...new Set(state.all.map((it) => it[f.col]).filter(Boolean))].sort();
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
      btn.innerHTML = `${dot}${esc(f.fmt ? f.fmt(val) : val)}<span class="n"></span>`;
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
}

function syncMore() {
  const n = FACETS.filter((f) => f.key !== "group")
    .reduce((acc, f) => acc + state.filters[f.key].size, 0);
  $("#more-n").textContent = n ? String(n) : "";
}

$("#more").addEventListener("click", () => {
  const panel = $("#panel");
  const open = panel.classList.toggle("hidden") === false;
  $("#more").setAttribute("aria-expanded", String(open));
});

function toggleFilter(key, val) {
  const set = state.filters[key];
  if (set.has(val)) set.delete(val);
  else set.add(val);
  apply();
}

$("#clear").addEventListener("click", () => {
  Object.values(state.filters).forEach((s) => s.clear());
  state.q = "";
  el.q.value = "";
  apply();
});

/* ---------- cards ---------- */
function anks(it) {
  const [cls, label] = PRIO[it.priority] || ["ank-mute", it.priority || "—"];
  const st = it.status === "auditing" ? "ank-mute" : it.status === "clinical_review" ? "ank-evo" : "ank-prl";
  return `<span class="ank ${cls}">${esc(label)}</span><span class="ank ${st}">${esc(STATUS[it.status] || it.status)}</span>`;
}

function card(it) {
  const div = document.createElement("article");
  div.className = "card" + (it.has_content ? " live" : "");
  div.style.setProperty("--acc", areaColor(it.group));
  div.tabIndex = 0;
  div.setAttribute("role", "button");
  div.setAttribute("aria-label", `${it.id}: ${it.title}${it.has_content ? " (disponível para leitura)" : ""}`);
  div.dataset.id = it.id;
  div.innerHTML = `
    <div class="card-head"><span class="hpid">${esc(it.id)}</span>${anks(it)}</div>
    <h3>${esc(it.title)}</h3>
    <p class="axes">${esc(it.main_axes)}</p>
    <div class="card-foot">
      <span>${esc(String(it.onda ?? "").replace("O", "onda "))}</span>
      ${it.has_content ? '<span class="read">Ler →</span>' : '<span class="soon">em produção</span>'}
    </div>`;
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
  const groups = new Map();
  for (const it of state.results) {
    if (!groups.has(it.group)) groups.set(it.group, []);
    groups.get(it.group).push(it);
  }
  const frag = document.createDocumentFragment();
  [...groups.keys()].sort((a, b) => a.localeCompare(b, "pt")).forEach((g) => {
    const sec = document.createElement("section");
    sec.className = "group";
    sec.style.setProperty("--acc", areaColor(g));
    const list = groups.get(g);
    sec.innerHTML = `<div class="group-head"><h2>${esc(g)}</h2><span class="gcount">${list.length} HP${list.length > 1 ? "s" : ""}</span></div>`;
    const grid = document.createElement("div");
    grid.className = "cards";
    list.forEach((it) => grid.appendChild(card(it)));
    sec.appendChild(grid);
    frag.appendChild(sec);
  });
  el.cards.replaceChildren(frag);
  const filtered = state.results.length !== state.all.length;
  el.count.textContent = filtered
    ? `${state.results.length} de ${state.all.length} handbooks com a busca e os filtros atuais`
    : `${state.all.length} handbooks em ${new Set(state.all.map((i) => i.group)).size} macroáreas, ordenados por prioridade dentro de cada uma`;
  el.empty.classList.toggle("hidden", state.results.length > 0);
}

function renderStatic() {
  const live = state.all.filter((i) => i.has_content);
  const areas = new Set(state.all.map((i) => i.group)).size;
  const p0 = state.all.filter((i) => i.priority === "P0").length;
  $("#stats").innerHTML = [
    [live.length, "publicados", "live"], [state.all.length, "no catálogo", ""],
    [areas, "macroáreas", ""], [p0, "núcleo P0", ""],
  ].map(([n, l, c]) => `<div class="stat ${c}"><b>${n}</b><span>${l}</span></div>`).join("");

  const grid = $("#pocket-grid");
  grid.replaceChildren(...live.map((it) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pocket-card";
    b.style.setProperty("--pacc", areaColor(it.group) === "#545b69" ? "#d4b94a" : lighten(areaColor(it.group)));
    b.innerHTML = `<span class="pc-trig">${esc(it.id)} · ${esc(it.group)}</span>
      <span class="pc-title">${esc(it.title)}</span>
      <span class="pc-act">${esc(it.main_axes)}</span>
      <span class="pc-go">${esc(STATUS[it.status] || it.status)} · ler agora →</span>`;
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

/* ---------- detalhe ---------- */
async function openDetail(id, { push = true } = {}) {
  const row = state.all.find((r) => r.id === id);
  if (!row) return;
  state.lastFocus = document.activeElement;
  state.openHp = id;

  const hp = { ...row, content_available: row.has_content,
               content_url: row.has_content ? `/biblio/handbook-premium/content/${row.id}/${row.id}.html` : null };

  const action = hp.content_available
    ? `<button class="btn primary" type="button" id="detail-read">Ler handbook →</button>`
    : `<span class="btn disabled" role="note">Em produção</span>`;

  el.detailBody.innerHTML = `
    <div class="m-head" style="--acc:${areaColor(hp.group)}">
      <div class="m-eyebrow"><span class="hpid">${esc(hp.id)}</span> ${esc(hp.group)}</div>
      <h2 id="detail-title">${esc(hp.title)}</h2>
      <div class="m-anks">${anks(hp)}</div>
    </div>
    <div class="m-body">
      <dl class="kv">
        <dt>Eixos</dt><dd>${esc(hp.main_axes)}</dd>
        <dt>Prioridade</dt><dd>${esc(hp.priority)} · residência ${esc(hp.priority_residencia)}</dd>
        <dt>Onda</dt><dd>${esc(String(hp.onda ?? "").replace("O", "Onda "))}</dd>
        <dt>Status editorial</dt><dd>${esc(STATUS[hp.status] || hp.status)}</dd>
        <dt>Fontes</dt><dd>${esc(COBERTURA[hp.cobertura_atual] || hp.cobertura_atual)}</dd>
        <dt>Apostila primária</dt><dd>${esc(hp.apostila_primaria || "—")}</dd>
      </dl>
      <div class="actions">${action}</div>
      <p class="notice"><b>Status</b>${hp.status === "clinical_review"
        ? "Revisão clínica humana pendente. Rascunho educacional, não protocolo institucional nem orientação clínica individual."
        : hp.has_content
          ? "Material publicado para estudo; aguarda signoff humano final. Não constitui orientação clínica individual."
          : "Handbook planejado, ainda em produção editorial. O conteúdo será publicado quando passar pelo gate v5.2 e pela revisão clínica."}</p>
    </div>`;

  const readBtn = $("#detail-read");
  if (readBtn) readBtn.addEventListener("click", () => openReader(hp.id));

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

  el.readerId.textContent = row.id;
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
    syncMore();
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
  syncMore();
  writeURL(push);
}

el.q.addEventListener("input", debounce(() => {
  state.q = el.q.value.trim();
  apply();
}, 150));

(async function init() {
  try {
    const data = await fetchJSON("/biblio/handbook-premium/catalog.json");
    state.all = data.items.map((it) => ({ ...it, leitura: it.has_content ? "disponível" : "em produção" }));
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
