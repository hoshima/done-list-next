"use server";

import { redirect } from "next/navigation";
import { TaskId } from "../types/branded.type";
import { encodedRedirect } from "@/utils/utils";
import { deleteTask } from "@/services/task.service";

export const deleteTaskAction = async (id: TaskId) => {
  try {
    await deleteTask(id);
  } catch (error) {
    console.log("error", error);
    return encodedRedirect("error", `/${id}`, "タスクの削除に失敗しました");
  }

  redirect("/home");
};
