import FloatingActionButton from "@/components/fab";
import TaskCard from "@/components/task-card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
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

  // if (keyword) {
  //   void q.like("name", `%${keyword}%`);
  // }

  const { data } = await q;

  return (
    <>
      {/* TODO: 検索input */}

      <div className="flex flex-col gap-4">
        {data?.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>

      <FloatingActionButton />
    </>
  );
}
