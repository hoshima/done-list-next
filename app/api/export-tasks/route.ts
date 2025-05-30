import { exportTasksAction } from "@/app/actions";

export const dynamic = "force-dynamic";

export async function GET() {
  // exportTasksActionはResponseを返すのでそのまま返却
  return exportTasksAction();
}
