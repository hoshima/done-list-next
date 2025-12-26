import { Skeleton } from "@heroui/skeleton";

export function TaskFormSkeleton() {
  return (
    <div className="flex w-full items-center justify-center space-y-4">
      <div className="flex w-full flex-col gap-4 md:max-w-96">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-14 w-full rounded-lg">
            <div className="h-14 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-14 w-full rounded-lg">
            <div className="h-14 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-24 w-full rounded-lg">
            <div className="h-24 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>

        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <Skeleton className="h-10 w-full rounded-lg lg:w-20">
            <div className="h-10 w-full rounded-lg bg-default-200 lg:w-20" />
          </Skeleton>
          <span className="hidden md:inline md:flex-auto" />
          <Skeleton className="h-10 w-full rounded-lg lg:w-20">
            <div className="h-10 w-full rounded-lg bg-default-200 lg:w-20" />
          </Skeleton>
          <Skeleton className="h-10 w-full rounded-lg lg:w-20">
            <div className="h-10 w-full rounded-lg bg-default-200 lg:w-20" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}

export default TaskFormSkeleton;
