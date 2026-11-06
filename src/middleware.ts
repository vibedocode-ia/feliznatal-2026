import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_session';
const DEFAULT_SECRET = 'natal_2026_godadmin_secret_key_v1';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const [role, timestampStr] = payload.split(':');
  if (role !== 'godadmin') return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const ageMs = Date.now() - timestamp;
  if (ageMs > SESSION_MAX_AGE * 1000 || ageMs < 0) return false;

  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
  const key = await getCryptoKey(secret);
  const encoder = new TextEncoder();
  const expectedSigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSig = arrayBufferToHex(expectedSigBuffer);

  return signature === expectedSig;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercepta rotas /admin
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get(COOKIE_NAME)?.value;
    const isAuthed = await verifyToken(sessionToken);

    // Se estiver tentando acessar o login administrativo
    if (pathname === '/admin/login') {
      if (isAuthed) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Para qualquer outra rota /admin, requer autenticação
    if (!isAuthed) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
