import { createClient } from "@/utils/supabase/server";
import { Task, TaskCreate } from "@/app/types/task.type";
import { TaskId } from "@/app/types/branded.type";

export class TaskService {
  private static async getSupabaseClient() {
    return await createClient();
  }

  /**
   * 指定されたユーザーのタスク一覧を取得する（ページネーション・検索機能付き）
   * @param userId ユーザーID
   * @param options 取得オプション
   * @returns タスク一覧と総数
   */
  static async getTasks(
    userId: string,
    options: {
      page?: number;
      itemsPerPage?: number;
      query?: string;
    } = {}
  ) {
    const { page = 1, itemsPerPage = 10, query } = options;
    const supabase = await this.getSupabaseClient();

    // 合計件数を取得するクエリ
    let countQuery = supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (query) {
      countQuery = countQuery.like("name", `%${query}%`);
    }

    // ページネーションを考慮した実際のデータ取得クエリ
    const offset = (page - 1) * itemsPerPage;
    let dataQuery = supabase
      .from("tasks")
      .select(`id, name, date, description`)
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .order("name", { ascending: true })
      .range(offset, offset + itemsPerPage - 1);

    if (query) {
      dataQuery = dataQuery.like("name", `%${query}%`);
    }

    const [{ count }, { data, error }] = await Promise.all([
      countQuery,
      dataQuery,
    ]);

    if (error) {
      throw new Error(`タスクの取得に失敗しました: ${error.message}`);
    }

    return { data: data as Task[], count, error };
  }

  /**
   * 指定されたIDのタスクを取得する
   * @param taskId タスクID
   * @returns タスク情報
   */
  static async getTaskById(taskId: TaskId) {
    const supabase = await this.getSupabaseClient();

    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("id", taskId)
      .single();

    if (error) {
      throw new Error(`タスクの取得に失敗しました: ${error.message}`);
    }

    return data as Task;
  }

  /**
   * 新しいタスクを作成する
   * @param taskData タスクデータ
   * @returns 作成結果
   */
  static async createTask(taskData: TaskCreate) {
    const supabase = await this.getSupabaseClient();

    const { data, error } = await supabase.from("tasks").insert(taskData);

    if (error) {
      throw new Error(`タスクの作成に失敗しました: ${error.message}`);
    }

    return data;
  }

  /**
   * 既存のタスクを更新する
   * @param taskId タスクID
   * @param taskData 更新するタスクデータ
   * @returns 更新結果
   */
  static async updateTask(taskId: TaskId, taskData: Partial<TaskCreate>) {
    const supabase = await this.getSupabaseClient();

    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...taskData,
        id: taskId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", taskId);

    if (error) {
      throw new Error(`タスクの更新に失敗しました: ${error.message}`);
    }

    return data;
  }

  /**
   * 指定されたIDのタスクを削除する
   * @param taskId タスクID
   * @returns 削除結果
   */
  static async deleteTask(taskId: TaskId) {
    const supabase = await this.getSupabaseClient();

    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      throw new Error(`タスクの削除に失敗しました: ${error.message}`);
    }

    return data;
  }

  /**
   * 指定されたユーザーのすべてのタスクを取得する（エクスポート用）
   * @param userId ユーザーID
   * @returns すべてのタスク
   */
  static async getAllTasksForUser(userId: string) {
    const supabase = await this.getSupabaseClient();

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      throw new Error(`タスクの取得に失敗しました: ${error.message}`);
    }

    return data;
  }
}
