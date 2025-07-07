import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "", component: () => import("pages/LoginPage.vue") },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "/home", component: () => import("pages/IndexPage.vue") },
      { path: "/content", component: () => import("pages/ContentPage.vue") },
      { path: "/comments", component: () => import("pages/CommentPage.vue") },
      { path: "/users", component: () => import("pages/UserPage.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
