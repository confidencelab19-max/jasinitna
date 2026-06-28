import {json, requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  const session = await requireSession(request, env);
  if (!session) {
    return unauthorized();
  }

  return json({ok: true, user: "admin", expiresAt: session.exp});
}
