import { createClient } from "@/utils/supabase/server";
import TaskCard from "./task-card";
import { redirect } from "next/navigation";

export default async function TaskList({
  query,
}: {
  query?: string | string[];
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const q = supabase
    .from("tasks")
    .select(`id, name, date, description`)
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("name", { ascending: true });

  if (query) {
    void q.like("name", `%${query}%`);
  }

  const { data } = await q;

  return (
    <div className="flex flex-col gap-4">
      {data?.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
