import { createTaskAction } from "@/app/actions/create-task";
import { TaskForm } from "@/components/task-form";
import { AuthService } from "@/services/auth.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新規作成",
};

export default async function App() {
  await AuthService.requireAuth();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="max-w-64 text-xl">やったことをメモしよう</h1>
      <TaskForm action={createTaskAction} />
    </div>
  );
}
