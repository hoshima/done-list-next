import { forgotPasswordAction } from "@/app/actions/forgot-password";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@heroui/input";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col gap-4 text-foreground">
        <div>
          <h1 className="text-2xl font-medium">パスワードをリセット</h1>
          <p className="text-sm text-secondary-foreground">
            登録済みの場合は{" "}
            <Link className="text-primary underline" href="/sign-in">
              ログイン
            </Link>
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Input label="メールアドレス" name="email" isRequired />
          <SubmitButton formAction={forgotPasswordAction}>
            リセット
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
