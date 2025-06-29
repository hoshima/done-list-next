"use client";

import { Button } from "@heroui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "登録しています…",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" isLoading={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
