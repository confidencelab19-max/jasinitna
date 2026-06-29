const REPO = "confidencelab19-max/jasinitna";
const COOKIE_NAME = "jasinitna_cms_session";
const SESSION_MAX_AGE = 60 * 60 * 12;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function unauthorized(message = "로그인이 필요합니다.") {
  return json({error: message}, 401);
}

function base64UrlEncode(input) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {name: "HMAC", hash: "SHA-256"},
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function getCookie(request, name) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function sessionSecret(env) {
  return String(env.CMS_SESSION_SECRET || env.CMS_PASSWORD || "jasinitna-cms").trim();
}

async function createSessionCookie(env) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: "admin",
      exp,
    }),
  );
  const signature = await sign(payload, sessionSecret(env));
  return {
    cookie: `${COOKIE_NAME}=${payload}.${signature}; Path=/; Max-Age=${SESSION_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
    expiresAt: exp,
  };
}

function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

async function requireSession(request, env) {
  const value = getCookie(request, COOKIE_NAME);
  if (!value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const expected = await sign(payload, sessionSecret(env));
  if (signature !== expected) return false;

  try {
    const decoded = JSON.parse(base64UrlDecode(payload));
    return decoded.exp > Math.floor(Date.now() / 1000) ? decoded : false;
  } catch {
    return false;
  }
}

function requireEnv(env) {
  if (!String(env.CMS_ID || "").trim() || !String(env.CMS_PASSWORD || "").trim()) {
    return "CMS 계정 환경변수가 설정되지 않았습니다.";
  }
  if (!String(env.GITHUB_TOKEN || "").trim()) {
    return "GitHub 저장 토큰이 설정되지 않았습니다.";
  }
  return "";
}

async function github(env, path, options = {}) {
  const token = String(env.GITHUB_TOKEN || "").trim();
  const response = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...options,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "jasinitna-cms",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || `GitHub API error: ${response.status}`);
  }

  return data;
}

async function triggerDeploy(env) {
  const deployHook = String(env.CLOUDFLARE_DEPLOY_HOOK || "").trim();

  if (!deployHook) {
    return {
      triggered: false,
      reason: "CLOUDFLARE_DEPLOY_HOOK 환경변수가 없어 공개 사이트 자동 배포는 실행되지 않았습니다.",
    };
  }

  const response = await fetch(deployHook, {
    method: "POST",
    headers: {
      "User-Agent": "jasinitna-cms-deploy-hook",
    },
  });

  return {
    triggered: response.ok,
    status: response.status,
    reason: response.ok ? "" : "Cloudflare 배포 훅 호출에 실패했습니다.",
  };
}

function decodeContent(encoded) {
  const binary = atob(encoded.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}

function encodeContent(content) {
  const bytes = new TextEncoder().encode(content);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function getTitle(path, content) {
  const match = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1] : path.split("/").pop().replace(/\.md$/, "");
}

function getDescription(content) {
  const match = content.match(/^description:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1] : "";
}

export {
  REPO,
  SESSION_MAX_AGE,
  clearSessionCookie,
  createSessionCookie,
  decodeContent,
  encodeContent,
  getDescription,
  getTitle,
  github,
  json,
  requireEnv,
  requireSession,
  triggerDeploy,
  unauthorized,
};
