const state = {
  documents: [],
  activePath: "",
  activeSha: "",
  dirty: false,
};

const els = {
  loginPanel: document.querySelector("#login-panel"),
  editorPanel: document.querySelector("#editor-panel"),
  loginForm: document.querySelector("#login-form"),
  loginError: document.querySelector("#login-error"),
  loginId: document.querySelector("#login-id"),
  loginPassword: document.querySelector("#login-password"),
  logoutButton: document.querySelector("#logout-button"),
  saveButton: document.querySelector("#save-button"),
  newDocButton: document.querySelector("#new-doc-button"),
  searchInput: document.querySelector("#search-input"),
  documentList: document.querySelector("#document-list"),
  currentTitle: document.querySelector("#current-title"),
  currentPath: document.querySelector("#current-path"),
  saveState: document.querySelector("#save-state"),
  pathInput: document.querySelector("#path-input"),
  messageInput: document.querySelector("#message-input"),
  contentInput: document.querySelector("#content-input"),
};

function setStatus(message, type = "") {
  els.saveState.textContent = message;
  els.saveState.className = `cms-state${type ? ` is-${type}` : ""}`;
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.error || "요청을 처리하지 못했어요.");
  }

  return data;
}

function getTitleFromMarkdown(path, content) {
  const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  if (titleMatch) return titleMatch[1];
  return path.split("/").pop().replace(/\.md$/, "");
}

function renderDocuments() {
  const keyword = els.searchInput.value.trim().toLowerCase();
  const filtered = state.documents.filter((doc) => {
    const haystack = `${doc.title} ${doc.path} ${doc.description || ""}`.toLowerCase();
    return !keyword || haystack.includes(keyword);
  });

  els.documentList.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "cms-doc-item";
    empty.textContent = "표시할 문서가 없어요.";
    els.documentList.append(empty);
    return;
  }

  filtered.forEach((doc) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `cms-doc-item${doc.path === state.activePath ? " is-active" : ""}`;
    button.innerHTML = `<strong></strong><span></span>`;
    button.querySelector("strong").textContent = doc.title;
    button.querySelector("span").textContent = doc.path;
    button.addEventListener("click", () => openDocument(doc.path));
    els.documentList.append(button);
  });
}

function showEditor() {
  els.loginPanel.hidden = true;
  els.editorPanel.hidden = false;
  els.logoutButton.hidden = false;
  els.saveButton.hidden = false;
}

function showLogin() {
  els.loginPanel.hidden = false;
  els.editorPanel.hidden = true;
  els.logoutButton.hidden = true;
  els.saveButton.hidden = true;
  els.currentTitle.textContent = "로그인이 필요합니다";
  els.currentPath.textContent = "마스터 계정으로 접속하면 문서를 수정할 수 있어요.";
}

async function loadDocuments() {
  setStatus("문서 불러오는 중");
  const data = await api("/api/cms/documents");
  state.documents = data.documents;
  renderDocuments();
  setStatus("불러옴", "ok");

  if (state.documents.length && !state.activePath) {
    await openDocument(state.documents[0].path);
  }
}

async function openDocument(path) {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 다른 문서로 이동할까요?")) {
    return;
  }

  setStatus("문서 여는 중");
  const data = await api(`/api/cms/document?path=${encodeURIComponent(path)}`);
  state.activePath = data.path;
  state.activeSha = data.sha || "";
  state.dirty = false;

  els.pathInput.value = data.path;
  els.messageInput.value = `${getTitleFromMarkdown(data.path, data.content)} 수정`;
  els.contentInput.value = data.content;
  els.currentTitle.textContent = getTitleFromMarkdown(data.path, data.content);
  els.currentPath.textContent = data.path;
  renderDocuments();
  setStatus("저장됨", "ok");
}

async function saveDocument() {
  const path = els.pathInput.value.trim();
  const content = els.contentInput.value;
  const message = els.messageInput.value.trim() || "가이드 문서 수정";

  if (!path) {
    setStatus("경로 필요", "error");
    return;
  }

  setStatus("저장 중");
  const data = await api("/api/cms/document", {
    method: "PUT",
    body: JSON.stringify({
      path,
      content,
      message,
      sha: path === state.activePath ? state.activeSha : "",
    }),
  });

  state.activePath = data.path;
  state.activeSha = data.sha || "";
  state.dirty = false;
  els.currentTitle.textContent = getTitleFromMarkdown(path, content);
  els.currentPath.textContent = path;
  setStatus("저장됨", "ok");
  await loadDocuments();
}

async function createNewDocument() {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 새 문서를 만들까요?")) {
    return;
  }

  const slug = `new-guide-${new Date().toISOString().slice(0, 10)}`;
  state.activePath = "";
  state.activeSha = "";
  state.dirty = true;
  els.pathInput.value = `docs/start/${slug}.md`;
  els.messageInput.value = "새 가이드 문서 추가";
  els.contentInput.value = `---\ntitle: 새 가이드 문서\ndescription: 병원 담당자가 쉽게 이해할 수 있도록 설명을 입력하세요.\nsidebar_position: 99\ndraft: true\nreview_status: 검토 필요\nowner: 운영팀\nreviewed_at: ${new Date().toISOString().slice(0, 10)}\n---\n\n## 문서 제목\n\n여기에 병원이 실제로 따라 할 수 있는 안내를 작성해요.\n`;
  els.currentTitle.textContent = "새 가이드 문서";
  els.currentPath.textContent = els.pathInput.value;
  renderDocuments();
  setStatus("작성 중");
}

async function login(event) {
  event.preventDefault();
  els.loginError.textContent = "";
  setStatus("로그인 중");

  try {
    await api("/api/cms/login", {
      method: "POST",
      body: JSON.stringify({
        id: els.loginId.value,
        password: els.loginPassword.value,
      }),
    });

    els.loginPassword.value = "";
    showEditor();
    await loadDocuments();
  } catch (error) {
    els.loginError.textContent = error.message;
    setStatus("로그인 실패", "error");
  }
}

async function logout() {
  await api("/api/cms/logout", {method: "POST"}).catch(() => {});
  state.documents = [];
  state.activePath = "";
  state.activeSha = "";
  state.dirty = false;
  els.documentList.innerHTML = "";
  showLogin();
  setStatus("로그아웃됨");
}

async function boot() {
  try {
    await api("/api/cms/me");
    showEditor();
    await loadDocuments();
  } catch {
    showLogin();
    setStatus("대기 중");
  }
}

els.loginForm.addEventListener("submit", login);
els.logoutButton.addEventListener("click", logout);
els.saveButton.addEventListener("click", () => saveDocument().catch((error) => setStatus(error.message, "error")));
els.newDocButton.addEventListener("click", createNewDocument);
els.searchInput.addEventListener("input", renderDocuments);
els.contentInput.addEventListener("input", () => {
  state.dirty = true;
  setStatus("수정 중");
});
els.pathInput.addEventListener("input", () => {
  state.dirty = true;
  els.currentPath.textContent = els.pathInput.value;
});

boot();
