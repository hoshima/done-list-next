import FloatingActionButton from "@/components/fab";
import TaskListSkeleton from "@/components/task-list-skeleton";
import TaskList from "@/components/task-list";
import Search from "@/components/ui/search";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム",
};

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = params["query"]?.toString();
  const page = parseInt(params["page"]?.toString() || "1", 10);
  const suspenseKey = `${query || ""}-${page}`;

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-20">
        <div className="mx-auto !block w-11/12 md:w-8/12">
          <Search query={query} />
        </div>

        <Suspense key={suspenseKey} fallback={<TaskListSkeleton />}>
          <TaskList query={query} page={page} />
        </Suspense>
      </div>

      <FloatingActionButton />
    </>
  );
}
