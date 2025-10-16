import { resetPasswordAction } from "@/app/actions/reset-password";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@heroui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "パスワード再設定",
};

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">パスワード再設定</h1>
      <p className="text-sm text-foreground/60">
        新しいパスワードを入力してください。
      </p>
      <Input
        type="password"
        label="新しいパスワード"
        name="password"
        autoComplete="new-password"
        isRequired
      />
      <Input
        type="password"
        label="パスワード確認"
        name="confirmPassword"
        autoComplete="new-password"
        isRequired
      />
      <SubmitButton formAction={resetPasswordAction}>
        パスワードを更新
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
