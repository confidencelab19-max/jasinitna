import {docUrl, getSettings, json as dbJson, listCategories, listDocuments, requireDb} from "../_shared/guide-db.js";
import {requireEnv, requireSession, unauthorized} from "./_utils.js";

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return dbJson({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const db = requireDb(env);
  const [settings, categories, documents] = await Promise.all([getSettings(db), listCategories(db), listDocuments(db, true)]);
  return dbJson({
    settings,
    categories: categories.map((category) => ({...category, link: `/docs/${category.slug}`})),
    documents: documents.map((doc) => ({...doc, link: docUrl(doc)})),
  });
}
