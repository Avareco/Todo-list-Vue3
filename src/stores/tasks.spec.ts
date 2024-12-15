import { createPinia } from "pinia";
import { beforeEach,describe, expect, it } from "vitest";

import { useTasksStore } from "../stores/tasks";
import type { IColumn, IDropResult,ITask } from "../types";
import { TaskPriority } from "../types";

const pinia = createPinia();

describe("useTasksStore", () => {
  let tasksStore: ReturnType<typeof useTasksStore>;

  beforeEach(() => {
    tasksStore = useTasksStore(pinia);
    // Reset store to its initial state before each test
    tasksStore.tasksColumns = [
      {
        id: "21",
        label: "Todo",
        description: "",
        tasks: [
          {
            id: "2",
            label: "Task 1",
            responsiblePerson: "",
            executor: "",
            priority: TaskPriority.LOW,
          },
          {
            id: "3",
            label: "Task 2",
            responsiblePerson: "",
            executor: "",
            priority: TaskPriority.LOW,
          },
        ],
      },
      {
        id: "22",
        label: "In Progress",
        description: "",
        tasks: [],
      },
    ];
  });

  it("should get a task by ID", () => {
    const task = tasksStore.getTaskById("2");
    expect(task).toBeDefined();
    expect(task?.id).toBe("2");
  });

  it("should get status options", () => {
    const statusOptions = tasksStore.getStatusOptions();
    expect(statusOptions.length).toBe(2);
    expect(statusOptions[0].label).toBe("Todo");
  });

  it("should add a task to a column", () => {
    const newTask: ITask = {
      id: "4",
      label: "New Task",
      responsiblePerson: "",
      executor: "",
      priority: TaskPriority.LOW,
    };
    tasksStore.addTaskToColumn("22", newTask);
    const column = tasksStore.tasksColumns.find(col => col.id === "22");
    expect(column?.tasks.length).toBe(1);
    expect(column?.tasks[0].label).toBe("New Task");
  });

  it("should move a task to another column", () => {
    const taskToMove: ITask = {
      id: "2",
      label: "Task 1",
      responsiblePerson: "",
      executor: "",
      priority: TaskPriority.LOW,
    };
    tasksStore.changeTaskColumn("21", "22", taskToMove);
    const sourceColumn = tasksStore.tasksColumns.find(col => col.id === "21");
    const targetColumn = tasksStore.tasksColumns.find(col => col.id === "22");
    expect(sourceColumn?.tasks.length).toBe(1);
    expect(targetColumn?.tasks.length).toBe(1);
  });

  it("should edit a task in a column", () => {
    const updatedTask: ITask = {
      id: "2",
      label: "Updated Task",
      responsiblePerson: "",
      executor: "",
      priority: TaskPriority.MEDIUM,
    };
    tasksStore.editTaskInColumn("21", updatedTask);
    const task = tasksStore.getTaskById("2");
    expect(task?.label).toBe("Updated Task");
    expect(task?.priority).toBe(TaskPriority.MEDIUM);
  });

  it("should remove a task from a column", () => {
    tasksStore.removeTaskFromColumn("2", "21");
    const column = tasksStore.tasksColumns.find(col => col.id === "21");
    expect(column?.tasks.length).toBe(1);
  });

  it("should add a new column", () => {
    const newColumn: IColumn = {
      id: "23",
      label: "Done",
      description: "",
      tasks: [],
    };
    tasksStore.addColumn(newColumn);
    expect(tasksStore.tasksColumns.length).toBe(3);
    expect(tasksStore.tasksColumns[2].label).toBe("Done");
  });

  it("should edit a column", () => {
    const updatedColumn: Partial<IColumn> = { label: "Completed" };
    tasksStore.editColumn("21", updatedColumn);
    const column = tasksStore.tasksColumns.find(col => col.id === "21");
    expect(column?.label).toBe("Completed");
  });

  it("should remove a column", () => {
    tasksStore.removeColumn("22");
    expect(tasksStore.tasksColumns.length).toBe(1);
    expect(tasksStore.tasksColumns[0].id).toBe("21");
  });

  it("should apply task drag correctly", () => {
    const dropResult: IDropResult = {
      removedIndex: 0,
      addedIndex: 1,
      payload: tasksStore.tasksColumns[0].tasks[0],
    };
    tasksStore.applyTaskDrag("21", dropResult);
    const column = tasksStore.tasksColumns.find(col => col.id === "21");
    expect(column?.tasks[0].label).toBe("Task 2");
    expect(column?.tasks[1].label).toBe("Task 1");
  });

  it("should apply column drag correctly", () => {
    const dropResult: IDropResult = { removedIndex: 0, addedIndex: 1 };
    tasksStore.applyColumnDrag(dropResult);
    expect(tasksStore.tasksColumns[0].label).toBe("In Progress");
    expect(tasksStore.tasksColumns[1].label).toBe("Todo");
  });
});
