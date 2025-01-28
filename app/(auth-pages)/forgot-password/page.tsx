import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col gap-2 text-foreground [&>input]:mb-6">
        <div>
          <h1 className="text-2xl font-medium">パスワードをリセット</h1>
          <p className="text-sm text-secondary-foreground">
            登録済みの場合は{" "}
            <Link className="text-primary underline" href="/sign-in">
              ログイン
            </Link>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">メールアドレス</Label>
          <Input name="email" required />
          <SubmitButton formAction={forgotPasswordAction}>
            リセット
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
