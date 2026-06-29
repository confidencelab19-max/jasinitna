import {
  getDocumentByPathOrSlug,
  json as dbJson,
  normalizePath,
  requireDb,
  upsertDocument,
} from "../_shared/guide-db.js";
import {requireEnv, requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const url = new URL(request.url);
  const path = normalizePath(url.searchParams.get("path"));
  const data = await getDocumentByPathOrSlug(requireDb(env), path, true);
  if (!data) return dbJson({error: "문서를 찾을 수 없습니다."}, 404);

  return dbJson({document: data});
}

export async function onRequestPut({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const data = await upsertDocument(requireDb(env), body);

  return dbJson({ok: true, document: data, savedAt: new Date().toISOString()});
}
