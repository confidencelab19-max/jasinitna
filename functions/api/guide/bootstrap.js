import {docUrl, getSettings, json, listCategories, listDocuments, requireDb} from "../_shared/guide-db.js";

export async function onRequestGet({env}) {
  const db = requireDb(env);
  const [settings, categories, documents] = await Promise.all([
    getSettings(db),
    listCategories(db),
    listDocuments(db, false),
  ]);

  return json({
    settings,
    categories: categories.map((category) => ({
      ...category,
      link: `/docs/${category.slug}`,
    })),
    documents: documents.map((doc) => ({
      ...doc,
      link: docUrl(doc),
    })),
  });
}
