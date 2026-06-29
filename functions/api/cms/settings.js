import {getSettings, json as dbJson, putSetting, requireDb} from "../_shared/guide-db.js";
import {requireEnv, requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const settings = await getSettings(requireDb(env));
  return dbJson({
    site: {value: settings.site},
    home: {value: settings.home},
  });
}

export async function onRequestPut({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const db = requireDb(env);

  if (body.site?.value) await putSetting(db, "site", body.site.value);
  if (body.home?.value) await putSetting(db, "home", body.home.value);

  return dbJson({ok: true, settings: await getSettings(db), savedAt: new Date().toISOString()});
}
