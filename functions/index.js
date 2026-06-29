import {requireDb} from "./api/_shared/guide-db.js";
import {renderHome} from "./_shared/render-guide.js";

export async function onRequestGet({env}) {
  return new Response(await renderHome(requireDb(env)), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
