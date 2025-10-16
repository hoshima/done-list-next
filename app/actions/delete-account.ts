"use server";

import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export const deleteAccountAction = async () => {
  try {
    await AuthService.deleteAccount();
  } catch (error) {
    console.error(error);
    throw new Error("アカウントの削除に失敗しました");
  }

  redirect("/");
};
