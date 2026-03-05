"use server";

import { supabase } from "@/lib/supabase";

export interface SubscribeState {
  success: boolean;
  error?: string;
}

export async function subscribeEmail(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
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
    console.error("Subscribe error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
