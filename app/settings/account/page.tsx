import { signOutAction } from "@/app/actions/sign-out";
import { AccountDeleteButton } from "@/components/account-delete-button";
import { Button } from "@heroui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント",
};

export default function Account() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">アカウント</h1>

      <div className="flex flex-col gap-2">
        <h2 className="w-full border-b text-xl">ログアウト</h2>
        <form action={signOutAction}>
          <Button type="submit" variant="ghost">
            ログアウト
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="w-full border-b text-xl">アカウント削除</h2>
        <div>
          <p>登録されたデータがすべて削除されます。</p>
          <p>この操作は取り消しできません。</p>
        </div>
        <AccountDeleteButton />
      </div>
    </div>
  );
}
