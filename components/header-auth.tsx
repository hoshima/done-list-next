import { signOutAction } from "@/app/actions/sign-out";
import Link from "next/link";
import { Button } from "@heroui/button";
import { AuthService } from "@/services/auth.service";

export default async function AuthButton() {
  const { user } = await AuthService.getCurrentUser();

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <form action={signOutAction}>
        <Button type="submit" variant="ghost">
          ログアウト
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button variant="ghost">
        <Link href="/sign-in">ログイン</Link>
      </Button>
      <Button color="primary" variant="solid">
        <Link href="/sign-up">登録</Link>
      </Button>
    </div>
  );
}
