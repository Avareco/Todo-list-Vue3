<script setup lang="ts">
import { ref } from "vue";

import BaseEditDialog from "@/components/base/BaseEditDialog.vue";
import TaskList from "@/components/TaskList.vue";
import TasksColumnHeader from "@/components/TasksColumnHeader.vue";
import { useTasksStore } from "@/stores/tasks";
import type { IColumn } from "@/types";

defineProps<{
  column: IColumn;
}>();

const { addTaskToColumn } = useTasksStore();

const isAddDialogOpened = ref(false);

const openAddDialog = () => {
  isAddDialogOpened.value = true;
};

const closeAddDialog = () => {
  isAddDialogOpened.value = false;
};
</script>

<template>
  <q-card
    class="tasks-column no-wrap q-mx-sm column full-height bg-grey-3 no-shadow"
  >
    <TasksColumnHeader :column="column" />
    <q-card-section class="col-grow">
      <TaskList :column="column" />
    </q-card-section>
    <q-card-actions class="row justify-center">
      <BaseEditDialog
        v-if="isAddDialogOpened"
        @save="newTask => addTaskToColumn(column.id, newTask)"
        @close="closeAddDialog"
      />
      <q-btn
        outline
        no-caps
        class="full-width bg-white"
        color="primary"
        label="Add new item"
        icon="add"
        @click="openAddDialog"
      />
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
.tasks-column {
  width: 20rem;
}
</style>
