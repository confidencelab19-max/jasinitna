import {deleteOverride, getOverride, json, normalizeGuidePath, pathToRoute, saveOverride} from "../_shared/overlay-db.js";
import {requireSession, unauthorized} from "./_utils.js";

function cleanText(value, fallback = "") {
  return String(value || fallback).trim().slice(0, 400);
}

export async function onRequestGet({request, env}) {
  if (!(await requireSession(request, env))) return unauthorized();
  const url = new URL(request.url);
  const path = normalizeGuidePath(url.searchParams.get("path"));
  if (!path) return json({error: "문서 경로가 올바르지 않습니다."}, 400);

  try {
    const row = await getOverride(env.GUIDE_DB, path);
    return json({
      override: row
        ? {
            path: row.path,
            route: pathToRoute(row.path),
            title: row.title,
            description: row.description || "",
            html: row.html || "",
            published: Number(row.published) === 1,
            updatedAt: row.updated_at,
          }
        : null,
    });
  } catch (error) {
    return json({error: error.message || "수정본을 불러오지 못했습니다."}, 500);
  }
}

export async function onRequestPut({request, env}) {
  if (!(await requireSession(request, env))) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const path = normalizeGuidePath(body.path);
  if (!path) return json({error: "문서 경로가 올바르지 않습니다."}, 400);

  const title = cleanText(body.title);
  if (!title) return json({error: "문서 제목을 입력해야 합니다."}, 400);

  const saved = await saveOverride(env.GUIDE_DB, {
    path,
    title,
    description: cleanText(body.description),
    html: String(body.html || "").trim(),
    published: body.published !== false,
  });

  return json({saved: {...saved, route: pathToRoute(saved.path)}});
}

export async function onRequestDelete({request, env}) {
  if (!(await requireSession(request, env))) return unauthorized();
  const url = new URL(request.url);
  const path = normalizeGuidePath(url.searchParams.get("path"));
  if (!path) return json({error: "문서 경로가 올바르지 않습니다."}, 400);
  await deleteOverride(env.GUIDE_DB, path);
  return json({deleted: true, path, route: pathToRoute(path)});
}
