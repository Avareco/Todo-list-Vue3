<script setup lang="ts">
import { storeToRefs } from "pinia";
//@ts-ignore
import { Container, Draggable } from "vue-dndrop";
import { useRouter } from "vue-router";

import BaseActionsMenu from "@/components/base/BaseActionsMenu.vue";
import { ROUTES } from "@/router";
import { useTasksStore } from "@/stores/tasks";
import type { IColumn, IDropResult } from "@/types";

defineProps<{
  column: IColumn;
}>();

const router = useRouter();

const tasksStore = useTasksStore();
const { tasksColumns } = storeToRefs(tasksStore);
const { applyTaskDrag, removeTaskFromColumn } = tasksStore;

const onCardDrop = (columnId: string, dropResult: IDropResult) => {
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    applyTaskDrag(columnId, dropResult);
  }
};

const getCardPayload = (columnId: string) => (index: number) => {
  const column = tasksColumns.value.find(col => col.id === columnId);

  return column ? column.tasks[index] : null;
};
</script>

<template>
  <Container
    group-name="col"
    :tag="{ value: 'div', props: { class: 'full-height block no-wrap' } }"
    :get-child-payload="getCardPayload(column.id)"
    @drop="(e:IDropResult) => onCardDrop(column.id, e)"
  >
    <Draggable
      v-for="task in column.tasks"
      :key="task.id"
      class="q-my-sm rounded-borders"
    >
      <q-card>
        <q-card-section
          class="text-lg font-bold text-center row no-wrap justify-between"
        >
          <RouterLink
            :to="{ name: ROUTES.TASK, params: { id: task.id } }"
            class="task-label row items-center"
          >
            <div class="task-text">{{ task.label }}</div>
          </RouterLink>
          <BaseActionsMenu
            @remove="() => removeTaskFromColumn(task.id, column.id)"
            @edit="
              () => {
                router.push({ name: ROUTES.TASK, params: { id: task.id } });
              }
            "
          />
        </q-card-section>
      </q-card>
    </Draggable>
  </Container>
</template>

<style scoped lang="scss">
.task-label {
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  max-width: 100%;
  &:hover {
    text-decoration: underline;
    color: $primary;
  }
}
.task-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
