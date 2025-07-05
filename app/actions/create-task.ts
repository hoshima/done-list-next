"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { TaskCreate } from "../types/task.type";
import { TaskService } from "@/services/task.service";

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
    await TaskService.createTask(taskData);
  } catch (error) {
    console.log("error", error);
    return encodedRedirect("error", "/new", "タスクの作成に失敗しました");
  }

  return redirect("/home");
};
