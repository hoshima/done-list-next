import { createClient } from "@/utils/supabase/server";
import TaskCard from "./task-card";
import Pagination from "./pagination";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export default async function TaskList({
  query,
  page = 1,
}: {
  query?: string | string[];
  page?: number;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // 合計件数を取得するクエリ
  let countQuery = supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (query) {
    countQuery = countQuery.like("name", `%${query}%`);
  }

  // ページネーションを考慮した実際のデータ取得クエリ
  const offset = (page - 1) * ITEMS_PER_PAGE;
  let dataQuery = supabase
    .from("tasks")
    .select(`id, name, date, description`)
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("name", { ascending: true })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  if (query) {
    dataQuery = dataQuery.like("name", `%${query}%`);
  }

  const [{ count }, { data }] = await Promise.all([countQuery, dataQuery]);

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {data?.length ? (
          data.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            {query ? "検索結果が見つかりませんでした" : "タスクがありません"}
          </div>
        )}
      </div>

      {count !== null && count > 0 && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {count}件中 {Math.min(offset + 1, count)}-
            {Math.min(offset + ITEMS_PER_PAGE, count)}件を表示
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            query={typeof query === "string" ? query : undefined}
          />
        </div>
      )}
    </div>
  );
}
