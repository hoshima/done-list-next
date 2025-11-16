"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signOut } from "@/services/auth.service";

export const signOutAction = async () => {
  await signOut();
  // レイアウト全体（HeaderAuth を含む）を再検証
  revalidatePath("/", "layout");

  redirect("/sign-in", RedirectType.push);
};
