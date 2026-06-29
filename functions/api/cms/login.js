import {createSessionCookie, json, requireEnv} from "./_utils.js";

export async function onRequestPost({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);

  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  const password = String(body.password || "");
  const expectedId = String(env.CMS_ID || "").trim();
  const expectedPassword = String(env.CMS_PASSWORD || "").trim();

  if (id !== expectedId || password !== expectedPassword) {
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
