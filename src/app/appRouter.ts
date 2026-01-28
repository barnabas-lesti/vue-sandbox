import { createMemoryHistory, createRouter } from "vue-router";

export const appRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: () => import("src/features/home/HomeView.vue") },
    { path: "/about", component: () => import("src/features/about/AboutView.vue") },
  ],
});
