<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
//@ts-ignore
import { Container, Draggable } from "vue-dndrop";

import BaseAddDialog from "@/components/base/BaseEditDialog.vue";
import TasksColumn from "@/components/TasksColumn.vue";
import { useTasksStore } from "@/stores/tasks";
import type { IColumn, IDropResult } from "@/types";

const tasksStore = useTasksStore();
const { tasksColumns } = storeToRefs(tasksStore);
const { addColumn } = tasksStore;

const isAddDialogOpened = ref(false);

const addNewColumn = (newColumn: IColumn) => {
  addColumn({ ...newColumn, tasks: [] });
};

const openAddDialog = () => {
  isAddDialogOpened.value = true;
};

const closeAddDialog = () => {
  isAddDialogOpened.value = false;
};

const onCardDrop = (dropResult: IDropResult) => {
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    tasksStore.applyColumnDrag(dropResult);
  }
};
</script>

<template>
  <q-page-container class="fullscreen z-inherit">
    <div class="full-height q-py-lg overflow-auto row no-wrap">
      <Container
        class="row full-height justify-center"
        orientation="horizontal"
        drag-handle-selector=".column-drag-handle"
        @drop="(e:IDropResult) => onCardDrop( e)"
      >
        <Draggable
          v-for="column in tasksColumns"
          :key="column.id"
        >
          <TasksColumn :column="column" />
        </Draggable>
      </Container>
      <div>
        <q-btn
          class="q-mr-sm"
          icon="add"
          color="primary"
          outline
          round
          @click="openAddDialog"
        />
        <BaseAddDialog
          v-if="isAddDialogOpened"
          @close="closeAddDialog"
          @save="addNewColumn"
        />
      </div>
    </div>
  </q-page-container>
</template>
