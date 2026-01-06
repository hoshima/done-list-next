import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { updateTaskAction } from '@/app/actions/update-task';
import { createTaskId } from '@/app/types/branded.type';
import type { Task } from '@/app/types/task.type';
import { TaskForm } from '@/components/task-form';
import TaskFormSkeleton from '@/components/task-form-skeleton';
import { requireAuth } from '@/services/auth.service';
import { getTaskById } from '@/services/task.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const p = await params;
  const id = p.id;
  const defaultMetadata = { title: '編集' };

  if (!id || typeof id !== 'string') {
    return defaultMetadata;
  }

  const taskId = createTaskId(id);
  try {
    const task = await getTaskById(taskId);
    if (!task) {
      return defaultMetadata;
    }

    return {
      title: task.name,
    };
  } catch {
    return defaultMetadata;
  }
}

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="max-w-64 text-xl">やったことをメモしよう</h1>

      <Suspense fallback={<TaskFormSkeleton />}>
        <TaskWrapper params={params} />
      </Suspense>
    </div>
  );
}

async function TaskWrapper({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const id = p?.id;
  if (!id || typeof id !== 'string') {
    redirect('/home');
  }
  const taskId = createTaskId(id);

  await requireAuth();
  const updateTaskActionWithId = updateTaskAction.bind(null, taskId);

  let task: Task | null = null;
  try {
    task = await getTaskById(taskId);
    if (!task) {
      redirect('/home');
    }
  } catch {
    console.error('Task not found');
    redirect('/home');
  }

  return <TaskForm action={updateTaskActionWithId} task={task} />;
}
