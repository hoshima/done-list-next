const userIdBrand = Symbol();
const taskIdBrand = Symbol();

export type UserId = string & { [userIdBrand]: unknown };
export type TaskId = string & { [taskIdBrand]: unknown };

export function createUserId(rawId: string): UserId {
  return rawId as UserId;
}
export function createTaskId(rawId: string): TaskId {
  return rawId as TaskId;
}
