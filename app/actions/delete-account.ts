"use server";

import { createAdminClient, createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const deleteAccountAction = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("削除するアカウントが存在しません");
  }

  const supabaseAdmin = await createAdminClient();
  try {
    const res = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (!!res.error) {
      console.error(res.error);
    }
  } catch (error) {
    console.error(error);
  }

  return redirect("/");
};
