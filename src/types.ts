export const enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH
}

export interface ITask {
  id: string;
  label: string;
  description?: string;
  priority?: TaskPriority;
  responsiblePerson?: string;
  executor?: string;
}

export interface IColumn {
  id: string;
  label: string;
  description?: string;
  tasks: ITask[];
}

export interface IDropResult {
  removedIndex: number | null;
  addedIndex: number | null;
  payload?: ITask;
}

export type IStatusOptions = Omit<IColumn, "tasks">;
