import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex items-center gap-4">
      <Badge variant={"outline"} className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button
          asChild
          size="sm"
          variant={"outline"}
          disabled
          className="pointer-events-none cursor-none opacity-75"
        >
          <Link href="/sign-in">ログイン</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={"default"}
          disabled
          className="pointer-events-none cursor-none opacity-75"
        >
          <Link href="/sign-up">登録</Link>
        </Button>
      </div>
    </div>
  );
}
