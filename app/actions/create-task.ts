"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TaskCreate } from "../types/task.type";

export const createTaskAction = async (formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTaskCreate = (data: any): data is TaskCreate => {
    return (
      typeof data.name === "string" &&
      typeof data.date === "string" &&
      typeof data.description === "string"
    );
  };

  const taskData = {
    name: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
  };

  if (!isTaskCreate(taskData)) {
    return encodedRedirect("error", "/new", "Invalid task data");
  }

  try {
    const supabase = await createClient();
    await supabase.from("tasks").insert(taskData);
  } catch (error) {
    console.log("error", error);
  }

  return redirect("/home");
};
