import { ThemeSwitcher } from "@/components/theme-switcher";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/ui/header";
import HeaderAuth from "@/components/header-auth";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "やったログ",
    template: "%s | やったログ",
  },
  description:
    "やったことを記録して、あとで思い出すためのwebサイトです。「洗濯槽のカビ取り、前にやったのいつだっけ？」とかそういうときのための。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Header>
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderAuth />
            </Suspense>
          </Header>

          <main className="flex flex-col items-center py-4">
            <div className="flex w-full flex-1 flex-col items-center gap-8 md:gap-20">
              <div className="container max-w-5xl">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>

              <footer className="grid w-full place-items-center gap-8 border-t py-4 text-xs md:py-12">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
