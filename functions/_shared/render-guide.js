import {docUrl, getDocumentByPathOrSlug, getSettings, listCategories, listDocuments} from "../api/_shared/guide-db.js";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeTrustedHtml(value = "") {
  return String(value)
    .replace(/className=/g, "class=")
    .replace(/\{\/\*([\s\S]*?)\*\/\}/g, "<!--$1-->")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
}

function renderMarkdownTable(lines, startIndex) {
  const rows = [];
  let index = startIndex;
  while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
    rows.push(lines[index]);
    index += 1;
  }
  if (rows.length < 2) return {html: "", nextIndex: startIndex};

  const cells = (row) =>
    row
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((cell) => cell.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  return {
    nextIndex: index,
    html: `<table><thead><tr>${head.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr></thead><tbody>${body
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
      .join("")}</tbody></table>`,
  };
}

function renderMixedContent(markdown = "") {
  const lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let list = "";
  const closeList = () => {
    if (list) html += `</${list}>`;
    list = "";
  };

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(raw) && index + 1 < lines.length && /^\s*\|[\s:-]+\|/.test(lines[index + 1])) {
      closeList();
      const table = renderMarkdownTable(lines, index);
      html += table.html;
      index = table.nextIndex - 1;
      continue;
    }
    if (line.startsWith("<")) {
      closeList();
      html += normalizeTrustedHtml(raw);
      continue;
    }
    if (line.startsWith("# ")) {
      closeList();
      html += `<h1>${escapeHtml(line.slice(2))}</h1>`;
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${escapeHtml(line.slice(4))}</h3>`;
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      if (list !== "ol") {
        closeList();
        html += "<ol>";
        list = "ol";
      }
      html += `<li>${escapeHtml(line.replace(/^\d+\.\s+/, ""))}</li>`;
      continue;
    }
    if (line.startsWith("- ")) {
      if (list !== "ul") {
        closeList();
        html += "<ul>";
        list = "ul";
      }
      html += `<li>${escapeHtml(line.slice(2))}</li>`;
      continue;
    }
    closeList();
    html += `<p>${escapeHtml(line)}</p>`;
  }
  closeList();
  return html;
}

function renderBlock(block) {
  if (block.type === "html") {
    return `<section class="guide-block">${renderMixedContent(block.html || block.text || "")}</section>`;
  }
  if (block.type === "heading") {
    return `<section class="guide-block"><h2>${escapeHtml(block.title)}</h2>${block.text ? `<p>${escapeHtml(block.text)}</p>` : ""}</section>`;
  }
  if (block.type === "note") {
    return `<aside class="guide-note"><strong>${escapeHtml(block.title || "확인해요")}</strong><p>${escapeHtml(block.text)}</p></aside>`;
  }
  if (block.type === "checklist") {
    return `<section class="guide-block"><h2>${escapeHtml(block.title || "체크리스트")}</h2><ul class="guide-checklist">${(block.items || [])
      .map((item) => `<li>${escapeHtml(item.text || item)}</li>`)
      .join("")}</ul></section>`;
  }
  if (block.type === "steps") {
    return `<section class="guide-block"><h2>${escapeHtml(block.title || "진행 순서")}</h2><div class="guide-steps">${(block.items || [])
      .map(
        (item, index) =>
          `<div class="guide-step"><em>${String(index + 1).padStart(2, "0")}</em><strong>${escapeHtml(
            item.title || item,
          )}</strong>${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}</div>`,
      )
      .join("")}</div></section>`;
  }
  if (block.type === "mockup") {
    return `<section class="guide-visual guide-visual--live"><div class="guide-visual__copy"><strong>${escapeHtml(
      block.title || "화면에서 이렇게 확인해요",
    )}</strong><p>${escapeHtml(block.text || "")}</p></div><div class="visual-screen"><div class="visual-screen__bar"></div><div class="visual-screen__body">${(block.rows || [])
      .map((row) => `<div class="visual-screen__row"><i></i><span>${escapeHtml(row.label || row)}</span><em>${escapeHtml(row.value || "확인")}</em></div>`)
      .join("")}<div class="visual-screen__table"><span></span><span></span><span></span></div></div></div></section>`;
  }
  if (block.type === "faq") {
    return `<section class="guide-block"><h2>${escapeHtml(block.title || "자주 묻는 질문")}</h2>${(block.items || [])
      .map((item) => `<details class="guide-faq"><summary>${escapeHtml(item.question || item.title || "")}</summary><p>${escapeHtml(item.answer || item.text || "")}</p></details>`)
      .join("")}</section>`;
  }
  return `<section class="guide-block"><p>${escapeHtml(block.text || "")}</p></section>`;
}

function renderDocumentBody(document) {
  const blocks = Array.isArray(document.blocks) ? document.blocks : [];
  if (blocks.length) return blocks.map(renderBlock).join("");
  return renderMixedContent(document.body || "");
}

function renderLayout({settings, title, description, body, sidebar = "", script = ""}) {
  const siteTitle = settings.site?.title || "자신있나 파트너 가이드";
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} | ${escapeHtml(siteTitle)}</title>
  <meta name="description" content="${escapeHtml(description || settings.site?.tagline || "")}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description || "")}" />
  <meta property="og:image" content="/img/social-card.png" />
  <link rel="icon" href="/img/logo.svg" />
  <link rel="stylesheet" href="/live-guide.css" />
</head>
<body>
  <header class="live-header">
    <a href="/" class="live-brand"><img src="${escapeHtml(settings.site?.logo || "/img/logo.svg")}" alt="자신있나" /><span>파트너 가이드</span></a>
    <nav><a href="/docs/start/first-day">입점 시작</a><a href="/docs/policy/medical-ad-law">의료광고</a><a href="/docs/faq/overview">FAQ</a></nav>
  </header>
  ${sidebar ? `<div class="live-doc-layout">${sidebar}<main class="live-main">${body}</main></div>` : body}
  ${script}
</body>
</html>`;
}

function renderSidebar(categories, documents, activeSlug = "") {
  return `<aside class="live-sidebar"><a class="live-sidebar__home" href="/">전체 가이드</a>${categories
    .map((category) => {
      const docs = documents.filter((doc) => doc.categorySlug === category.slug);
      return `<section><strong>${escapeHtml(category.title)}</strong>${docs
        .map(
          (doc) =>
            `<a href="${docUrl(doc)}" class="${doc.slug === activeSlug ? "is-active" : ""}">${escapeHtml(doc.title)}</a>`,
        )
        .join("")}</section>`;
    })
    .join("")}</aside>`;
}

async function renderHome(db) {
  const [settings, categories, documents] = await Promise.all([getSettings(db), listCategories(db), listDocuments(db)]);
  const banner = settings.home?.banner || {};
  const docsJson = escapeHtml(JSON.stringify(documents.map((doc) => ({...doc, link: docUrl(doc)}))));
  const body = `<main>
    <section class="live-hero">
      <div class="live-shell live-hero__inner">
        <div>
          <h1>${escapeHtml(banner.title || settings.site?.title || "자신있나 파트너 가이드")}</h1>
          <p>${escapeHtml(banner.description || settings.site?.tagline || "")}</p>
          <label class="live-search"><span>검색</span><input id="guide-search-input" placeholder="${escapeHtml(
            banner.searchPlaceholder || "필요한 가이드를 검색해요",
          )}" /></label>
          <div id="guide-search-results" class="live-search-results"></div>
          <a class="live-primary-link" href="${escapeHtml(banner.buttonLink || "/docs/start/first-day")}">${escapeHtml(
            banner.buttonText || "입점 첫날 가이드",
          )}</a>
        </div>
        <div class="live-start-panel">
          <strong>처음 입점하면 이 순서로 확인해요</strong>
          ${documents
            .slice(0, 7)
            .map((doc, index) => `<a href="${docUrl(doc)}"><em>${index + 1}</em><span>${escapeHtml(doc.title)}</span></a>`)
            .join("")}
        </div>
      </div>
    </section>
    <section class="live-section live-shell">
      <h2>전체 가이드</h2>
      <div class="live-category-grid">${categories
        .map(
          (category) =>
            `<a class="live-category-card" href="/docs/${category.slug}"><strong>${escapeHtml(category.title)}</strong><p>${escapeHtml(
              category.description,
            )}</p><span>${category.guideCount || 0}개 문서</span></a>`,
        )
        .join("")}</div>
    </section>
  </main>`;
  const script = `<script id="guide-docs-data" type="application/json">${docsJson}</script><script src="/live-guide.js"></script>`;
  return renderLayout({settings, title: settings.site?.title || "자신있나 파트너 가이드", description: settings.site?.tagline, body, script});
}

async function renderDoc(db, slug) {
  const [settings, categories, documents, document] = await Promise.all([
    getSettings(db),
    listCategories(db),
    listDocuments(db),
    getDocumentByPathOrSlug(db, slug, false),
  ]);

  if (!document) {
    return renderLayout({
      settings,
      title: "문서를 찾을 수 없어요",
      description: "",
      body: `<section class="live-empty"><h1>문서를 찾을 수 없어요</h1><p>주소가 바뀌었거나 아직 게시되지 않은 문서예요.</p><a href="/">전체 가이드로 이동</a></section>`,
    });
  }

  const sidebar = renderSidebar(categories, documents, document.slug);
  const body = `<article class="live-doc">
    <div class="live-doc__head"><span>${escapeHtml(document.category || "")}</span><h1>${escapeHtml(document.title)}</h1><p>${escapeHtml(
      document.description || "",
    )}</p></div>
    <div class="live-doc__body">${renderDocumentBody(document)}</div>
  </article>`;

  return renderLayout({settings, title: document.title, description: document.description, body, sidebar});
}

export {renderDoc, renderHome};
