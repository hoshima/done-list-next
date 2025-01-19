"use client";

import React, { FormEvent } from "react";
import { type ComponentProps } from "react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { createTaskAction } from "@/app/actions";
import { Link } from "@heroui/link";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function TaskForm({ children, ...props }: Props) {
  type Errors = {
    name?: string;
    date?: string;
  };
  const [submitted, setSubmitted] = React.useState<{
    [key: string]: FormDataEntryValue;
  } | null>(null);
  const [errors, setErrors] = React.useState<Errors>({});

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      action={createTaskAction}
    >
      <div className="flex flex-col gap-4 w-96">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "タイトルを入力してください";
            }

            return errors.name;
          }}
          label="タイトル"
          name="title"
        />

        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "日付を入力してください";
            }

            return errors.name;
          }}
          label="日付"
          name="date"
          type="date"
        />

        <Textarea label="説明" name="description" />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            やった
          </Button>
          <Button type="reset" variant="bordered" as={Link} href="/home">
            戻る
          </Button>
        </div>
      </div>
    </Form>
  );
}
