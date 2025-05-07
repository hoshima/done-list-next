import { Task } from "@/app/types/task.type";
import { Link } from "@heroui/link";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/${task.id}`}
      key={task.id}
      className="flex flex-col items-start gap-1 rounded-md border border-primary p-4 text-foreground"
    >
      <h3 className="text-lg font-medium">{task.name}</h3>
      <p className="text-sm">{task.date}</p>
      {task.description ? <p className="text-sm">{task.description}</p> : null}
    </Link>
  );
}
