import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsDir = path.join(root, "docs");
const outFile = path.join(root, "tmp", "d1-seed.sql");

const categoryTitles = {
  start: "한눈에 보는 사용법",
  hospital: "병원·의사 관리",
  events: "이벤트 관리",
  ads: "광고 관리",
  customers: "고객 관리",
  appointments: "예약 관리",
  payments: "충전·환불 관리",
  policy: "운영 정책·의료광고",
  faq: "FAQ",
  glossary: "용어 사전",
};

const categoryIcons = {
  start: "map",
  hospital: "hospital",
  events: "calendar",
  ads: "target",
  customers: "message",
  appointments: "calendar",
  payments: "card",
  policy: "shield",
  faq: "help",
  glossary: "file",
};

function sql(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return {fields: {}, body: content};
  const fields = {};
  match[1].split("\n").forEach((line) => {
    const fieldMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!fieldMatch) return;
    fields[fieldMatch[1]] = fieldMatch[2].trim().replace(/^["']|["']$/g, "");
  });
  return {fields, body: match[2].trim()};
}

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

function readCategory(folder, position) {
  const categoryFile = path.join(docsDir, folder, "_category_.json");
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(categoryFile, "utf8"));
  } catch {
    data = {};
  }
  return {
    slug: folder,
    title: data.label || categoryTitles[folder] || folder,
    description: data.description || "",
    position: Number(data.position || position),
    icon: categoryIcons[folder] || "file",
  };
}

const folders = fs
  .readdirSync(docsDir, {withFileTypes: true})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => {
    const ap = readCategory(a, 99).position;
    const bp = readCategory(b, 99).position;
    return ap - bp || a.localeCompare(b, "ko");
  });

const categories = folders.map((folder, index) => readCategory(folder, index + 1));
const docs = walk(docsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const relative = path.relative(root, file).replace(/\\/g, "/");
    const folder = relative.split("/")[1];
    const {fields, body} = parseFrontmatter(fs.readFileSync(file, "utf8"));
    const title = fields.title || path.basename(file, ".md");
    const description = fields.description || "";
    const position = Number(fields.sidebar_position || 99);
    const slug = relative.replace(/^docs\//, "").replace(/\.md$/, "");
    const blocks = [
      {
        id: `legacy-${slug.replace(/[^a-z0-9가-힣_-]+/gi, "-")}`,
        type: "html",
        title: "기존 디자인 블록",
        html: body,
      },
    ];
    return {
      path: relative,
      slug,
      title,
      description,
      categorySlug: folder,
      position,
      status: "published",
      owner: fields.owner || "자신있나 파트너스",
      body,
      blocks,
    };
  })
  .sort((a, b) => a.categorySlug.localeCompare(b.categorySlug) || a.position - b.position || a.title.localeCompare(b.title, "ko"));

const site = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "site.json"), "utf8"));
const homeSource = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "home.json"), "utf8"));
const home = {
  banner: {
    title: homeSource.banners?.[0]?.title || "자신있나 파트너 가이드",
    description: homeSource.banners?.[0]?.description || site.tagline || "",
    searchPlaceholder: homeSource.banners?.[0]?.searchPlaceholder || "필요한 가이드를 검색해요",
    buttonText: homeSource.banners?.[0]?.buttonText || "입점 첫날 가이드",
    buttonLink: homeSource.banners?.[0]?.buttonLink || "/docs/start/first-day",
  },
};

const statements = [
  "DELETE FROM guide_documents;",
  "DELETE FROM guide_categories;",
  "DELETE FROM guide_settings;",
  "DELETE FROM guide_images;",
];

categories.forEach((category) => {
  statements.push(
    `INSERT INTO guide_categories (slug, title, description, position, icon) VALUES (${sql(category.slug)}, ${sql(
      category.title,
    )}, ${sql(category.description)}, ${Number(category.position)}, ${sql(category.icon)});`,
  );
});

docs.forEach((doc) => {
  statements.push(
    `INSERT INTO guide_documents (path, slug, title, description, category_slug, position, status, owner, body, blocks_json, published_at) VALUES (${sql(
      doc.path,
    )}, ${sql(doc.slug)}, ${sql(doc.title)}, ${sql(doc.description)}, ${sql(doc.categorySlug)}, ${Number(doc.position)}, ${sql(
      doc.status,
    )}, ${sql(doc.owner)}, ${sql(doc.body)}, ${sql(JSON.stringify(doc.blocks))}, CURRENT_TIMESTAMP);`,
  );
});

statements.push(`INSERT INTO guide_settings (key, value_json) VALUES ('site', ${sql(JSON.stringify(site))});`);
statements.push(`INSERT INTO guide_settings (key, value_json) VALUES ('home', ${sql(JSON.stringify(home))});`);

fs.mkdirSync(path.dirname(outFile), {recursive: true});
fs.writeFileSync(outFile, `${statements.join("\n")}\n`, "utf8");
console.log(`Wrote ${outFile}`);
console.log(`Categories: ${categories.length}, documents: ${docs.length}`);
