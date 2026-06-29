import {requireDb} from "../_shared/guide-db.js";

export async function onRequestGet({request, env}) {
  const id = new URL(request.url).searchParams.get("id") || "";
  const image = await requireDb(env)
    .prepare("SELECT content_type AS contentType, data_url AS dataUrl FROM guide_images WHERE id = ?")
    .bind(id)
    .first();

  if (!image) return new Response("Not found", {status: 404});

  const base64 = String(image.dataUrl || "").split(",")[1] || "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);

  return new Response(bytes, {
    headers: {
      "Content-Type": image.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
