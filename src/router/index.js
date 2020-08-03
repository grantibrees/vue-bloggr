import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import UserProfile from "../pages/UserProfile.vue";
// @ts-ignore
import BlogMain from "../pages/BlogMain.vue";

import { authGuard } from "@bcwdev/auth0-vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
    beforeEnter: authGuard,
  },
  {
    path: "/blog/:id",
    name: "BlogMain",
    component: BlogMain,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
