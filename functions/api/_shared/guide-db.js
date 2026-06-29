const DEFAULT_SETTINGS = {
  site: {
    title: "자신있나 파트너 가이드",
    tagline: "병원 담당자를 위한 운영 가이드",
    logo: "/img/logo.svg",
  },
  home: {
    banner: {
      title: "자신있나 파트너 가이드",
      description:
        "입점 후 병원 정보, 이벤트, 광고, 상담, 예약을 어떤 순서로 관리해야 하는지 바로 확인할 수 있어요.",
      searchPlaceholder: "병원 정보, 이벤트 검수, 상담 관리, 광고 잔고 검색",
      buttonText: "입점 첫날 가이드",
      buttonLink: "/docs/start/first-day",
    },
  },
};

const CATEGORY_BY_FOLDER = {
  start: "한눈에 보는 사용법",
  hospital: "병원·의사 관리",
  events: "이벤트 관리",
  ads: "광고 관리",
  customers: "고객 관리",
  appointments: "예약 관리",
  payments: "충전·환불 관리",
  policy: "운영 정책·의료광고",
  faq: "FAQ",
  glossary: "용어 사전",
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getDb(env) {
  return env.GUIDE_DB || env.DB || null;
}

function requireDb(env) {
  const db = getDb(env);
  if (!db) throw new Error("Cloudflare D1 GUIDE_DB binding is not configured.");
  return db;
}

function normalizePath(path) {
  const normalized = String(path || "").trim().replace(/^\/+/, "");
  if (!normalized) return "";
  if (normalized.startsWith("docs/") && normalized.endsWith(".md")) return normalized;
  if (normalized.startsWith("docs/")) return `${normalized.replace(/\/$/, "")}.md`;
  return normalized;
}

function pathToSlug(path) {
  return normalizePath(path).replace(/^docs\//, "").replace(/\.md$/, "");
}

function slugToPath(slug) {
  return `docs/${String(slug || "").replace(/^\/+|\/+$/g, "")}.md`;
}

function docUrl(doc) {
  return `/docs/${doc.slug || pathToSlug(doc.path)}`;
}

function getCategoryTitle(slug) {
  return CATEGORY_BY_FOLDER[slug] || slug || "가이드";
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

async function getSetting(db, key, fallback) {
  const row = await db.prepare("SELECT value_json FROM guide_settings WHERE key = ?").bind(key).first();
  return parseJson(row?.value_json, fallback);
}

async function putSetting(db, key, value) {
  await db
    .prepare(
      `INSERT INTO guide_settings (key, value_json, updated_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = CURRENT_TIMESTAMP`,
    )
    .bind(key, JSON.stringify(value))
    .run();
}

async function getSettings(db) {
  const [site, home] = await Promise.all([
    getSetting(db, "site", DEFAULT_SETTINGS.site),
    getSetting(db, "home", DEFAULT_SETTINGS.home),
  ]);
  return {site, home};
}

async function listCategories(db) {
  return db
    .prepare(
      `SELECT c.slug, c.title, c.description, c.position, c.icon,
              COUNT(d.path) AS guideCount
       FROM guide_categories c
       LEFT JOIN guide_documents d
         ON d.category_slug = c.slug AND d.status = 'published'
       GROUP BY c.slug
       ORDER BY c.position ASC, c.title ASC`,
    )
    .all()
    .then((result) => result.results || []);
}

async function listDocuments(db, includeDrafts = false) {
  const where = includeDrafts ? "" : "WHERE d.status = 'published'";
  const result = await db
    .prepare(
      `SELECT d.path, d.slug, d.title, d.description, d.category_slug AS categorySlug,
              d.position, d.status, d.owner, d.updated_at AS updatedAt,
              c.title AS category
       FROM guide_documents d
       LEFT JOIN guide_categories c ON c.slug = d.category_slug
       ${where}
       ORDER BY c.position ASC, d.position ASC, d.title ASC`,
    )
    .all();
  return result.results || [];
}

async function getDocumentByPathOrSlug(db, value, includeDrafts = false) {
  const normalized = normalizePath(value);
  const slug = pathToSlug(normalized || value);
  const statusClause = includeDrafts ? "" : "AND d.status = 'published'";
  const row = await db
    .prepare(
      `SELECT d.path, d.slug, d.title, d.description, d.category_slug AS categorySlug,
              d.position, d.status, d.owner, d.body, d.blocks_json AS blocksJson,
              d.updated_at AS updatedAt, c.title AS category
       FROM guide_documents d
       LEFT JOIN guide_categories c ON c.slug = d.category_slug
       WHERE (d.path = ? OR d.slug = ?) ${statusClause}
       LIMIT 1`,
    )
    .bind(normalized, slug)
    .first();
  if (!row) return null;
  return {
    ...row,
    blocks: parseJson(row.blocksJson, []),
  };
}

function normalizeBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block) => ({
      id: String(block.id || crypto.randomUUID()),
      type: String(block.type || "text"),
      title: String(block.title || ""),
      text: String(block.text || ""),
      html: String(block.html || ""),
      items: Array.isArray(block.items) ? block.items : [],
      rows: Array.isArray(block.rows) ? block.rows : [],
    }))
    .filter((block) => block.type);
}

async function upsertDocument(db, input) {
  const path = normalizePath(input.path);
  if (!/^docs\/.+\.md$/.test(path)) {
    throw new Error("문서 경로는 docs/로 시작하고 .md로 끝나야 합니다.");
  }

  const slug = pathToSlug(path);
  const title = String(input.title || "새 가이드 문서").trim();
  const description = String(input.description || "").trim();
  const categorySlug = String(input.categorySlug || slug.split("/")[0] || "start").trim();
  const status = String(input.status || "published").trim();
  const owner = String(input.owner || "자신있나 파트너스").trim();
  const body = String(input.body || "").trim();
  const blocks = normalizeBlocks(input.blocks);
  const position = Number.isFinite(Number(input.position)) ? Number(input.position) : 99;
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  await db
    .prepare(
      `INSERT OR IGNORE INTO guide_categories (slug, title, description, position, icon)
       VALUES (?, ?, '', 99, 'file')`,
    )
    .bind(categorySlug, getCategoryTitle(categorySlug))
    .run();

  await db
    .prepare(
      `INSERT INTO guide_documents
        (path, slug, title, description, category_slug, position, status, owner, body, blocks_json, updated_at, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
       ON CONFLICT(path) DO UPDATE SET
        slug = excluded.slug,
        title = excluded.title,
        description = excluded.description,
        category_slug = excluded.category_slug,
        position = excluded.position,
        status = excluded.status,
        owner = excluded.owner,
        body = excluded.body,
        blocks_json = excluded.blocks_json,
        updated_at = CURRENT_TIMESTAMP,
        published_at = excluded.published_at`,
    )
    .bind(path, slug, title, description, categorySlug, position, status, owner, body, JSON.stringify(blocks), publishedAt)
    .run();

  return getDocumentByPathOrSlug(db, path, true);
}

export {
  DEFAULT_SETTINGS,
  docUrl,
  getDocumentByPathOrSlug,
  getSettings,
  json,
  listCategories,
  listDocuments,
  normalizePath,
  pathToSlug,
  putSetting,
  requireDb,
  slugToPath,
  upsertDocument,
};
