import { createClient, createAdminClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export class AuthService {
  private static async getSupabaseClient() {
    return await createClient();
  }

  /**
   * 現在のユーザーを取得する
   * @returns ユーザー情報
   */
  static async getCurrentUser() {
    const supabase = await this.getSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return { user, error };
  }

  /**
   * 認証が必要なページでユーザーをチェックし、未認証の場合はリダイレクト
   * @param redirectTo リダイレクト先のパス（デフォルト: '/sign-in'）
   * @returns 認証済みのユーザー
   */
  static async requireAuth(redirectTo: string = "/sign-in") {
    const { user, error } = await this.getCurrentUser();

    if (!user || error) {
      return redirect(redirectTo);
    }

    return user;
  }

  /**
   * 認証済みの場合はリダイレクト（ログインページなどで使用）
   * @param redirectTo リダイレクト先のパス（デフォルト: '/home'）
   * @returns void
   */
  static async redirectIfAuthenticated(redirectTo: string = "/home") {
    const { user } = await this.getCurrentUser();

    if (user) {
      return redirect(redirectTo);
    }
  }

  /**
   * メールアドレスとパスワードでサインイン
   * @param email メールアドレス
   * @param password パスワード
   * @returns サインイン結果
   */
  static async signInWithPassword(email: string, password: string) {
    const supabase = await this.getSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * メールアドレスとパスワードでサインアップ
   * @param email メールアドレス
   * @param password パスワード
   * @returns サインアップ結果
   */
  static async signUp(email: string, password: string) {
    const supabase = await this.getSupabaseClient();
    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * サインアウト
   */
  static async signOut() {
    const supabase = await this.getSupabaseClient();
    await supabase.auth.signOut();
  }

  /**
   * Googleでサインイン
   * @returns OAuth URL
   */
  static async signInWithGoogle() {
    const supabase = await this.getSupabaseClient();

    const {
      data: { url },
      error,
    } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/google`,
      },
    });

    if (error) {
      throw new Error(`Error during Google sign-in: ${error.message}`);
    }

    if (!url) {
      throw new Error("No URL returned from signInWithOAuth");
    }

    return url;
  }

  /**
   * パスワードリセットメールを送信
   * @param email メールアドレス
   */
  static async resetPasswordForEmail(email: string) {
    const supabase = await this.getSupabaseClient();
    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * パスワードを更新
   * @param password 新しいパスワード
   */
  static async updatePassword(password: string) {
    const supabase = await this.getSupabaseClient();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 認証コードをセッションに交換
   * @param code 認証コード
   */
  static async exchangeCodeForSession(code: string) {
    const supabase = await this.getSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  /**
   * アカウントを削除
   */
  static async deleteAccount() {
    const { user } = await this.getCurrentUser();
    if (!user) {
      throw new Error("削除するアカウントが存在しません");
    }

    const supabaseAdmin = await createAdminClient();
    const res = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (res.error) {
      throw new Error(`アカウント削除に失敗しました: ${res.error.message}`);
    }
  }
}
