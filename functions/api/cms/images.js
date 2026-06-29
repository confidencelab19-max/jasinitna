import {github, json, requireEnv, requireSession, triggerDeploy, unauthorized} from "./_utils.js";

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
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  let files = [];
  try {
    const items = await github(env, "/contents/static/img/uploads");
    files = Array.isArray(items)
      ? items
          .filter((item) => item.type === "file" && ALLOWED_EXTENSIONS.has(item.name.split(".").pop().toLowerCase()))
          .map((item) => ({
            name: item.name,
            path: item.path,
            url: `/img/uploads/${item.name}`,
            size: item.size || 0,
          }))
      : [];
  } catch {
    files = [];
  }

  return json({images: files});
}

export async function onRequestPost({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const fileName = safeFileName(body.name);
  const content = String(body.content || "");

  if (!fileName.ext) {
    return json({error: "png, jpg, jpeg, webp, gif, svg 이미지만 업로드할 수 있습니다."}, 400);
  }

  if (!content) {
    return json({error: "업로드할 이미지 파일이 없습니다."}, 400);
  }

  const uniqueName = `${today()}-${Date.now()}-${fileName.base}.${fileName.ext}`;
  const gitPath = `static/img/uploads/${uniqueName}`;
  const publicUrl = `/img/uploads/${uniqueName}`;

  const result = await github(env, `/contents/${gitPath}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `이미지 업로드: ${uniqueName}`,
      content,
      branch: "main",
    }),
  });

  return json({
    name: uniqueName,
    path: gitPath,
    url: publicUrl,
    sha: result.content?.sha || "",
    deploy: await triggerDeploy(env),
  });
}
