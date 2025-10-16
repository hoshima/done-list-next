"use server";

import { redirect } from "next/navigation";
import { TaskId } from "../types/branded.type";
import { TaskService } from "@/services/task.service";
import { encodedRedirect } from "@/utils/utils";

export const deleteTaskAction = async (id: TaskId) => {
  try {
    await TaskService.deleteTask(id);
  } catch (error) {
    console.log("error", error);
    return encodedRedirect("error", `/${id}`, "タスクの削除に失敗しました");
  }

  redirect("/home");
};
