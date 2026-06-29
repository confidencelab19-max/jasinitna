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

export async function ensurePatchTable(db) {
  if (!db) throw new Error("GUIDE_DB binding is missing");
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS guide_text_patches (
      path TEXT NOT NULL,
      key TEXT NOT NULL,
      text TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (path, key)
    )`,
  ).run();
}

export async function getPatches(db, path) {
  await ensurePatchTable(db);
  const result = await db
    .prepare("SELECT key, text, updated_at FROM guide_text_patches WHERE path = ? ORDER BY key")
    .bind(path)
    .all();
  return result.results || [];
}

export async function replacePatches(db, path, patches) {
  await ensurePatchTable(db);
  const now = new Date().toISOString();
  await db.prepare("DELETE FROM guide_text_patches WHERE path = ?").bind(path).run();
  const statement = db.prepare(
    "INSERT INTO guide_text_patches (path, key, text, updated_at) VALUES (?, ?, ?, ?)",
  );
  for (const patch of patches) {
    const key = String(patch.key || "").trim();
    if (!/^t:\d+$/.test(key)) continue;
    await statement.bind(path, key, String(patch.text || ""), now).run();
  }
  return {updated_at: now};
}

export async function deletePatches(db, path) {
  await ensurePatchTable(db);
  await db.prepare("DELETE FROM guide_text_patches WHERE path = ?").bind(path).run();
}
