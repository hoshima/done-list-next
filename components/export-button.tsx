"use client";

import { Button } from "@heroui/button";

export function ExportButton() {
  return (
    <Button
      type="button"
      variant="solid"
      color="danger"
      onPress={async () => {
        const res = await fetch("/api/export-tasks");
        if (!res.ok) {
          alert("エクスポートに失敗しました");
          return;
        }
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tasks.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }}
    >
      エクスポート
    </Button>
  );
}
