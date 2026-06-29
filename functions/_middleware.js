const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.github.com https://unpkg.com; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

const DEFAULT_ALLOWED_HOSTS = ["jasinitna-partner-guide.pages.dev"];

function withSecurityHeaders(response, extraHeaders = {}) {
  const headers = new Headers(response.headers);

  Object.entries({...SECURITY_HEADERS, ...extraHeaders}).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function blocked(message, status = 403, extraHeaders = {}) {
  return withSecurityHeaders(
    new Response(message, {
      status,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }),
    extraHeaders,
  );
}

function isAdminAuthorized(request, env) {
  if (!env.ADMIN_USER || !env.ADMIN_PASS) return false;

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Basic ")) return false;

  const expected = `Basic ${btoa(`${env.ADMIN_USER}:${env.ADMIN_PASS}`)}`;
  return authorization === expected;
}

export async function onRequest(context) {
  const {request, env, next} = context;
  const url = new URL(request.url);
  const country = request.cf?.country || "";
  const allowedHosts = (env.ALLOWED_HOSTS || DEFAULT_ALLOWED_HOSTS.join(","))
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);

  if (!allowedHosts.includes(url.hostname)) {
    return blocked("Use the production domain only.");
  }

  if (country !== "KR") {
    return blocked("This site is available in Korea only.");
  }

  if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
    const hasAdminCredentials = Boolean(env.ADMIN_USER && env.ADMIN_PASS);

    if (hasAdminCredentials && !isAdminAuthorized(request, env)) {
      return blocked(
        "Authentication required.",
        401,
        {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
          "WWW-Authenticate": 'Basic realm="Jasinitna Admin"',
        },
      );
    }
  }

  const response = await next();
  const extraHeaders =
    url.pathname === "/admin" || url.pathname.startsWith("/admin/")
      ? {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        }
      : {};

  return withSecurityHeaders(response, extraHeaders);
}
