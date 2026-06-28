const state = {
  documents: [],
  activePath: "",
  activeSha: "",
  originalBody: "",
  bodyEdited: false,
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
  titleInput: document.querySelector("#title-input"),
  descriptionInput: document.querySelector("#description-input"),
  statusInput: document.querySelector("#status-input"),
  ownerInput: document.querySelector("#owner-input"),
  bodyEditor: document.querySelector("#body-editor"),
  previewOutput: document.querySelector("#preview-output"),
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
  if (!response.ok) throw new Error(data.error || "요청을 처리하지 못했어요.");
  return data;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unquote(value = "") {
  return String(value).replace(/^["']|["']$/g, "");
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return {fields: {}, body: content};

  const fields = {};
  match[1].split("\n").forEach((line) => {
    const fieldMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (fieldMatch) fields[fieldMatch[1]] = unquote(fieldMatch[2].trim());
  });

  return {fields, body: match[2] || ""};
}

function serializeFrontmatter(fields, body) {
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(fields.title || "새 가이드 문서")}`,
    `description: ${JSON.stringify(fields.description || "")}`,
    `sidebar_position: ${fields.sidebar_position || 99}`,
    `owner: ${JSON.stringify(fields.owner || "자신있나 파트너스")}`,
    `review_status: ${JSON.stringify(fields.review_status || "검토 필요")}`,
    `reviewed_at: ${fields.reviewed_at || new Date().toISOString().slice(0, 10)}`,
    `review_due_at: ${fields.review_due_at || ""}`,
    ...(fields.draft ? [`draft: ${fields.draft}`] : []),
    "---",
    "",
  ];
  return `${frontmatter.join("\n")}${body.trim()}\n`;
}

function simplifyMdx(body) {
  return body
    .replace(/<h([1-3])>(.*?)<\/h\1>/g, (_, level, text) => `${"#".repeat(Number(level))} ${text}`)
    .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
    .replace(/<p>(.*?)<\/p>/g, "$1\n")
    .replace(/<li>(.*?)<\/li>/g, "- $1")
    .replace(/<tr><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g, "- $1: $2")
    .replace(/<tr><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g, "- $1: $2 / $3")
    .replace(/<[^>]+>/g, "")
    .replace(/^\s+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  let html = "";
  let listType = "";

  const closeList = () => {
    if (listType) {
      html += `</${listType}>`;
      listType = "";
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      return;
    }

    if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${formatInline(line.slice(4))}</h3>`;
      return;
    }
    if (line.startsWith("## ")) {
      closeList();
      html += `<h2>${formatInline(line.slice(3))}</h2>`;
      return;
    }
    if (line.startsWith("# ")) {
      closeList();
      html += `<h2>${formatInline(line.slice(2))}</h2>`;
      return;
    }
    if (/^\d+\.\s+/.test(line)) {
      if (listType !== "ol") {
        closeList();
        html += "<ol>";
        listType = "ol";
      }
      html += `<li>${formatInline(line.replace(/^\d+\.\s+/, ""))}</li>`;
      return;
    }
    if (line.startsWith("- ")) {
      if (listType !== "ul") {
        closeList();
        html += "<ul>";
        listType = "ul";
      }
      html += `<li>${formatInline(line.slice(2))}</li>`;
      return;
    }

    closeList();
    html += `<p>${formatInline(line)}</p>`;
  });

  closeList();
  return html || "<p>본문을 입력하세요.</p>";
}

function formatInline(text) {
  return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function htmlToMarkdown(root) {
  const lines = [];

  root.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) lines.push(text);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = node.tagName.toLowerCase();
    const text = node.innerText.trim();

    if (!text) return;
    if (tag === "h1" || tag === "h2") lines.push(`## ${text}`);
    else if (tag === "h3") lines.push(`### ${text}`);
    else if (tag === "ul") {
      Array.from(node.querySelectorAll("li")).forEach((li) => lines.push(`- ${li.innerText.trim()}`));
    } else if (tag === "ol") {
      Array.from(node.querySelectorAll("li")).forEach((li, index) => lines.push(`${index + 1}. ${li.innerText.trim()}`));
    } else if (node.classList.contains("cms-note-block")) {
      lines.push(`> ${text}`);
    } else {
      lines.push(text);
    }
  });

  return lines.join("\n\n").trim();
}

function getTitleFromMarkdown(path, content) {
  const {fields} = parseFrontmatter(content);
  return fields.title || path.split("/").pop().replace(/\.md$/, "");
}

function renderDocuments() {
  const keyword = els.searchInput.value.trim().toLowerCase();
  const filtered = state.documents.filter((doc) => {
    const haystack = `${doc.title} ${doc.path} ${doc.description || ""}`.toLowerCase();
    return !keyword || haystack.includes(keyword);
  });

  els.documentList.innerHTML = "";
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

function refreshPreview() {
  const title = els.titleInput.value.trim() || "문서 제목";
  const description = els.descriptionInput.value.trim();
  els.previewOutput.innerHTML = `
    <h1>${escapeHtml(title)}</h1>
    ${description ? `<p class="cms-preview-description">${escapeHtml(description)}</p>` : ""}
    ${els.bodyEditor.innerHTML}
  `;
}

function markDirty(bodyEdited = false) {
  state.dirty = true;
  if (bodyEdited) state.bodyEdited = true;
  setStatus("수정 중");
  refreshPreview();
}

function showEditor() {
  els.loginPanel.hidden = true;
  els.editorPanel.hidden = false;
  els.logoutButton.hidden = false;
  els.saveButton.hidden = false;
  document.body.classList.add("is-authenticated");
}

function showLogin() {
  els.loginPanel.hidden = false;
  els.editorPanel.hidden = true;
  els.logoutButton.hidden = true;
  els.saveButton.hidden = true;
  document.body.classList.remove("is-authenticated");
  els.currentTitle.textContent = "로그인이 필요합니다";
  els.currentPath.textContent = "마스터 계정으로 접속하면 문서를 수정할 수 있어요.";
}

async function loadDocuments() {
  setStatus("문서 불러오는 중");
  const data = await api("/api/cms/documents");
  state.documents = data.documents;
  renderDocuments();
  setStatus("불러옴", "ok");
  if (state.documents.length && !state.activePath) await openDocument(state.documents[0].path);
}

async function openDocument(path) {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 다른 문서로 이동할까요?")) return;

  setStatus("문서 여는 중");
  const data = await api(`/api/cms/document?path=${encodeURIComponent(path)}`);
  const parsed = parseFrontmatter(data.content);

  state.activePath = data.path;
  state.activeSha = data.sha || "";
  state.originalBody = parsed.body;
  state.bodyEdited = false;
  state.dirty = false;

  els.pathInput.value = data.path;
  els.titleInput.value = parsed.fields.title || getTitleFromMarkdown(data.path, data.content);
  els.descriptionInput.value = parsed.fields.description || "";
  els.statusInput.value = parsed.fields.review_status || "게시 가능";
  els.ownerInput.value = parsed.fields.owner || "자신있나 파트너스";
  els.messageInput.value = `${els.titleInput.value} 수정`;
  els.contentInput.value = data.content;
  els.bodyEditor.innerHTML = markdownToHtml(simplifyMdx(parsed.body));
  els.currentTitle.textContent = els.titleInput.value;
  els.currentPath.textContent = data.path;

  renderDocuments();
  refreshPreview();
  setStatus("저장됨", "ok");
}

function composeContent() {
  const parsed = parseFrontmatter(els.contentInput.value);
  const fields = {
    ...parsed.fields,
    title: els.titleInput.value.trim(),
    description: els.descriptionInput.value.trim(),
    review_status: els.statusInput.value,
    owner: els.ownerInput.value.trim(),
  };
  const body = state.bodyEdited ? htmlToMarkdown(els.bodyEditor) : state.originalBody || parsed.body;
  return serializeFrontmatter(fields, body);
}

async function saveDocument() {
  const path = els.pathInput.value.trim();
  if (!path) {
    setStatus("경로 필요", "error");
    return;
  }

  const content = composeContent();
  els.contentInput.value = content;
  setStatus("저장 중");
  const data = await api("/api/cms/document", {
    method: "PUT",
    body: JSON.stringify({
      path,
      content,
      message: els.messageInput.value.trim() || `${els.titleInput.value || "가이드"} 수정`,
      sha: path === state.activePath ? state.activeSha : "",
    }),
  });

  state.activePath = data.path;
  state.activeSha = data.sha || "";
  state.originalBody = parseFrontmatter(content).body;
  state.bodyEdited = false;
  state.dirty = false;
  els.currentTitle.textContent = els.titleInput.value;
  els.currentPath.textContent = path;
  setStatus("저장됨", "ok");
  await loadDocuments();
}

function createNewDocument() {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 새 문서를 만들까요?")) return;

  const today = new Date().toISOString().slice(0, 10);
  state.activePath = "";
  state.activeSha = "";
  state.originalBody = "";
  state.bodyEdited = true;
  state.dirty = true;

  els.pathInput.value = `docs/start/new-guide-${today}.md`;
  els.titleInput.value = "새 가이드 문서";
  els.descriptionInput.value = "병원 담당자가 쉽게 이해할 수 있도록 설명을 입력하세요.";
  els.statusInput.value = "검토 필요";
  els.ownerInput.value = "자신있나 파트너스";
  els.messageInput.value = "새 가이드 문서 추가";
  els.bodyEditor.innerHTML = "<h2>문서 제목</h2><p>여기에 병원이 실제로 따라 할 수 있는 안내를 작성해요.</p>";
  els.contentInput.value = composeContent();
  els.currentTitle.textContent = els.titleInput.value;
  els.currentPath.textContent = els.pathInput.value;
  refreshPreview();
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
      body: JSON.stringify({id: els.loginId.value, password: els.loginPassword.value}),
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

function applyCommand(command) {
  els.bodyEditor.focus();
  if (command === "bold") document.execCommand("bold");
  if (command === "h2") document.execCommand("formatBlock", false, "h2");
  if (command === "h3") document.execCommand("formatBlock", false, "h3");
  if (command === "ul") document.execCommand("insertUnorderedList");
  if (command === "ol") document.execCommand("insertOrderedList");
  if (command === "note") {
    document.execCommand("insertHTML", false, '<blockquote class="cms-note-block">확인해야 할 내용을 입력하세요.</blockquote>');
  }
  markDirty(true);
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
els.bodyEditor.addEventListener("input", () => markDirty(true));
els.titleInput.addEventListener("input", () => {
  els.currentTitle.textContent = els.titleInput.value || "문서 제목";
  els.messageInput.value = `${els.titleInput.value || "가이드"} 수정`;
  markDirty(false);
});
els.descriptionInput.addEventListener("input", () => markDirty(false));
els.statusInput.addEventListener("change", () => markDirty(false));
els.ownerInput.addEventListener("input", () => markDirty(false));
els.pathInput.addEventListener("input", () => {
  els.currentPath.textContent = els.pathInput.value;
  markDirty(false);
});
els.contentInput.addEventListener("input", () => {
  const parsed = parseFrontmatter(els.contentInput.value);
  state.originalBody = parsed.body;
  state.bodyEdited = false;
  markDirty(false);
});
document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => applyCommand(button.dataset.command));
});

boot();
