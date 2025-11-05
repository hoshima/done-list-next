"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { Task } from "../types/task.type";
import { TaskId } from "../types/branded.type";
import { updateTask } from "@/services/task.service";

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
    await updateTask(id, taskData);
  } catch (error) {
    console.log("error", error);
    return encodedRedirect("error", `/${id}`, "タスクの更新に失敗しました");
  }

  redirect("/home");
};
