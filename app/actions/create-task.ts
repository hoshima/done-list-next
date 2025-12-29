'use server';

import { redirect } from 'next/navigation';
import { createTask } from '@/services/task.service';
import { encodedRedirect } from '@/utils/utils';
import type { TaskCreate } from '../types/task.type';

export const createTaskAction = async (formData: FormData) => {
  const isTaskCreate = (data: any): data is TaskCreate => {
    return (
      typeof data.name === 'string' &&
      typeof data.date === 'string' &&
      typeof data.description === 'string'
    );
  };

  const taskData = {
    name: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('date'),
  };

  if (!isTaskCreate(taskData)) {
    return encodedRedirect('error', '/new', 'Invalid task data');
  }

  try {
    await createTask(taskData);
  } catch (error) {
    console.log('error', error);
    return encodedRedirect('error', '/new', 'タスクの作成に失敗しました');
  }

  redirect('/home');
};
