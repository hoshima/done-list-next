"use client";

import { deleteTaskAction } from "@/app/actions";
import { TaskId } from "@/app/types/branded.type";
import { Button } from "@heroui/button";

export const DeleteButton = ({ id }: { id?: TaskId }) => {
  if (!id) {
    return <div></div>;
  }

  return (
    <Button
      color="danger"
      variant="bordered"
      type="button"
      onPress={() => {
        const confirm = window.confirm("削除してもよろしいですか？");
        if (!confirm) {
          return;
        }
        deleteTaskAction(id);
      }}
    >
      削除
    </Button>
  );
};
