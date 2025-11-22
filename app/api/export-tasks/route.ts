import { getCurrentUser } from "@/services/auth.service";
import { getAllTasksForUser } from "@/services/task.service";
import { cookies } from "next/headers";

export async function GET() {
  // Call cookies() at the top level to mark this route as dynamic
  await cookies();

  try {
    const user = await getCurrentUser();

    if (!user.user) {
      return new Response(JSON.stringify({ error: "認証が必要です" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await getAllTasksForUser(user.user.id);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=tasks.json",
      },
    });
  } catch (error) {
    console.error("Export tasks error:", error);
    return new Response(
      JSON.stringify({ error: "タスクの取得に失敗しました" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
