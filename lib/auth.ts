import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

type AuthUser = {
  externalUserId: string;
  email?: string;
  orgId?: string;
  raw?: Record<string, any>;
};

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = str.length % 4;
  if (pad) str += '='.repeat(4 - pad);
  return Buffer.from(str, 'base64').toString('utf8');
}

function verifyHS256(token: string, secret: string) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token');
  const [headerB64, payloadB64, sigB64] = parts;
  const data = `${headerB64}.${payloadB64}`;
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  // Node's base64url may differ; normalize both
  if (expected !== sigB64) throw new Error('Invalid signature');
  const payloadJson = base64UrlDecode(payloadB64);
  return JSON.parse(payloadJson);
}

export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  // Prefer Authorization header
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) {
    const token = auth.slice(7).trim();
    // Support dev HS256 via JWT_SECRET env var
    const provider = process.env.AUTH_PROVIDER || 'dev-hs256';
    if (provider === 'dev-hs256') {
      const secret = process.env.JWT_SECRET || '';
      if (!secret) throw new Error('JWT_SECRET not configured for dev-hs256');
      try {
        const payload = verifyHS256(token, secret);
        const user: AuthUser = {
          externalUserId: payload.sub || payload.user_id || payload.sub || '',
          email: payload.email,
          orgId: payload.org_id || payload.org || undefined,
          raw: payload,
        };
        if (!user.externalUserId) throw new Error('token missing sub claim');
        return user;
      } catch (err) {
        throw err;
      }
    }

    // TODO: add RS256/JWKS support here
    throw new Error(`Auth provider ${provider} not implemented in server`);
  }

  // No Authorization header: allow dev header fallback in non-production
  if (process.env.NODE_ENV !== 'production') {
    const ext = req.headers.get('x-external-user-id') || undefined;
    const org = req.headers.get('x-org-id') || undefined;
    if (ext) return { externalUserId: ext, orgId: org };
  }

  return null;
}

export function requireAuthOr401(user: AuthUser | null) {
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export default { getAuthUser, requireAuthOr401 };
