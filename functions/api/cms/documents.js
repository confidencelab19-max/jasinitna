import {json as dbJson, listDocuments, requireDb} from "../_shared/guide-db.js";
import {requireEnv, requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const documents = await listDocuments(requireDb(env), true);

  return dbJson({documents});
}
