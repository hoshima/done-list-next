"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return (
    <Form action="">
      <Input
        key={query}
        id="query"
        name="query"
        label="検索"
        endContent={
          <Button isIconOnly aria-label="検索" type="submit">
            <MagnifyingGlassIcon />
          </Button>
        }
        defaultValue={query}
      />
    </Form>
  );
}
