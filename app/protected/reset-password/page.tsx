import { Input } from '@heroui/input';
import type { Metadata } from 'next';
import { resetPasswordAction } from '@/app/actions/reset-password';
import { FormMessage, type Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';

export const metadata: Metadata = {
  title: 'パスワード再設定',
};

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form
      action={resetPasswordAction}
      className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4"
    >
      <h1 className="font-medium text-2xl">パスワード再設定</h1>
      <p className="text-foreground/60 text-sm">
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
      <SubmitButton>パスワードを更新</SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
