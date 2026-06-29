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
  newDocButton: document.querySelector("#new-doc-button"),
  newDocModal: document.querySelector("#new-doc-modal"),
  newDocForm: document.querySelector("#new-doc-form"),
  newDocClose: document.querySelector("#new-doc-close"),
  newDocCancel: document.querySelector("#new-doc-cancel"),
  newDocTitle: document.querySelector("#new-doc-title"),
  newDocSlug: document.querySelector("#new-doc-slug"),
  newDocCategory: document.querySelector("#new-doc-category"),
  newDocDescription: document.querySelector("#new-doc-description"),
  newDocTemplate: document.querySelector("#new-doc-template"),
  newDocError: document.querySelector("#new-doc-error"),
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

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function today() {
  return new Date().toISOString().slice(0, 10);
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

async function loadDocuments(options = {}) {
  if (!options.silent) setStatus("목록 불러오는 중");
  const data = await api("/api/cms/documents");
  state.documents = data.documents || [];
  renderDocuments();
  if (!options.silent) setStatus("대기 중");
  if (!state.activePath && state.documents[0]) await openDocument(state.documents[0].path);
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



function openNewDocModal() {
  els.newDocError.textContent = "";
  els.newDocForm.reset();
  els.newDocSlug.value = `guide-${today()}`;
  els.newDocModal.hidden = false;
  window.setTimeout(() => els.newDocTitle.focus(), 20);
}

function closeNewDocModal() {
  els.newDocModal.hidden = true;
}

function templateBody(title, description, template) {
  const safeTitle = title.trim();
  const safeDescription = description.trim();
  const commonIntro = `# ${safeTitle}

${safeDescription}

`;
  if (template === "process") {
    return `${commonIntro}<div className="guide-flow">
  <a className="flow-step" href="#step-1"><strong>01</strong><span>시작 전 확인</span><p>담당자가 먼저 확인해야 할 조건을 적어요.</p></a>
  <a className="flow-step" href="#step-2"><strong>02</strong><span>진행</span><p>실제 화면에서 처리하는 순서를 적어요.</p></a>
  <a className="flow-step" href="#step-3"><strong>03</strong><span>완료 확인</span><p>저장 후 확인해야 할 결과를 적어요.</p></a>
</div>

## 처리 순서

1. 첫 번째로 확인할 내용을 작성해요.
2. 담당자가 입력하거나 선택해야 할 값을 작성해요.
3. 저장 후 병원이 확인해야 할 상태를 작성해요.

## 자주 놓치는 부분

- 조건, 기간, 노출 상태가 실제 운영 기준과 맞는지 확인해요.
- 다음 담당자가 이어서 처리할 수 있게 기준을 남겨요.
`;
  }
  if (template === "screen") {
    return `${commonIntro}<div className="screen-anatomy">
  <div className="screen-anatomy__part">
    <strong>화면 위치</strong>
    <p>파트너센터에서 어느 메뉴로 들어가는지 작성해요.</p>
  </div>
  <div className="screen-anatomy__part">
    <strong>입력 항목</strong>
    <p>버튼, 입력창, 선택값을 실제 업무 순서대로 작성해요.</p>
  </div>
  <div className="screen-anatomy__part">
    <strong>저장 후 확인</strong>
    <p>정상 반영 여부를 어디에서 확인하는지 작성해요.</p>
  </div>
</div>

## 화면에서 확인해요

첫 문단에는 병원 담당자가 이 화면에서 무엇을 해결할 수 있는지 적어요.

## 입력 기준

- 필수 입력값:
- 확인해야 할 상태:
- 반려되기 쉬운 항목:
`;
  }
  if (template === "policy") {
    return `${commonIntro}<div className="guide-callout">
  <strong>운영 전 확인해 주세요</strong>
  <p>이 문서는 병원이 실무에서 지켜야 할 기준을 안내하는 용도예요.</p>
</div>

## 지켜야 할 기준

- 병원 담당자가 반드시 확인해야 할 기준을 작성해요.
- 금지되는 표현이나 행동을 구체적으로 작성해요.
- 수정 요청을 받았을 때 처리 순서를 작성해요.

## 하면 안 되는 행동

- 사실과 다른 내용은 등록하지 않아요.
- 환자 개인정보나 민감한 자료를 임의로 노출하지 않아요.
- 의료광고 기준을 벗어나는 표현은 사용하지 않아요.

## 문제가 생겼을 때

문제가 발생하면 어떤 화면을 확인하고 어떤 담당자에게 전달해야 하는지 작성해요.
`;
  }
  return `${commonIntro}## 언제 사용하는 가이드예요

병원 담당자가 이 문서를 언제 확인해야 하는지 작성해요.

## 처리 방법

1. 먼저 확인해야 할 화면이나 조건을 작성해요.
2. 담당자가 입력하거나 선택해야 할 값을 작성해요.
3. 저장 후 확인해야 할 결과를 작성해요.

## 확인해 주세요

- 병원 운영 기준과 맞는지 확인해요.
- 다음 담당자가 이어서 처리할 수 있게 기준을 남겨요.
- 의료광고 또는 개인정보 기준이 필요한 경우 함께 확인해요.
`;
}

function makeDocumentContent({title, description, category, template}) {
  return `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
sidebar_position: 99
owner: "자신있나 파트너스"
review_status: "검토 필요"
reviewed_at: ${today()}
review_due_at: ""
---

${templateBody(title, description, template)}`;
}

async function createNewDocument(event) {
  event.preventDefault();
  const title = els.newDocTitle.value.trim();
  const description = els.newDocDescription.value.trim();
  const category = els.newDocCategory.value;
  const slug = slugify(els.newDocSlug.value || title);
  const template = els.newDocTemplate.value;
  if (!title || !description || !slug) {
    els.newDocError.textContent = "제목, URL 이름, 설명을 입력해 주세요.";
    return;
  }
  const path = `docs/${category}/${slug}.md`;
  const content = makeDocumentContent({title, description, category, template});
  els.newDocError.textContent = "";
  setStatus("새 글 생성 중");
  try {
    const result = await api("/api/cms/document", {
      method: "PUT",
      body: JSON.stringify({
        path,
        content,
        message: `${title} 새 가이드 추가`,
        sha: "",
      }),
    });
    closeNewDocModal();
    state.activePath = "";
    await loadDocuments({silent: true});
    setStatus(result.deploy?.triggered ? "새 글 생성됨 · 배포 후 URL이 열려요" : "새 글 생성됨 · 배포 설정 확인 필요", result.deploy?.triggered ? "ok" : "error");
  } catch (error) {
    els.newDocError.textContent = error.message;
    setStatus("새 글 생성 실패", "error");
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

els.newDocButton.addEventListener("click", openNewDocModal);
els.newDocClose.addEventListener("click", closeNewDocModal);
els.newDocCancel.addEventListener("click", closeNewDocModal);
els.newDocForm.addEventListener("submit", createNewDocument);
els.newDocTitle.addEventListener("input", () => {
  if (!els.newDocSlug.dataset.touched) els.newDocSlug.value = slugify(els.newDocTitle.value);
});
els.newDocSlug.addEventListener("input", () => {
  els.newDocSlug.dataset.touched = "true";
  els.newDocSlug.value = slugify(els.newDocSlug.value);
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
