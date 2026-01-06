'use client';

import { Button } from '@heroui/button';
import { deleteTaskAction } from '@/app/actions/delete-task';
import type { TaskId } from '@/app/types/branded.type';

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
        const confirm = window.confirm('削除してもよろしいですか？');
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
