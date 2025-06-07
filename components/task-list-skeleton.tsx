import { Skeleton } from "@heroui/skeleton";

export default function TaskListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <TaskCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="flex flex-col items-start gap-1 rounded-md border border-primary p-4 text-foreground">
      <Skeleton className="h-7 w-3/4 rounded-lg">
        <div className="h-7 w-3/4 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="h-5 w-24 rounded-lg">
        <div className="h-5 w-24 rounded-lg bg-default-200"></div>
      </Skeleton>
      {/* <Skeleton className="h-5 w-full rounded-lg">
        <div className="h-5 w-full rounded-lg bg-default-200"></div>
      </Skeleton> */}
    </div>
  );
}
