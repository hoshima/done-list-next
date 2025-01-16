"use client";

import { Button } from "@nextui-org/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function FloatingActionButton() {
  return (
    <>
      <Button
        className="!fixed right-4 bottom-4 size-16"
        isIconOnly
        aria-label="やったことを追加する"
        color="secondary"
        variant="solid"
        size="lg"
        radius="full"
      >
        <PlusIcon className="size-8" />
      </Button>
    </>
  );
}
