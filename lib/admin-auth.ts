import { cookies } from "next/headers";
import { env } from "cloudflare:workers";

export const ADMIN_SESSION_COOKIE = "cretop_admin_session";
const SESSION_LIFETIME_MS = 12 * 60 * 60 * 1000;

export function isConfiguredAdminUser(userId: string | null | undefined): boolean {
  return Boolean(userId && env.ADMIN_USER_ID && userId === env.ADMIN_USER_ID);
}

export async function verifyAdminPassword(value: unknown): Promise<boolean> {
  if (typeof value !== "string" || !env.ADMIN_PASSWORD) return false;
  const encoder = new TextEncoder();
  const [provided, expected] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(value)),
    crypto.subtle.digest("SHA-256", encoder.encode(env.ADMIN_PASSWORD)),
  ]);
  const left = new Uint8Array(provided);
  const right = new Uint8Array(expected);
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
  return difference === 0;
}

export async function createAdminSessionValue(): Promise<string | null> {
  if (!env.ADMIN_SESSION_SECRET) return null;
  const expiresAt = String(Date.now() + SESSION_LIFETIME_MS);
  const signature = await signSession(expiresAt, env.ADMIN_SESSION_SECRET);
  return `${expiresAt}.${signature}`;
}

export async function isAdminSessionValid(value: string | null | undefined): Promise<boolean> {
  if (!value || !env.ADMIN_SESSION_SECRET) return false;
  const separator = value.indexOf(".");
  if (separator < 1) return false;
  const expiresAt = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expiry = Number(expiresAt);
  if (!Number.isSafeInteger(expiry) || expiry <= Date.now()) return false;
  const expected = await signSession(expiresAt, env.ADMIN_SESSION_SECRET);
  return constantTimeStringEqual(signature, expected);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return isAdminSessionValid(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

async function signSession(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeStringEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}
