"use server";

import { supabase } from "@/lib/supabase";

export interface LeadFormState {
  success: boolean;
  error?: string;
}

export async function submitLeadAction(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const company = formData.get("company")?.toString().trim() || null;
  const budget = formData.get("budget")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();
  const agency_id = formData.get("agency_id")?.toString() || null;

  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await supabase.from("leads").insert([
    { name, email, company, budget, message, agency_id },
  ]);

  if (error) {
    console.error("Lead insert error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
