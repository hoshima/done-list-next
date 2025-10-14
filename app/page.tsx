import Landing from "@/components/landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "やったログ",
};

export default async function Home() {
  return (
    <>
      <Landing />
    </>
  );
}
