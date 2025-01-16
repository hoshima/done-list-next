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
            className="border border-primary rounded-md text-foreground flex flex-col gap-2 px-4 py-2"
          >
            <h3 className="font-bold text-lg">{task.name}</h3>
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
