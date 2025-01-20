"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function FloatingActionButton() {
  return (
    <>
      <Button
        className="!fixed bottom-4 right-4 size-16"
        isIconOnly
        as={Link}
        href="/new"
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
