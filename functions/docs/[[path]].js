import {requireDb} from "../api/_shared/guide-db.js";
import {renderDoc} from "../_shared/render-guide.js";

export async function onRequestGet({params, env}) {
  const slug = Array.isArray(params.path) ? params.path.join("/") : String(params.path || "");
  return new Response(await renderDoc(requireDb(env), slug), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
