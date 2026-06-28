import {json, requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  if (!(await requireSession(request, env))) {
    return unauthorized();
  }

  return json({ok: true, user: "admin"});
}
