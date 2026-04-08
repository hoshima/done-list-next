import { Link } from '@heroui/link';
import type { Task } from '@/app/types/task.type';
import { formatDate } from '@/utils/dates';

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/${task.id}`}
      key={task.id}
      className="flex flex-col items-start gap-1 rounded-md border border-primary px-4 py-2 text-foreground"
    >
      <h3 className="font-medium text-lg">{task.name}</h3>
      <p className="text-sm">{formatDate(task.date)}</p>
      {task.description ? <p className="text-sm">{task.description}</p> : null}
    </Link>
  );
}
