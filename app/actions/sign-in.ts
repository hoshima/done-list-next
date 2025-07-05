"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await AuthService.signInWithPassword(email, password);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "サインインに失敗しました";
    return encodedRedirect("error", "/sign-in", errorMessage);
  }

  return redirect("/home");
};
