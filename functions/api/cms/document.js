import {
  decodeContent,
  encodeContent,
  github,
  getDescription,
  getTitle,
  json,
  requireEnv,
  requireSession,
  triggerDeploy,
  unauthorized,
} from "./_utils.js";

function normalizePath(path) {
  return String(path || "").trim().replace(/^\/+/, "");
}

function isEditablePath(path) {
  return /^docs\/.+\.md$/.test(path) || path === "src/data/site.json" || path === "src/data/home.json";
}

function normalizeMdxContent(content) {
  return content.replace(/<!--([\s\S]*?)-->/g, (_match, comment) => `{/*${comment}*/}`);
}

const CATEGORY_BY_FOLDER = {
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

function docPathToLink(path) {
  return `/${path.replace(/\.md$/, "")}`;
}

function getCategoryFromPath(path, home) {
  const folder = path.split("/")[1] || "";
  const categoryTitle = CATEGORY_BY_FOLDER[folder] || "한눈에 보는 사용법";
  return home.categories?.some((category) => category.title === categoryTitle) ? categoryTitle : "한눈에 보는 사용법";
}

async function syncHomeGuideIndex(env, path, content) {
  if (!/^docs\/.+\.md$/.test(path)) return null;

  const homePath = "src/data/home.json";
  const homeData = await github(env, `/contents/${homePath}`);
  const home = JSON.parse(decodeContent(homeData.content || ""));
  const link = docPathToLink(path);
  const title = getTitle(path, content);
  const description = getDescription(content);
  const category = getCategoryFromPath(path, home);

  const guide = {
    title,
    description,
    category,
    link,
  };

  const guides = Array.isArray(home.guides) ? home.guides : [];
  const existingIndex = guides.findIndex((item) => item.link === link);
  if (existingIndex >= 0) guides[existingIndex] = {...guides[existingIndex], ...guide};
  else guides.push(guide);
  home.guides = guides;

  if (Array.isArray(home.categories)) {
    home.categories = home.categories.map((item) => ({
      ...item,
      guideCount: guides.filter((guideItem) => guideItem.category === item.title).length,
    }));
  }

  const saved = await github(env, `/contents/${homePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message: "메인 검색 목록 자동 갱신",
      content: encodeContent(`${JSON.stringify(home, null, 2)}\n`),
      sha: homeData.sha,
      branch: "main",
    }),
  });

  return saved.content?.sha || "";
}

export async function onRequestGet({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const url = new URL(request.url);
  const path = normalizePath(url.searchParams.get("path"));

  if (!isEditablePath(path)) {
    return json({error: "수정할 수 없는 파일 경로입니다."}, 400);
  }

  const data = await github(env, `/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`);

  return json({
    path,
    sha: data.sha,
    content: decodeContent(data.content || ""),
  });
}

export async function onRequestPut({request, env}) {
  const missing = requireEnv(env);
  if (missing) return json({error: missing}, 500);
  if (!(await requireSession(request, env))) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const path = normalizePath(body.path);
  const content = normalizeMdxContent(String(body.content || ""));
  const message = String(body.message || "가이드 문서 수정").trim();

  if (!isEditablePath(path)) {
    return json({error: "docs 폴더의 Markdown 문서만 저장할 수 있습니다."}, 400);
  }

  let sha = String(body.sha || "");

  if (!sha) {
    try {
      const existing = await github(env, `/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`);
      sha = existing.sha;
    } catch {
      sha = "";
    }
  }

  const payload = {
    message,
    content: encodeContent(content),
    branch: "main",
    ...(sha ? {sha} : {}),
  };

  const data = await github(env, `/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const homeSha = await syncHomeGuideIndex(env, path, content);
  const deploy = await triggerDeploy(env);

  return json({
    path,
    sha: data.content?.sha || "",
    commit: data.commit?.sha || "",
    homeSha,
    deploy,
  });
}
