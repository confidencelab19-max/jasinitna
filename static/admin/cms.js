const state = {
  documents: [],
  activePath: "",
  fields: [],
  dirty: false,
  loadingFrame: false,
};

const els = {
  loginScreen: document.querySelector("#login-screen"),
  app: document.querySelector("#app"),
  loginForm: document.querySelector("#login-form"),
  loginId: document.querySelector("#login-id"),
  loginPassword: document.querySelector("#login-password"),
  loginError: document.querySelector("#login-error"),
  logoutButton: document.querySelector("#logout-button"),
  saveButton: document.querySelector("#save-button"),
  revertButton: document.querySelector("#revert-button"),
  openLink: document.querySelector("#open-link"),
  searchInput: document.querySelector("#search-input"),
  documentList: document.querySelector("#document-list"),
  currentTitle: document.querySelector("#current-title"),
  currentPath: document.querySelector("#current-path"),
  saveState: document.querySelector("#save-state"),
  frame: document.querySelector("#preview-frame"),
  fieldList: document.querySelector("#field-list"),
  textCount: document.querySelector("#text-count"),
};

function setMode(mode) {
  document.body.classList.remove("is-booting");
  els.loginScreen.hidden = mode !== "login";
  els.app.hidden = mode !== "app";
}

function setStatus(message, type = "") {
  els.saveState.textContent = message;
  els.saveState.className = `state${type ? ` is-${type}` : ""}`;
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    cache: "no-store",
    headers: {"Content-Type": "application/json", ...(options.headers || {})},
    ...options,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    if (response.status === 401 && !path.endsWith("/login")) showLogin("세션이 만료됐어요. 다시 로그인해 주세요.");
    throw new Error(data.error || "요청을 처리하지 못했습니다.");
  }
  return data;
}

function showLogin(message = "") {
  state.documents = [];
  state.activePath = "";
  state.fields = [];
  state.dirty = false;
  els.documentList.innerHTML = "";
  els.fieldList.innerHTML = "";
  els.frame.removeAttribute("src");
  els.loginError.textContent = message;
  els.loginPassword.value = "";
  els.saveButton.disabled = true;
  els.revertButton.disabled = true;
  setMode("login");
}

function showApp() {
  setMode("app");
}

function routeFromPath(path) {
  return `/${String(path || "").replace(/\.md$/, "")}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDocuments() {
  const keyword = els.searchInput.value.trim().toLowerCase();
  const docs = state.documents.filter((doc) => {
    const haystack = `${doc.title} ${doc.description || ""} ${doc.path}`.toLowerCase();
    return !keyword || haystack.includes(keyword);
  });
  els.documentList.innerHTML = docs
    .map((doc) => `<button type="button" class="doc-item${doc.path === state.activePath ? " is-active" : ""}" data-path="${doc.path}">
      <strong>${escapeHtml(doc.title)}</strong>
      <span>${escapeHtml(doc.path)}</span>
    </button>`)
    .join("");
}

async function loadDocuments() {
  setStatus("목록 불러오는 중");
  const data = await api("/api/cms/documents");
  state.documents = data.documents || [];
  renderDocuments();
  setStatus("대기 중");
  if (state.documents[0]) await openDocument(state.documents[0].path);
}

function collectTextNodes(doc) {
  const root = doc.querySelector(".theme-doc-markdown.markdown");
  if (!root) return [];
  const nodes = [];
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "noscript", "code", "pre", "textarea"].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (parent.closest(".hash-link, .theme-code-block")) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

function nodeLabel(node) {
  const parent = node.parentElement;
  if (!parent) return "본문";
  const tag = parent.tagName.toLowerCase();
  if (/h1|h2|h3/.test(tag)) return tag.toUpperCase();
  if (tag === "li") return "목록";
  if (tag === "a") return "링크";
  if (parent.closest("table")) return "표";
  if (parent.closest(".screen-anatomy, .visual-screen, .guide-playbook, .guide-flow, .flow-steps")) return "목업/도식";
  return "본문";
}

async function hydrateFields() {
  const doc = els.frame.contentDocument;
  if (!doc) return;
  const patchData = await api(`/api/cms/patches?path=${encodeURIComponent(state.activePath)}`);
  const saved = new Map((patchData.patches || []).map((patch) => [patch.key, patch.text]));
  const nodes = collectTextNodes(doc);
  state.fields = nodes.map((node, index) => {
    const key = `t:${index}`;
    const text = saved.has(key) ? saved.get(key) : node.nodeValue;
    node.nodeValue = text;
    return {key, node, text, label: nodeLabel(node)};
  });
  renderFields();
  const title = doc.querySelector(".theme-doc-markdown h1")?.textContent?.trim() || state.activePath;
  els.currentTitle.textContent = title;
  els.textCount.textContent = `${state.fields.length}개 문장을 실제 화면과 연결했어요.`;
  els.saveButton.disabled = false;
  els.revertButton.disabled = !saved.size;
  state.dirty = false;
  setStatus(saved.size ? "저장된 수정본 적용 중" : "원본 화면 연결됨", "ok");
}

function renderFields() {
  els.fieldList.innerHTML = state.fields
    .map((field, index) => `<section class="text-field" data-index="${index}">
      <label>${String(index + 1).padStart(2, "0")} · ${escapeHtml(field.label)}</label>
      <textarea data-index="${index}">${escapeHtml(field.text)}</textarea>
      <small>${escapeHtml(field.key)}</small>
    </section>`)
    .join("");
}

async function openDocument(path) {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 다른 문서를 열까요?")) return;
  state.activePath = path;
  state.fields = [];
  state.dirty = false;
  renderDocuments();
  const route = routeFromPath(path);
  els.currentPath.textContent = path;
  els.openLink.href = route;
  els.saveButton.disabled = true;
  els.revertButton.disabled = true;
  els.fieldList.innerHTML = "";
  els.textCount.textContent = "가이드 화면을 불러오는 중이에요.";
  setStatus("화면 불러오는 중");
  els.frame.src = `${route}?cms-visual=${Date.now()}`;
}

function markDirty() {
  if (!state.activePath) return;
  state.dirty = true;
  setStatus("수정 중");
}

async function saveDocument() {
  if (!state.activePath) return;
  setStatus("저장 중");
  els.saveButton.disabled = true;
  const patches = state.fields.map((field) => ({key: field.key, text: field.text}));
  try {
    const result = await api("/api/cms/patches", {
      method: "PUT",
      body: JSON.stringify({path: state.activePath, patches}),
    });
    state.dirty = false;
    els.revertButton.disabled = false;
    setStatus(`저장됨 · ${result.saved.count}개 문장 즉시 반영`, "ok");
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    els.saveButton.disabled = false;
  }
}

async function revertDocument() {
  if (!state.activePath || !window.confirm("이 문서의 CMS 수정 문장을 모두 지우고 원본으로 되돌릴까요?")) return;
  setStatus("원본 복구 중");
  try {
    await api(`/api/cms/patches?path=${encodeURIComponent(state.activePath)}`, {method: "DELETE"});
    await openDocument(state.activePath);
  } catch (error) {
    setStatus(error.message, "error");
  }
}

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  els.loginError.textContent = "";
  setStatus("로그인 중");
  try {
    await api("/api/cms/login", {
      method: "POST",
      body: JSON.stringify({id: els.loginId.value, password: els.loginPassword.value}),
    });
    els.loginPassword.value = "";
    showApp();
    await loadDocuments();
  } catch (error) {
    els.loginError.textContent = error.message;
    setStatus("로그인 실패", "error");
  }
});

els.logoutButton.addEventListener("click", async () => {
  await api("/api/cms/logout", {method: "POST"}).catch(() => null);
  showLogin();
});

els.documentList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-path]");
  if (item) openDocument(item.dataset.path);
});

els.searchInput.addEventListener("input", renderDocuments);
els.saveButton.addEventListener("click", saveDocument);
els.revertButton.addEventListener("click", revertDocument);

els.fieldList.addEventListener("input", (event) => {
  const input = event.target.closest("textarea[data-index]");
  if (!input) return;
  const field = state.fields[Number(input.dataset.index)];
  if (!field) return;
  field.text = input.value;
  field.node.nodeValue = input.value;
  markDirty();
});

els.fieldList.addEventListener("focusin", (event) => {
  const box = event.target.closest(".text-field");
  document.querySelectorAll(".text-field.is-active").forEach((item) => item.classList.remove("is-active"));
  if (box) box.classList.add("is-active");
});

els.frame.addEventListener("load", () => {
  window.setTimeout(() => hydrateFields().catch((error) => setStatus(error.message, "error")), 1800);
});

window.addEventListener("beforeunload", (event) => {
  if (!state.dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

(async function boot() {
  try {
    await api("/api/cms/me");
    showApp();
    await loadDocuments();
  } catch {
    showLogin();
    setStatus("대기 중");
  }
})();
