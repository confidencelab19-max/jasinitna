const state = {
  documents: [],
  activePath: "",
  activeSha: "",
  originalBody: "",
  bodyEdited: false,
  dirty: false,
  view: "documents",
  settings: null,
  sessionCheckTimer: null,
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
  livePreviewFrame: document.querySelector("#live-preview-frame"),
  documentImageInput: document.querySelector("#document-image-input"),
  viewButtons: document.querySelectorAll("[data-view]"),
  documentsView: document.querySelector("#documents-view"),
  settingsView: document.querySelector("#settings-view"),
  imagesView: document.querySelector("#images-view"),
  siteTitleInput: document.querySelector("#site-title-input"),
  siteTaglineInput: document.querySelector("#site-tagline-input"),
  siteUrlInput: document.querySelector("#site-url-input"),
  siteLogoInput: document.querySelector("#site-logo-input"),
  siteFaviconInput: document.querySelector("#site-favicon-input"),
  siteFooterInput: document.querySelector("#site-footer-input"),
  homeBannerImageInput: document.querySelector("#home-banner-image-input"),
  homeBannerTitleInput: document.querySelector("#home-banner-title-input"),
  homeBannerDescriptionInput: document.querySelector("#home-banner-description-input"),
  homeSearchPlaceholderInput: document.querySelector("#home-search-placeholder-input"),
  homeButtonTextInput: document.querySelector("#home-button-text-input"),
  homeButtonLinkInput: document.querySelector("#home-button-link-input"),
  homeJsonInput: document.querySelector("#home-json-input"),
  imageFileInput: document.querySelector("#image-file-input"),
  imageUploadButton: document.querySelector("#image-upload-button"),
  imageUploadResult: document.querySelector("#image-upload-result"),
  imageList: document.querySelector("#image-list"),
};

function setStatus(message, type = "") {
  els.saveState.textContent = message;
  els.saveState.className = `cms-state${type ? ` is-${type}` : ""}`;
}

function deployStatusMessage(savedText, deploy) {
  if (!deploy) return savedText;
  if (deploy.triggered) return `${savedText} · 배포 요청됨`;
  return `${savedText} · 자동 배포 설정 필요`;
}

function setMode(mode) {
  document.body.classList.remove("cms-booting", "is-login", "is-authenticated");
  document.body.classList.add(mode);
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
    if (response.status === 401 && !path.endsWith("/login")) {
      forceLogout("세션이 만료됐어요. 다시 로그인해 주세요.");
    }
    throw new Error(data.error || "요청을 처리하지 못했어요.");
  }
  return data;
}

function startSessionWatch() {
  window.clearInterval(state.sessionCheckTimer);
  state.sessionCheckTimer = window.setInterval(async () => {
    try {
      await api("/api/cms/me");
    } catch {
      window.clearInterval(state.sessionCheckTimer);
    }
  }, 60 * 1000);
}

function stopSessionWatch() {
  window.clearInterval(state.sessionCheckTimer);
  state.sessionCheckTimer = null;
}

function setView(view) {
  state.view = view;
  els.documentsView.hidden = view !== "documents";
  els.settingsView.hidden = view !== "settings";
  els.imagesView.hidden = view !== "images";
  els.newDocButton.hidden = view !== "documents";
  els.saveButton.textContent = view === "settings" ? "설정 저장" : "저장";

  els.viewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });

  if (view === "documents") {
    els.currentTitle.textContent = els.titleInput.value || "문서 관리";
    els.currentPath.textContent = state.activePath || "문서를 선택하세요.";
  }
  if (view === "settings") {
    els.currentTitle.textContent = "사이트 설정";
    els.currentPath.textContent = "사이트 기본 정보와 메인 화면을 관리해요.";
    if (!state.settings) loadSettings().catch((error) => setStatus(error.message, "error"));
  }
  if (view === "images") {
    els.currentTitle.textContent = "이미지 관리";
    els.currentPath.textContent = "문서와 배너에 사용할 이미지를 업로드해요.";
    loadImages().catch((error) => setStatus(error.message, "error"));
  }
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

function hasDesignMdx(body) {
  return /<div\s|className=|<table[\s>]|guide-visual|guide-playbook|visual-screen/.test(body);
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
    if (/^!\[(.*?)\]\((.*?)\)$/.test(line)) {
      closeList();
      const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      html += `<figure><img src="${escapeHtml(imageMatch[2])}" alt="${escapeHtml(imageMatch[1] || "")}" /><figcaption>${escapeHtml(imageMatch[1] || "이미지")}</figcaption></figure>`;
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
    } else if (tag === "figure") {
      const img = node.querySelector("img");
      if (img) lines.push(`![${img.alt || "이미지"}](${img.getAttribute("src") || ""})`);
    } else if (tag === "img") {
      lines.push(`![${node.alt || "이미지"}](${node.getAttribute("src") || ""})`);
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

function docPathToUrl(path) {
  if (!path || !path.startsWith("docs/")) return "";
  return `/${path.replace(/\.md$/, "")}`;
}

function setLivePreview(path) {
  const url = docPathToUrl(path);
  if (!url) {
    els.livePreviewFrame.removeAttribute("src");
    return;
  }
  els.livePreviewFrame.src = `${url}?cmsPreview=${Date.now()}`;
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
  setMode("is-authenticated");
  startSessionWatch();
}

function showLogin(message = "") {
  els.loginPanel.hidden = false;
  els.editorPanel.hidden = true;
  els.logoutButton.hidden = true;
  els.saveButton.hidden = true;
  setMode("is-login");
  state.documents = [];
  state.activePath = "";
  state.activeSha = "";
  state.dirty = false;
  state.settings = null;
  stopSessionWatch();
  els.documentList.innerHTML = "";
  els.currentTitle.textContent = "로그인이 필요합니다";
  els.currentPath.textContent = "마스터 계정으로 접속하면 문서를 수정할 수 있어요.";
  els.loginError.textContent = message;
}

function forceLogout(message) {
  showLogin(message);
  setStatus("로그아웃됨");
}

async function loadDocuments() {
  setStatus("문서 불러오는 중");
  const data = await api("/api/cms/documents");
  state.documents = data.documents;
  renderDocuments();
  setStatus("불러옴", "ok");
  if (state.documents.length && !state.activePath) await openDocument(state.documents[0].path);
}

async function loadSettings() {
  setStatus("설정 불러오는 중");
  state.settings = await api("/api/cms/settings");
  const site = state.settings.site.value;
  const home = state.settings.home.value;
  const banner = home.banners?.[0] || {};

  els.siteTitleInput.value = site.title || "";
  els.siteTaglineInput.value = site.tagline || "";
  els.siteUrlInput.value = site.url || "";
  els.siteLogoInput.value = site.logo || "";
  els.siteFaviconInput.value = site.favicon || "";
  els.siteFooterInput.value = site.footerCopyright || "";
  els.homeBannerImageInput.value = banner.image || "";
  els.homeBannerTitleInput.value = banner.title || "";
  els.homeBannerDescriptionInput.value = banner.description || "";
  els.homeSearchPlaceholderInput.value = banner.searchPlaceholder || "";
  els.homeButtonTextInput.value = banner.buttonText || "";
  els.homeButtonLinkInput.value = banner.buttonLink || "";
  els.homeJsonInput.value = JSON.stringify(home, null, 2);
  setStatus("설정 불러옴", "ok");
}

async function saveSettings() {
  if (!state.settings) await loadSettings();

  let home;
  try {
    home = JSON.parse(els.homeJsonInput.value);
  } catch {
    setStatus("홈 JSON 형식 오류", "error");
    return;
  }

  home.banners = home.banners?.length ? home.banners : [{}];
  home.banners[0] = {
    ...home.banners[0],
    image: els.homeBannerImageInput.value.trim(),
    title: els.homeBannerTitleInput.value.trim(),
    description: els.homeBannerDescriptionInput.value.trim(),
    searchPlaceholder: els.homeSearchPlaceholderInput.value.trim(),
    buttonText: els.homeButtonTextInput.value.trim(),
    buttonLink: els.homeButtonLinkInput.value.trim(),
  };

  const site = {
    ...state.settings.site.value,
    title: els.siteTitleInput.value.trim(),
    tagline: els.siteTaglineInput.value.trim(),
    url: els.siteUrlInput.value.trim(),
    logo: els.siteLogoInput.value.trim(),
    favicon: els.siteFaviconInput.value.trim(),
    footerCopyright: els.siteFooterInput.value.trim(),
  };

  setStatus("설정 저장 중");
  const result = await api("/api/cms/settings", {
    method: "PUT",
    body: JSON.stringify({
      site: {value: site, sha: state.settings.site.sha},
      home: {value: home, sha: state.settings.home.sha},
    }),
  });

  if (result.site?.sha) state.settings.site.sha = result.site.sha;
  if (result.home?.sha) state.settings.home.sha = result.home.sha;
  state.settings.site.value = site;
  state.settings.home.value = home;
  els.homeJsonInput.value = JSON.stringify(home, null, 2);
  setStatus(deployStatusMessage("설정 저장됨", result.deploy), result.deploy?.triggered ? "ok" : "error");
}

function markSettingsDirty() {
  setStatus("설정 수정 중");
}

async function fileToBase64(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return dataUrl.split(",")[1] || "";
}

async function loadImages() {
  setStatus("이미지 불러오는 중");
  const data = await api("/api/cms/images");
  renderImages(data.images || []);
  setStatus("이미지 불러옴", "ok");
}

function renderImages(images) {
  els.imageList.innerHTML = "";

  if (!images.length) {
    els.imageList.innerHTML = '<p class="cms-help-text">아직 업로드된 이미지가 없어요.</p>';
    return;
  }

  images.forEach((image) => {
    const item = document.createElement("div");
    item.className = "cms-image-item";
    item.innerHTML = `
      <img src="${escapeHtml(image.url)}" alt="" loading="lazy" />
      <div>
        <strong>${escapeHtml(image.name)}</strong>
        <input readonly value="${escapeHtml(image.url)}" />
        <div class="cms-image-actions">
          <button type="button" data-copy="${escapeHtml(image.url)}">경로 복사</button>
          <button type="button" data-banner="${escapeHtml(image.url)}">배너에 사용</button>
        </div>
      </div>
    `;
    els.imageList.append(item);
  });

  els.imageList.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy).catch(() => {});
      els.imageUploadResult.textContent = `복사됨: ${button.dataset.copy}`;
    });
  });
  els.imageList.querySelectorAll("[data-banner]").forEach((button) => {
    button.addEventListener("click", () => {
      setView("settings");
      els.homeBannerImageInput.value = button.dataset.banner;
      markSettingsDirty();
    });
  });
}

async function uploadImage() {
  const file = els.imageFileInput.files?.[0];
  if (!file) {
    setStatus("이미지 선택 필요", "error");
    return;
  }

  setStatus("이미지 업로드 중");
  const result = await api("/api/cms/images", {
    method: "POST",
    body: JSON.stringify({
      name: file.name,
      type: file.type,
      content: await fileToBase64(file),
    }),
  });

  els.imageUploadResult.textContent = deployStatusMessage(`업로드 완료: ${result.url}`, result.deploy);
  els.imageFileInput.value = "";
  await loadImages();
}

async function uploadDocumentImage(file) {
  if (!file) return;

  setStatus("문서 이미지 업로드 중");
  const result = await api("/api/cms/images", {
    method: "POST",
    body: JSON.stringify({
      name: file.name,
      type: file.type,
      content: await fileToBase64(file),
    }),
  });

  insertHtmlAtCursor(
    `<figure><img src="${escapeHtml(result.url)}" alt="${escapeHtml(file.name.replace(/\.[^.]+$/, ""))}" /><figcaption>${escapeHtml(file.name)}</figcaption></figure>`,
  );
  markDirty(true);
  setStatus(deployStatusMessage("이미지 삽입됨", result.deploy), result.deploy?.triggered ? "ok" : "");
}

function insertHtmlAtCursor(html) {
  els.bodyEditor.focus();
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) {
    els.bodyEditor.insertAdjacentHTML("beforeend", html);
    return;
  }

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const fragment = range.createContextualFragment(html);
  range.insertNode(fragment);
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
  const isDesignDocument = hasDesignMdx(parsed.body);
  const editPanel = els.bodyEditor.closest(".cms-edit-panel");
  editPanel.classList.toggle("is-source-mode", isDesignDocument);

  els.pathInput.value = data.path;
  els.titleInput.value = parsed.fields.title || getTitleFromMarkdown(data.path, data.content);
  els.descriptionInput.value = parsed.fields.description || "";
  els.statusInput.value = parsed.fields.review_status || "게시 가능";
  els.ownerInput.value = parsed.fields.owner || "자신있나 파트너스";
  els.messageInput.value = `${els.titleInput.value} 수정`;
  els.contentInput.value = data.content;
  els.bodyEditor.contentEditable = isDesignDocument ? "false" : "true";
  els.bodyEditor.classList.toggle("is-locked", isDesignDocument);
  if (isDesignDocument) {
    els.bodyEditor.innerHTML = "";
    els.contentInput.closest("details").open = true;
  } else {
    els.bodyEditor.innerHTML = markdownToHtml(simplifyMdx(parsed.body));
    els.contentInput.closest("details").open = false;
  }
  els.currentTitle.textContent = els.titleInput.value;
  els.currentPath.textContent = data.path;
  setLivePreview(data.path);

  renderDocuments();
  refreshPreview();
  setStatus("문서 열림", "ok");
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
  setLivePreview(path);
  setStatus(
    deployStatusMessage("저장됨 · 공개 화면은 배포 완료 후 갱신돼요", data.deploy),
    data.deploy?.triggered ? "ok" : "error",
  );
  await loadDocuments();
}

async function saveCurrentView() {
  if (state.view === "settings") {
    await saveSettings();
    return;
  }
  if (state.view === "images") {
    setStatus("이미지는 업로드 즉시 저장돼요", "ok");
    return;
  }
  await saveDocument();
}

function createNewDocument() {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 새 문서를 만들까요?")) return;

  const today = new Date().toISOString().slice(0, 10);
  state.activePath = "";
  state.activeSha = "";
  state.originalBody = "";
  state.bodyEdited = true;
  state.dirty = true;
  els.bodyEditor.closest(".cms-edit-panel").classList.remove("is-source-mode");

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
  els.livePreviewFrame.removeAttribute("src");
  refreshPreview();
  renderDocuments();
  setStatus("작성 중");
}

async function login(event) {
  event.preventDefault();
  els.loginError.textContent = "";
  setStatus("로그인 중");
  const submitButton = els.loginForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  try {
    await api("/api/cms/login", {
      method: "POST",
      body: JSON.stringify({id: els.loginId.value, password: els.loginPassword.value}),
    });
    els.loginPassword.value = "";
    showEditor();
    setView("documents");
    await loadDocuments();
  } catch (error) {
    els.loginError.textContent = error.message;
    setStatus("로그인 실패", "error");
  } finally {
    submitButton.disabled = false;
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
  if (command === "image") {
    els.documentImageInput.click();
    return;
  }
  markDirty(true);
}

async function boot() {
  try {
    await api("/api/cms/me");
    showEditor();
    setView("documents");
    await loadDocuments();
  } catch {
    showLogin();
    setStatus("대기 중");
  }
}

els.loginForm.addEventListener("submit", login);
els.logoutButton.addEventListener("click", logout);
els.saveButton.addEventListener("click", () => saveCurrentView().catch((error) => setStatus(error.message, "error")));
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
els.viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});
[
  els.siteTitleInput,
  els.siteTaglineInput,
  els.siteUrlInput,
  els.siteLogoInput,
  els.siteFaviconInput,
  els.siteFooterInput,
  els.homeBannerImageInput,
  els.homeBannerTitleInput,
  els.homeBannerDescriptionInput,
  els.homeSearchPlaceholderInput,
  els.homeButtonTextInput,
  els.homeButtonLinkInput,
  els.homeJsonInput,
].forEach((input) => input.addEventListener("input", markSettingsDirty));
els.imageUploadButton.addEventListener("click", () => uploadImage().catch((error) => setStatus(error.message, "error")));
els.documentImageInput.addEventListener("change", () => {
  const file = els.documentImageInput.files?.[0];
  uploadDocumentImage(file)
    .catch((error) => setStatus(error.message, "error"))
    .finally(() => {
      els.documentImageInput.value = "";
    });
});

boot();
