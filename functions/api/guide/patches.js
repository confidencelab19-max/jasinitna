import {getPatches, json, normalizeGuidePath} from "../_shared/patch-db.js";

export async function onRequestGet({request, env}) {
  const url = new URL(request.url);
  const path = normalizeGuidePath(url.searchParams.get("path"));
  if (!path) return json({patches: []});

  try {
    const patches = await getPatches(env.GUIDE_DB, path);
    return json({patches});
  } catch (error) {
    return json({error: error.message || "수정 내용을 불러오지 못했습니다."}, 500);
  }
}
