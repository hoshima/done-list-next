import { ExportButton } from "@/components/export-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "エクスポート",
};

export default function Account() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">エクスポート</h1>
      <p>すべてのタスクをjson形式でエクスポートします。</p>
      <ExportButton />
    </div>
  );
}
