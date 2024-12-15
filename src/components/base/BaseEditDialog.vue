<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { ref } from "vue";

import type { IColumn, ITask } from "@/types";

const props = defineProps<{
  initialEntity?: ITask | IColumn;
}>();

const emit = defineEmits<{
  (event: "save", payload: any): void;
  (event: "close"): void;
}>();

const newEntity = ref<ITask | IColumn>(
  props.initialEntity
    ? { ...props.initialEntity }
    : {
        id: uuid(),
        label: "",
        description: "",
      },
);

const saveChanges = () => {
  emit("save", newEntity.value);
  emit("close");
};
</script>

<template>
  <q-dialog
    :model-value="true"
    @hide="emit('close')"
  >
    <q-card class="q-pa-md card">
      <div class="row justify-end q-mt-xs q-mr-xs">
        <q-btn
          color="primary"
          icon="close"
          flat
          round
          @click="() => emit('close')"
        />
      </div>

      <q-card-section>
        <q-form @submit="saveChanges">
          <q-input
            v-model="newEntity.label"
            outlined
            label="Label"
            :rules="[(val: string)=>!!val || 'Label is required']"
          />
          <q-input
            v-model="newEntity.description"
            class="q-pt-sm"
            filled
            label="Description"
            type="textarea"
          />

          <div class="row justify-end q-pt-md q-mt-sm">
            <q-btn
              class="q-mr-sm"
              label="Save"
              outline
              color="primary"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.card {
  min-width: 30rem;
}
</style>
