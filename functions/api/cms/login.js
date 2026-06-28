import {createSessionCookie, json, requireEnv} from "./_utils.js";

export async function onRequestPost({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);

  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  const password = String(body.password || "");

  if (id !== env.CMS_ID || password !== env.CMS_PASSWORD) {
    return json({error: "아이디 또는 비밀번호가 맞지 않습니다."}, 401);
  }

  const session = await createSessionCookie(env);

  return json(
    {ok: true, expiresAt: session.expiresAt},
    200,
    {
      "Set-Cookie": session.cookie,
    },
  );
}
