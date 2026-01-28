import { createMemoryHistory, createRouter } from "vue-router";

export const appRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: () => import("#features/home/HomeView.vue") },
    { path: "/about", component: () => import("#features/about/AboutView.vue") },
  ],
});
