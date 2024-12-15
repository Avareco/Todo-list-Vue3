<script setup lang="ts">
import { defineProps, ref } from "vue";

import BaseActionsMenu from "@/components/base/BaseActionsMenu.vue";
import BaseAddDialog from "@/components/base/BaseEditDialog.vue";
import { useTasksStore } from "@/stores/tasks";
import type { IColumn } from "@/types";

defineProps<{
  column: IColumn;
}>();

const isAddDialogOpened = ref(false);

const { editColumn, removeColumn } = useTasksStore();

const openAddDialog = () => {
  isAddDialogOpened.value = true;
};

const closeAddDialog = () => {
  isAddDialogOpened.value = false;
};
</script>

<template>
  <q-card-section class="column-drag-handle">
    <div class="row items-center justify-between">
      <q-icon
        name="drag_indicator"
        size="xs"
      />
      <div class="overflow-ellipsis">{{ column.label }}</div>
      <BaseAddDialog
        v-if="isAddDialogOpened"
        :initial-entity="column"
        @save="updatedColumn => editColumn(column.id, updatedColumn)"
        @close="closeAddDialog"
      />
      <BaseActionsMenu
        class="q-ml-sm"
        @remove="() => removeColumn(column.id)"
        @edit="openAddDialog"
      />
    </div>
    <div class="overflow-ellipsis">{{ column.description }}</div>
  </q-card-section>
</template>

<style scoped lang="scss">
.overflow-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
