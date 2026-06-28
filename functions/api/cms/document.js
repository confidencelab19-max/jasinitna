import {
  decodeContent,
  encodeContent,
  github,
  json,
  requireEnv,
  requireSession,
  unauthorized,
} from "./_utils.js";

function normalizePath(path) {
  return String(path || "").trim().replace(/^\/+/, "");
}

function isEditablePath(path) {
  return /^docs\/.+\.md$/.test(path) || path === "src/data/site.json" || path === "src/data/home.json";
}

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const url = new URL(request.url);
  const path = normalizePath(url.searchParams.get("path"));

  if (!isEditablePath(path)) {
    return json({error: "수정할 수 없는 파일 경로입니다."}, 400);
  }

  const data = await github(env, `/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`);

  return json({
    path,
    sha: data.sha,
    content: decodeContent(data.content || ""),
  });
}

export async function onRequestPut({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const path = normalizePath(body.path);
  const content = String(body.content || "");
  const message = String(body.message || "가이드 문서 수정").trim();

  if (!isEditablePath(path)) {
    return json({error: "docs 폴더의 Markdown 문서만 저장할 수 있습니다."}, 400);
  }

  let sha = String(body.sha || "");

  if (!sha) {
    try {
      const existing = await github(env, `/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`);
      sha = existing.sha;
    } catch {
      sha = "";
    }
  }

  const payload = {
    message,
    content: encodeContent(content),
    branch: "main",
    ...(sha ? {sha} : {}),
  };

  const data = await github(env, `/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return json({
    path,
    sha: data.content?.sha || "",
    commit: data.commit?.sha || "",
  });
}
