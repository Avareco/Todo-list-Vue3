<script setup lang="ts">
import { ROUTES } from "@/router";
</script>

<template>
  <q-header
    elevated
    class="bg-primary text-white"
  >
    <q-toolbar class="toolbar">
      <RouterLink
        class="router-link"
        :to="{ name: ROUTES.HOME }"
      >
        <q-toolbar-title class="text-white">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Task management app
        </q-toolbar-title>
      </RouterLink>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
}
</style>
