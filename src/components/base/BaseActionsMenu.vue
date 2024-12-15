<script setup lang="ts">
const emit = defineEmits<{
  (event: "edit"): void;
  (event: "remove"): void;
}>();
</script>

<template>
  <q-btn
    flat
    round
    color="black"
    icon="more_vert"
    class="text-black"
  >
    <q-menu
      class="no-shadow"
      :offset="[-5, 10]"
    >
      <q-list>
        <q-item
          class="row justify-between items-center"
          clickable
          @click="emit('edit')"
        >
          Edit
          <q-icon
            class="q-ml-sm"
            size="xs"
            name="edit"
          />
        </q-item>
        <q-item
          class="row justify-between items-center"
          clickable
          @click="emit('remove')"
        >
          Delete
          <q-icon
            class="q-ml-sm"
            size="xs"
            name="delete"
          />
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
