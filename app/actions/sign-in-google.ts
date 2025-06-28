"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogleAction() {
  const supabase = await createClient();

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/google`,
    },
  });

  if (error) {
    console.error("Error during Google sign-in:", error.message);
    redirect("/error?message=authentication-failed");
  }

  if (!url) {
    console.error("No URL returned from signInWithOAuth");
    redirect("/error?message=authentication-failed");
  }

  redirect(url);
}
