import type { Metadata } from 'next';
import { Suspense, use } from 'react';
import FloatingActionButton from '@/components/fab';
import TaskList from '@/components/task-list';
import TaskListSkeleton from '@/components/task-list-skeleton';
import Search from '@/components/ui/search';

export const metadata: Metadata = {
  title: 'ホーム',
};

export default function ProtectedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const query = params['query']?.toString();
  const page = parseInt(params['page']?.toString() || '1', 10);
  const suspenseKey = `${query || ''}-${page}`;

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-20">
        <div className="block! mx-auto w-11/12 md:w-8/12">
          <Search />
        </div>

        <Suspense key={suspenseKey} fallback={<TaskListSkeleton />}>
          <TaskList query={query} page={page} />
        </Suspense>
      </div>

      <FloatingActionButton />
    </>
  );
}
