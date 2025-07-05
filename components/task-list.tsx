import TaskCard from "./task-card";
import Pagination from "./pagination";
import { AuthService } from "@/services/auth.service";
import { TaskService } from "@/services/task.service";

const ITEMS_PER_PAGE = 10;

export default async function TaskList({
  query,
  page = 1,
}: {
  query?: string | string[];
  page?: number;
}) {
  const user = await AuthService.requireAuth();

  const { data, count } = await TaskService.getTasks(user.id, {
    page,
    itemsPerPage: ITEMS_PER_PAGE,
    query: typeof query === "string" ? query : undefined,
  });

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
  const offset = (page - 1) * ITEMS_PER_PAGE;

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
