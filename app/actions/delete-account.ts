"use server";

import { redirect } from "next/navigation";
import { deleteAccount } from "@/services/auth.service";

export const deleteAccountAction = async () => {
  try {
    await deleteAccount();
  } catch (error) {
    console.error(error);
    throw new Error("アカウントの削除に失敗しました");
  }

  redirect("/");
};
