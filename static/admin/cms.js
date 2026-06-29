const state = {
  documents: [],
  categories: [],
  activePath: "",
  activeDocument: null,
  blocks: [],
  settings: null,
  view: "documents",
  dirty: false,
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
  openPublicLink: document.querySelector("#open-public-link"),
  newDocButton: document.querySelector("#new-doc-button"),
  searchInput: document.querySelector("#search-input"),
  documentList: document.querySelector("#document-list"),
  currentTitle: document.querySelector("#current-title"),
  currentPath: document.querySelector("#current-path"),
  saveState: document.querySelector("#save-state"),
  titleInput: document.querySelector("#title-input"),
  descriptionInput: document.querySelector("#description-input"),
  categoryInput: document.querySelector("#category-input"),
  statusInput: document.querySelector("#status-input"),
  positionInput: document.querySelector("#position-input"),
  pathInput: document.querySelector("#path-input"),
  blockEditor: document.querySelector("#block-editor"),
  livePreviewFrame: document.querySelector("#live-preview-frame"),
  viewButtons: document.querySelectorAll("[data-view]"),
  documentsView: document.querySelector("#documents-view"),
  settingsView: document.querySelector("#settings-view"),
  imagesView: document.querySelector("#images-view"),
  siteTitleInput: document.querySelector("#site-title-input"),
  siteTaglineInput: document.querySelector("#site-tagline-input"),
  siteLogoInput: document.querySelector("#site-logo-input"),
  homeBannerTitleInput: document.querySelector("#home-banner-title-input"),
  homeBannerDescriptionInput: document.querySelector("#home-banner-description-input"),
  homeSearchPlaceholderInput: document.querySelector("#home-search-placeholder-input"),
  homeButtonTextInput: document.querySelector("#home-button-text-input"),
  homeButtonLinkInput: document.querySelector("#home-button-link-input"),
  imageFileInput: document.querySelector("#image-file-input"),
  imageUploadButton: document.querySelector("#image-upload-button"),
  imageUploadResult: document.querySelector("#image-upload-result"),
  imageList: document.querySelector("#image-list"),
};

function setStatus(message, type = "") {
  els.saveState.textContent = message;
  els.saveState.className = `cms-state${type ? ` is-${type}` : ""}`;
}

function setMode(mode) {
  document.body.classList.remove("cms-booting", "is-login", "is-authenticated");
  document.body.classList.add(mode);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: {"Content-Type": "application/json", ...(options.headers || {})},
    ...options,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    if (response.status === 401 && !path.endsWith("/login")) forceLogout("세션이 만료됐어요. 다시 로그인해 주세요.");
    throw new Error(data.error || "요청을 처리하지 못했어요.");
  }
  return data;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function docPathToUrl(path) {
  return `/${String(path || "").replace(/\.md$/, "")}`;
}

function showEditor() {
  els.loginPanel.hidden = true;
  els.editorPanel.hidden = false;
  els.logoutButton.hidden = false;
  els.saveButton.hidden = false;
  els.openPublicLink.hidden = false;
  setMode("is-authenticated");
  startSessionWatch();
}

function showLogin(message = "") {
  els.loginPanel.hidden = false;
  els.editorPanel.hidden = true;
  els.logoutButton.hidden = true;
  els.saveButton.hidden = true;
  els.openPublicLink.hidden = true;
  setMode("is-login");
  state.documents = [];
  state.activePath = "";
  state.activeDocument = null;
  state.blocks = [];
  state.dirty = false;
  stopSessionWatch();
  els.documentList.innerHTML = "";
  els.currentTitle.textContent = "로그인이 필요합니다";
  els.currentPath.textContent = "관리자 계정으로 로그인해 주세요.";
  els.loginError.textContent = message;
}

function forceLogout(message) {
  showLogin(message);
  setStatus("로그아웃됨");
}

function setView(view) {
  state.view = view;
  els.documentsView.hidden = view !== "documents";
  els.settingsView.hidden = view !== "settings";
  els.imagesView.hidden = view !== "images";
  els.newDocButton.hidden = view !== "documents";
  els.saveButton.textContent = view === "settings" ? "설정 저장" : "저장";
  els.viewButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));

  if (view === "settings") {
    els.currentTitle.textContent = "메인/설정";
    els.currentPath.textContent = "메인 배너와 사이트 문구를 관리해요.";
    loadSettings().catch((error) => setStatus(error.message, "error"));
  }
  if (view === "images") {
    els.currentTitle.textContent = "이미지";
    els.currentPath.textContent = "필요한 작은 이미지를 관리해요.";
    loadImages().catch((error) => setStatus(error.message, "error"));
  }
  if (view === "documents" && state.activeDocument) {
    els.currentTitle.textContent = state.activeDocument.title;
    els.currentPath.textContent = state.activeDocument.path;
  }
}

async function loadBootstrap() {
  const data = await api("/api/cms/bootstrap");
  state.categories = data.categories || [];
  renderCategoryOptions();
}

function renderCategoryOptions() {
  els.categoryInput.innerHTML = state.categories
    .map((category) => `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.title)}</option>`)
    .join("");
}

async function loadDocuments(options = {}) {
  if (!options.silent) setStatus("문서 불러오는 중");
  const data = await api("/api/cms/documents");
  state.documents = data.documents || [];
  renderDocuments();
  if (!options.silent) setStatus("문서 불러옴", "ok");
  if (state.documents.length && !state.activePath) await openDocument(state.documents[0].path);
}

function renderDocuments() {
  const keyword = els.searchInput.value.trim().toLowerCase();
  const filtered = state.documents.filter((doc) => {
    const haystack = `${doc.title} ${doc.path} ${doc.category || ""} ${doc.description || ""}`.toLowerCase();
    return !keyword || haystack.includes(keyword);
  });

  els.documentList.innerHTML = filtered
    .map(
      (doc) =>
        `<button type="button" class="cms-doc-item${doc.path === state.activePath ? " is-active" : ""}" data-path="${escapeHtml(
          doc.path,
        )}"><strong>${escapeHtml(doc.title)}</strong><span>${escapeHtml(doc.category || doc.path)}</span></button>`,
    )
    .join("");

  els.documentList.querySelectorAll("[data-path]").forEach((button) => {
    button.addEventListener("click", () => openDocument(button.dataset.path));
  });
}

function markDirty() {
  state.dirty = true;
  setStatus("수정 중");
}

function normalizeBlock(block) {
  return {
    id: block.id || crypto.randomUUID(),
    type: block.type || "heading",
    title: block.title || "",
    text: block.text || "",
    html: block.html || "",
    items: Array.isArray(block.items) ? block.items : [],
    rows: Array.isArray(block.rows) ? block.rows : [],
  };
}

function defaultBlock(type) {
  const id = crypto.randomUUID();
  if (type === "mockup") {
    return {
      id,
      type,
      title: "화면에서 이렇게 확인해요",
      text: "담당자가 확인해야 하는 핵심 영역을 순서대로 보여줘요.",
      rows: [
        {label: "상태 확인", value: "확인"},
        {label: "필수 입력", value: "작성"},
        {label: "저장", value: "완료"},
      ],
    };
  }
  if (type === "steps") {
    return {
      id,
      type,
      title: "진행 순서",
      items: [
        {title: "첫 번째 단계", text: "담당자가 먼저 확인할 내용을 적어 주세요."},
        {title: "두 번째 단계", text: "다음으로 처리할 내용을 적어 주세요."},
      ],
    };
  }
  if (type === "checklist") return {id, type, title: "체크리스트", items: [{text: "확인할 항목을 적어 주세요."}]};
  if (type === "faq") return {id, type, title: "자주 묻는 질문", items: [{question: "질문을 적어 주세요.", answer: "답변을 적어 주세요."}]};
  if (type === "note") return {id, type, title: "주의사항", text: "병원이 놓치면 안 되는 내용을 적어 주세요."};
  return {id, type: "heading", title: "문단 제목", text: "본문 내용을 적어 주세요."};
}

function blockTitle(type) {
  return {
    html: "기존 디자인 블록",
    heading: "문단",
    mockup: "화면 목업",
    steps: "순서도",
    checklist: "체크리스트",
    faq: "FAQ",
    note: "주의사항",
  }[type] || "블록";
}

function rowsToText(rows, type) {
  if (type === "mockup") return (rows || []).map((row) => `${row.label || ""}|${row.value || ""}`).join("\n");
  if (type === "faq") return (rows || []).map((row) => `${row.question || ""}|${row.answer || ""}`).join("\n");
  if (type === "steps") return (rows || []).map((row) => `${row.title || ""}|${row.text || ""}`).join("\n");
  return (rows || []).map((row) => row.text || row).join("\n");
}

function textToRows(value, type) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [first, ...rest] = line.split("|");
      const second = rest.join("|");
      if (type === "mockup") return {label: first.trim(), value: second.trim() || "확인"};
      if (type === "faq") return {question: first.trim(), answer: second.trim()};
      if (type === "steps") return {title: first.trim(), text: second.trim()};
      return {text: line};
    });
}

function renderBlocks() {
  els.blockEditor.innerHTML = state.blocks
    .map((block, index) => {
      const rowsValue =
        block.type === "mockup"
          ? rowsToText(block.rows, "mockup")
          : ["steps", "checklist", "faq"].includes(block.type)
            ? rowsToText(block.items, block.type)
            : "";
      return `<section class="cms-block-card" data-block-id="${escapeHtml(block.id)}">
        <div class="cms-block-card__head">
          <strong>${index + 1}. ${blockTitle(block.type)}</strong>
          <div>
            <button type="button" data-move-block="up">위</button>
            <button type="button" data-move-block="down">아래</button>
            <button type="button" data-remove-block>삭제</button>
          </div>
        </div>
        ${
          block.type === "html"
            ? `<label><span>기존 디자인 원문</span><textarea data-field="html" rows="12">${escapeHtml(block.html || block.text)}</textarea></label>`
            : `<label><span>제목</span><input data-field="title" value="${escapeHtml(block.title)}" /></label>`
        }
        ${block.type !== "html" && !["steps", "checklist", "faq", "mockup"].includes(block.type) ? `<label><span>내용</span><textarea data-field="text" rows="5">${escapeHtml(block.text)}</textarea></label>` : ""}
        ${block.type === "mockup" ? `<label><span>설명</span><textarea data-field="text" rows="3">${escapeHtml(block.text)}</textarea></label>` : ""}
        ${["steps", "checklist", "faq", "mockup"].includes(block.type) ? `<label><span>항목</span><textarea data-field="rows" rows="6">${escapeHtml(rowsValue)}</textarea><small>${block.type === "faq" ? "질문|답변 형식" : block.type === "mockup" ? "왼쪽 문구|상태 형식" : block.type === "steps" ? "단계명|설명 형식" : "한 줄에 항목 하나"}</small></label>` : ""}
      </section>`;
    })
    .join("");

  els.blockEditor.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const card = input.closest("[data-block-id]");
      const block = state.blocks.find((item) => item.id === card.dataset.blockId);
      if (!block) return;
      if (input.dataset.field === "rows") {
        if (block.type === "mockup") block.rows = textToRows(input.value, "mockup");
        else block.items = textToRows(input.value, block.type);
      } else {
        block[input.dataset.field] = input.value;
      }
      markDirty();
    });
  });

  els.blockEditor.querySelectorAll("[data-remove-block]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.closest("[data-block-id]").dataset.blockId;
      state.blocks = state.blocks.filter((block) => block.id !== id);
      markDirty();
      renderBlocks();
    });
  });

  els.blockEditor.querySelectorAll("[data-move-block]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.closest("[data-block-id]").dataset.blockId;
      const index = state.blocks.findIndex((block) => block.id === id);
      const direction = button.dataset.moveBlock === "up" ? -1 : 1;
      const next = index + direction;
      if (index < 0 || next < 0 || next >= state.blocks.length) return;
      [state.blocks[index], state.blocks[next]] = [state.blocks[next], state.blocks[index]];
      markDirty();
      renderBlocks();
    });
  });
}

async function openDocument(path) {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 다른 문서로 이동할까요?")) return;
  setStatus("문서 여는 중");
  const data = await api(`/api/cms/document?path=${encodeURIComponent(path)}`);
  const doc = data.document;
  state.activeDocument = doc;
  state.activePath = doc.path;
  state.blocks = (doc.blocks?.length ? doc.blocks : [{id: crypto.randomUUID(), type: "html", title: "기존 문서", html: doc.body || ""}]).map(normalizeBlock);
  state.dirty = false;

  els.titleInput.value = doc.title || "";
  els.descriptionInput.value = doc.description || "";
  els.categoryInput.value = doc.categorySlug || "";
  els.statusInput.value = doc.status || "published";
  els.positionInput.value = doc.position || 99;
  els.pathInput.value = doc.path || "";
  els.currentTitle.textContent = doc.title || "문서";
  els.currentPath.textContent = doc.path || "";
  els.openPublicLink.href = docPathToUrl(doc.path);
  els.livePreviewFrame.src = `${docPathToUrl(doc.path)}?cmsPreview=${Date.now()}`;
  renderDocuments();
  renderBlocks();
  setStatus("문서 열림", "ok");
}

function collectDocument() {
  return {
    path: els.pathInput.value.trim(),
    title: els.titleInput.value.trim(),
    description: els.descriptionInput.value.trim(),
    categorySlug: els.categoryInput.value,
    status: els.statusInput.value,
    position: Number(els.positionInput.value || 99),
    owner: "자신있나 파트너스",
    body: "",
    blocks: state.blocks,
  };
}

async function saveDocument() {
  const payload = collectDocument();
  if (!payload.path || !payload.title) {
    setStatus("제목과 경로를 입력해 주세요", "error");
    return;
  }

  setStatus("저장 중");
  els.saveButton.disabled = true;
  const data = await api("/api/cms/document", {method: "PUT", body: JSON.stringify(payload)});
  state.activeDocument = data.document;
  state.activePath = data.document.path;
  state.blocks = (data.document.blocks || []).map(normalizeBlock);
  state.dirty = false;
  els.currentTitle.textContent = data.document.title;
  els.currentPath.textContent = data.document.path;
  els.openPublicLink.href = docPathToUrl(data.document.path);
  els.livePreviewFrame.src = `${docPathToUrl(data.document.path)}?saved=${Date.now()}`;
  await loadDocuments({silent: true});
  setStatus("저장됨 · 공개 페이지에 바로 반영됐어요", "ok");
  els.saveButton.disabled = false;
}

function createNewDocument() {
  if (state.dirty && !window.confirm("저장하지 않은 수정 내용이 있어요. 새 문서를 만들까요?")) return;
  const today = new Date().toISOString().slice(0, 10);
  const category = state.categories[0]?.slug || "start";
  state.activePath = "";
  state.activeDocument = null;
  state.blocks = [defaultBlock("mockup"), defaultBlock("steps"), defaultBlock("checklist")];
  state.dirty = true;
  els.titleInput.value = "새 가이드 문서";
  els.descriptionInput.value = "병원이 이 문서에서 무엇을 따라 하면 되는지 적어 주세요.";
  els.categoryInput.value = category;
  els.statusInput.value = "draft";
  els.positionInput.value = 99;
  els.pathInput.value = `docs/${category}/new-guide-${today}.md`;
  els.currentTitle.textContent = "새 가이드 문서";
  els.currentPath.textContent = els.pathInput.value;
  els.livePreviewFrame.removeAttribute("src");
  renderBlocks();
  setStatus("작성 중");
}

async function loadSettings() {
  setStatus("설정 불러오는 중");
  const data = await api("/api/cms/settings");
  state.settings = {site: data.site.value, home: data.home.value};
  const banner = state.settings.home.banner || {};
  els.siteTitleInput.value = state.settings.site.title || "";
  els.siteTaglineInput.value = state.settings.site.tagline || "";
  els.siteLogoInput.value = state.settings.site.logo || "";
  els.homeBannerTitleInput.value = banner.title || "";
  els.homeBannerDescriptionInput.value = banner.description || "";
  els.homeSearchPlaceholderInput.value = banner.searchPlaceholder || "";
  els.homeButtonTextInput.value = banner.buttonText || "";
  els.homeButtonLinkInput.value = banner.buttonLink || "";
  setStatus("설정 불러옴", "ok");
}

async function saveSettings() {
  const site = {
    ...(state.settings?.site || {}),
    title: els.siteTitleInput.value.trim(),
    tagline: els.siteTaglineInput.value.trim(),
    logo: els.siteLogoInput.value.trim() || "/img/logo.svg",
  };
  const home = {
    ...(state.settings?.home || {}),
    banner: {
      ...(state.settings?.home?.banner || {}),
      title: els.homeBannerTitleInput.value.trim(),
      description: els.homeBannerDescriptionInput.value.trim(),
      searchPlaceholder: els.homeSearchPlaceholderInput.value.trim(),
      buttonText: els.homeButtonTextInput.value.trim(),
      buttonLink: els.homeButtonLinkInput.value.trim(),
    },
  };

  setStatus("설정 저장 중");
  const data = await api("/api/cms/settings", {
    method: "PUT",
    body: JSON.stringify({site: {value: site}, home: {value: home}}),
  });
  state.settings = data.settings;
  setStatus("설정 저장됨 · 공개 메인에 바로 반영됐어요", "ok");
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
  els.imageList.innerHTML = (data.images || []).length
    ? data.images
        .map(
          (image) =>
            `<div class="cms-image-item"><img src="${escapeHtml(image.url)}" alt="" /><div><strong>${escapeHtml(
              image.name,
            )}</strong><input readonly value="${escapeHtml(image.url)}" /></div></div>`,
        )
        .join("")
    : '<p class="cms-help-text">아직 업로드된 이미지가 없어요.</p>';
  setStatus("이미지 불러옴", "ok");
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
    body: JSON.stringify({name: file.name, type: file.type, content: await fileToBase64(file)}),
  });
  els.imageUploadResult.textContent = `업로드 완료: ${result.url}`;
  els.imageFileInput.value = "";
  await loadImages();
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
    await loadBootstrap();
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
  showLogin();
  setStatus("로그아웃됨");
}

async function saveCurrentView() {
  if (state.view === "settings") return saveSettings();
  if (state.view === "images") {
    setStatus("이미지는 업로드 버튼으로 저장돼요", "ok");
    return null;
  }
  return saveDocument();
}

async function boot() {
  try {
    await api("/api/cms/me");
    showEditor();
    await loadBootstrap();
    await loadDocuments();
  } catch {
    showLogin();
    setStatus("대기 중");
  }
}

els.loginForm.addEventListener("submit", login);
els.logoutButton.addEventListener("click", logout);
els.saveButton.addEventListener("click", () => saveCurrentView().catch((error) => {
  els.saveButton.disabled = false;
  setStatus(error.message, "error");
}));
els.newDocButton.addEventListener("click", createNewDocument);
els.searchInput.addEventListener("input", renderDocuments);
els.viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
document.querySelectorAll("[data-add-block]").forEach((button) => {
  button.addEventListener("click", () => {
    state.blocks.push(defaultBlock(button.dataset.addBlock));
    markDirty();
    renderBlocks();
  });
});
[els.titleInput, els.descriptionInput, els.categoryInput, els.statusInput, els.positionInput, els.pathInput].forEach((input) => {
  input.addEventListener("input", () => {
    els.currentTitle.textContent = els.titleInput.value || "문서";
    els.currentPath.textContent = els.pathInput.value || "";
    markDirty();
  });
});
[
  els.siteTitleInput,
  els.siteTaglineInput,
  els.siteLogoInput,
  els.homeBannerTitleInput,
  els.homeBannerDescriptionInput,
  els.homeSearchPlaceholderInput,
  els.homeButtonTextInput,
  els.homeButtonLinkInput,
].forEach((input) => input.addEventListener("input", () => setStatus("설정 수정 중")));
els.imageUploadButton.addEventListener("click", () => uploadImage().catch((error) => setStatus(error.message, "error")));

boot();
