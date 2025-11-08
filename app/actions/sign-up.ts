"use server";

import { encodedRedirect } from "@/utils/utils";
import { signUp } from "@/services/auth.service";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  try {
    await signUp(email, password);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "サインアップに失敗しました";
    console.error(errorMessage);
    return encodedRedirect("error", "/sign-up", errorMessage);
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  );
};
