import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import jwks from './jwks';

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

function base64UrlToBuffer(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = str.length % 4;
  if (pad) str += '='.repeat(4 - pad);
  return Buffer.from(str, 'base64');
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

async function verifyRS256(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token');
  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(base64UrlDecode(headerB64));
  const payload = JSON.parse(base64UrlDecode(payloadB64));

  const jwksUri = process.env.JWT_JWKS_URI || process.env.JWT_JWKS || '';
  if (!jwksUri) throw new Error('JWT_JWKS_URI not configured for RS256 verification');

  const kid = header.kid as string | undefined;
  const jwk = await jwks.getJwkByKid(jwksUri, kid);
  if (!jwk) throw new Error('No matching JWK found');
  const pem = jwks.jwkToPem(jwk);

  const verifier = crypto.createVerify('RSA-SHA256');
  const data = `${headerB64}.${payloadB64}`;
  verifier.update(data);
  verifier.end();
  const sig = base64UrlToBuffer(sigB64);
  const ok = verifier.verify(pem, sig);
  if (!ok) throw new Error('Invalid RS256 signature');

  // optional claim checks
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error('token expired');
  const issuer = process.env.JWT_ISSUER;
  if (issuer && payload.iss && payload.iss !== issuer) throw new Error('invalid issuer');
  const aud = process.env.JWT_AUDIENCE;
  if (aud && payload.aud) {
    const audMatch = Array.isArray(payload.aud) ? payload.aud.includes(aud) : payload.aud === aud;
    if (!audMatch) throw new Error('invalid audience');
  }

  return payload;
}

export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  // Prefer Authorization header
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) {
    const token = auth.slice(7).trim();
    // Decide verification method: RS256 via JWKS takes precedence if configured.
    if (process.env.JWT_JWKS_URI || process.env.JWT_JWKS) {
      const payload = await verifyRS256(token);
      const user: AuthUser = {
        externalUserId: payload.sub || payload.user_id || '',
        email: payload.email,
        orgId: payload.org_id || payload.org || payload['https://hasura.io/jwt/claims']?.org_id || undefined,
        raw: payload,
      };
      if (!user.externalUserId) throw new Error('token missing sub claim');
      return user;
    }

    // Fallback to dev HS256 via JWT_SECRET env var
    const secret = process.env.JWT_SECRET || '';
    if (secret) {
      const payload = verifyHS256(token, secret);
      const user: AuthUser = {
        externalUserId: payload.sub || payload.user_id || '',
        email: payload.email,
        orgId: payload.org_id || payload.org || undefined,
        raw: payload,
      };
      if (!user.externalUserId) throw new Error('token missing sub claim');
      return user;
    }

    throw new Error('No JWT verification method configured (set JWT_JWKS_URI or JWT_SECRET)');
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
