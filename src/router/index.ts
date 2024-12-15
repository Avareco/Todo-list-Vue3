import { createRouter, createWebHistory } from "vue-router";

export enum ROUTES {
  TASKS = "TASKS",
  HOME = "Home",
  TASK = "TASK",
  NOT_FOUND = "NOT_FOUND"
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "/tasks",
    },
    {
      path: "/tasks",
      name: ROUTES.TASKS,
      component: () => import("@/views/ViewTasks.vue"),
    },
    {
      path: "/tasks/:id",
      name: ROUTES.TASK,
      component: () => import("@/views/ViewTasks.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: ROUTES.NOT_FOUND,
      component: () => import("@/views/ViewNotFound.vue"),
    },
  ],
});

export default router;
