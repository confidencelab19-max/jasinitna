(() => {
  const ROOT_SELECTOR = ".theme-doc-markdown.markdown";
  let cachedPatches = new Map();

  function routePath() {
    const path = window.location.pathname.replace(/\/+$/, "");
    if (!path.startsWith("/docs/")) return "";
    return `${path.slice(1)}.md`;
  }

  function collectTextNodes(root) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
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

  function applyPatches() {
    const root = document.querySelector(ROOT_SELECTOR);
    if (!root || !cachedPatches.size) return false;
    const nodes = collectTextNodes(root);
    nodes.forEach((node, index) => {
      const key = `t:${index}`;
      if (cachedPatches.has(key) && node.nodeValue !== cachedPatches.get(key)) {
        node.nodeValue = cachedPatches.get(key);
      }
    });
    const title = root.querySelector("h1")?.textContent?.trim();
    if (title) {
      document.title = `${title} | 자신있나 파트너 가이드`;
      document.querySelectorAll(".menu__link--active, .breadcrumbs__link[aria-current='page']").forEach((item) => {
        item.textContent = title;
      });
    }
    document.documentElement.setAttribute("data-cms-live", "patch");
    return true;
  }

  async function load() {
    const path = routePath();
    if (!path) return;
    try {
      const res = await fetch(`/api/guide/patches?path=${encodeURIComponent(path)}&t=${Date.now()}`, {cache: "no-store"});
      if (!res.ok) return;
      const data = await res.json();
      cachedPatches = new Map((data.patches || []).map((patch) => [patch.key, patch.text]));
      if (!cachedPatches.size) return;
      applyPatches();
      [100, 400, 900, 1800, 3200].forEach((delay) => window.setTimeout(applyPatches, delay));
      const observer = new MutationObserver(applyPatches);
      observer.observe(document.body, {childList: true, subtree: true, characterData: true});
      window.setTimeout(() => observer.disconnect(), 6000);
    } catch {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, {once: true});
  else load();
})();
