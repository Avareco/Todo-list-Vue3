import { defineStore } from "pinia";
import { ref } from "vue";

import type { IColumn, IDropResult, IStatusOptions, ITask } from "@/types";
import { TaskPriority } from "@/types";

export const useTasksStore = defineStore("tasks", () => {
  const tasksColumns = ref<IColumn[]>([
    {
      id: "21",
      label: "Todo",
      description: "",
      tasks: [],
    },
    {
      id: "12032001",
      label: "In review",
      description: "",
      tasks: [
        {
          id: "20011203",
          label: "Test task",
          responsiblePerson: "Me",
          description: "Test task for The Originals",
          executor: "Me",
          priority: TaskPriority.HIGH,
        },
      ],
    },
    {
      id: "23",
      label: "Done",
      description: "",
      tasks: [],
    },
  ]);

  const getTaskById = (taskId: string): ITask | null => {
    for (const column of tasksColumns.value) {
      const task = column.tasks.find(task => task.id === taskId);
      if (task) {
        return task;
      }
    }

    return null;
  };

  const getTasksStatusById = (taskId: string | undefined): string | null => {
    if (!taskId) {
      return null;
    }

    for (const column of tasksColumns.value) {
      const taskExists = column.tasks.some(task => task.id === taskId);
      if (taskExists) {
        return column.id;
      }
    }

    return null;
  };

  const getStatusOptions = (): IStatusOptions[] =>
    tasksColumns.value.map(column => ({
      id: column.id,
      label: column.label,
    }));

  const addTaskToColumn = (columnId: string, newTask: ITask) => {
    const column = tasksColumns.value.find(col => col.id === columnId);
    if (column) {
      column.tasks.push(newTask);
    }
  };

  const changeTaskColumn = (
    currentColumnId: string | null,
    columnIdToAdd: string | null,
    updatedTask: ITask,
  ) => {
    const currentColumn = tasksColumns.value.find(
      column => column.id === currentColumnId,
    );

    if (!currentColumn) {
      return;
    }

    currentColumn.tasks = currentColumn.tasks.filter(
      task => task.id !== updatedTask.id,
    );

    const columnToAdd = tasksColumns.value.find(
      column => column.id === columnIdToAdd,
    );

    if (!columnToAdd) {
      return;
    }

    columnToAdd.tasks.push(updatedTask);
  };

  const editTaskInColumn = (columnId: string, updatedTask: ITask) => {
    const column = tasksColumns.value.find(col => col.id === columnId);

    if (column) {
      const taskIndex = column.tasks.findIndex(
        task => task.id === updatedTask.id,
      );
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = updatedTask;
      }
    }
  };

  const removeTaskFromColumn = (taskId: string, columnId: string) => {
    const column = tasksColumns.value.find(col => col.id === columnId);
    if (column) {
      column.tasks = column.tasks.filter(task => task.id !== taskId);
    }
  };

  const applyTaskDrag = (colId: string, dropResult: IDropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;

    if (removedIndex === null && addedIndex === null) {
      return;
    }

    const idx = tasksColumns.value.findIndex(col => col.id === colId);

    if (removedIndex !== null) {
      tasksColumns.value[idx].tasks.splice(removedIndex, 1);
    }

    if (addedIndex !== null && payload) {
      tasksColumns.value[idx].tasks.splice(addedIndex, 0, payload);
    }
  };

  const applyColumnDrag = ({ removedIndex, addedIndex }: IDropResult) => {
    const updatedColumns = [...tasksColumns.value];

    if (removedIndex === null || addedIndex === null) {
      return;
    }

    const [movedColumn] = updatedColumns.splice(removedIndex, 1);
    updatedColumns.splice(addedIndex, 0, movedColumn);
    tasksColumns.value = updatedColumns;
  };

  const addColumn = (newColumn: IColumn) => {
    tasksColumns.value = [...tasksColumns.value, newColumn];
  };

  const editColumn = (columnId: string, updatedColumn: Partial<IColumn>) => {
    const columnIndex = tasksColumns.value.findIndex(
      col => col.id === columnId,
    );

    if (columnIndex !== -1) {
      tasksColumns.value[columnIndex] = {
        ...tasksColumns.value[columnIndex],
        ...updatedColumn,
      };
    }
  };

  const removeColumn = (columnId: string) => {
    const columnIndex = tasksColumns.value.findIndex(
      col => col.id === columnId,
    );

    if (columnIndex !== -1) {
      tasksColumns.value.splice(columnIndex, 1);
    }
  };

  return {
    tasksColumns,
    getTaskById,
    getStatusOptions,
    getTasksStatusById,
    applyTaskDrag,
    applyColumnDrag,
    addTaskToColumn,
    editTaskInColumn,
    changeTaskColumn,
    removeTaskFromColumn,
    addColumn,
    editColumn,
    removeColumn,
  };
});
