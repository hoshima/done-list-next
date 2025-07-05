"use server";

import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export async function signInWithGoogleAction() {
  try {
    const url = await AuthService.signInWithGoogle();
    redirect(url);
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    redirect("/error?message=authentication-failed");
  }
}
