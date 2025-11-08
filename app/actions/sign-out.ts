"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/services/auth.service";

export const signOutAction = async () => {
  await signOut();
  redirect("/sign-in");
};
