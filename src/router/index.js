import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import notfound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/analytic",
      name: "analytic",
      component: () => import("../views/AnalyticView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not found",
      component: notfound,
    },
  ],
});

export default router;
