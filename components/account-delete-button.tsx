"use client";

import { deleteAccountAction } from "@/app/actions/delete-account";
import { Button } from "@heroui/button";

export function AccountDeleteButton() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const confirm = window.confirm(
          "この操作は取り消せません。よろしいですか？"
        );
        if (confirm) {
          deleteAccountAction();
        }
      }}
    >
      <Button type="submit" variant="solid" color="danger">
        アカウント削除
      </Button>
    </form>
  );
}
