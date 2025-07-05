import { vi, expect } from "vitest";
import { render, RenderResult } from "@testing-library/react";
import { User } from "@supabase/supabase-js";
import { Task } from "@/app/types/task.type";
import { createTaskId } from "@/app/types/branded.type";
import { redirect } from "next/navigation";

// Mock functions
const mockRedirect = vi.mocked(redirect);

// Mock service types
type MockAuthService = {
  requireAuth: ReturnType<typeof vi.fn>;
};

type MockTaskService = {
  getTasks: ReturnType<typeof vi.fn>;
};

// Task service response type
type TaskServiceResponse = {
  data: Task[] | null;
  count: number | null;
  error: string | null;
};

// Test options types
interface TestUserOptions {
  id?: string;
  email?: string;
  createdAt?: string;
}

interface TestTaskOptions {
  id: string;
  name: string;
  date: string;
  description?: string;
}

// Test data factories
/**
 * Creates a mock user for testing
 * @param options - User configuration options
 * @returns Mock User object
 */
export const createMockUser = (options: TestUserOptions = {}): User => ({
  id: options.id || "test-user-id",
  email: options.email || "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: options.createdAt || "2024-01-01T00:00:00.000Z",
});

/**
 * Creates a mock task for testing
 * @param options - Task configuration options
 * @returns Mock Task object
 */
export const createMockTask = (options: TestTaskOptions): Task => ({
  id: createTaskId(options.id),
  name: options.name,
  date: options.date,
  description: options.description || "",
});

/**
 * Creates multiple mock tasks for testing
 * @param count - Number of tasks to create
 * @param baseOptions - Base options for all tasks
 * @returns Array of mock tasks
 */
export const createMockTasks = (
  count: number,
  baseOptions: Partial<TestTaskOptions> = {}
): Task[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockTask({
      id: `${index + 1}`,
      name: `Test Task ${index + 1}`,
      date: `2024-01-${String(index + 1).padStart(2, "0")}`,
      description: `Description for task ${index + 1}`,
      ...baseOptions,
    })
  );
};

// Common test data
export const mockTasks: Task[] = [
  createMockTask({
    id: "1",
    name: "Test Task 1",
    date: "2024-01-01",
    description: "First test task",
  }),
  createMockTask({
    id: "2",
    name: "Test Task 2",
    date: "2024-01-02",
    description: "Second test task",
  }),
];

// Test helper functions
/**
 * Sets up authentication mock to return a successful user
 * @param mockAuthService - Mocked authentication service
 * @param user - User to return from authentication
 */
export const setupMocksForAuthentication = (
  mockAuthService: MockAuthService,
  user: User
) => {
  mockAuthService.requireAuth.mockResolvedValue(user);
};

/**
 * Sets up task service mock to return successful response
 * @param mockTaskService - Mocked task service
 * @param data - Task data to return
 * @param count - Total count of tasks
 */
export const setupMocksForTasks = (
  mockTaskService: MockTaskService,
  data: Task[],
  count: number
) => {
  mockTaskService.getTasks.mockResolvedValue({
    data,
    count,
    error: null,
  });
};

/**
 * Sets up task service mock to return error response
 * @param mockTaskService - Mocked task service
 * @param error - Error message to return
 */
export const setupMocksForTasksError = (
  mockTaskService: MockTaskService,
  error: string
) => {
  mockTaskService.getTasks.mockResolvedValue({
    data: null,
    count: null,
    error,
  });
};

/**
 * Sets up authentication mock to simulate authentication failure
 * @param mockAuthService - Mocked authentication service
 */
export const setupMocksForAuthenticationFailure = (
  mockAuthService: MockAuthService
) => {
  mockAuthService.requireAuth.mockImplementation(() => {
    mockRedirect("/sign-in");
    throw new Error("NEXT_REDIRECT");
  });
};

/**
 * Sets up authentication mock to simulate authentication error
 * @param mockAuthService - Mocked authentication service
 * @param error - Error to throw
 */
export const setupMocksForAuthenticationError = (
  mockAuthService: MockAuthService,
  error: Error
) => {
  mockAuthService.requireAuth.mockRejectedValue(error);
};

// Rendering helpers
/**
 * Renders an async React component (Server Component)
 * @param component - Promise that resolves to a React element
 * @returns Render result from testing library
 */
export const renderAsyncComponent = async (
  component: Promise<React.ReactElement>
): Promise<RenderResult> => {
  const result = await component;
  return render(result as React.ReactElement);
};

/**
 * Creates a complete mock setup for authenticated user with tasks
 * @param mockAuthService - Mocked authentication service
 * @param mockTaskService - Mocked task service
 * @param userOptions - User options for mock
 * @param tasks - Tasks to return
 * @param count - Total count of tasks
 */
export const setupCompleteAuthenticatedMock = (
  mockAuthService: MockAuthService,
  mockTaskService: MockTaskService,
  userOptions: TestUserOptions = {},
  tasks: Task[] = [],
  count: number = tasks.length
) => {
  const user = createMockUser(userOptions);
  setupMocksForAuthentication(mockAuthService, user);
  setupMocksForTasks(mockTaskService, tasks, count);
  return user;
};

/**
 * Validates that a mock function was called with expected arguments
 * @param mockFn - Mock function to validate
 * @param expectedArgs - Expected arguments
 * @param callIndex - Which call to check (defaults to 0)
 */
export const expectMockToHaveBeenCalledWith = (
  mockFn: ReturnType<typeof vi.fn>,
  expectedArgs: unknown[],
  callIndex = 0
) => {
  expect(mockFn).toHaveBeenCalledWith(...expectedArgs);
  if (mockFn.mock.calls[callIndex]) {
    expect(mockFn.mock.calls[callIndex]).toEqual(expectedArgs);
  }
};
