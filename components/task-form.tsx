"use client";

import React from "react";
import { type ComponentProps } from "react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Task } from "@/app/types/task.type";

type Props = ComponentProps<typeof Form> & {
  task?: Task;
};

export function TaskForm({ children, action, task, ...props }: Props) {
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
      className="w-full items-center justify-center space-y-4"
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      action={action}
    >
      <div className="flex w-96 flex-col gap-4">
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
          defaultValue={task ? task.name : ""}
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
          defaultValue={task ? task.date : undefined}
        />

        <Textarea
          label="説明"
          name="description"
          defaultValue={task ? task.description : undefined}
        />

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
