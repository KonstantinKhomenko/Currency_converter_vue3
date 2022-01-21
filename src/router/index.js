import { createRouter, createWebHistory } from "vue-router";
import mainLayout from "./layouts/mainLayout";

const routes = [...mainLayout];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
