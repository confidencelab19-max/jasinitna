export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export function normalizeGuidePath(value) {
  let path = String(value || "").trim();
  if (!path) return "";
  try {
    path = decodeURIComponent(path);
  } catch {}
  path = path.replace(/^https?:\/\/[^/]+/i, "");
  path = path.replace(/\?.*$/, "").replace(/#.*$/, "");
  path = path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!path) return "";
  if (path.startsWith("docs/") && !path.endsWith(".md")) path = `${path}.md`;
  if (!path.startsWith("docs/")) path = `docs/${path}`;
  return /^docs\/[a-z0-9/_-]+\.md$/i.test(path) ? path : "";
}

export function pathToRoute(path) {
  const normalized = normalizeGuidePath(path);
  return normalized ? `/${normalized.replace(/\.md$/, "")}` : "/";
}

export async function ensureOverlayTable(db) {
  if (!db) throw new Error("GUIDE_DB binding is missing");
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS guide_overrides (
      path TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      html TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
  ).run();
}

export async function getOverride(db, path) {
  await ensureOverlayTable(db);
  return db
    .prepare("SELECT path, title, description, html, published, updated_at FROM guide_overrides WHERE path = ?")
    .bind(path)
    .first();
}

export async function saveOverride(db, input) {
  await ensureOverlayTable(db);
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO guide_overrides (path, title, description, html, published, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(path) DO UPDATE SET
         title = excluded.title,
         description = excluded.description,
         html = excluded.html,
         published = excluded.published,
         updated_at = excluded.updated_at`,
    )
    .bind(input.path, input.title, input.description || "", input.html || "", input.published ? 1 : 0, now)
    .run();
  return {...input, updated_at: now};
}

export async function deleteOverride(db, path) {
  await ensureOverlayTable(db);
  await db.prepare("DELETE FROM guide_overrides WHERE path = ?").bind(path).run();
}
