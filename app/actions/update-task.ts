"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Task } from "../types/task.type";
import { createTaskId, TaskId } from "../types/branded.type";

export const updateTaskAction = async (id: TaskId, formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTaskCreate = (data: any): data is Task => {
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
    await supabase
      .from("tasks")
      .update({
        ...taskData,
        id: createTaskId(id),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
  } catch (error) {
    console.log("error", error);
  }

  return redirect("/home");
};
