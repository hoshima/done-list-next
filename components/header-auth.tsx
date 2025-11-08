import { signOutAction } from "@/app/actions/sign-out";
import Link from "next/link";
import { Button } from "@heroui/button";
import { getCurrentUser, getClaims } from "@/services/auth.service";
import { Suspense } from "react";
import { Skeleton } from "@heroui/skeleton";

async function UserEmail() {
  const { user } = await getCurrentUser();

  return <span>{user?.email}</span>;
}

export default async function AuthButton() {
  const userId = await getClaims();

  return userId ? (
    <div className="flex items-center gap-4">
      <Suspense fallback={<Skeleton className="h-5 w-48 rounded-lg" />}>
        <UserEmail />
      </Suspense>
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
