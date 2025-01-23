import FloatingActionButton from "@/components/fab";
import TaskList from "@/components/task-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      {/* TODO: 検索input */}

      <Suspense fallback={<p>Loading...</p>}>
        <TaskList />
      </Suspense>

      <FloatingActionButton />
    </>
  );
}
