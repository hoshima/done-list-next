'use server';

import { redirect } from 'next/navigation';
import { deleteTask } from '@/services/task.service';
import { encodedRedirect } from '@/utils/utils';
import type { TaskId } from '../types/branded.type';

export const deleteTaskAction = async (id: TaskId) => {
  try {
    await deleteTask(id);
  } catch (error) {
    console.log('error', error);
    return encodedRedirect('error', `/${id}`, 'タスクの削除に失敗しました');
  }

  redirect('/home');
};
