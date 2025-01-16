import { Tables } from './database.types';

export type Task = Pick<
  Tables<'tasks'>,
  'id' | 'name' | 'date' | 'description'
>;
export type TaskCreate = Omit<Task, 'id'>;
