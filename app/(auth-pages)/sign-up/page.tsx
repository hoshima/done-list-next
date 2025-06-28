import { signUpAction } from "@/app/actions/sign-up";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@heroui/input";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="mx-auto flex min-w-64 max-w-64 flex-col">
        <h1 className="text-2xl font-medium">登録</h1>
        <p className="text-sm text-foreground">
          登録済みの場合は{" "}
          <Link className="font-medium text-primary underline" href="/sign-in">
            ログイン
          </Link>
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <Input label="メールアドレス" name="email" isRequired />
          <Input
            label="パスワード"
            type="password"
            name="password"
            minLength={6}
            isRequired
          />
          <SubmitButton formAction={signUpAction} pendingText="登録しています…">
            登録
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
