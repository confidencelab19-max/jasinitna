import {json as dbJson, requireDb} from "../_shared/guide-db.js";
import {requireEnv, requireSession, unauthorized} from "./_utils.js";

const ALLOWED_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif", "svg"]);

function safeFileName(name) {
  const normalized = String(name || "image").toLowerCase();
  const ext = normalized.split(".").pop().replace(/[^a-z0-9]/g, "");
  const base = normalized
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9가-힣_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  return {
    base: base || "image",
    ext: ALLOWED_EXTENSIONS.has(ext) ? ext : "",
  };
}

function today() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const result = await requireDb(env)
    .prepare("SELECT id, name, content_type AS contentType, created_at AS createdAt FROM guide_images ORDER BY created_at DESC")
    .all();
  const files = (result.results || []).map((item) => ({
    ...item,
    url: `/api/guide/image?id=${encodeURIComponent(item.id)}`,
  }));

  return dbJson({images: files});
}

export async function onRequestPost({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const fileName = safeFileName(body.name);
  const content = String(body.content || "");
  const contentType = String(body.type || `image/${fileName.ext === "jpg" ? "jpeg" : fileName.ext}`);

  if (!fileName.ext) {
    return dbJson({error: "png, jpg, jpeg, webp, gif, svg 이미지만 업로드할 수 있습니다."}, 400);
  }

  if (!content) {
    return dbJson({error: "업로드할 이미지 파일이 없습니다."}, 400);
  }

  if (content.length > 1000 * 1000) {
    return dbJson({error: "이미지는 750KB 이하 파일만 업로드해 주세요."}, 400);
  }

  const uniqueName = `${today()}-${Date.now()}-${fileName.base}.${fileName.ext}`;
  const id = crypto.randomUUID();
  const publicUrl = `/api/guide/image?id=${encodeURIComponent(id)}`;
  const dataUrl = `data:${contentType};base64,${content}`;

  await requireDb(env)
    .prepare("INSERT INTO guide_images (id, name, content_type, data_url) VALUES (?, ?, ?, ?)")
    .bind(id, uniqueName, contentType, dataUrl)
    .run();

  return dbJson({
    id,
    name: uniqueName,
    url: publicUrl,
    savedAt: new Date().toISOString(),
  });
}
