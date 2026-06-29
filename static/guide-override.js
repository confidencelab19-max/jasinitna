(() => {
  const ROOT_SELECTOR = ".theme-doc-markdown.markdown, article .markdown";
  let cachedOverride = null;
  let appliedHtml = "";

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

  function renderHtml(override) {
    const description = override.description ? `<p class="cms-live-description">${escapeHtml(override.description)}</p>` : "";
    return `<header class="cms-live-header"><h1>${escapeHtml(override.title)}</h1>${description}</header>${override.html}`;
  }

  function apply() {
    const override = cachedOverride;
    const root = document.querySelector(ROOT_SELECTOR);
    if (!root || !override || !override.html) return false;

    const nextHtml = renderHtml(override);
    if (root.innerHTML !== nextHtml) root.innerHTML = nextHtml;
    appliedHtml = nextHtml;

    document.title = `${override.title} | 자신있나 파트너 가이드`;
    const activeItems = document.querySelectorAll(".menu__link--active, .breadcrumbs__link[aria-current='page']");
    activeItems.forEach((item) => {
      item.textContent = override.title;
    });
    document.documentElement.setAttribute("data-cms-live", "true");
    return true;
  }

  async function load() {
    const path = routePath();
    if (!path) return;
    try {
      const res = await fetch(`/api/guide/override?path=${encodeURIComponent(path)}&t=${Date.now()}`, {cache: "no-store"});
      if (!res.ok) return;
      const data = await res.json();
      if (!data.override) return;
      cachedOverride = data.override;
      apply();
      [100, 400, 900, 1800, 3200].forEach((delay) => window.setTimeout(apply, delay));
      const observer = new MutationObserver(() => {
        const root = document.querySelector(ROOT_SELECTOR);
        if (root && appliedHtml && root.innerHTML !== appliedHtml) apply();
      });
      observer.observe(document.body, {childList: true, subtree: true});
      window.setTimeout(() => observer.disconnect(), 6000);
    } catch {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, {once: true});
  else load();
})();
