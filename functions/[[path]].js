import {requireDb} from "./api/_shared/guide-db.js";
import {renderHome} from "./_shared/render-guide.js";

export async function onRequestGet({request, params, env}) {
  const path = Array.isArray(params.path) ? params.path.join("/") : String(params.path || "");
  if (!path) {
    return new Response(await renderHome(requireDb(env)), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  return env.ASSETS.fetch(request);
}
