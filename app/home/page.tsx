import FloatingActionButton from "@/components/fab";
import TaskList from "@/components/task-list";
import Search from "@/components/ui/search";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const query = (await searchParams)["query"]?.toString();

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-20">
        <div className="mx-auto !block w-11/12 md:w-8/12">
          <Search query={query} />
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <TaskList query={query} />
        </Suspense>
      </div>

      <FloatingActionButton />
    </>
  );
}
