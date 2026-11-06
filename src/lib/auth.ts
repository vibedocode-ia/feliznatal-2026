import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const DEFAULT_SECRET = 'natal_2026_godadmin_secret_key_v1';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias em segundos

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

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
  const timestamp = Date.now().toString();
  const payload = `godadmin:${timestamp}`;
  const encoder = new TextEncoder();
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const signature = arrayBufferToHex(signatureBuffer);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const [role, timestampStr] = payload.split(':');
  if (role !== 'godadmin') return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Verifica se o token tem menos de 7 dias
  const ageMs = Date.now() - timestamp;
  if (ageMs > SESSION_MAX_AGE * 1000 || ageMs < 0) return false;

  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
  const key = await getCryptoKey(secret);
  const encoder = new TextEncoder();
  const expectedSigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSig = arrayBufferToHex(expectedSigBuffer);

  return signature === expectedSig;
}

export function validateAdminPassword(password: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'natal2026admin';
  return password.trim() === expectedPassword.trim();
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export function removeSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
