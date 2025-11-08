import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor, cleanup } from "@testing-library/react";
import { redirect } from "next/navigation";
import TaskList from "../task-list";
import { Task } from "@/app/types/task.type";
import {
  createMockUser,
  createMockTask,
  createMockTasks,
  mockTasks,
  setupMocksForAuthentication,
  setupMocksForAuthenticationFailure,
  setupMocksForTasksError,
  setupCompleteAuthenticatedMock,
  renderAsyncComponent,
} from "./test-utils";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock services
vi.mock("@/services/auth.service", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("@/services/task.service", () => ({
  getTasks: vi.fn(),
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

// Type-safe mocks
const mockRedirect = vi.mocked(redirect);

// Get mocked services
const { requireAuth } = await import("@/services/auth.service");
const { getTasks } = await import("@/services/task.service");
const mockRequireAuth = vi.mocked(requireAuth);
const mockGetTasks = vi.mocked(getTasks);

// Test helper function
const renderTaskList = async (props: {
  query?: string | string[];
  page?: number;
}) => {
  return renderAsyncComponent(TaskList(props));
};

describe("TaskList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("redirects to sign-in when user is not authenticated", async () => {
    setupMocksForAuthenticationFailure(mockRequireAuth);

    await expect(async () => {
      await TaskList({ query: undefined, page: 1 });
    }).rejects.toThrow("NEXT_REDIRECT");

    expect(mockRedirect).toHaveBeenCalledWith("/sign-in");
  });

  it("renders tasks correctly when authenticated", async () => {
    setupCompleteAuthenticatedMock(
      mockRequireAuth,
      mockGetTasks,
      { id: "user-1" },
      mockTasks,
      2
    );

    await renderTaskList({ query: undefined, page: 1 });

    await waitFor(() => {
      expect(screen.getByTestId("task-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("task-card-2")).toBeInTheDocument();
    });
  });

  it("renders empty state when no tasks", async () => {
    setupCompleteAuthenticatedMock(
      mockRequireAuth,
      mockGetTasks,
      { id: "user-1" },
      [],
      0
    );

    await renderTaskList({ query: undefined, page: 1 });

    await waitFor(() => {
      expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });
  });

  it("handles search functionality", async () => {
    const searchTasks = [
      createMockTask({ id: "1", name: "Test Task 1", date: "2024-01-01" }),
    ];
    setupCompleteAuthenticatedMock(
      mockRequireAuth,
      mockGetTasks,
      { id: "user-1" },
      searchTasks,
      1
    );

    await renderTaskList({ query: "Test Task 1", page: 1 });

    await waitFor(() => {
      expect(screen.getByTestId("task-card-1")).toBeInTheDocument();
      expect(screen.queryByTestId("task-card-2")).not.toBeInTheDocument();
    });
  });

  it("handles empty search results", async () => {
    setupCompleteAuthenticatedMock(
      mockRequireAuth,
      mockGetTasks,
      { id: "user-1" },
      [],
      0
    );

    await renderTaskList({ query: "nonexistent task", page: 1 });

    await waitFor(() => {
      expect(
        screen.getByText("検索結果が見つかりませんでした")
      ).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    const paginatedTasks = [
      createMockTask({ id: "2", name: "Test Task 2", date: "2024-01-02" }),
    ];
    setupCompleteAuthenticatedMock(
      mockRequireAuth,
      mockGetTasks,
      { id: "user-1" },
      paginatedTasks,
      20
    );

    await renderTaskList({ query: undefined, page: 2 });

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });
  });

  describe("Error handling", () => {
    it("handles task service errors gracefully", async () => {
      setupMocksForAuthentication(
        mockRequireAuth,
        createMockUser({ id: "user-1" })
      );
      setupMocksForTasksError(mockGetTasks, "Database connection failed");

      await renderTaskList({ query: undefined, page: 1 });

      // Component should handle errors gracefully and show empty state
      await waitFor(() => {
        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
      });
    });
  });

  describe("Edge cases", () => {
    it("handles array query parameter", async () => {
      setupCompleteAuthenticatedMock(
        mockRequireAuth,
        mockGetTasks,
        { id: "user-1" },
        mockTasks,
        2
      );

      const result = await TaskList({ query: ["search", "term"], page: 1 });
      await renderAsyncComponent(Promise.resolve(result));

      await waitFor(() => {
        expect(screen.getByTestId("task-card-1")).toBeInTheDocument();
      });
    });

    it("handles page parameter correctly", async () => {
      const testTasks = createMockTasks(1, { name: "Paginated Task" });
      setupCompleteAuthenticatedMock(
        mockRequireAuth,
        mockGetTasks,
        { id: "user-1" },
        testTasks,
        15
      );

      await renderTaskList({ page: 2 });

      expect(mockGetTasks).toHaveBeenCalledWith(
        expect.objectContaining({ id: "user-1" }),
        {
          page: 2,
          itemsPerPage: 10,
          query: undefined,
        }
      );
    });
  });
});
