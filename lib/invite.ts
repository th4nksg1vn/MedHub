import crypto from 'crypto';

const INVITE_SECRET = process.env.INVITE_SECRET || process.env.JWT_SECRET || '';
if (!INVITE_SECRET) {
  console.warn('INVITE_SECRET not set; invite tokens require INVITE_SECRET in env');
}

function base64UrlEncode(input: Buffer) {
  return input.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64');
}

export function signInvite(payload: Record<string, any>, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const body = { ...payload, iat, exp };
  const headerB64 = base64UrlEncode(Buffer.from(JSON.stringify(header)));
  const bodyB64 = base64UrlEncode(Buffer.from(JSON.stringify(body)));
  const data = `${headerB64}.${bodyB64}`;
  const sig = crypto.createHmac('sha256', INVITE_SECRET).update(data).digest();
  const sigB64 = base64UrlEncode(sig);
  return `${data}.${sigB64}`;
}

export function verifyInvite(token: string) {
  if (!INVITE_SECRET) throw new Error('INVITE_SECRET not configured');
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token format');
  const [headerB64, bodyB64, sigB64] = parts;
  const data = `${headerB64}.${bodyB64}`;
  const expectedSig = crypto.createHmac('sha256', INVITE_SECRET).update(data).digest();
  const expectedB64 = base64UrlEncode(expectedSig);
  if (expectedB64 !== sigB64) throw new Error('Invalid invite signature');
  const payloadJson = base64UrlDecode(bodyB64).toString('utf8');
  const payload = JSON.parse(payloadJson);
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error('Invite token expired');
  return payload as Record<string, any>;
}

export default { signInvite, verifyInvite };
