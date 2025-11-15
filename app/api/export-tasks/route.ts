import { getCurrentUser } from "@/services/auth.service";
import { getAllTasksForUser } from "@/services/task.service";

// MIGRATED: Removed export const dynamic = "force-dynamic" (incompatible with Cache Components)
// Route Handlers are dynamic by default with Cache Components
// Uses cookies() for authentication, so must run at request time

export async function GET() {
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
