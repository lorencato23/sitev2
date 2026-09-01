/* hp-library-dist — frontend.
 *
 * O catálogo (114 linhas, ~24 KB) é carregado uma vez no boot e toda a busca e
 * filtragem acontecem no cliente. Os filtros de /api/catalog continuam existindo
 * para clientes de API (curl, scripts), mas a UI não faz round-trip por tecla.
 */
"use strict";

const FACETS = [
  { key: "group", col: "group", mount: "#f-group" },
  { key: "priority", col: "priority", mount: "#f-priority" },
  { key: "onda", col: "onda", mount: "#f-onda", fmt: (v) => v.replace("O", "Onda ") },
  { key: "status", col: "status", mount: "#f-status" },
  { key: "cobertura", col: "cobertura_atual", mount: "#f-cobertura" },
];

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
      btn.innerHTML = `${esc(f.fmt ? f.fmt(val) : val)}<span class="n"></span>`;
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
function card(it) {
  const div = document.createElement("article");
  div.className = "card";
  div.tabIndex = 0;
  div.setAttribute("role", "button");
  div.setAttribute("aria-label", `${it.id}: ${it.title}`);
  div.dataset.id = it.id;
  const badge = it.has_content
    ? `<span class="badge content">conteúdo</span>`
    : `<span class="badge audit">${esc(it.status)}</span>`;
  div.innerHTML = `
    <div class="card-top">
      <span class="hpid">${esc(it.id)}</span>
      <div class="badges">
        <span class="badge ${prioClass(it.priority)}">${esc(it.priority)}</span>
        ${badge}
      </div>
    </div>
    <h4>${esc(it.title)}</h4>
    <p class="axes">${esc(it.main_axes)}</p>
    <div class="card-meta">
      <span class="tag">${esc(it.group)}</span>
      <span class="tag">${esc(String(it.onda ?? "").replace("O", "Onda "))}</span>
      <span class="tag">residência: ${esc(it.priority_residencia)}</span>
    </div>`;
  div.addEventListener("click", () => openDetail(it.id));
  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDetail(it.id);
    }
  });
  return div;
}

function renderCards() {
  const frag = document.createDocumentFragment();
  state.results.forEach((it) => frag.appendChild(card(it)));
  el.cards.replaceChildren(frag);
  el.count.textContent = `${state.results.length} de ${state.all.length} HPs`;
  el.empty.classList.toggle("hidden", state.results.length > 0);
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
    ? `<button class="btn primary" type="button" id="detail-read">Ler handbook</button>`
    : `<span class="btn disabled" role="note">Conteúdo ainda não disponível</span>`;

  el.detailBody.innerHTML = `
    <span class="detail-id">${esc(hp.id)} · ${esc(hp.group)}</span>
    <h2 id="detail-title">${esc(hp.title)}</h2>
    <dl class="kv">
      <dt>Eixos</dt><dd>${esc(hp.main_axes)}</dd>
      <dt>Prioridade</dt><dd>${esc(hp.priority)} (residência: ${esc(hp.priority_residencia)})</dd>
      <dt>Onda</dt><dd>${esc(hp.onda)}</dd>
      <dt>Status editorial</dt><dd>${esc(hp.status)}</dd>
      <dt>Cobertura de fontes</dt><dd>${esc(hp.cobertura_atual)}</dd>
      <dt>Apostila primária</dt><dd>${esc(hp.apostila_primaria || "—")}</dd>
      <dt>Fonte de diretrizes</dt><dd>${esc(hp.editorial_source_role || "—")}</dd>
    </dl>
    <div class="actions">${action}</div>
    <p class="notice">${hp.status !== "completed"
      ? "Este handbook está em auditoria editorial. O conteúdo publicado é material de trabalho e não constitui orientação clínica."
      : "Handbook marcado como concluído no catálogo, mas aguarda signoff humano final."}</p>`;

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

(async function init() {
  try {
    const data = await fetchJSON("/biblio/handbook-premium/catalog.json");
    state.all = data.items;
    const { hp, read } = readURL();
    buildChips();
    apply();
    if (read) openReader(read, { push: false });
    else if (hp) openDetail(hp, { push: false });
    clearBanner();
  } catch (e) {
    el.count.textContent = "";
    showBanner(`Não foi possível carregar o catálogo: ${e.message}. ` +
               `Confirme que o servidor está rodando (python serve.py).`);
  }
})();
