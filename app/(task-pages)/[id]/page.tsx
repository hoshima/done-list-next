import { updateTaskAction } from "@/app/actions/update-task";
import { createTaskId } from "@/app/types/branded.type";
import { TaskForm } from "@/components/task-form";
import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { TaskService } from "@/services/task.service";
import { encodedRedirect } from "@/utils/utils";

export default async function EditTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const id = p.id;
  if (!id || typeof id !== "string") {
    return redirect("/home");
  }
  const updateTaskActionWithId = updateTaskAction.bind(null, createTaskId(id));

  await AuthService.requireAuth();
  const taskId = createTaskId(id);

  let task;
  try {
    task = await TaskService.getTaskById(taskId);
  } catch (error) {
    console.error("Task not found:", error);
    return encodedRedirect("error", `/home`, "タスクの取得に失敗しました");
  }

  if (!task) {
    return redirect("/home");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="max-w-64 text-xl">やったことをメモしよう</h1>
      <TaskForm action={updateTaskActionWithId} task={task} />
    </div>
  );
}
