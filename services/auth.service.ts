import { createClient, createAdminClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * 現在のユーザーを取得する
 * @returns ユーザー情報
 */
export const getCurrentUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
};

/**
 * 現在のユーザーのJWTクレームを取得する
 */
export const getClaims = async () => {
  const supabase = await createClient();
  return supabase.auth.getClaims();
};

/**
 * 認証が必要なページでユーザーをチェックし、未認証の場合はリダイレクト
 * @param redirectTo リダイレクト先のパス（デフォルト: '/sign-in'）
 * @returns 認証済みのユーザーID
 */
export const requireAuth = async (redirectTo: string = "/sign-in") => {
  const { data, error } = await getClaims();

  if (error || !data) {
    redirect(redirectTo);
  }

  return data.claims?.sub;
};

/**
 * 認証済みの場合はリダイレクト（ログインページなどで使用）
 * @param redirectTo リダイレクト先のパス（デフォルト: '/home'）
 * @returns void
 */
export const redirectIfAuthenticated = async (redirectTo: string = "/home") => {
  const { user } = await getCurrentUser();

  if (user) {
    redirect(redirectTo);
  }
};

/**
 * メールアドレスとパスワードでサインイン
 * @param email メールアドレス
 * @param password パスワード
 * @returns サインイン結果
 */
export const signInWithPassword = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * メールアドレスとパスワードでサインアップ
 * @param email メールアドレス
 * @param password パスワード
 * @returns サインアップ結果
 */
export const signUp = async (email: string, password: string) => {
  const supabase = await createClient();
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
};

/**
 * サインアウト
 */
export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

/**
 * Googleでサインイン
 * @returns OAuth URL
 */
export const signInWithGoogle = async () => {
  const supabase = await createClient();

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
};

/**
 * パスワードリセットメールを送信
 * @param email メールアドレス
 */
export const resetPasswordForEmail = async (email: string) => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * パスワードを更新
 * @param password 新しいパスワード
 */
export const updatePassword = async (password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * 認証コードをセッションに交換
 * @param code 認証コード
 */
export const exchangeCodeForSession = async (code: string) => {
  const supabase = await createClient();
  await supabase.auth.exchangeCodeForSession(code);
};

/**
 * アカウントを削除
 */
export const deleteAccount = async () => {
  const { user } = await getCurrentUser();
  if (!user) {
    throw new Error("削除するアカウントが存在しません");
  }

  const supabaseAdmin = await createAdminClient();
  const res = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (res.error) {
    throw new Error(`アカウント削除に失敗しました: ${res.error.message}`);
  }
};
