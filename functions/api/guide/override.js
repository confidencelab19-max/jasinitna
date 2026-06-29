import {getOverride, json, normalizeGuidePath, pathToRoute} from "../_shared/overlay-db.js";

export async function onRequestGet({request, env}) {
  const url = new URL(request.url);
  const path = normalizeGuidePath(url.searchParams.get("path") || url.searchParams.get("slug"));
  if (!path) return json({override: null});

  try {
    const row = await getOverride(env.GUIDE_DB, path);
    if (!row || Number(row.published) !== 1) return json({override: null});
    return json({
      override: {
        path: row.path,
        route: pathToRoute(row.path),
        title: row.title,
        description: row.description || "",
        html: row.html || "",
        updatedAt: row.updated_at,
      },
    });
  } catch (error) {
    return json({error: error.message || "수정본을 불러오지 못했습니다."}, 500);
  }
}
