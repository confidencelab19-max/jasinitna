import {
  decodeContent,
  getDescription,
  getTitle,
  github,
  json,
  requireEnv,
  requireSession,
  unauthorized,
} from "./_utils.js";

const EDITABLE_DOC_PATTERN = /^docs\/.+\.md$/;

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const tree = await github(env, "/git/trees/main?recursive=1");
  const files = tree.tree
    .filter((item) => item.type === "blob" && EDITABLE_DOC_PATTERN.test(item.path))
    .sort((a, b) => a.path.localeCompare(b.path, "ko"));

  const documents = await Promise.all(
    files.map(async (file) => {
      const contentData = await github(env, `/contents/${encodeURIComponent(file.path).replace(/%2F/g, "/")}`);
      const content = decodeContent(contentData.content || "");
      return {
        path: file.path,
        title: getTitle(file.path, content),
        description: getDescription(content),
      };
    }),
  );

  return json({documents});
}
