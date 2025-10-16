"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  try {
    await AuthService.resetPasswordForEmail(email);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Could not reset password";
    console.error(errorMessage);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};
