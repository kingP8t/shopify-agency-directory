"use server";

import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/logger";
import { isRateLimited } from "@/lib/rate-limit";

export interface SubscribeState {
  success: boolean;
  error?: string;
}

const SUB_MAX = 5;
const SUB_WINDOW_MS = 60_000;

export async function subscribeEmail(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (await isRateLimited(`subscribe:${ip}`, SUB_MAX, SUB_WINDOW_MS)) {
    return { success: false, error: "Too many attempts. Please wait a moment." };
  }

  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const source = (formData.get("source") as string | null) ?? "footer";

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await supabase
    .from("email_subscribers")
    .insert({ email, source });

  if (error) {
    // 23505 = unique_violation — already subscribed
    if (error.code === "23505") {
      return { success: true }; // treat silently as success
    }
    logError("subscribe", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
