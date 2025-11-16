/// <reference types="@vitest/browser/context" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TaskListSkeleton, { TaskCardSkeleton } from "../task-list-skeleton";
import { ReactNode } from "react";

// Mock HeroUI Skeleton component
vi.mock("@heroui/skeleton", () => ({
  Skeleton: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="skeleton">
      {children}
    </div>
  ),
}));

// Setup and cleanup for each test
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("TaskListSkeleton", () => {
  it("10個のTaskCardSkeletonコンポーネントを表示する", () => {
    render(<TaskListSkeleton />);

    // 10個のスケルトンカードを表示（各カードは2つのスケルトン要素を持つ）
    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements).toHaveLength(20); // 10カード × カードあたり2つのスケルトン要素
  });

  it("正しいコンテナクラスを持つ", () => {
    const { container } = render(<TaskListSkeleton />);
    const listContainer = container.querySelector(".flex.flex-col.gap-4");

    expect(listContainer).toBeInTheDocument();
  });

  it("ユニークキーを持つスケルトンカードを表示する", () => {
    const { container } = render(<TaskListSkeleton />);
    const cardContainers = container.querySelectorAll(
      ".flex.flex-col.items-start.gap-1"
    );

    expect(cardContainers).toHaveLength(10);
  });
});

describe("TaskCardSkeleton", () => {
  it("正しく表示される", () => {
    render(<TaskCardSkeleton />);

    // 2つのスケルトン要素（タイトルと日付）を表示
    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements).toHaveLength(2);
  });

  it("正しいカードコンテナクラスを持つ", () => {
    const { container } = render(<TaskCardSkeleton />);
    const cardContainer = container.querySelector(
      ".flex.flex-col.items-start.gap-1.rounded-md.border.border-primary.px-4.py-2.text-foreground"
    );

    expect(cardContainer).toBeInTheDocument();
  });

  it("正しいクラスを持つタイトルスケルトンを表示する", () => {
    const { container } = render(<TaskCardSkeleton />);
    const titleSkeleton = container.querySelector(".h-7.w-3\\/4.rounded-lg");

    expect(titleSkeleton).toBeInTheDocument();
  });

  it("正しいクラスを持つ日付スケルトンを表示する", () => {
    const { container } = render(<TaskCardSkeleton />);
    const dateSkeleton = container.querySelector(".h-5.w-24.rounded-lg");

    expect(dateSkeleton).toBeInTheDocument();
  });

  it("bg-default-200クラスを持つスケルトンの子要素を持つ", () => {
    const { container } = render(<TaskCardSkeleton />);
    const skeletonChildren = container.querySelectorAll(".bg-default-200");

    expect(skeletonChildren).toHaveLength(2);
  });
});
