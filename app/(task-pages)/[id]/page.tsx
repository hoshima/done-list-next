import { updateTaskAction } from "@/app/actions/update-task";
import { createTaskId } from "@/app/types/branded.type";
import { TaskForm } from "@/components/task-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const taskId = createTaskId(id);
  const { data: task } = await supabase
    .from("tasks")
    .select()
    .eq("id", taskId)
    .single();

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
