import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { redirect } from "next/navigation";
import TaskList from "../task-list";
import { Task } from "@/app/types/task.type";
import { createTaskId } from "@/app/types/branded.type";
import { User } from "@supabase/supabase-js";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock services
vi.mock("@/services/auth.service", () => ({
  AuthService: {
    requireAuth: vi.fn(),
  },
}));

vi.mock("@/services/task.service", () => ({
  TaskService: {
    getTasks: vi.fn(),
  },
}));

// Mock child components
vi.mock("../task-card", () => ({
  default: ({ task }: { task: Task }) => (
    <div data-testid={`task-card-${task.id}`}>
      <h3>{task.name}</h3>
      <p>{task.date}</p>
      {task.description && <p>{task.description}</p>}
    </div>
  ),
}));

vi.mock("../pagination", () => ({
  default: ({
    currentPage,
    totalPages,
    query,
  }: {
    currentPage: number;
    totalPages: number;
    query?: string;
  }) => (
    <div data-testid="pagination">
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {query && <span>Query: {query}</span>}
    </div>
  ),
}));

const mockRedirect = vi.mocked(redirect);

// Dynamic imports for mocked services
const mockAuthService = async () => {
  const { AuthService } = await import("@/services/auth.service");
  return vi.mocked(AuthService);
};

const mockTaskService = async () => {
  const { TaskService } = await import("@/services/task.service");
  return vi.mocked(TaskService);
};

// Mock User object
const createMockUser = (id: string): User => ({
  id,
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "2024-01-01T00:00:00.000Z",
});

// Sample test data - using correct Task type
const mockTasks: Task[] = [
  {
    id: createTaskId("1"),
    name: "Test Task 1",
    date: "2024-01-01",
    description: "First test task",
  },
  {
    id: createTaskId("2"),
    name: "Test Task 2",
    date: "2024-01-02",
    description: "Second test task",
  },
];

describe("TaskList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("redirects to sign-in when user is not authenticated", async () => {
    const AuthService = await mockAuthService();
    AuthService.requireAuth.mockImplementation(() => {
      mockRedirect("/sign-in");
      // redirect() は実際には例外を投げて実行を停止するため、
      // テストでもそれをシミュレートする
      throw new Error("NEXT_REDIRECT");
    });

    try {
      await TaskList({ query: undefined, page: 1 });
    } catch (error) {
      // リダイレクトによる例外をキャッチ
      expect(error).toEqual(new Error("NEXT_REDIRECT"));
    }

    expect(mockRedirect).toHaveBeenCalledWith("/sign-in");
  });

  it("renders tasks correctly when authenticated", async () => {
    const AuthService = await mockAuthService();
    const TaskService = await mockTaskService();

    AuthService.requireAuth.mockResolvedValue(createMockUser("user-1"));
    TaskService.getTasks.mockResolvedValue({
      data: mockTasks,
      count: 2,
      error: null,
    });

    const result = await TaskList({ query: undefined, page: 1 });
    render(result as React.ReactElement);

    await waitFor(() => {
      expect(screen.getByTestId("task-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("task-card-2")).toBeInTheDocument();
    });
  });

  it("renders empty state when no tasks", async () => {
    const AuthService = await mockAuthService();
    const TaskService = await mockTaskService();

    AuthService.requireAuth.mockResolvedValue(createMockUser("user-1"));
    TaskService.getTasks.mockResolvedValue({
      data: [],
      count: 0,
      error: null,
    });

    const result = await TaskList({ query: undefined, page: 1 });
    render(result as React.ReactElement);

    await waitFor(() => {
      expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });
  });

  it("handles search functionality", async () => {
    const AuthService = await mockAuthService();
    const TaskService = await mockTaskService();

    AuthService.requireAuth.mockResolvedValue(createMockUser("user-1"));
    TaskService.getTasks.mockResolvedValue({
      data: [mockTasks[0]],
      count: 1,
      error: null,
    });

    const result = await TaskList({ query: "Test Task 1", page: 1 });
    render(result as React.ReactElement);

    await waitFor(() => {
      expect(screen.getByTestId("task-card-1")).toBeInTheDocument();
      expect(screen.queryByTestId("task-card-2")).not.toBeInTheDocument();
    });
  });

  it("handles empty search results", async () => {
    const AuthService = await mockAuthService();
    const TaskService = await mockTaskService();

    AuthService.requireAuth.mockResolvedValue(createMockUser("user-1"));
    TaskService.getTasks.mockResolvedValue({
      data: [],
      count: 0,
      error: null,
    });

    const result = await TaskList({ query: "nonexistent task", page: 1 });
    render(result as React.ReactElement);

    await waitFor(() => {
      expect(
        screen.getByText("検索結果が見つかりませんでした")
      ).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    const AuthService = await mockAuthService();
    const TaskService = await mockTaskService();

    AuthService.requireAuth.mockResolvedValue(createMockUser("user-1"));
    TaskService.getTasks.mockResolvedValue({
      data: [mockTasks[1]],
      count: 20,
      error: null,
    });

    const result = await TaskList({ query: undefined, page: 2 });
    render(result as React.ReactElement);

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });
  });
});
