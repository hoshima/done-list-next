import { Task } from "@/app/types/task.type";
import { Link } from "@heroui/link";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/${task.id}`}
      key={task.id}
      className="flex flex-col gap-1 items-start rounded-md border border-primary px-4 py-4 text-foreground"
    >
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p className="text-sm">{task.date}</p>
      {task.description ? <p className="text-sm">{task.description}</p> : null}
    </Link>
  );
}
