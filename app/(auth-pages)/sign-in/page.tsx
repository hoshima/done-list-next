import { signInAction } from "@/app/actions/sign-in";
import { signInWithGoogleAction } from "@/app/actions/sign-in-google";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@heroui/input";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/home");
  }

  return (
    <div className="flex min-w-64 flex-1 flex-col">
      <h1 className="text-2xl font-medium">ログイン</h1>

      <form
        className="flex w-full items-center justify-center "
        action={signInWithGoogleAction}
      >
        <button
          type="submit"
          className="my-4 w-1/2 bg-transparent text-sm text-gray-700 shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Image
            src="/image/web_light_rd_SI@2x.png"
            alt="Googleでログインする"
            width={350}
            height={80}
          />
        </button>
      </form>

      <div className="text-foreground underline">
        <p>
          <Link className="text-sm font-medium" href="/sign-up">
            アカウントが無い場合はこちら
          </Link>
        </p>
        <p>
          <Link className="text-xs" href="/forgot-password">
            パスワードを忘れたときはこちら
          </Link>
        </p>
      </div>
      <form>
        <div className="mt-4 flex flex-col gap-4">
          <Input label="メールアドレス" name="email" isRequired />
          <Input
            label="パスワード"
            type="password"
            name="password"
            isRequired
          />

          <SubmitButton
            pendingText="ログインしています…"
            formAction={signInAction}
          >
            ログイン
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
