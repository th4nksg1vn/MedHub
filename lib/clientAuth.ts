// Client-side auth helpers: read id_token from localStorage or cookie,
// parse JWT payload, and provide a fetch wrapper that adds Authorization header.

export function getIdToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const fromLs = window.localStorage.getItem('id_token');
    if (fromLs) return fromLs;
  } catch (e) {
    // ignore
  }
  const m = document.cookie.match('(^|;)\s*id_token\s*=\s*([^;]+)');
  if (m) return decodeURIComponent(m[2]);
  return null;
}

export function parseJwt(token: string | null): Record<string, any> | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    // base64url -> base64
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(b64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export async function authFetch(input: RequestInfo | URL, init?: RequestInit) {
  const token = getIdToken();
  const headers = new Headers(init?.headers as HeadersInit || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else if (process.env.NODE_ENV !== 'production') {
    // keep dev header fallback for local development
    headers.set('x-external-user-id', 'dev-user');
    headers.set('x-org-id', 'dev-org');
  }
  const res = await fetch(input, { ...(init || {}), headers });
  return res;
}

export default { getIdToken, parseJwt, authFetch };
