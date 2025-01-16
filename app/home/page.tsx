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
    <div className="flex flex-col gap-4">
      {data?.map((task) => {
        return (
          <div
            key={task.id}
            className="flex flex-col gap-2 rounded-md border border-primary px-4 py-2 text-foreground"
          >
            <h3 className="text-lg font-bold">{task.name}</h3>
            <p className="text-sm">{task.date}</p>
            {task.description ? (
              <p className="text-sm">{task.description}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
