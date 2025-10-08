"use server";

import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export async function signInWithGoogleAction() {
  const url = await AuthService.signInWithGoogle();
  redirect(url);
}
