"use server";

import { encodedRedirect } from "@/utils/utils";
import { createAdminClient, createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Task, TaskCreate } from "./types/task.type";
import { createTaskId, TaskId } from "./types/branded.type";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/home");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export async function signInWithGoogleAction() {
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
    console.error("Error during Google sign-in:", error.message);
    redirect("/error?message=authentication-failed");
  }

  if (!url) {
    console.error("No URL returned from signInWithOAuth");
    redirect("/error?message=authentication-failed");
  }

  redirect(url);
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const deleteAccountAction = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("削除するアカウントが存在しません");
  }

  const supabaseAdmin = await createAdminClient();
  try {
    const res = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (!!res.error) {
      console.error(res.error);
    }
  } catch (error) {
    console.error(error);
  }

  return redirect("/");
};

export const createTaskAction = async (formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTaskCreate = (data: any): data is TaskCreate => {
    return (
      typeof data.name === "string" &&
      typeof data.date === "string" &&
      typeof data.description === "string"
    );
  };

  const taskData = {
    name: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
  };

  if (!isTaskCreate(taskData)) {
    return encodedRedirect("error", "/new", "Invalid task data");
  }

  try {
    const supabase = await createClient();
    await supabase.from("tasks").insert(taskData);
  } catch (error) {
    console.log("error", error);
  }

  return redirect("/home");
};

export const updateTaskAction = async (id: TaskId, formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTaskCreate = (data: any): data is Task => {
    return (
      typeof data.name === "string" &&
      typeof data.date === "string" &&
      typeof data.description === "string"
    );
  };

  const taskData = {
    name: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
  };

  if (!isTaskCreate(taskData)) {
    return encodedRedirect("error", "/new", "Invalid task data");
  }

  try {
    const supabase = await createClient();
    await supabase
      .from("tasks")
      .update({
        ...taskData,
        id: createTaskId(id),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
  } catch (error) {
    console.log("error", error);
  }

  return redirect("/home");
};

export const deleteTaskAction = async (id: TaskId) => {
  const supabase = await createClient();

  await supabase.from("tasks").delete().eq("id", id).throwOnError();

  return redirect("/home");
};

export const exportTasksAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": "attachment; filename=tasks.json",
    },
  });
};
