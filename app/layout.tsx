import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/ui/header";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "やったログ",
  description:
    "やったことを記録して、あとで思い出すためのwebサイトです。「洗濯槽のカビ取り、前にやったのいつだっけ？」とかそういうときのための。",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={geistSans.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Header>{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</Header>

          <main className="flex flex-col items-center py-4">
            <div className="flex w-full flex-1 flex-col items-center gap-8 md:gap-20">
              <div className="container max-w-5xl">{children}</div>

              <footer className="grid w-full place-items-center gap-8 border-t py-8 text-xs md:py-16">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
