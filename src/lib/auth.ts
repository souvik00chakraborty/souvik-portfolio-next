import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24; // 24 hours

// Helper to sign the session token
function signToken(username: string, expiresAt: number): string {
  const secret = process.env.SESSION_SECRET || "default_session_secret_key_change_me_123456";
  const payload = JSON.stringify({ username, expiresAt });
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `${Buffer.from(payload).toString("base64")}.${signature}`;
}

// Helper to verify the session token
export function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payloadB64, signature] = parts;
    
    const secret = process.env.SESSION_SECRET || "default_session_secret_key_change_me_123456";
    const payloadStr = Buffer.from(payloadB64, "base64").toString("utf-8");
    const payload = JSON.parse(payloadStr);

    // Verify expiration
    if (payload.expiresAt < Date.now()) return false;

    // Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payloadStr);
    const expectedSignature = hmac.digest("hex");

    return signature === expectedSignature && payload.username === (process.env.ADMIN_USERNAME || "admin");
  } catch {
    return false;
  }
}

// Login and set HTTP-only cookie
export async function loginAdmin(username: string): Promise<boolean> {
  const expiresAt = Date.now() + SESSION_DURATION;
  const token = signToken(username, expiresAt);
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });

  return true;
}

// Check if authenticated
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return false;
  return verifyToken(sessionCookie.value);
}

// Clear cookie on logout
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
