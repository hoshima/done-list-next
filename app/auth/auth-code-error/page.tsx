import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">認証エラー</h1>
        <p className="mb-6 text-gray-600">
          認証プロセス中にエラーが発生しました。もう一度お試しください。
        </p>
        <div className="space-y-2">
          <Link
            href="/sign-in"
            className="block w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            サインインに戻る
          </Link>
          <Link
            href="/"
            className="block w-full text-gray-600 transition-colors hover:text-gray-800"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
