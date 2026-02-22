"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac } from "crypto"; // Node crypto is fine in Server Actions

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const ADMIN_SECRET = process.env.ADMIN_SECRET!;
const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Sign a token value using Node crypto (Server Action context — not Edge)
function signToken(value: string): string {
  const hmac = createHmac("sha256", ADMIN_SECRET);
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

export async function adminLoginAction(formData: FormData) {
  const password = formData.get("password")?.toString();

  if (!password || password !== ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  const value = `admin:${Date.now()}`;
  const signed = signToken(value);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  redirect("/admin");
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
