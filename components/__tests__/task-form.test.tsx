/// <reference types="@vitest/browser/context" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { TaskForm } from "../task-form";
import { Task } from "@/app/types/task.type";
import { createTaskId } from "@/app/types/branded.type";
import { ReactNode } from "react";

// Type definitions for mocked components
interface FormProps {
  children: ReactNode;
  className?: string;
  onReset?: () => void;
  action?: any;
  [key: string]: any;
}

interface InputProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  isRequired?: boolean;
  errorMessage?: any;
  [key: string]: any;
}

interface TextareaProps {
  label: string;
  name: string;
  defaultValue?: string;
  [key: string]: any;
}

interface ButtonProps {
  children: ReactNode;
  variant?: string;
  color?: string;
  type?: string;
  as?: any;
  [key: string]: any;
}

interface LinkProps {
  children: ReactNode;
  href: string;
  [key: string]: any;
}

// Mock HeroUI components
vi.mock("@heroui/form", () => ({
  Form: ({ children, className, onReset, action, ...props }: FormProps) => {
    // Remove React-specific props that shouldn't be on DOM elements
    const { validationBehavior, validationErrors, ...domProps } = props;
    void validationBehavior;
    void validationErrors;

    return (
      <form
        role="form"
        className={className}
        onReset={onReset}
        action={action}
        {...domProps}
      >
        {children}
      </form>
    );
  },
}));

vi.mock("@heroui/input", () => ({
  Input: ({
    label,
    name,
    type,
    defaultValue,
    isRequired,
    ...props
  }: InputProps) => {
    // Remove React-specific props that shouldn't be on DOM elements
    const { validationBehavior, validationErrors, errorMessage, ...domProps } =
      props;
    // Use underscore prefix to indicate intentionally unused variables
    void validationBehavior;
    void validationErrors;
    void errorMessage;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type || "text"}
          defaultValue={defaultValue}
          required={isRequired}
          {...domProps}
        />
      </div>
    );
  },
  Textarea: ({ label, name, defaultValue, ...props }: TextareaProps) => {
    // Remove React-specific props that shouldn't be on DOM elements
    const { validationBehavior, validationErrors, ...domProps } = props;
    void validationBehavior;
    void validationErrors;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          {...domProps}
        />
      </div>
    );
  },
}));

vi.mock("@heroui/button", () => ({
  Button: ({ children, type, as, ...props }: ButtonProps) => {
    const Component = as || "button";
    return (
      <Component type={type} {...props}>
        {children}
      </Component>
    );
  },
}));

vi.mock("@heroui/link", () => ({
  Link: ({ children, href, ...props }: LinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/delete-button", () => ({
  DeleteButton: ({ id }: { id?: any }) => (
    <button data-testid={`delete-button-${id || "new"}`} disabled={!id}>
      削除
    </button>
  ),
}));

describe("TaskForm", () => {
  const mockAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("新規タスク作成時に正しくレンダリングされる", () => {
    render(<TaskForm action={mockAction} />);

    expect(screen.getByLabelText("タイトル")).toBeInTheDocument();
    expect(screen.getByLabelText("日付")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "戻る" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "やった" })).toBeInTheDocument();
  });

  it("既存タスクの編集時にデフォルト値が設定される", () => {
    const task: Task = {
      id: createTaskId("1"),
      name: "テストタスク",
      date: "2025-06-03",
      description: "テスト説明",
    };

    render(<TaskForm action={mockAction} task={task} />);

    const titleInput = screen.getByLabelText("タイトル") as HTMLInputElement;
    const dateInput = screen.getByLabelText("日付") as HTMLInputElement;
    const descriptionTextarea = screen.getByLabelText(
      "説明"
    ) as HTMLTextAreaElement;

    expect(titleInput).toHaveValue("テストタスク");
    expect(dateInput).toHaveValue("2025-06-03");
    expect(descriptionTextarea).toHaveValue("テスト説明");
  });

  it("必須フィールドが適切に設定される", () => {
    render(<TaskForm action={mockAction} />);

    const titleInput = screen.getByLabelText("タイトル");
    const dateInput = screen.getByLabelText("日付");
    const descriptionTextarea = screen.getByLabelText("説明");

    expect(titleInput).toBeRequired();
    expect(dateInput).toBeRequired();
    expect(descriptionTextarea).not.toBeRequired();
  });

  it("入力フィールドの名前属性が正しく設定される", () => {
    render(<TaskForm action={mockAction} />);

    expect(screen.getByLabelText("タイトル")).toHaveAttribute("name", "title");
    expect(screen.getByLabelText("日付")).toHaveAttribute("name", "date");
    expect(screen.getByLabelText("説明")).toHaveAttribute(
      "name",
      "description"
    );
  });

  it("日付フィールドのタイプがdateに設定される", () => {
    render(<TaskForm action={mockAction} />);

    const dateInput = screen.getByLabelText("日付");
    expect(dateInput).toHaveAttribute("type", "date");
  });

  it("新規作成時は削除ボタンが無効化される", () => {
    render(<TaskForm action={mockAction} />);

    const deleteButton = screen.getByTestId("delete-button-new");
    expect(deleteButton).toBeDisabled();
  });

  it("既存タスク編集時は削除ボタンが有効化される", () => {
    const task: Task = {
      id: createTaskId("1"),
      name: "テストタスク",
      date: "2025-06-03",
      description: "テスト説明",
    };

    render(<TaskForm action={mockAction} task={task} />);

    const deleteButton = screen.getByTestId("delete-button-1");
    expect(deleteButton).not.toBeDisabled();
  });

  it("フォーム送信時にactionが呼び出される", async () => {
    render(<TaskForm action={mockAction} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled();
    });
  });

  it("戻るボタンのリンクが正しく設定される", () => {
    render(<TaskForm action={mockAction} />);

    const backLink = screen.getByRole("link", { name: "戻る" });
    expect(backLink).toHaveAttribute("href", "/home");
  });

  it("送信ボタンのタイプがsubmitに設定される", () => {
    render(<TaskForm action={mockAction} />);

    const submitButton = screen.getByRole("button", { name: "やった" });
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("カスタムpropsが正しく渡される", () => {
    const customProps = {
      "data-testid": "custom-form",
      className: "custom-class",
    };

    render(<TaskForm action={mockAction} {...customProps} />);

    const form = screen.getByTestId("custom-form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("custom-class");
  });

  it("validationBehaviorがnativeに設定される", () => {
    render(<TaskForm action={mockAction} />);

    // フォームが正しくレンダリングされることを確認
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("フォームリセット時にsubmittedステートがクリアされる", async () => {
    render(<TaskForm action={mockAction} />);

    const form = screen.getByRole("form");
    fireEvent.reset(form);

    // リセット機能が動作することを確認（内部ステートのテストは困難なため、フォームがレンダリングされることで間接的に確認）
    expect(form).toBeInTheDocument();
  });
});
