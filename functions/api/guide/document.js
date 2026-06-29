import {getDocumentByPathOrSlug, json, requireDb} from "../_shared/guide-db.js";

export async function onRequestGet({request, env}) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || url.searchParams.get("path") || "";
  const document = await getDocumentByPathOrSlug(requireDb(env), slug, false);
  if (!document) return json({error: "문서를 찾을 수 없습니다."}, 404);
  return json({document});
}
