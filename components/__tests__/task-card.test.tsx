import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TaskCard from '../task-card';
import { createMockTask } from './test-utils';

// Mock HeroUI Link component
vi.mock('@heroui/link', () => ({
  Link: ({
    href,
    children,
    className,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    key?: string;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('TaskCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders task name correctly', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    expect(screen.getByText('Test Task')).toBeDefined();
  });

  it('renders task date correctly', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    expect(screen.getByText('2024/01/01')).toBeDefined();
  });

  it('renders task description when provided', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    expect(screen.getByText('Test description')).toBeDefined();
  });

  it('does not render description when not provided', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
    });

    render(<TaskCard task={task} />);

    expect(screen.queryByText('Test description')).toBeNull();
  });

  it('renders with correct href link', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/1');
  });

  it('applies correct CSS classes', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    const link = screen.getByRole('link');
    expect([...link.classList]).toEqual(
      expect.arrayContaining([
        'flex',
        'flex-col',
        'items-start',
        'gap-1',
        'rounded-md',
        'border',
        'border-primary',
        'py-2',
        'px-4',
        'text-foreground',
      ]),
    );
  });

  it('renders task name with correct styling', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    const taskName = screen.getByText('Test Task');
    expect(taskName).toBeDefined();
    expect([...taskName.classList]).toEqual(
      expect.arrayContaining(['text-lg', 'font-medium']),
    );
    expect(taskName.tagName).toBe('H3');
  });

  it('renders task date with correct styling', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    const taskDate = screen.getByText('2024/01/01');
    expect(taskDate).toBeDefined();
    expect(taskDate.classList.contains('text-sm')).toBe(true);
    expect(taskDate.tagName).toBe('P');
  });

  it('renders task description with correct styling when present', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    const taskDescription = screen.getByText('Test description');
    expect(taskDescription).toBeDefined();
    expect(taskDescription.classList.contains('text-sm')).toBe(true);
    expect(taskDescription.tagName).toBe('P');
  });

  it('handles empty description correctly', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: '',
    });

    render(<TaskCard task={task} />);

    // Empty description should not render
    const descriptionElements = screen
      .getAllByText('')
      .filter(
        (element) => element.tagName === 'P' && element.textContent === '',
      );
    expect(descriptionElements.length).toBe(0);
  });

  it('handles special characters in task name', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task with Special Characters: !@#$%^&*()',
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    expect(
      screen.getByText('Test Task with Special Characters: !@#$%^&*()'),
    ).toBeDefined();
  });

  it('handles special characters in task description', () => {
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: 'Description with special chars: <>&"\'',
    });

    render(<TaskCard task={task} />);

    expect(
      screen.getByText('Description with special chars: <>&"\''),
    ).toBeDefined();
  });

  it('handles long task names', () => {
    const longName = 'A'.repeat(100);
    const task = createMockTask({
      id: '1',
      name: longName,
      date: '2024-01-01',
      description: 'Test description',
    });

    render(<TaskCard task={task} />);

    expect(screen.getByText(longName)).toBeDefined();
  });

  it('handles long task descriptions', () => {
    const longDescription = 'B'.repeat(500);
    const task = createMockTask({
      id: '1',
      name: 'Test Task',
      date: '2024-01-01',
      description: longDescription,
    });

    render(<TaskCard task={task} />);

    expect(screen.getByText(longDescription)).toBeDefined();
  });
});
