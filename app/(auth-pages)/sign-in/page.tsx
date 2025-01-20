import { signInAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-w-64 flex-1 flex-col">
      <h1 className="text-2xl font-medium">Sign in</h1>

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

      <p className="text-sm text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-foreground underline" href="/sign-up">
          Sign up
        </Link>
      </p>

      <form>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
