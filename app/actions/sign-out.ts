"use server";

import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export const signOutAction = async () => {
  await AuthService.signOut();
  redirect("/sign-in");
};
