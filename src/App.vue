<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import TaskDetailsDrawer from "@/components/TaskDetailsDrawer.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader />
    <RouterView />
    <TaskDetailsDrawer />
  </q-layout>
</template>
