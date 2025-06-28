"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TaskId } from "../types/branded.type";

export const deleteTaskAction = async (id: TaskId) => {
  const supabase = await createClient();

  await supabase.from("tasks").delete().eq("id", id).throwOnError();

  return redirect("/home");
};
