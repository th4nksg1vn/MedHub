// Use global fetch (Node 18+ / Next.js runtime) to avoid extra dependency

// Simple JWKS fetcher + cache for RS256 public keys
type Jwk = { kty: string; kid?: string; use?: string; alg?: string; n?: string; e?: string; x5c?: string[] };

let cached: { keys: Jwk[]; fetchedAt: number; expiresAt?: number } | null = null;

function base64UrlToBuffer(b64u: string) {
  b64u = b64u.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64u.length % 4;
  if (pad) b64u += '='.repeat(4 - pad);
  return Buffer.from(b64u, 'base64');
}

function encodeLength(len: number) {
  if (len < 128) return Buffer.from([len]);
  const hex = len.toString(16);
  const n = Math.ceil(hex.length / 2);
  const padded = hex.padStart(n * 2, '0');
  return Buffer.concat([Buffer.from([0x80 | n]), Buffer.from(padded, 'hex')]);
}

function jwkRsaToPem(n_b64u: string, e_b64u: string) {
  const n = base64UrlToBuffer(n_b64u);
  const e = base64UrlToBuffer(e_b64u);

  // Ensure positive integer for modulus
  const nBuf = n[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), n]) : n;

  const modulus = Buffer.concat([Buffer.from([0x02]), encodeLength(nBuf.length), nBuf]);
  const exponent = Buffer.concat([Buffer.from([0x02]), encodeLength(e.length), e]);
  const pubKeySeq = Buffer.concat([Buffer.from([0x30]), encodeLength(modulus.length + exponent.length), modulus, exponent]);

  const bitString = Buffer.concat([Buffer.from([0x03]), encodeLength(pubKeySeq.length + 1), Buffer.from([0x00]), pubKeySeq]);
  const algId = Buffer.from('301d06092a864886f70d0101010500', 'hex'); // rsaEncryption
  const fullSeq = Buffer.concat([Buffer.from([0x30]), encodeLength(algId.length + bitString.length), algId, bitString]);

  const pem = `-----BEGIN PUBLIC KEY-----\n${fullSeq.toString('base64').match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----\n`;
  return pem;
}

async function fetchJwks(jwksUri: string) {
  const res = await fetch(jwksUri, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to fetch JWKS: ${res.status}`);
  const data = await res.json();
  const keys: Jwk[] = data.keys || [];
  const cacheControl = res.headers.get('cache-control') || '';
  let maxAge: number | undefined;
  const m = cacheControl.match(/max-age=(\d+)/);
  if (m) maxAge = parseInt(m[1], 10);
  cached = { keys, fetchedAt: Date.now(), expiresAt: maxAge ? Date.now() + maxAge * 1000 : undefined };
  return keys;
}

export async function getJwkByKid(jwksUri: string, kid?: string) {
  if (!cached || (cached.expiresAt && Date.now() > cached.expiresAt)) {
    try {
      await fetchJwks(jwksUri);
    } catch (e) {
      // ignore fetch errors when cached exists
      if (!cached) throw e;
    }
  }

  const keys = (cached && cached.keys) || [];
  if (!kid) return keys[0] || null;
  return keys.find((k) => k.kid === kid) || null;
}

export function jwkToPem(jwk: Jwk) {
  // Prefer x5c certificate if present
  if (jwk.x5c && jwk.x5c.length > 0) {
    const cert = jwk.x5c[0];
    const pem = `-----BEGIN CERTIFICATE-----\n${cert.match(/.{1,64}/g)?.join('\n')}\n-----END CERTIFICATE-----\n`;
    return pem;
  }

  if (jwk.kty === 'RSA' && jwk.n && jwk.e) {
    return jwkRsaToPem(jwk.n, jwk.e);
  }
  throw new Error('Unsupported JWK format');
}

export default { getJwkByKid, jwkToPem };
