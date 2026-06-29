(() => {
  const ROOT_SELECTOR = ".theme-doc-markdown.markdown, article .markdown, main article";

  function routePath() {
    const path = window.location.pathname.replace(/\/+$/, "");
    if (!path.startsWith("/docs/")) return "";
    return `${path.slice(1)}.md`;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function apply(override) {
    const root = document.querySelector(ROOT_SELECTOR);
    if (!root || !override || !override.html) return;
    const description = override.description ? `<p class="cms-live-description">${escapeHtml(override.description)}</p>` : "";
    root.innerHTML = `<header class="cms-live-header"><h1>${escapeHtml(override.title)}</h1>${description}</header>${override.html}`;
    document.title = `${override.title} | 자신있나 파트너 가이드`;
    const activeMenu = document.querySelector(".menu__link--active, .breadcrumbs__link[aria-current='page']");
    if (activeMenu) activeMenu.textContent = override.title;
    document.documentElement.setAttribute("data-cms-live", "true");
  }

  async function load() {
    const path = routePath();
    if (!path) return;
    try {
      const res = await fetch(`/api/guide/override?path=${encodeURIComponent(path)}&t=${Date.now()}`, {cache: "no-store"});
      if (!res.ok) return;
      const data = await res.json();
      if (data.override) apply(data.override);
    } catch {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, {once: true});
  else load();
})();
