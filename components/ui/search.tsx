import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Form from "next/form";

export default function Search({ query }: { query?: string }) {
  return (
    <Form action="">
      <Input
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
