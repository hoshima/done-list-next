import { createTaskAction } from "@/app/actions/create-task";
import { TaskForm } from "@/components/task-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function App() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="max-w-64 text-xl">やったことをメモしよう</h1>
      <TaskForm action={createTaskAction} />
    </div>
  );
}
