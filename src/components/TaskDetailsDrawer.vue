<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { ROUTES } from "@/router";
import { useTasksStore } from "@/stores/tasks";
import { type IStatusOptions, type ITask, TaskPriority } from "@/types";

const tasksStore = useTasksStore();
const {
  getTaskById,
  getStatusOptions,
  getTasksStatusById,
  changeTaskColumn,
  editTaskInColumn,
} = tasksStore;

const router = useRouter();

const currentTask = ref<ITask | null>(null);
const newTaskColumnId = ref<string | null>(null);
const priorityOptions = [
  { label: "Low", value: TaskPriority.LOW },
  { label: "Medium", value: TaskPriority.MEDIUM },
  { label: "High", value: TaskPriority.HIGH },
];

const routeTaskId = computed<string>(
  () => router.currentRoute.value.params.id as string,
);

const columnId = computed<string | null>(() => {
  const taskId = currentTask.value?.id;

  return taskId ? getTasksStatusById(taskId) : null;
});

const statusOptions = computed<IStatusOptions[]>(() => getStatusOptions());

watch(
  () => routeTaskId.value,
  (id: string) => {
    if (!id) {
      currentTask.value = null;
      newTaskColumnId.value = null;

      return;
    }
    const task = getTaskById(id);
    currentTask.value = task ? { ...task } : null;
  },
);

const resetChanges = (): void => {
  const task = getTaskById(routeTaskId.value);
  if (task) {
    currentTask.value = { ...task };
    newTaskColumnId.value = columnId.value;
  }
};

const saveChanges = (): void => {
  if (newTaskColumnId.value && newTaskColumnId.value !== columnId.value) {
    changeTaskColumn(columnId.value, newTaskColumnId.value, {
      ...currentTask.value,
    } as ITask);

    return;
  }

  if (!routeTaskId.value || !columnId.value || !currentTask.value) {
    return;
  }

  editTaskInColumn(columnId.value, { ...currentTask.value });
};

const closeDrawer = (): void => {
  router.push({ name: ROUTES.HOME });
};
</script>

<template>
  <div
    v-if="currentTask"
    class="overlay"
    @click="closeDrawer"
  />
  <q-drawer
    v-if="currentTask"
    :width="600"
    :breakpoint="500"
    :model-value="!!currentTask"
    persistent
    overlay
    bordered
    side="right"
    class="relative-position"
  >
    <div class="row justify-end q-mt-xs q-mr-xs">
      <q-btn
        color="primary"
        icon="close"
        flat
        round
        @click="closeDrawer"
      />
    </div>

    <q-scroll-area class="full-width q-pa-md overflow-auto task-scroll">
      <q-form @submit="saveChanges">
        <q-input
          v-model="currentTask.label"
          outlined
          label="Label"
          :rules="[(val: string) => !!val || 'Label is required']"
        />
        <q-input
          v-model="currentTask.description"
          class="q-pt-sm"
          filled
          label="Description"
          type="textarea"
        />
        <q-select
          v-model="currentTask.priority"
          class="q-pt-md q-mt-sm"
          outlined
          map-options
          :options="priorityOptions"
          label="Priority"
        />
        <q-select
          class="q-pt-md q-mt-sm"
          :model-value="newTaskColumnId || columnId"
          outlined
          map-options
          emit-value
          :options="statusOptions"
          option-value="id"
          label="Status"
          @update:model-value="e => (newTaskColumnId = e)"
        />

        <q-input
          v-model="currentTask.responsiblePerson"
          class="q-pt-md q-mt-sm"
          outlined
          label="Responsible person"
        />
        <q-input
          v-model="currentTask.executor"
          class="q-pt-md q-mt-sm"
          outlined
          label="Executor"
        />
        <div class="row justify-end q-pt-md q-mt-sm">
          <q-btn
            class="q-mr-sm"
            label="Save"
            outline
            color="primary"
            type="submit"
          />
          <q-btn
            label="Reset"
            outline
            color="primary"
            @click="resetChanges"
          />
        </div>
      </q-form>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped lang="scss">
.task-scroll {
  height: calc(100% - 3rem);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
</style>
