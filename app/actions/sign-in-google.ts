"use server";

import { redirect } from "next/navigation";
import { signInWithGoogle } from "@/services/auth.service";

export const signInWithGoogleAction = async () => {
  const url = await signInWithGoogle();
  redirect(url);
};
