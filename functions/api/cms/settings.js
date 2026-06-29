import {
  decodeContent,
  encodeContent,
  github,
  json,
  requireEnv,
  requireSession,
  triggerDeploy,
  unauthorized,
} from "./_utils.js";

const FILES = {
  site: "src/data/site.json",
  home: "src/data/home.json",
};

async function readJsonFile(env, key) {
  const path = FILES[key];
  const data = await github(env, `/contents/${path}`);
  return {
    path,
    sha: data.sha,
    value: JSON.parse(decodeContent(data.content || "")),
  };
}

async function writeJsonFile(env, key, value, sha) {
  const path = FILES[key];
  return github(env, `/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `${key === "site" ? "사이트 설정" : "홈 화면 설정"} 수정`,
      content: encodeContent(`${JSON.stringify(value, null, 2)}\n`),
      sha,
      branch: "main",
    }),
  });
}

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const [site, home] = await Promise.all([readJsonFile(env, "site"), readJsonFile(env, "home")]);
  return json({site, home});
}

export async function onRequestPut({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const result = {};

  if (body.site?.value && body.site?.sha) {
    const data = await writeJsonFile(env, "site", body.site.value, body.site.sha);
    result.site = {sha: data.content?.sha || ""};
  }

  if (body.home?.value && body.home?.sha) {
    const data = await writeJsonFile(env, "home", body.home.value, body.home.sha);
    result.home = {sha: data.content?.sha || ""};
  }

  return json({ok: true, ...result, deploy: await triggerDeploy(env)});
}
