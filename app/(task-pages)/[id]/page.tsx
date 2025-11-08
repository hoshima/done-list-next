import { updateTaskAction } from "@/app/actions/update-task";
import { createTaskId } from "@/app/types/branded.type";
import { TaskForm } from "@/components/task-form";
import { redirect } from "next/navigation";
import { requireAuth } from "@/services/auth.service";
import { Metadata } from "next";
import { getTaskById } from "@/services/task.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const p = await params;
  const id = p.id;
  const defaultMetadata = { title: "編集" };

  if (!id || typeof id !== "string") {
    return defaultMetadata;
  }

  const taskId = createTaskId(id);
  try {
    const task = await getTaskById(taskId);
    if (!task) {
      return defaultMetadata;
    }

    return {
      title: task.name,
    };
  } catch (error) {
    return defaultMetadata;
  }
}

export default async function EditTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const id = p.id;
  if (!id || typeof id !== "string") {
    redirect("/home");
  }
  const updateTaskActionWithId = updateTaskAction.bind(null, createTaskId(id));

  await requireAuth();
  const taskId = createTaskId(id);

  let task;
  try {
    task = await getTaskById(taskId);
  } catch {
    console.error("Task not found");
    redirect("/home");
  }

  if (!task) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="max-w-64 text-xl">やったことをメモしよう</h1>
      <TaskForm action={updateTaskActionWithId} task={task} />
    </div>
  );
}
