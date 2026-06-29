import {deletePatches, getPatches, json, normalizeGuidePath, pathToRoute, replacePatches} from "../_shared/patch-db.js";
import {requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  if (!(await requireSession(request, env))) return unauthorized();
  const url = new URL(request.url);
  const path = normalizeGuidePath(url.searchParams.get("path"));
  if (!path) return json({error: "문서 경로가 올바르지 않습니다."}, 400);
  const patches = await getPatches(env.GUIDE_DB, path);
  return json({path, route: pathToRoute(path), patches});
}

export async function onRequestPut({request, env}) {
  if (!(await requireSession(request, env))) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const path = normalizeGuidePath(body.path);
  if (!path) return json({error: "문서 경로가 올바르지 않습니다."}, 400);
  const patches = Array.isArray(body.patches) ? body.patches : [];
  if (patches.length > 800) return json({error: "한 문서에서 저장할 수 있는 문장 수를 초과했습니다."}, 400);
  const saved = await replacePatches(env.GUIDE_DB, path, patches);
  return json({saved: {path, route: pathToRoute(path), count: patches.length, updatedAt: saved.updated_at}});
}

export async function onRequestDelete({request, env}) {
  if (!(await requireSession(request, env))) return unauthorized();
  const url = new URL(request.url);
  const path = normalizeGuidePath(url.searchParams.get("path"));
  if (!path) return json({error: "문서 경로가 올바르지 않습니다."}, 400);
  await deletePatches(env.GUIDE_DB, path);
  return json({deleted: true, path, route: pathToRoute(path)});
}
