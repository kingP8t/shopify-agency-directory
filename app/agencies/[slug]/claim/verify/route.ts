import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabase";
import { signOwnerToken, OWNER_SESSION_MAX_AGE } from "@/lib/owner-session";
import { sendClaimNotificationEmail } from "@/lib/email";

// Route Handler — handles GET /agencies/[slug]/claim/verify?token=…&email=…
// Route Handlers are allowed to call cookies().set(); Server Component renders are not.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const fail = (msg: string) =>
    NextResponse.redirect(
      new URL(
        `/agencies/${slug}/claim?error=${encodeURIComponent(msg)}`,
        request.url
      )
    );

  if (!token || !email) {
    return fail("Invalid verification link. Token or email is missing.");
  }

  const db = getAdminClient();

  // Look up agency by slug + token together (single query, no timing leak)
  const { data: agency } = await db
    .from("agencies")
    .select("id, name, slug, claim_token, claim_token_expires_at")
    .eq("slug", slug)
    .eq("claim_token", token)
    .single();

  if (!agency) {
    return fail(
      "Invalid or expired verification link. Please request a new one."
    );
  }

  if (
    !agency.claim_token_expires_at ||
    new Date(agency.claim_token_expires_at) < new Date()
  ) {
    return fail(
      "This verification link has expired. Please request a new one."
    );
  }

  // Mark as claimed and consume the one-time token
  const { error: claimError } = await db
    .from("agencies")
    .update({
      claimed_email: email,
      claimed_at: new Date().toISOString(),
      claim_token: null,
      claim_token_expires_at: null,
    })
    .eq("id", agency.id);

  if (claimError) {
    console.error("Claim verification error:", claimError);
    return fail("Something went wrong. Please try again.");
  }

  // Create a persistent owner session
  const sessionExpiresAt = new Date(
    Date.now() + OWNER_SESSION_MAX_AGE * 1000
  ).toISOString();

  const { data: session, error: sessionError } = await db
    .from("agency_owner_sessions")
    .insert([{ agency_id: agency.id, email, expires_at: sessionExpiresAt }])
    .select("id")
    .single();

  if (sessionError || !session) {
    console.error("Owner session creation error:", sessionError);
    return fail("Something went wrong. Please try again.");
  }

  // Set signed httpOnly session cookie — allowed in Route Handlers
  const signed = signOwnerToken(session.id);
  const cookieStore = await cookies();
  cookieStore.set("owner_session", signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OWNER_SESSION_MAX_AGE,
    path: "/",
  });

  // Notify admin (fire-and-forget — never block the redirect)
  sendClaimNotificationEmail({
    agencyName: agency.name,
    agencySlug: agency.slug,
    claimedEmail: email,
  }).catch(console.error);

  // Redirect to owner dashboard
  return NextResponse.redirect(
    new URL(`/agencies/${slug}/owner`, request.url)
  );
}
